# weele.nl

Persoonlijke profielwebsite van Henk van der Weele. Astro · static · Cloudflare Pages.

weele.nl gaat over Henk als professional; solutionxl.nl over het bedrijf. Positionering, contentregels en deploy-governance staan in [`.claude/design-system.md`](.claude/design-system.md) — lees die vóór je iets wijzigt.

**Werkwijze:** nooit direct naar `main`. Feature branch → PR → Cloudflare-preview → merge na akkoord van Henk (door Henk of door Claude).

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

- **`_headers`** — security headers (HSTS, X-Frame-Options, nosniff, Referrer-Policy, Permissions-Policy). `immutable` cache alleen voor `/_astro/*` (gehashte bestanden); het cv wordt altijd gerevalideerd
- **`_redirects`** — `/sitemap.xml` → `/sitemap-index.xml` (oude sitemap-URL uit Search Console)
- **`favicon.svg`, `favicon-32.png`, `apple-touch-icon.png`** — iconen
- **`robots.txt`** — sitemap-verwijzing naar `/sitemap-index.xml` (door Astro gegenereerd)
- **`assets/`** — SVG-visuals en CV-PDF

Overig:

- **`src/pages/404.astro`** — echte 404-pagina (`noindex`). Niet verwijderen: zonder dit bestand toont Cloudflare Pages voor elke onbekende URL de homepage.
- **Fonts** zijn zelf-gehost via `@fontsource` (geen Google Fonts).
- **Hero-foto:** zet de foto als `src/assets/hero.jpg` in de repo; Astro maakt er automatisch AVIF/WebP-formaten van en gebruikt hem ook als social-preview. Zonder dat bestand valt de site terug op de Unsplash-URL.

## Custom domain & DNS

DNS en e-mail blijven bij STRATO. Canonical host: `https://www.weele.nl`.

## Migratie-notitie (november 2026)

Op 18 november 2026 gemigreerd van pure static HTML naar Astro. Visuele output en content zijn 1-op-1 identiek — alleen de bouw is nu component-based zodat Frontend Design en Playwright MCP plugins effectiever kunnen werken.
