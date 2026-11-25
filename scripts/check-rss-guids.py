#!/usr/bin/env python3
"""Validate generated RSS feeds and verify legacy GUID preservation."""

from __future__ import annotations

import datetime
import email.utils
import pathlib
import sys
import xml.etree.ElementTree as ET

PUBLIC_DIR = pathlib.Path("public")
LEGACY_CUTOFF = datetime.datetime(2026, 11, 25, 0, 0, 0, tzinfo=datetime.timezone.utc)
LEGACY_PREFIX = "https://wimpysworld.com/posts/"
CURRENT_PREFIX = "https://blog.wimpys.world/"
CURRENT_POST_PREFIX = "https://blog.wimpys.world/posts/"


def check_feed(feed_path: pathlib.Path) -> tuple[int, list[str]]:
    errors: list[str] = []
    try:
        tree = ET.parse(feed_path)
    except ET.ParseError as exc:
        return 0, [f"{feed_path}: invalid XML: {exc}"]

    root = tree.getroot()
    channel = root.find("channel")
    if channel is None:
        return 0, [f"{feed_path}: missing <channel> element"]

    channel_link = (channel.findtext("link") or "").strip()
    if not channel_link.startswith(CURRENT_PREFIX):
        errors.append(f"{feed_path}: channel <link> must start with {CURRENT_PREFIX}, got {channel_link!r}")

    items = channel.findall("item")
    for idx, item in enumerate(items, start=1):
        title = (item.findtext("title") or "").strip()
        link = (item.findtext("link") or "").strip()
        guid = (item.findtext("guid") or "").strip()
        pub_raw = (item.findtext("pubDate") or "").strip()

        if not link.startswith(CURRENT_POST_PREFIX):
            errors.append(f"{feed_path} item #{idx} ({title!r}): <link> must start with {CURRENT_POST_PREFIX}, got {link!r}")

        try:
            pub_dt = email.utils.parsedate_to_datetime(pub_raw)
            if pub_dt.tzinfo is None:
                pub_dt = pub_dt.replace(tzinfo=datetime.timezone.utc)
            pub_utc = pub_dt.astimezone(datetime.timezone.utc)
        except Exception as exc:  # noqa: BLE001
            errors.append(f"{feed_path} item #{idx} ({title!r}): invalid <pubDate> {pub_raw!r}: {exc}")
            continue

        if pub_utc < LEGACY_CUTOFF:
            if not guid.startswith(LEGACY_PREFIX):
                errors.append(
                    f"{feed_path} item #{idx} ({title!r}): legacy post ({pub_utc.date()}) "
                    f"must emit GUID starting with {LEGACY_PREFIX}, got {guid!r}"
                )
        else:
            if not guid.startswith(CURRENT_POST_PREFIX):
                errors.append(
                    f"{feed_path} item #{idx} ({title!r}): post ({pub_utc.date()}) "
                    f"must emit GUID starting with {CURRENT_POST_PREFIX}, got {guid!r}"
                )

    return len(items), errors


def main() -> int:
    if not PUBLIC_DIR.is_dir():
        print("Error: public/ directory not found. Run `hugo --minify` first.", file=sys.stderr)
        return 1

    feeds = sorted(PUBLIC_DIR.rglob("rss.xml"))
    if not feeds:
        print("Error: no rss.xml files found under public/.", file=sys.stderr)
        return 1

    required = [PUBLIC_DIR / "rss.xml", PUBLIC_DIR / "posts" / "rss.xml"]
    missing = [str(p) for p in required if not p.is_file()]
    if missing:
        print(f"Error: missing required RSS feeds: {', '.join(missing)}", file=sys.stderr)
        return 1

    all_errors: list[str] = []
    total_items = 0
    for feed in feeds:
        count, errs = check_feed(feed)
        total_items += count
        all_errors.extend(errs)

    if all_errors:
        print(f"RSS GUID check failed with {len(all_errors)} error(s):", file=sys.stderr)
        for err in all_errors[:50]:
            print(f"  - {err}", file=sys.stderr)
        return 1

    print(f"RSS GUID check passed: {len(feeds)} feeds validated, {total_items} total items verified.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
