# fonebazar — Image Map

Central source of truth for every image asset the site uses. Keep dimensions consistent across the catalogue so cards align without per-image overrides.

## Directory convention
```
public/images/
├── home/           # hero, ambient, story images
├── products/       # one per product, named `{productId}.jpg`
├── services/       # one pair per service: `{slug}-card.jpg`, `{slug}-hero.jpg`
├── about/          # story, studio, team
└── store/          # studio exterior, interior
public/logo/        # logo marks, favicon, og
```

## Recommended dimensions
| Surface             | Ratio | Width (px) | Height (px) |
|---------------------|-------|------------|-------------|
| Product card        | 1:1   | 800        | 800         |
| Service card        | 4:5   | 960        | 1200        |
| Service hero        | 16:9  | 1920       | 1080        |
| Home hero           | 16:9  | 2400       | 1350        |
| Home ambient        | 16:9  | 1920       | 1080        |
| About gallery       | 3:4   | 960        | 1280        |
| Store hero          | 16:9  | 1920       | 1080        |
| OG image            | 1.91:1| 1200       | 630         |
| Logo (horizontal)   | —     | SVG        | SVG         |

## Usage
- All references go through `lib/data/images/index.ts`.
- Never hardcode an image path inside a component.
- Use `getProductImage(id)` and `getServiceImage(slug, variant)` helpers.
- New assets: add them to `public/images/`, then map them in `lib/data/images/index.ts`.

## Format
- JPEG for photography. Quality 80–85.
- WebP for UI textures.
- SVG for logos and iconography.
- No PNG unless alpha is strictly required.
