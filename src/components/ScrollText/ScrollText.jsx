// ScrollText — overlay text that fades in/out based on scroll progress.
//
// Five text sections appear at different progress ranges:
//   1. "Hi, I'm Cursed Coder"      [0.00 – 0.20]  left
//   2. "Creative Development"      [0.15 – 0.40]  right
//   3. "Featured Projects"         [0.35 – 0.60]  left
//   4. "Design Meets Code"         [0.55 – 0.80]  right
//   5. "Let's Connect"             [0.75 – 1.00]  left
//
// Each item fades in over 8% of scroll range and fades out over 8%.
// The first item starts visible (fade-in from 0) and the last never fades
// out (stays visible at progress 1).
//
// Scroll-down indicator fades out within the first 10% of scroll.
// Scroll-up indicator appears at 90%+ to signal the user can scroll back.

import "./ScrollText.scss";

const texts = [
  {
    id: 1,
    side: "left",
    progressRange: [0, 0.2],
    title: "Hi, I'm Cursed Coder",
    subtitle: "Full-stack developer crafting immersive 3D web experiences",
  },
  {
    id: 2,
    side: "right",
    progressRange: [0.15, 0.4],
    title: "Creative Development",
    subtitle: "React · Three.js · GSAP · Next.js · TypeScript",
  },
  {
    id: 3,
    side: "left",
    progressRange: [0.35, 0.6],
    title: "Featured Projects",
    subtitle: "14 projects — 3D worlds, e-commerce, full-stack apps & more",
  },
  {
    id: 4,
    side: "right",
    progressRange: [0.55, 0.8],
    title: "Design Meets Code",
    subtitle: "From WebGL shaders to pixel-perfect UIs",
  },
  {
    id: 5,
    side: "left",
    progressRange: [0.75, 1],
    title: "Let's Connect",
    subtitle: "Open to collaborations & interesting ideas",
  },
];

export default function ScrollText({ progress }) {
  return (
    <div className="scroll-text">
      {/* Scroll-down indicator — centered, floating arrow that fades on scroll */}
      <div
        className="scroll-text__scroll-indicator scroll-text__scroll-indicator--down"
        style={{
          opacity: Math.max(0, Math.min(1, (0.1 - progress) / 0.08)),
        }}
      >
        <span className="scroll-text__scroll-label">scroll down</span>
        <span className="scroll-text__scroll-arrow">↓</span>
      </div>

      {/* Scroll-up indicator — appears near the end, fades as user scrolls back up */}
      <div
        className="scroll-text__scroll-indicator scroll-text__scroll-indicator--up"
        style={{
          opacity: Math.max(0, Math.min(1, (progress - 0.9) / 0.08)),
        }}
      >
        <span className="scroll-text__scroll-label">scroll up</span>
        <span className="scroll-text__scroll-arrow">↑</span>
      </div>

      {texts.map((item) => {
        const [start, end] = item.progressRange;
        const isVisible = progress >= start && progress <= end;
        // Fade in over 8% of scroll, fade out over 8%. Edge items at 0/1
        // skip the fade-in/-out respectively to stay visible at boundaries.
        const fadeProgress = Math.min(
          start === 0 ? 1 : (progress - start) / 0.08,
          1,
          end === 1 ? 1 : (end - progress) / 0.08
        );

        return (
          <div
            key={item.id}
            className={`scroll-text__item scroll-text__item--${item.side}`}
            style={{
              opacity: isVisible ? Math.max(0, Math.min(1, fadeProgress)) : 0,
              transform: `translateY(${isVisible ? "0px" : "40px"})`,
              pointerEvents: isVisible ? "auto" : "none",
            }}
          >
            <h2 className="scroll-text__title">{item.title}</h2>
            <p className="scroll-text__subtitle">{item.subtitle}</p>
          </div>
        );
      })}
    </div>
  );
}
