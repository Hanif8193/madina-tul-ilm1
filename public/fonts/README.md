# Urdu Font Files

Drop the licensed font files here with these exact names — the `@font-face`
rules in `src/app/globals.css` will pick them up automatically:

| File | Font family | Used for |
|---|---|---|
| `Alqalam-Ferdious.ttf` (or `.woff2`) | Alqalam Ferdious | Urdu headings (h1–h6) |
| `Jameel-Noori-Nastaleeq.ttf` (or `.woff2`) | Jameel Noori Nastaleeq | Urdu body text, lists, links, buttons, inputs |

Notes:

- Both fonts are proprietary; do not commit them unless you have a license
  that permits redistribution.
- Until the files are added, the site falls back to
  [Noto Nastaliq Urdu](https://fonts.google.com/noto/specimen/Noto+Nastaliq+Urdu)
  (already loaded via `next/font` in `src/app/layout.tsx`), and browsers with
  Jameel Noori installed locally will use it via the `local()` sources.
- Recommended conversion for smaller downloads: convert the TTFs to WOFF2
  (e.g. with [fonttools](https://github.com/fonttools/fonttools)):
  `pyftsubset font.ttf --flavor=woff2 --output-file=font.woff2`
