# GPT Sites Prompt — Interactive CV for Bobby Ivanov

## How to use this file

- Paste **everything below the horizontal rule** into GPT Sites (or ChatGPT canvas / any site generator that accepts a long brief). It is self-contained — content included.
- If your tool scaffolds a multi-file project instead of a single HTML file, change only the first paragraph's output contract (single-file is recommended for fast iteration).
- If the output degrades, iterate **section by section** ("regenerate only the case-study section, keep everything else") rather than re-rolling the whole site.
- Once you're happy with the direction, we rebuild it properly ourselves — `cv-data.json` in this folder is the data source for that build.

---

You are a senior creative front-end engineer and digital designer. Build a complete, production-quality interactive CV website as ONE self-contained HTML file (inline `<style>` and `<script>`; CDN imports allowed only for Google Fonts and GSAP 3 + ScrollTrigger). No build step, no external image assets, no placeholder content.

## Goal & audience

Personal site for Bozhidar (Bobby) Ivanov, a HealthTech strategy & operations leader targeting Chief of Staff / strategy & operations leadership roles. Audience: hiring managers, founders and recruiters in healthtech and life sciences. It must work for a 30-second scan AND reward a 3-minute deep dive. Content accuracy is non-negotiable: use ONLY the content provided at the end of this prompt. Never invent employers, dates, client names, metrics, quotes or testimonials.

## Design direction: editorial light

- Mood: a sharp strategy-studio monograph — editorial quality, not a startup landing page.
- Palette: paper `#FBFAF7` background, ink `#1C1B1A` text, muted `#6B6862` secondary text, single accent deep teal `#0F6B5C` (data, links, key highlights only). No gradients, no purple/blue "AI-generated" look.
- Typography: Fraunces (display/headings) + Inter (body, UI, data) from Google Fonts. Fluid display sizes via `clamp()`, generous whitespace, strong baseline rhythm.
- Texture: hairline rules and editorial index numbers at most. No stacked cards, no glassmorphism, no stock imagery, no decorative icon soup, no emoji bullets.

## Page structure (single page, anchored nav)

1. **Hero** — name, one-line positioning statement, three headline stats (12 years' experience; £9.6m pipeline at 47% conversion; £12m+ programme recovered), contact links (email, LinkedIn, location). Restrained entrance animation.
2. **Impact by numbers** — grid of 6–8 key metrics with count-up animation on scroll into view; final values must exactly match the source content.
3. **Signature case study** — "Recovering a £12m+ global programme" (scroll-driven, see below).
4. **Career** — interactive timeline 2014–2026 covering DT Consulting and Accenture Song / Interactive, expandable to reveal highlights. All roles and dates from source.
5. **Core expertise** — the eight areas as an editorial numbered index separated by hairlines, not generic pill tags.
6. **Education & credentials** — all three entries.
7. **Contact** — email, LinkedIn, location; simple, confident sign-off.

## Signature interaction 1: the turnaround story (scroll-driven)

A pinned section that tells the recovery of the £12m+ global platform rollout in four beats as the user scrolls:

1. **Inheritance** — 13% adoption, critical underperformance.
2. **Diagnosis** — eight behavioural clinics to understand resistance.
3. **Reset** — governance and execution rebuilt.
4. **Recovery** — adoption increased more than fourfold to 56% within six months; client confidence restored, programme continuation secured.

Visual: a large adoption line/area chart drawn progressively with scroll (GSAP ScrollTrigger scrub), accent colour on paper background, phase annotations appearing at each beat.

**Data integrity (critical):** only two measured data points exist — 13% at takeover and 56% six months later. Render a stylised curve between these two anchors; do NOT fabricate monthly figures or label interpolated points as measured data.

## Signature interaction 2: animated impact counters

Count up from 0 to the final value when each metric scrolls into view (fire once, ~1.2s, ease-out). Counters must land on exact source values (e.g. £9.6m, 47%, 56%, 94%, 45+, ~12,000).

## Signature interaction 3: career timeline

Vertical timeline; each role expands accordion-style to reveal its highlights. Keyboard accessible (real buttons, `aria-expanded`). The DT Consulting entry shows its two highlight groups ("Firm Building & Operating Leadership" and "Selected Transformation & Product Delivery").

## Hard constraints

- Responsive from 360px up; mobile-first.
- Semantic HTML (`header`/`main`/`section`/`footer`, exactly one `h1`).
- Full `prefers-reduced-motion` fallback: no pinned scroll, counters show final values instantly, adoption curve rendered fully drawn.
- No scroll-jacking, no custom scrollbars, no carousels, no parallax wallpaper.
- Animate only `transform` and `opacity`. No console errors. Works when opened as `file://`.
- Total page weight under 600KB including CDN resources.

## Self-check before returning

1. Every employer, role title and date matches the source exactly.
2. Every number on the page matches the source exactly.
3. All eight expertise areas and all three education entries present.
4. All 10 DT Consulting bullets and all 7 Accenture bullets present.
5. Reduced-motion mode verified.
6. No invented content, no placeholder text, no external images.

## Content (verbatim source of truth)

### Bozhidar (Bobby) Ivanov

**HealthTech Strategy & Operations | Chief of Staff**

Walton-on-Thames, Surrey, UK · bn.ivanov91@gmail.com · +44 (0)796 4205 499 · linkedin.com/in/bnivanov

Health and life sciences strategy and operations leader with 12 years' experience converting ambiguous growth, product and transformation priorities into operating systems, cross-functional programmes and measurable commercial outcomes. At DT Consulting, built firm-wide commercial, change and GenAI capabilities, owned a £9.6m pipeline and led the recovery of a £12m+ global programme. Earlier at Accenture Song, shaped digital ventures and products alongside designers, engineers and researchers across digital health, genomics, clinical-trial recruitment and HCP platforms. Combines commercial ownership, product fluency and enterprise execution for scaling healthtech businesses.

**Core expertise:** Operating model design · Strategic planning · Cross-functional execution · Commercial operations · Product and venture development · AI adoption · Organisational change · Health and life sciences

### DT Consulting — London (May 2022 – May 2026)

**Associate Principal | Change & Transformation Lead | GenAI Enablement Lead** — Senior firm-building and client-delivery role at a specialist life sciences strategy consultancy.

Firm Building & Operating Leadership:

- Co-created a commercial strategy practice with the Managing Partner, taking it from proposition and go-to-market through pipeline and delivery. Generated a £2.7m pipeline across 25+ pharma clients and £1.2m revenue in year one; recommended retiring the offer when demand shifted, prioritising firm economics over activity.
- Designed and led the firm-wide GenAI operating model, including strategy, governance, council, enablement and adoption across 60+ consultants. Achieved 94% satisfaction and self-reported time savings of 5+ hours per user per week; extended the programme into agent development.
- Owned a cumulative £9.6m pipeline at 47% conversion, winning £4.5m and personally delivering £2.1m. Led account strategy, pricing, proposals, portfolio profitability and delivery oversight across AstraZeneca, Johnson & Johnson, Gilead, Roche and Novo Nordisk.
- Built the firm's proprietary change and transformation methodology, synthesising 16+ academic frameworks with practitioner experience. Proved it on live programmes, codified delivery standards and led all change-related proposals as the client-facing transformation lead.
- Founded and led a 23-person junior talent cohort with a 4.76/5 satisfaction score. Coached 30+ colleagues through demanding delivery periods and developed four direct reports through six promotions.

Selected Transformation & Product Delivery:

- Recovered a £12m+ global platform rollout from critical underperformance. Took over at 13% adoption, diagnosed resistance through eight behavioural clinics, reset governance and execution, and increased adoption more than fourfold to 56% within six months, restoring client confidence and securing programme continuation.
- Led the people and adoption workstream for a 12-month centralised creative operating model across Europe and Canada, aligning senior stakeholders around new roles, governance and ways of working. Received an internal entrepreneurship award.
- Led an eight-month redesign of the development-to-commercialisation operating system, aligning 45+ stakeholders across 24 teams and establishing common stages, decision gates, governance and role ownership from discovery through launch.
- Designed an above-market HCP engagement operating model spanning process, governance and technology, then tested it through 14 campaign pilots across nine countries, reaching around 12,000 healthcare professionals.
- Led an 11-week digital health strategy sprint for a neurology launch, converting nine problem areas into four scalable incubation opportunities; separately mapped 25+ GenAI use cases into a prioritised delivery roadmap.

### Accenture Song / Interactive — London (Mar 2014 – Apr 2022)

**Digital Strategy & Innovation Manager | Business Designer & Venture Architect | Health & Life Sciences** — Eight years in multidisciplinary product, design and engineering teams.

- Led strategy for a prospective $500m digital venture at a global pharma, reporting to the VP of Digital Innovation. Directed research, journey mapping, hypothesis design and experiments, and developed the investment case from board-level decision making through product-team execution.
- Converted 100+ growth opportunities into 13 proposition concepts across six markets, then led three international pilots in Australia, New Zealand and the Netherlands from MVP launch through scale-or-retire recommendation.
- Built and ran an innovation portfolio for a global pharmaceutical and vaccines business, defining governance, prioritisation and value frameworks and aligning the pipeline to enterprise strategy through C-suite interviews.
- Led C-suite engagement for a national genomics organisation, identifying 45 Horizon 2 and 3 opportunities supporting its ambition to sequence five million whole genomes while balancing scientific and commercial priorities.
- Managed a £2m+ virtual congress programme with a 15-person cross-functional team, owning the experience vision, agile delivery structure, scope, budget, timeline and vendor selection.
- Led product and experience strategy across global health platforms, including an HCP portal, an employee-centred view of R&D technology experience, and clinical-trial recruitment websites launched in five countries.
- Co-led the Experience Transformation practice, owning proposition development and go-to-market. Generated a £1.95m health and life sciences pipeline in FY22 and converted £650k to revenue.

### Education

- MBA, Distinction (99th percentile) — Quantic School of Business and Technology, 2018–2019
- Business Strategy Executive Programme — INSEAD, designed for Accenture Strategy, 2018–2019
- BSc (Hons) International Management with German, 2:1 — University of Bath, 2009–2013

### Technology & additional

- Product and technology: Experienced working with cross-functional product, design and engineering teams across discovery, experimentation, MVP delivery and scaling. Current focus includes AI agents, workflow automation, rapid prototyping and human-AI operating models.
- Languages: English (fluent), Bulgarian (native).

### Impact metrics for the counters (derived from the content above — no new facts)

- £9.6m pipeline owned — 47% conversion; £4.5m won, £2.1m personally delivered
- £12m+ programme recovered — adoption lifted from 13% to 56% in six months
- £1.2m year-one revenue — commercial strategy practice co-created with Managing Partner
- 94% satisfaction — GenAI operating model across 60+ consultants; 5+ hrs saved per user/week
- 45+ stakeholders aligned — 24 teams; development-to-commercialisation operating system redesign
- ~12,000 HCPs reached — 14 campaign pilots across nine countries
- $500m prospective digital venture — strategy leadership at global pharma
- 12 years in health & life sciences
