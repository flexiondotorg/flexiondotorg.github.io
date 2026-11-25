#!/usr/bin/env python3
"""Manage and verify Cloudflare 301 Redirect Rules for legacy blog domains.

This script is the durable record and idempotent management tool for the
Cloudflare zone-level Dynamic Redirect Rules (`http_request_dynamic_redirect`)
that forward the six retired blog domains (apex and `www.`) to:

  1. https://blog.wimpys.world<path>[?<query>]
     for /posts*, /tags*, /categories*, /search*, /page/*,
     /rss.xml, /index.json, and /sitemap.xml
  2. https://wimpys.world/#projects
     for /projects and /projects/*
  3. https://wimpys.world/
     for the root and all other retired paths

Note: The apex A/AAAA DNS records on the six legacy zones remain proxied and
unchanged because `ip.<domain>` subdomains CNAME to each apex.

Subcommands:
  print   Print the desired Cloudflare ruleset JSON payloads (offline).
  verify  Send live HTTP HEAD probes to all six domains (no API token needed).
  check   Compare live Cloudflare API rulesets against this spec (needs token).
  apply   Idempotently apply the rulesets via Cloudflare API (needs token).

Required token permissions for `check` / `apply`:
  - Zone -> Dynamic Redirects: Read (for `check`) or Edit (for `apply`)
  Set CLOUDFLARE_API_TOKEN in the environment before running `check` or `apply`.
"""

from __future__ import annotations

import argparse
import concurrent.futures
import json
import os
import sys
import urllib.error
import urllib.request
from typing import Any

CLOUDFLARE_API_BASE = "https://api.cloudflare.com/client/v4"
BLOG_BASE_URL = "https://blog.wimpys.world"
PORTFOLIO_BASE_URL = "https://wimpys.world"

LEGACY_ZONES: dict[str, str] = {
    "wimpysworld.com": "39f16ec4cdbf78794abbd7eb47c32872",
    "wimpress.com": "b8b3febec580e6665b86cab369290aa7",
    "flexion.org": "07fbf9d53a49211327befbc86abe0f64",
    "wimpress.org": "8758743bc9fdff358184fe2a1db4335f",
    "wimpress.io": "2b648001ebae61ae779275eba9aa7bde",
    "wimpress.co.uk": "b1324489dba5012f68499d6275593792",
}

BLOG_PATH_PREFIXES: tuple[str, ...] = (
    "/posts",
    "/tags",
    "/categories",
    "/search",
    "/page/",
)

BLOG_EXACT_PATHS: tuple[str, ...] = (
    "/rss.xml",
    "/index.json",
    "/sitemap.xml",
)

VERIFY_CASES: tuple[tuple[str, str], ...] = (
    ("/", f"{PORTFOLIO_BASE_URL}/"),
    (
        "/posts/faff-ollama-conventional-commit-generator/",
        f"{BLOG_BASE_URL}/posts/faff-ollama-conventional-commit-generator/",
    ),
    ("/posts/rss.xml", f"{BLOG_BASE_URL}/posts/rss.xml"),
    ("/rss.xml", f"{BLOG_BASE_URL}/rss.xml"),
    ("/tags/nixos/rss.xml", f"{BLOG_BASE_URL}/tags/nixos/rss.xml"),
    ("/page/2/", f"{BLOG_BASE_URL}/page/2/"),
    ("/sitemap.xml", f"{BLOG_BASE_URL}/sitemap.xml"),
    ("/search/?q=nix", f"{BLOG_BASE_URL}/search/?q=nix"),
    ("/projects/deb-get/", f"{PORTFOLIO_BASE_URL}/#projects"),
)


def build_ruleset_payload(zone_name: str) -> dict[str, Any]:
    """Return the Cloudflare `http_request_dynamic_redirect` entrypoint body."""
    host_cond = f'(http.host eq "{zone_name}" or http.host eq "www.{zone_name}")'
    path_clauses = [
        f'starts_with(http.request.uri.path, "{prefix}")'
        for prefix in BLOG_PATH_PREFIXES
    ] + [
        f'http.request.uri.path eq "{exact}"'
        for exact in BLOG_EXACT_PATHS
    ]
    blog_cond = " or ".join(path_clauses)

    return {
        "name": f"Legacy redirects for {zone_name}",
        "description": (
            f"Redirect {zone_name} blog paths to blog.wimpys.world "
            "and portfolio paths to wimpys.world"
        ),
        "rules": [
            {
                "action": "redirect",
                "description": (
                    f"Redirect {zone_name} blog, pagination, taxonomy, search, "
                    "sitemap, and RSS paths to blog.wimpys.world"
                ),
                "enabled": True,
                "expression": f"{host_cond} and ({blog_cond})",
                "action_parameters": {
                    "from_value": {
                        "status_code": 301,
                        "preserve_query_string": True,
                        "target_url": {
                            "expression": (
                                f'concat("{BLOG_BASE_URL}", http.request.uri.path)'
                            )
                        },
                    }
                },
            },
            {
                "action": "redirect",
                "description": (
                    f"Redirect {zone_name} legacy project pages to "
                    "wimpys.world Projects deck"
                ),
                "enabled": True,
                "expression": (
                    f'{host_cond} and (http.request.uri.path eq "/projects" '
                    'or starts_with(http.request.uri.path, "/projects/"))'
                ),
                "action_parameters": {
                    "from_value": {
                        "status_code": 301,
                        "preserve_query_string": False,
                        "target_url": {"value": f"{PORTFOLIO_BASE_URL}/#projects"},
                    }
                },
            },
            {
                "action": "redirect",
                "description": (
                    f"Redirect {zone_name} root and retired portfolio paths "
                    "to wimpys.world"
                ),
                "enabled": True,
                "expression": host_cond,
                "action_parameters": {
                    "from_value": {
                        "status_code": 301,
                        "preserve_query_string": False,
                        "target_url": {"value": f"{PORTFOLIO_BASE_URL}/"},
                    }
                },
            },
        ],
    }


def normalise_rule(rule: dict[str, Any]) -> dict[str, Any]:
    """Keep only the semantic fields of a Cloudflare Redirect Rule for diffing."""
    return {
        "action": rule.get("action"),
        "description": rule.get("description"),
        "enabled": rule.get("enabled"),
        "expression": rule.get("expression"),
        "action_parameters": rule.get("action_parameters"),
    }


def cf_request(
    method: str, path: str, token: str, payload: dict[str, Any] | None = None
) -> dict[str, Any]:
    data = json.dumps(payload).encode("utf-8") if payload is not None else None
    req = urllib.request.Request(
        f"{CLOUDFLARE_API_BASE}{path}",
        data=data,
        method=method,
        headers={
            "Authorization": f"Bearer {token}",
            "Content-Type": "application/json",
            "User-Agent": "blog-wimpys-world-redirects/1.0",
        },
    )
    try:
        with urllib.request.urlopen(req, timeout=20) as resp:
            body = json.loads(resp.read().decode("utf-8"))
    except urllib.error.HTTPError as exc:
        detail = exc.read().decode("utf-8", errors="replace")
        raise RuntimeError(f"Cloudflare API {method} {path} returned HTTP {exc.code}: {detail}") from exc
    if not body.get("success"):
        raise RuntimeError(f"Cloudflare API {method} {path} failed: {body.get('errors')}")
    return body


def resolve_zones(selected: list[str] | None) -> dict[str, str]:
    if not selected:
        return dict(LEGACY_ZONES)
    out: dict[str, str] = {}
    for name in selected:
        if name not in LEGACY_ZONES:
            valid = ", ".join(LEGACY_ZONES)
            raise SystemExit(f"Error: unknown zone {name!r}. Valid zones: {valid}")
        out[name] = LEGACY_ZONES[name]
    return out


def cmd_print(zones: dict[str, str]) -> int:
    payloads = {name: build_ruleset_payload(name) for name in zones}
    print(json.dumps(payloads, indent=2))
    return 0


class _NoRedirect(urllib.request.HTTPRedirectHandler):
    def redirect_request(self, req, fp, code, msg, headers, newurl):  # type: ignore[override]
        return None


def _probe_redirect(host: str, path: str, expected_location: str) -> tuple[str, str | None]:
    url = f"https://{host}{path}"
    opener = urllib.request.build_opener(_NoRedirect())
    req = urllib.request.Request(
        url,
        method="HEAD",
        headers={"User-Agent": "blog-wimpys-world-redirects/1.0"},
    )
    try:
        with opener.open(req, timeout=15) as resp:
            return (url, f"expected HTTP 301, got HTTP {resp.status}")
    except urllib.error.HTTPError as exc:
        location = exc.headers.get("Location", "")
        if exc.code != 301:
            return (url, f"expected HTTP 301, got HTTP {exc.code} (Location: {location!r})")
        if location != expected_location:
            return (url, f"expected Location {expected_location!r}, got {location!r}")
        return (url, None)
    except Exception as exc:  # noqa: BLE001
        return (url, f"request error: {exc}")


def cmd_verify(zones: dict[str, str]) -> int:
    jobs: list[tuple[str, str, str]] = []
    for zone_name in zones:
        for host in (zone_name, f"www.{zone_name}"):
            for path, expected in VERIFY_CASES:
                jobs.append((host, path, expected))

    failures: list[tuple[str, str]] = []
    with concurrent.futures.ThreadPoolExecutor(max_workers=12) as pool:
        futs = [pool.submit(_probe_redirect, h, p, e) for h, p, e in jobs]
        for fut in concurrent.futures.as_completed(futs):
            url, err = fut.result()
            if err:
                failures.append((url, err))

    if failures:
        print(f"Redirect verification failed ({len(failures)} of {len(jobs)} probes):", file=sys.stderr)
        for url, err in sorted(failures):
            print(f"  - {url}: {err}", file=sys.stderr)
        return 1

    print(f"Redirect verification passed: {len(jobs)} probes across {len(zones)} zones (apex + www).")
    return 0


def require_token() -> str:
    token = os.environ.get("CLOUDFLARE_API_TOKEN", "").strip()
    if not token:
        raise SystemExit("Error: CLOUDFLARE_API_TOKEN must be set in the environment.")
    return token


def cmd_check(zones: dict[str, str]) -> int:
    token = require_token()
    drift = 0
    for zone_name, zone_id in zones.items():
        desired = [normalise_rule(r) for r in build_ruleset_payload(zone_name)["rules"]]
        path = f"/zones/{zone_id}/rulesets/phases/http_request_dynamic_redirect/entrypoint"
        try:
            live = cf_request("GET", path, token)
            live_rules = [normalise_rule(r) for r in live.get("result", {}).get("rules", [])]
        except RuntimeError as exc:
            print(f"FAIL {zone_name}: {exc}", file=sys.stderr)
            drift += 1
            continue

        if live_rules == desired:
            print(f"OK   {zone_name} ({len(desired)} rules match)")
        else:
            print(f"DIFF {zone_name}: live rules differ from spec", file=sys.stderr)
            drift += 1
    return 1 if drift else 0


def cmd_apply(zones: dict[str, str]) -> int:
    token = require_token()
    for zone_name, zone_id in zones.items():
        payload = build_ruleset_payload(zone_name)
        path = f"/zones/{zone_id}/rulesets/phases/http_request_dynamic_redirect/entrypoint"
        res = cf_request("PUT", path, token, payload)
        count = len(res.get("result", {}).get("rules", []))
        print(f"APPLIED {zone_name} ({zone_id}): {count} rules")
    return 0


def main() -> int:
    parser = argparse.ArgumentParser(
        description="Manage and verify Cloudflare 301 Redirect Rules for legacy blog domains."
    )
    parser.add_argument(
        "command",
        choices=("print", "verify", "check", "apply"),
        help="Action to perform.",
    )
    parser.add_argument(
        "--zone",
        action="append",
        help="Limit operation to one or more specific legacy zones.",
    )
    args = parser.parse_args()
    zones = resolve_zones(args.zone)

    if args.command == "print":
        return cmd_print(zones)
    if args.command == "verify":
        return cmd_verify(zones)
    if args.command == "check":
        return cmd_check(zones)
    if args.command == "apply":
        return cmd_apply(zones)
    return 2


if __name__ == "__main__":
    raise SystemExit(main())
