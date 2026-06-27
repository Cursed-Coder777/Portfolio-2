// Loading screen — the first thing the user sees.
//
// Flow:
//   1. Shows a progress bar driven by loadedChunks / totalChunks from store.
//      The percentage animates smoothly (not a jump) via a RAF loop.
//   2. Once all 4 chunks are loaded AND the animation ticks to 100%,
//      an "Enter" button appears (no jump — user sees 100 → button).
//   3. User clicks "Enter" → isRevealed = true:
//      - Top half slides up (translateY(-100%))
//      - Bottom half slides down (translateY(100%))
//      - Background music + ambience start playing
//      - isExperienceReady = true (enables scroll listener + Lenis)
//   4. After the CSS transition ends, the component returns null (unmounts).

import { useState, useEffect, useRef } from "react";
import "./LoadingScreen.scss";
import { playBackgroundMusic, playSound } from "../../utils/audioSystem.js";
import { useExperienceStore } from "../../stores/experienceStore.js";

const LoadingScreen = () => {
  const [isRevealed, setIsRevealed] = useState(false);
  const [isAnimationFinished, setIsAnimationFinished] = useState(false);
  const [displayedProgress, setDisplayedProgress] = useState(0);
  const [hasCompletedAnimation, setHasCompletedAnimation] = useState(false);
  const [quickProgress, setQuickProgress] = useState(0);
  const animationRef = useRef(null);

  const { setIsExperienceReady, loadedChunks, totalChunks } =
    useExperienceStore();

  // Fake progress: rushes 0 → 80 in ~700ms so the bar feels snappy.
  // The real chunk progress (0–100%) is mapped to the remaining 80–100%
  // range, so the final stretch waits on actual asset loading.
  const realRatio = loadedChunks / totalChunks;
  const loadingProgress = Math.round(
    Math.min(100, quickProgress + realRatio * 20)
  );
  const isLoading = loadedChunks < totalChunks;

  // Quick-start animation: ease-out cubic over 700ms, 0 → 80
  useEffect(() => {
    const start = performance.now();
    const DURATION = 700;
    let raf;
    const tick = (now) => {
      const t = Math.min(1, (now - start) / DURATION);
      const eased = 1 - Math.pow(1 - t, 3); // ease-out cubic
      setQuickProgress(eased * 80);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  // Smoothly animate the displayed percentage toward the blended target.
  // Using RAF with a step function gives a nice easing effect.
  useEffect(() => {
    if (loadingProgress <= displayedProgress) {
      if (loadingProgress >= 100) {
        setHasCompletedAnimation(true);
      }
      return;
    }

    const animate = () => {
      setDisplayedProgress((prev) => {
        if (prev >= loadingProgress) {
          if (loadingProgress >= 100) {
            setHasCompletedAnimation(true);
          }
          return loadingProgress;
        }
        const step = Math.max(1, Math.ceil((loadingProgress - prev) * 0.1));
        const next = Math.min(loadingProgress, prev + step);
        animationRef.current = requestAnimationFrame(animate);
        return next;
      });
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [loadingProgress]);

  const handleReveal = () => {
    setIsRevealed(true);
    playBackgroundMusic();
    playSound("backgroundAmbience");
    playSound("thumpHover");
    setIsExperienceReady();
  };

  // Fires after the CSS slide transition completes (500ms delay + 1s transition)
  const handleAnimationFinished = () => {
    setIsAnimationFinished(true);
  };

  if (isAnimationFinished) {
    return null;
  }

  // Only show the Enter button when:
  //   - All chunks are loaded
  //   - The progress animation has visually reached 100
  //   - The screen hasn't been revealed yet
  // This avoids a jarring jump from e.g. 80% → Enter button.
  const showEnterButton =
    !isLoading &&
    loadedChunks >= totalChunks &&
    hasCompletedAnimation &&
    !isRevealed;

  return (
    <>
      <div className="loading-screen">
        <div
          className={`background-top-half ${isRevealed ? "revealed" : ""}`}
          onTransitionEnd={handleAnimationFinished}
        ></div>
        <div
          className={`background-bottom-half ${isRevealed ? "revealed" : ""}`}
        ></div>
        <div className="loading-screen-info-container">
          <div
            className={`instructions-container ${isRevealed ? "revealed" : ""}`}
          >
            Scroll or Drag to Explore
          </div>

          {!isRevealed && !showEnterButton && (
            <div className="loading-bar-container">
              <div
                className="loading-bar"
                style={{ width: `${Math.min(displayedProgress, 100)}%` }}
              ></div>
              <div className="percentage">
                {Math.min(displayedProgress, 100)}%
              </div>
              <div className="loading-spinner"></div>
            </div>
          )}

          {showEnterButton && (
            <button className="loading-screen-button" onClick={handleReveal}>
              &nbsp; &nbsp; &nbsp; Enter &nbsp; &nbsp; &nbsp;
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default LoadingScreen;
