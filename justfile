# List available recipes
default:
    @just --list

# Serve the blog locally with drafts enabled
serve:
    hugo server -D

# Build the minified static site into public/
build:
    rm -rf public
    hugo --minify

# Build the site and validate RSS GUID parity
check: build
    python3 scripts/check-rss-guids.py

# Upload a Cloudflare Workers preview version
preview *args: check
    #!/usr/bin/env bash
    set -euo pipefail
    if ! command -v wrangler >/dev/null 2>&1; then
        echo "Error: wrangler not found in PATH." >&2
        exit 1
    fi
    wrangler versions upload {{args}}

# Build, validate, and deploy blog.wimpys.world with Wrangler
publish: check
    #!/usr/bin/env bash
    set -euo pipefail
    if ! command -v wrangler >/dev/null 2>&1; then
        echo "Error: wrangler not found in PATH." >&2
        exit 1
    fi
    wrangler deploy
