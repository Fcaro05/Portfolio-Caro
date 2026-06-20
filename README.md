# Francesco Caro — Portfolio

Portfolio personale: brutalist + neon, bilingue IT/EN, con hero WebGL (React Three Fiber),
smooth scroll (Lenis) e animazioni 2D (Framer Motion + GSAP).

## Stack

- **Next.js 16** (App Router) + **TypeScript**
- **React Three Fiber / drei / postprocessing** — hero 3D (shader plasma + particelle + bloom)
- **Framer Motion** — reveal, marquee, magnetic, tilt, menu mobile, loader
- **GSAP + Lenis** — smooth scroll
- **Tailwind CSS v4** — design system (token in `app/globals.css`)

## Avvio

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # build di produzione
npm start        # serve la build
```

## Struttura

```
app/
  layout.tsx        Font, metadata, provider (i18n, smooth scroll), cursor, nav
  page.tsx          Assembla le sezioni
  globals.css       Design tokens, utility brutalist, animazioni
lib/
  i18n.tsx          Lingue IT/EN + microcopy UI  <- testi interfaccia
  content.ts        Progetti, competenze, timeline, stats, contatti  <- CONTENUTI
components/
  providers/        SmoothScroll (Lenis)
  three/            HeroCanvas + shader GLSL
  ui/               Cursor, Nav, Loader, Reveal, Marquee, MagneticButton
  sections/         Hero, Manifesto, Capabilities, Work, Timeline, Stats, Contact, Footer
```

## Dove modificare i contenuti

Quasi tutto e' in **`lib/content.ts`** e **`lib/i18n.tsx`**.

### Da completare (placeholder attuali)

1. **Social** — `lib/content.ts` -> `contact.socials`: sostituisci gli `href: "#"` con i link reali
   (LinkedIn, GitHub, Instagram) e gli `handle`.
2. **Email** — `lib/content.ts` -> `contact.email` (ora `fcaro.personale@gmail.com`).
3. **Formazione** — `lib/content.ts` -> `timeline` (voce `edu`): titolo di studio, scuola/universita', anni.
4. **Ruoli reali** — `lib/content.ts` -> `projects[].role` e `timeline[].role`.
5. **Tesi Creativa** — `lib/content.ts` -> progetto `tesi-creativa`: descrizione reale.
6. **Date progetti** — `projects[].year` se vuoi precisarle.

I numeri della sezione "Stats" sono volutamente onesti (`lib/content.ts` -> `stats`).

## Deploy (Vercel)

1. `git init && git add . && git commit -m "init"`
2. Crea un repo su GitHub e fai push.
3. Importa il repo su [vercel.com/new](https://vercel.com/new) -> deploy automatico.
   (Oppure `npx vercel` dalla cartella.)

## Note

- Il cursore custom e' solo desktop; su touch torna quello di sistema.
- L'hero WebGL si mette in pausa quando esce dallo schermo (performance) e rispetta
  `prefers-reduced-motion` (fallback a gradiente statico).
