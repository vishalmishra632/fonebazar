# Third-party notices

This project includes third-party assets bundled in `/public/`. Licensing and credit:

## 3D models

### `public/models/tshirt.glb`

- **Source:** [Starklord17/threejs-t-shirt](https://github.com/Starklord17/threejs-t-shirt)
- **License:** MIT
- **Used in:** Homepage hero — `components/three/scenes/TshirtsHeroScene.tsx`. Also reused in the `SpecimenStrip` section under `components/home/SpecimenStrip.tsx`.
- **Notes:** Marvelous-Designer-sculpted short-sleeve cotton tee, ~20k tris, baked normal + ambient occlusion maps. Body colour and material are overridden at runtime via `meshPhysicalMaterial`; the original baked maps drive cloth-fold realism.

### `public/models/printer.glb`

- **Source:** [Ultimaker 3 by Brian Yu on Poly Pizza](https://poly.pizza/m/9E_ItHeURbb)
- **License:** CC-BY 3.0
- **Attribution required:** "Ultimaker 3 by Brian Yu via Poly Pizza"
- **Used in:** `SpecimenStrip` — 3D Printing tile.
- **Notes:** Stylized desktop FDM printer silhouette, 39 sub-meshes, ~1.2k tris. Source materials preserved at render time (multi-mesh colours read better than a uniform recolour).

### `public/models/resin-bottle.glb`

- **Source:** [Bottle of glue by Poly by Google on Poly Pizza](https://poly.pizza/m/cwOFfXzW2Y3)
- **License:** CC-BY 3.0
- **Attribution required:** "Bottle of glue by Poly by Google via Poly Pizza"
- **Used in:** `SpecimenStrip` — Resin Art tile.
- **Notes:** Reads as a bottle of liquid epoxy/resin — amber liquid, squat shape, sealed cap. ~16k tris.

## Fonts

### `public/fonts/Satoshi-Variable.woff2`, `public/fonts/Satoshi-VariableItalic.woff2`

- **Source:** [Fontshare — Satoshi by Indian Type Foundry](https://www.fontshare.com/fonts/satoshi)
- **License:** ITF Free Font Licence (free for commercial use)
