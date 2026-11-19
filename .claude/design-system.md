# Design System — weele.nl

Persoonlijke profielwebsite van **Henk van der Weele** als professional. Elegant-premium stijl: serif-forward, warm neutraal met één goud-accent.

> **Positionering in één zin:** weele.nl gaat over Henk (wie hij is, wat hij gedaan heeft, welke rollen hij vervult); solutionxl.nl gaat over het bedrijf (diensten, cases). SolutionXL BV verschijnt op weele.nl alleen als de vorm waarin Henk contracteert, met een link naar solutionxl.nl. Zie §0.

**Dit document is bindend voor AI-tools (Frontend Design, Playwright MCP, Claude Code).** Gebruik uitsluitend onderstaande tokens, componenten en patronen. **Verzin geen nieuwe kleuren, fonts, spacing-waarden of componentvarianten.** Als iets ontbreekt voor een nieuwe behoefte: eerst voorstellen, niet eenzijdig toevoegen.

Single source of truth: `src/styles/global.css`.

---

## 0. Content-governance (besloten 18-11-2026)

Deze regels gaan vóór design-wensen. Een wijziging die ertegenin gaat, eerst voorleggen aan Henk.

### Rolverdeling tussen de sites

| | weele.nl | solutionxl.nl |
|---|---|---|
| Onderwerp | Henk als persoon en professional | SolutionXL BV als bedrijf |
| Inhoud | Persoon, rollen, profiel (lopende tekst), bestuursrollen, cv, beschikbaarheid, contact | Diensten, dienstpagina's, cases, ervaringstijdlijn (`Bewijs.astro`) |
| Zoekintentie | Naam + rol ("Henk van der Weele", "interim head of engineering") | Dienst ("interim IT management", "software delivery") |
| Schrijfstijl | **Ik-vorm** ("Ik help organisaties…") | Wij/bedrijfsvorm |

### Regels voor weele.nl

- **Wordmark is "Henk van der Weele"**, nooit "SolutionXL BV".
- SolutionXL BV komt alleen voor als contractvorm: sectie `#solutionxl`, de regel "Contractering: via SolutionXL BV" in de samenvatting, het bedrijfsblok in de contactkaart en de footer (`© Henk van der Weele · SolutionXL BV`). Altijd met link naar `https://www.solutionxl.nl/`.
- **Geen dienstpagina's, geen cases** op weele.nl. Die horen op solutionxl.nl; hier staan *rollen*.
- **Geen ervaringstijdlijn op weele.nl** (besloten 18-11-2026: Henk geeft de voorkeur aan het profiel als lopende tekst). Jaartallen en rollen per opdracht staan in het cv en op solutionxl.nl (`Bewijs.astro`).
- **Organisatielijst = één waarheid.** De organisaties in de profieltekst (`#profiel`) komen voor in het cv en op solutionxl.nl. Nieuwe opdracht? Cv, solutionxl.nl en deze lijst samen bijwerken.
- Geen claims, cijfers of jaartallen toevoegen die niet in het cv of op solutionxl.nl staan.
- Geen generieke AI-blogartikelen om pagina's te vullen.
- Contact-e-mail is `info@solutionxl.nl`.
- **Bestuursrollen staan op weele.nl** (besloten 19-11-2026): voorzitter sv Diemen, Sportraad Diemen en Programmaraad Studio DMN zijn persoonlijke rollen, geen dienst van SolutionXL BV. solutionxl.nl noemt ze in één zin in "Over" met een link naar `/#bestuur`. Wijzigt een rol of periode? Hier en die zin op solutionxl.nl samen bijwerken.

### Paginastructuur (volgorde vast)

1. Hero: eyebrow "Interim IT- & softwareleider", h1, lead in ik-vorm
2. `#over`: Over mij: de persoonlijke kant uit het cv ("Werken moet leuk zijn", kaart "Hoe kan ik je helpen?")
3. `#rollen`: vier rolkaarten
4. `#profiel`: profiel als lopende tekst (ik-vorm, vier alinea's) + tags + samenvattingskaart + cv-download. Geen tekst dubbel met `#over`.
5. `#bestuur`: "Ook waar het niet betaalt": intro links, kaart "Bestuursrollen" rechts (`.profile-card` + `.profile-list.board-list`: periode als `dt`, rol vet + omschrijving als `dd`)
6. `#aanpak`: werkwijze
7. `#solutionxl`: beschikbaarheid (6–12 maanden) en contractering via SolutionXL BV
8. `#contact` (footer)

Secties wisselen af tussen `.section` en `.section.section-alt`.

---

## 1. Stack en architectuur

- **Framework**: Astro 5 (static output)
- **Build**: `npm run build` → `dist/`
- **Hosting**: Cloudflare Pages via GitHub `main` branch
- **Canonical host**: `https://www.weele.nl`

### Bestanden die er toe doen voor design

| Pad | Rol |
|---|---|
| `src/styles/global.css` | **Alle tokens en styling.** Enige CSS-bron. |
| `src/layouts/Base.astro` | HTML head, fonts, JSON-LD, SEO-meta |
| `src/pages/index.astro` | Pagina-markup (één pagina) |
| `public/_headers` | Security headers + cache rules voor Cloudflare |
| `public/_redirects` | 301's (o.a. `/sitemap.xml` → `/sitemap-index.xml`) |
| `src/pages/404.astro` | 404-pagina (`noindex`); niet verwijderen |
| `src/lib/hero.ts` | Hero-foto: zelf gehost als `src/assets/hero.jpg` bestaat, anders Unsplash-fallback |
| `public/assets/` | SVG-visuals en CV-PDF |
| `astro.config.mjs` | Astro config met `inlineStylesheets: 'auto'` |

**Geen Tailwind, geen CSS-in-JS, geen componentbibliotheek.** Pure CSS met custom properties.

---

## 2. Design tokens

Alle tokens leven als CSS custom properties in `:root` van `global.css`. Uitbreiden met expliciete goedkeuring; overschrijven niet.

### Kleuren

| Token | Waarde | Gebruik |
|---|---|---|
| `--bg` | `#f4f4f2` | Hoofdachtergrond (warm cream) |
| `--surface` | `#ffffff` | Lichte vlakken |
| `--surface-alt` | `#ece9e3` | Alternatieve sectie-achtergrond |
| `--text` | `#141414` | Lopende tekst, koppen |
| `--muted` | `#5f5d58` | Secundaire tekst, nav-links, bijschriften |
| `--line` | `rgba(20,20,20,0.10)` | Horizontale scheidingen, randen |
| `--primary` | `#1f1f1f` | Primary button-achtergrond |
| `--primary-dark` | `#000000` | Primary-hover |
| `--accent` | `#b69a6a` | **Enige accent** — goud/koper. Tags, lijnen, vlakken, subtiele highlights |
| `--accent-text` | `#7a6239` | Hetzelfde accent, donkerder, **alleen voor kleine tekst** (eyebrows). Haalt WCAG AA (≥ 4,5:1) op alle achtergronden; `--accent` als tekst haalt maar 2,2–2,6:1 |

**Regels:**
- Eén accent (`--accent`, met `--accent-text` als leesbare tekstvariant). Geen tweede, derde of complementaire kleur toevoegen.
- Kleine tekst altijd ≥ 4,5:1 contrast. Gebruik `--accent` nooit als tekstkleur.
- Body-achtergrond is een gradient (`radial-gradient` + `linear-gradient`) — intact laten.
- Donkere varianten: `--primary` voor acties, nooit `--text` als button-kleur.
- Geen donkere modus zonder expliciete opdracht.

### Typografie

Fonts zijn **zelf-gehost** via `@fontsource` (geen verbinding met Google, geen bezoekers-IP's naar derden). Geïmporteerd bovenin `Base.astro`, alleen de gebruikte gewichten. **Niet terugzetten naar Google Fonts.**

```js
import '@fontsource/inter/400.css';   // + 500, 600, 700
import '@fontsource/cormorant-garamond/500.css';   // + 600
```

| Rol | Font | Gewichten |
|---|---|---|
| Koppen (`h1`–`h3`) | **Cormorant Garamond** | 500, 600 |
| Body, UI, buttons | **Inter** | 400, 500, 600, 700 |
| Brand-wordmark | Cormorant Garamond 600, 2rem | |

**Schaal** (gebruik `clamp()` zoals in bestaande CSS):

| Element | Grootte |
|---|---|
| `h1` | `clamp(2.5rem, 6vw, 4.8rem)`, `line-height: 1.02`, `max-width: 11ch` |
| `h2` | `clamp(1.9rem, 4vw, 3rem)`, `max-width: 15ch` (in `.two-col`: `22ch`) |
| `h3` | `1.45rem` |
| `.hero-layout > h1` | `clamp(3.2rem, 5.1vw, 5.6rem)`, `font-weight: 500` |
| `.eyebrow` | `0.78rem`, uppercase, `letter-spacing: 0.14em`, color `--accent-text` |
| `.lead` | `1.1rem`, color `--muted`, `max-width: 54ch` |
| `.lead-small` | `1.02rem`, color `--muted` |
| Body | `1rem`, `line-height: 1.65` |

Letter-spacing voor serif-koppen: `-0.02em` (noodzakelijk voor dichtheid).

### Spacing

Gebruik `clamp()` voor verticale ritme:

- `.section` padding: `2.7rem 0`
- Hero padding-top: `clamp(3.4rem, 6vw, 5.8rem)`
- Hero → details gap: `clamp(2.5rem, 5vw, 5rem)`
- Grid gaps: `2rem` default, `1.25rem` voor card-grids

Container: `width: min(1180px, calc(100% - 2rem))` — hard niet overschrijven.

### Radius en shadow

| Token | Waarde | Toepassing |
|---|---|---|
| `--radius` | `24px` | Kaarten |
| — | `999px` | Pills, buttons, tags |
| — | `18px` | Images binnen een card |
| `--shadow` | `0 22px 60px rgba(17,17,17,0.08)` | Soft premium drop voor kaarten |
| `--maxw` | `1180px` | Container max-width |

### Breakpoints

- Desktop: default
- Tablet: `@media (max-width: 980px)` — alle grids worden 1-koloms
- Mobiel: `@media (max-width: 640px)` — nav verticaal, buttons full-width

Geen andere breakpoints introduceren.

---

## 3. Componenten

Alleen onderstaande bestaan. Nieuwe component? Eerst voorstellen.

### Navigatie
- `.site-header` — sticky, blurred (`backdrop-filter: blur(12px)`), semi-transparante achtergrond
- `.brand` — Cormorant 600, 2rem — wordmark, tekst **"Henk van der Weele"**
- `.nav a` — Inter 500, color `--muted`. Items: Over mij · Rollen · Profiel & cv · Aanpak · Contact
- Op ≤ 640px is de header `position: static` en hebben nav-links `padding: .55rem 0` (44px tap target)

### Hero
- `.hero` + `.hero-layout` (stack) of `.hero-details` (2-koloms grid, `1.15fr 0.85fr`)
- `.hero-copy` krijgt een subtiele `border-top` als scheidslijn
- `.hero-art` toont visual in `.card-visual.premium-visual` wrapper

### Secties
- `.section` — standaard padding
- `.section-alt` — gradient achtergrond met subtiele witte en donkere border

### Kaarten
- `.card` — basis: padding 1.5rem, radius 24px, soft shadow, 88% witte achtergrond
- `.card.service-card` — binnen `.cards-4` grid
- `.card.feature-card` — grotere feature tile
- `.card.profile-card` — samenvatting (Rol, Focus, Domeinen, Beschikbaar, Contractering) + cv-download
- `.card.contact-card` — footer contactblok: Henk eerst; daaronder `.contact-company` (SolutionXL B.V., adres, KvK) gescheiden door een `--line`
- `.card-visual.premium-visual` — visuele kaart met gradient achtergrond

### Buttons
- `.btn.btn-primary` — donker (`--primary`), wit, pill, hover: `translateY(-1px)` + zwart
- `.btn.btn-secondary` — subtiel goud-tint achtergrond met accent-rand
- Beide `font-weight: 700`

### Lijsten en chips
- `.check-list`, `.steps` — ul/ol met consistente spacing
- `.tag-row span`, `.pill-row span` — pill met accent-tint achtergrond

### Grids
- `.cards-4` — 4-koloms op desktop, 1-koloms onder 980px
- `.two-col`, `.two-col.reverse` — 2-koloms (`1fr 1fr` resp. `0.95fr 1.05fr`)
- `.profile-grid` — `1.15fr 0.85fr`
- `.footer-grid` — `1.1fr 0.9fr`

---

## 4. Anti-patronen

Niet doen, ook niet met goede bedoelingen:

- ❌ Een tweede accentkleur toevoegen (blauw, groen, rood, ...)
- ❌ Shadows zwaarder maken dan de bestaande soft drop
- ❌ Sans-serif gebruiken voor koppen
- ❌ Radius mixen — alleen 24px, 999px, 18px (image-in-card)
- ❌ Nieuwe fonts toevoegen
- ❌ Donkere modus introduceren zonder expliciete opdracht
- ❌ Tailwind of andere CSS-framework introduceren
- ❌ Inline `style="..."` in `.astro`-bestanden
- ❌ Icon-libraries (Lucide, Font Awesome) — SVG inline en handgemaakt
- ❌ Animaties toevoegen anders dan bestaande hover-transform
- ❌ `<link>` naar nieuwe CSS-bestanden — alles in `global.css`

---

## 5. Instructies voor plugins

### Frontend Design

- Werkt in `src/pages/index.astro`, `src/layouts/Base.astro` en `src/styles/global.css`
- **Houd je aan bovenstaande tokens.** Geen nieuwe kleuren of fontgroottes verzinnen.
- Nieuwe secties volgen bestaande grid-conventies (`.container`, `.two-col`, `.cards-4`)
- Voor een nieuw component: eerst voorstellen in een comment of PR-description met motivatie, dan implementeren
- Als een component in meerdere pagina's komt: extract naar `src/components/<Naam>.astro` (niet eerder)

### Playwright MCP

Test altijd op drie viewport-breedtes:
- `1440×900` (desktop)
- `768×1024` (tablet)
- `390×844` (mobiel iPhone)

Verplichte checks per build:
- Hero-kop breekt niet raar bij viewport-overgang (`text-wrap: balance` moet werken)
- `.cards-4` wordt 1-koloms onder 980px
- Nav collapst correct onder 640px (`flex-direction: column`), header niet sticky, tap targets ≥ 44px
- Elke menu-ankerlink: sectie-eyebrow zichtbaar onder de header (desktop)
- `.one-line-heading` en `.profile-name-heading` lopen niet uit hun container (check 981–1180px)
- Contrast kleine tekst ≥ 4,5:1
- Geen requests naar `fonts.googleapis.com` / `fonts.gstatic.com`
- Buttons zijn full-width onder 640px
- Geen horizontal scroll op mobiel
- Fonts geladen (geen FOUT: Flash Of Unstyled Text)
- Lighthouse scores: Performance >90, Accessibility >95, SEO >95

Screenshots opslaan in `/screenshots/` (toevoegen aan `.gitignore` indien nog niet).

---

## 6. SEO en structured data

- JSON-LD staat in `Base.astro`: `ProfilePage` → `mainEntity` = `Person` (`https://www.weele.nl/#henk`), plus `WebSite`.
- **SolutionXL BV wordt alleen gerefereerd** via `worksFor: { '@id': 'https://www.solutionxl.nl/#organization' }`: hetzelfde `@id` dat solutionxl.nl gebruikt. Zo zien zoekmachines één persoon en één bedrijf. Nooit een tweede `ProfessionalService` met `url: weele.nl` aanmaken.
- Nooit verwijderen of inkorten
- Bij wijziging: valideer met [Google Rich Results Test](https://search.google.com/test/rich-results)
- Canonical URL hardcoded op `https://www.weele.nl/`
- Sitemap wordt automatisch gegenereerd door `@astrojs/sitemap` → `/sitemap-index.xml`

---

## 7. Deploy-governance

**Productie = branch `main`.** Cloudflare Pages deployt elke push naar `main` direct live. Daarom:

1. **Nooit rechtstreeks naar `main` pushen.** Altijd een feature branch (`fix/…`, `feat/…`, `content/…`).
2. Pull request naar `main`. Cloudflare bouwt automatisch een preview: `<branch>.weele-nl.pages.dev`.
3. Checks hieronder groen, preview bekeken.
4. **Merge alleen door Henk** (of met zijn expliciete akkoord in de PR). AI-tools mogen branches en PR's maken, niet zelf mergen.
5. Na merge: live site controleren (homepage, `/sitemap-index.xml`, een onbekende URL → 404).

Een geslaagde GitHub-commit bewijst niet dat de site live staat: controleer de Cloudflare deploy-log en de pagina zelf.

**Buiten scope zonder expliciete toestemming:** DNS (STRATO), nameservers, MX/SPF/DKIM/DMARC, de Cloudflare-adapter (`output` blijft `static`), bestanden verwijderen.

### Checklist per PR

1. `npm run build` lokaal succesvol
2. `npm run preview` visueel gecontroleerd op desktop + mobiel
3. Screenshot-comparison met vorige versie in PR-description (bij visuele wijzigingen)
4. Cloudflare preview-deploy gecontroleerd via `<branch>.weele-nl.pages.dev`
5. Lighthouse-run op preview-URL, scores vergeleken met baseline

Bij een visuele regressie: NIET mergen. Fix of trek branch in.

## Techniek-afspraken (audit 18-11-2026)

- **Afbeeldingen:** altijd `width`/`height` attributen; alles onder de vouw `loading="lazy"`. Foto's in `src/assets/` en via `astro:assets` (`<Picture>`), niet hotlinken.
- **Hero-foto:** zodra `src/assets/hero.jpg` bestaat, wordt die automatisch gebruikt (ook als `og:image`); anders valt de site terug op de Unsplash-URL (`src/lib/hero.ts`).
- **Cache (`public/_headers`):** alleen `/_astro/*` (gehashte bestandsnamen) is `immutable`. Bestanden met een vaste naam krijgen geen jaar-cache. Het cv (`/assets/*.pdf`) wordt altijd gerevalideerd; verhoog bij een nieuw cv ook `?v=` in de downloadlink.
- **404:** `src/pages/404.astro` moet blijven bestaan. Zonder dit bestand serveert Cloudflare Pages voor elke onbekende URL de homepage (soft-404).
- **Ankerlinks:** `[id] { scroll-margin-top }` houdt sectiekoppen onder de sticky header vandaan. Op ≤ 640px is de header niet sticky.
- **Tap targets:** minimaal 44px hoog op mobiel.
