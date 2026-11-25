# blog.wimpys.world

This repository builds the Hugo blog at `https://blog.wimpys.world` and deploys it to Cloudflare Workers Static Assets (`wimpys-world-blog`).

## Setup

- Enter the Nix development shell with `direnv allow`, or run `nix develop` when `direnv` is absent.
- Stage any new or edited `flake.nix` before flake evaluation, because Nix flakes ignore untracked files.
- Leave `wrangler` out of `flake.nix`. The user's system `wrangler` profile wrapper supplies Cloudflare authentication and must not be shadowed on `PATH`.

## Build and test

Run every command from the repository root inside the Nix development shell:

- Preview locally with drafts: `just serve`
- Build minified site into `public/`: `just build`
- Build and validate all RSS feeds and legacy GUIDs: `just check`
- Upload a Cloudflare Workers preview version: `just preview`
- Build, validate, and deploy `blog.wimpys.world`: `just publish`
- Probe live HTTP 301 redirects across all six legacy domains: `just verify-redirects`

## PR and commit conventions

- Write commit messages in Conventional Commits 1.0.0 format.
- Do not add AI identities to `Signed-off-by` or `Co-authored-by` commit trailers.
- Run `just check` before you push changes or deploy.
- Pin GitHub Actions `uses:` references in `.github/workflows/` to full commit SHAs with version comments.

## Architecture notes

- Deploy exclusively through Cloudflare Workers Static Assets (`wrangler.jsonc`). Do not re-add GitHub Pages deployment or SSH deployment to `malak.wimpys.world`.
- Do not commit generated output under `public/` or `resources/`.
- Use hero-free post bundles (`archetypes/posts.md`). Preserve real inline post images inside each post directory.
- Maintain legacy domain 301 Redirect Rules through `scripts/cloudflare-redirects.py`.

## Companion repository

This repository pairs with `flexiondotorg/flexiondotorg`, which builds `https://wimpys.world` (`internal/site/web/`) and the `flexiondotorg` GitHub profile README.

- Keep shared chrome identical across `blog.wimpys.world` and `wimpys.world`: sticky frosted header (`min(1320px, 100%)`, `1.5px` aurora bottom hairline, `40px` `W` badge, `Projects`/`Links`/`Media`/`Blog` nav, `184px x 36px` right utility slot, three-way theme switch), three-column frosted footer (`6px` CSS circle pip, copyright, stack credit, `Sponsor ♥`), `scrollbar-gutter: stable`, and `overflow-x: clip`.
- Keep Catppuccin Mocha and Latte tokens, `Work Sans` and `Fira Code` fonts, and the `localStorage` theme key (`wimpys-world-theme`) aligned across both sites.
- Keep the WebGL Balatro swirl clock `(Date.now() / 1000) % (200 * Math.PI)` and static reduced-motion phase `42.0` identical across both sites so cross-site navigation does not reset the background.
- `flexiondotorg/flexiondotorg` (`vitrine.yaml`) consumes `https://blog.wimpys.world/posts/rss.xml`. Do not move or rename `/posts/rss.xml` without updating `vitrine.yaml` in the companion repository.
- Whenever you change the shared header, footer, palette tokens, theme key, swirl clock, or `/posts/rss.xml`, update `flexiondotorg/flexiondotorg` or explicitly flag the matching edit.

## Security and secrets

- Keep `.github/workflows/ci.yml` secret-free with top-level `permissions: {}` and minimal per-job permissions.
- Never commit Cloudflare API tokens or account credentials. `scripts/cloudflare-redirects.py check` and `apply` read `CLOUDFLARE_API_TOKEN` from the environment only.

## Gotchas

- Preserve RSS `<guid>` parity: posts dated before `legacyGuidCutoff` (`2026-11-25` in `hugo.toml` and `scripts/check-rss-guids.py`) must emit `https://wimpysworld.com/posts/<slug>/` in `layouts/_default/rss.xml` so RSS readers do not repost archived articles.
- Keep `body` on `overflow-x: clip`, never `overflow-x: hidden`. `overflow-x: hidden` breaks `position: sticky` on the site header and post table of contents.
- Keep `.bg-swirl` at `z-index: 0` with foreground layers at `z-index: 1` or higher. Negative `z-index` hides the WebGL canvas behind the opaque `body` background.
- Push PJAX history state (`history.pushState`) before swapping `<main>` in `static/js/cards.js` so relative `./image.png` paths inside posts resolve against the post URL.
- Preserve existing Giscus `repoID` and `categoryID` in `hugo.toml`. If the repository is renamed, update `params.repoURL` and `params.giscus.repo` only.
- Do not replace the apex `A` or `AAAA` DNS records on the six legacy Cloudflare zones (`wimpysworld.com`, `wimpress.com`, `flexion.org`, `wimpress.org`, `wimpress.io`, `wimpress.co.uk`). Their `ip.<domain>` subdomains CNAME to each apex.
