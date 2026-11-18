# weele.nl

Persoonlijke consultancywebsite van Henk van der Weele (SolutionXL BV). Astro · static · Cloudflare Pages.

## Stack

- **Astro 5** — static site generator
- **Sitemap**: `@astrojs/sitemap`
- **Structured data**: `Person` + `ProfessionalService` JSON-LD
- **Hosting**: Cloudflare Pages (via GitHub)

## Lokaal draaien

```bash
npm install
npm run dev
```

`http://localhost:4321`

## Build

```bash
npm run build
```

Output in `dist/`.

## Deploy — Cloudflare Pages

Code staat op GitHub: `solutionxlbv/weele-nl`.

### Cloudflare Pages build-instellingen

| Veld | Waarde |
|---|---|
| Project name | `weele-nl` |
| Production branch | `main` |
| Framework preset | Astro |
| Build command | `npm run build` |
| Build output directory | `dist` |

### Environment variables

| Naam | Waarde |
|---|---|
| `NODE_VERSION` | `20` |

### Belangrijk

Bij Cloudflare-prompt _"Configure this project for the Cloudflare adapter?"_ → **NEE / skip**.

Build-output moet `static` blijven, niet `server`. Geen `@astrojs/cloudflare` adapter installeren.

Verwacht in build-log:

```
[build] mode: "static"
[build] directory: /opt/buildhome/repo/dist/
```

## Cloudflare-specifieke bestanden

In `public/` (worden 1-op-1 mee gepubliceerd):

- **`_headers`** — security headers (HSTS, X-Frame-Options, nosniff, Referrer-Policy, Permissions-Policy) en `immutable` cache voor `/assets/*`, `*.css`, `*.woff2`
- **`robots.txt`** — sitemap-verwijzing naar `/sitemap-index.xml` (door Astro gegenereerd)
- **`assets/`** — SVG-visuals en CV-PDF

## Custom domain & DNS

DNS en e-mail blijven bij STRATO. Canonical host: `https://www.weele.nl`.

## Migratie-notitie (november 2026)

Op 18 november 2026 gemigreerd van pure static HTML naar Astro. Visuele output en content zijn 1-op-1 identiek — alleen de bouw is nu component-based zodat Frontend Design en Playwright MCP plugins effectiever kunnen werken.
