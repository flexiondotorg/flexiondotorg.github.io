# Wimpy's World Blog

This repository holds the Hugo source, bespoke Catppuccin theme, and Cloudflare deployment config for [blog.wimpys.world](https://blog.wimpys.world).

## How the repositories fit together

| Repository | Publishes | Hosting | Integration |
| --- | --- | --- | --- |
| This repository | [blog.wimpys.world](https://blog.wimpys.world) (Hugo blog, search index, and RSS feeds) | Cloudflare Workers Static Assets (`wimpys-world-blog`) | Header, footer, Catppuccin theme, and background swirl match `wimpys.world` |
| [flexiondotorg/flexiondotorg](https://github.com/flexiondotorg/flexiondotorg) | [wimpys.world](https://wimpys.world) portfolio site and [GitHub profile README](https://github.com/flexiondotorg) | GitHub Pages and `main` / `assets` branches | Vitrine fetches `https://blog.wimpys.world/posts/rss.xml` to populate blog cards and profile post links |

## Local development

Enter the Nix shell with `direnv allow` (or `nix develop`), then use `just`:

- `just serve`: run `hugo server -D` with drafts enabled.
- `just build`: clean `public/` and run `hugo --minify`.
- `just check`: build the site and validate RSS GUID parity across all feeds (`scripts/check-rss-guids.py`).

## Publishing

The blog deploys as Cloudflare Workers Static Assets using `wrangler.jsonc` (`assets.directory = "./public"` and custom domain `blog.wimpys.world`).

- `just preview`: run `just check` and upload a Cloudflare Workers preview version with `wrangler versions upload`.
- `just publish`: run `just check` and deploy `blog.wimpys.world` with `wrangler deploy`.
- `.github/workflows/ci.yml` runs `hugo --minify` and `scripts/check-rss-guids.py` on every push and pull request.
- Automatic deployments on `main` pushes and pull request previews use Cloudflare Workers Builds connected to Worker `wimpys-world-blog`.

## Legacy domain redirects

Six retired blog domains (`wimpysworld.com`, `wimpress.com`, `flexion.org`, `wimpress.org`, `wimpress.io`, and `wimpress.co.uk`) redirect at the Cloudflare edge via zone-level HTTP 301 Redirect Rules:

- `/posts*`, `/tags*`, `/categories*`, `/search*`, `/page/*`, `/rss.xml`, `/index.json`, and `/sitemap.xml` redirect to `https://blog.wimpys.world` with query strings preserved.
- `/projects` and `/projects/*` redirect to `https://wimpys.world/#projects`.
- All other paths redirect to `https://wimpys.world/`.

`scripts/cloudflare-redirects.py` records the canonical ruleset and verifies or applies it:

- `just verify-redirects`: send live HTTP `HEAD` probes across all six domains (apex and `www.`) with no API token.
- `python3 scripts/cloudflare-redirects.py print`: print the desired Cloudflare ruleset JSON offline.
- `python3 scripts/cloudflare-redirects.py check`: diff live Cloudflare API rulesets against the script (`CLOUDFLARE_API_TOKEN` required).
- `python3 scripts/cloudflare-redirects.py apply`: idempotently apply the rulesets via the Cloudflare API (`CLOUDFLARE_API_TOKEN` required).
