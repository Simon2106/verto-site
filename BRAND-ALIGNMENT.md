# Brand Alignment — Changes from the Lovable Concept

All changes align the three sub-brand sections to the official brand guidelines (Brand guidelines folder). Verto Group parent pages are untouched. Layout and page structure are as the marketeer designed; colours, typography and brand character are now to spec.

## Files changed

- `src/styles.css` — the three `[data-brand]` theme blocks rewritten to guideline values
- `src/routes/__root.tsx` — Google Fonts link now loads Jost, Saira, JetBrains Mono; Montserrat gains Light 300
- `src/components/site/InsightThumb.tsx` — hardcoded brand accents replaced with guideline hexes
- `src/routes/index.tsx` — home page sector-list accents replaced with guideline hexes

## Edison Lux

- Display font: Sora (heavy, uppercase) → **Jost, Light 300 headlines, Medium 500 emphasis**, no uppercase — "refined geometry"
- Palette: Navy `#0B1A2B` ground, Cloud `#EFF3F7`, Slate `#64748B` neutrals
- Gradient: 3-stop green/teal/blue → **exact 2-stop `linear-gradient(90°, #3CC739, #2B8EE5)`**, always green→blue, never reversed
- Contrast rule enforced: Energy Green is decorative-only on white — text/UI accents on light use Electric Blue `#2B8EE5`
- Heavy utility weights (`font-extrabold` etc.) capped at Medium within Edison scope

## Vertek

- Display font: Sora → **Saira SemiBold 600, uppercase** headlines — squared, technical
- Labels/eyebrows: **JetBrains Mono** per the spec (specs/metadata character)
- Palette: generic dark + crimson → **Graphite `#15171C`, Signal Red `#F82B60`, Silver `#DBDBDB`, Steel `#8A9099`**
- Red kept as a signal, not a field; buttons squared, uppercase Saira

## ModulR Global

- Display font: **Montserrat — Light 300 / Regular 400 headlines, SemiBold 600 emphasis, tight tracking** (Inter body)
- Palette: generic dark blue → **Deep Navy `#000A3B`, Royal Blue `#0464FA`**, Mist `#F5F6F8`
- Monogram gradient `#0464FA → #00269D` used on primary buttons and hero vignette
- Contrast rule enforced: royal blue on navy is large-display only (3.8:1) — small labels use a lightened royal-blue tint

## Notes

- Pre-existing TypeScript warnings in Lovable's supabase/auth boilerplate were there before these changes and don't affect the build.
- All images/logos are now local files in src/assets (no Lovable hosting dependency). The 7 largest PNGs were converted to WebP (11.2MB -> ~1MB, transparency preserved). Original Lovable pointer files are archived in _unused-lovable-pointers/ and can be deleted.
- `npm install && npm run dev` to run locally (Vite 8 / TanStack Start).
