# Cursed Coder — Portfolio

## Project Goal
Immersive 3D portfolio website. User scrolls through a Blender-modeled 3D museum world. Camera follows a spline path. Clicking objects opens modals with project/skill info.

## Architecture
- **Entry**: `main.jsx` → `App.jsx`
- **3D**: `Experience/Experience.jsx` wraps R3F `<Canvas>` and `ScrollText`. `Scene.jsx` loads models on a camera curve.
- **Loading**: `LoadingScreen.jsx` — shows progress, user clicks "Enter" to start.
- **Overlay**: `ScrollText.jsx` — 5 text sections that fade by scroll progress.
- **Modals**: `Modal.jsx` — appears on mesh click, content from `data/modalContent.js`.
- **State**: `experienceStore.js` (loading/ready/chunks), `useModalStore.jsx` (open/id).
- **Scroll**: Native `window.scroll` event → `scrollProgressRef` (0–1). Range = `7000vh` via `#scroll-container`.
- **Audio**: `audioSystem.js` (Howler) — music, ambience, SFX.
- **Build**: Vite + React + Sass.

## Key Patterns
- `scrollProgressRef` (useRef) avoids React re-renders on every scroll tick. `Scene.useFrame` reads it directly. `ScrollText` polls it via RAF.
- Models loaded in 4 chunks via `useChunkedLoading` for staggered asset loading.
- Camera moves along `cameraCurve` (CatmullRom) with slerped rotation targets.
- `eventSource={document.getElementById("root")}` on Canvas for pointer events through fixed wrapper.
- `pointer-events: none` on canvas wrapper; restored on direct children via `> * { pointer-events: auto }`.

## Conventions
- SCSS modules/BEM naming (`.component__element--modifier`)
- Zustand for global state
- GLB + KTX2 textures for models
- Use pnpm, not npm/yarn

## Build Commands
- `pnpm run dev` — dev server
- `pnpm run build` — production build
- `pnpm run lint` — ESLint
- `pnpm run preview` — serve built output

## Notes
- ios audio needs `html5: true` in Howler config (Apple policy).
- Platform detector selects `.ogg` (non-Apple) vs `.mp3` (Apple).
