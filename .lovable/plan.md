1. Upload `Pylon_1.png` to Lovable Assets and create `src/assets/pylon.png.asset.json`.
2. Extend `BrandDefinition` in `src/lib/brands.ts` with optional `aboutImage` and `aboutAlt` fields.
3. Set Edison Lux's `aboutImage` to the new pylon asset URL and give it a descriptive `aboutAlt`.
4. In `src/routes/brands.$brand.index.tsx`, update the about-section image to use `b.aboutImage ?? b.heroImage` and `b.aboutAlt ?? b.heroAlt`, applying the `grayscale` filter only when no dedicated `aboutImage` exists so the pylon image renders in full color.
5. Run the TypeScript check and verify the Edison Lux page preview shows the new pylon image in color.