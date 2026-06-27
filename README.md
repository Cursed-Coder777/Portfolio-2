# Cursed Coder — 3D Portfolio

An immersive 3D portfolio built with React Three Fiber, Blender, and GSAP. Navigate a 3D museum world by scrolling — each section reveals projects, skills, and experience through cinematic camera transitions.

## Tech Stack

| Layer | Tech |
|---|---|
| 3D Engine | React Three Fiber (R3F) / Three.js |
| 3D Modeling | Blender (GLB + KTX2 textures) |
| Animation | GSAP, custom R3F useFrame lerps |
| State | Zustand |
| Audio | Howler.js |
| Styling | Sass (SCSS) |
| Build | Vite |
| Shaders | GLSL (vite-plugin-glsl) |

## Architecture

```
src/
├── main.jsx              # Entry point — mounts React into #root
├── App.jsx               # Root component: scroll tracking, DOM layout
├── App.scss              # Global layout: scroll-container, fixed canvas
├── Experience/
│   ├── Experience.jsx    # Wraps Canvas + ScrollText, mouse tracking
│   ├── Scene.jsx         # R3F scene: camera path, chunked loading, models
│   ├── models/           # 13 GLB model components (First–Eleventh, Bird, Background)
│   ├── components/       # Fire (shader), WaterFall (particles)
│   └── utils/            # Camera curve, bird path, KTX2 loader, converter
├── components/
│   ├── LoadingScreen/    # Animated overlay: loading bar → "Enter" button
│   ├── Modal/            # Info modal triggered by clicking 3D objects
│   └── ScrollText/       # Overlay text synchronized with scroll progress
├── stores/               # Zustand: experienceStore, useModalStore
├── data/                 # Modal content (about, projects, skills, experience, contact)
├── utils/                # Audio system (Howler), platform detector
└── styles/               # Reset, font-face (Eagle Lake)
```

## Flow

1. **Loading** — `LoadingScreen` shows progress bar as 3D assets load in 4 chunks. Once all chunks loaded + animation reaches 100%, "Enter" button appears.
2. **Enter** — User clicks "Enter". Loading screen slides away (top-half up, bottom-half down). Background music + ambience start. `isExperienceReady = true`.
3. **Scroll** — `App.jsx` listens for native `window.scroll`. Progress (0–1) is calculated from `scrollY / maxScroll`. Stored in a `useRef` to avoid React re-renders.
4. **3D Scene** — `Scene.jsx` reads `scrollProgressRef` in `useFrame`. Camera moves along a pre-baked CatmullRom curve. Camera group rotates via slerp between 11 rotation targets.
5. **Overlay Text** — `ScrollText` polls the same ref via a RAF loop. Five text sections fade in/out at different progress ranges. Scroll-down/up indicators.
6. **Interactions** — Clicking 3D objects (via raycasting) opens a `Modal` with info about the project/skill. GSAP handles click feedback animations.
7. **Audio** — Background music, ambience, and thump SFX play via Howler. Platform detector selects `.ogg` or `.mp3`.

## Getting Started

```bash
pnpm install
pnpm run dev
```

### Build

```bash
pnpm run build   # Outputs to dist/
pnpm run preview # Serve the build locally
```

### Lint

```bash
pnpm run lint
```

## Models

All 3D models are in `public/models/` as GLB with KTX2 textures (Basis Universal compression). Loaded via `useGLTFWithKTX2` which injects the KTX2 loader into Three.js's texture system.

## Scroll Speed

Scroll range is controlled by `#scroll-container` height in `src/App.scss`. Currently `7000vh` — larger = slower scroll. Adjust to taste.

## Credits

- Original Codrops fan museum concept and Blender scene
- Three.js, React Three Fiber ecosystem
- Blender community (PolyHaven, ambientCG for textures)
- Font: Eagle Lake (Google Fonts)
- SFX: Pixabay, Epidemic Sound

## License

MIT — see LICENSE.md
