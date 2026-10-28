// Loading screen — the first thing the user sees.
//
// Flow:
//   1. The bar animates quickly to 20%, then advances only as real chunks of
//      the 3D scene finish loading (20% → 100%). It never claims to be almost
//      finished while nothing has loaded.
//   2. Once all 4 chunks are loaded, an "Enter" button appears.
//   3. If assets are still loading after 15 seconds, the user can continue
//      anyway (the scene keeps streaming in) or jump to the project archive.
//      This guarantees the page can never be trapped on the loading screen.
//   4. User clicks "Enter" → isRevealed = true:
//      - Top half slides up (translateY(-100%))
//      - Bottom half slides down (translateY(100%))
//      - Background music + ambience start playing
//      - isExperienceReady = true (enables the scroll listener)
//   5. After the CSS transition ends (or a 2s fallback), it unmounts.

import { useState, useEffect } from "react";
import "./LoadingScreen.scss";
import { playBackgroundMusic, playSound } from "../../utils/audioSystem.js";
import { useExperienceStore } from "../../stores/experienceStore.js";

const SLOW_LOAD_TIMEOUT_MS = 15000;
const QUICK_PROGRESS_TARGET = 20;

const LoadingScreen = () => {
  const [isRevealed, setIsRevealed] = useState(false);
  const [isAnimationFinished, setIsAnimationFinished] = useState(false);
  const [quickProgress, setQuickProgress] = useState(0);
  const [isSlowLoading, setIsSlowLoading] = useState(false);

  const { setIsExperienceReady, loadedChunks, totalChunks } =
    useExperienceStore();

  // Fast initial movement so the screen feels responsive, then real progress
  // takes over. The old implementation jumped straight to 80% and could sit
  // there forever while 29 MB of models were still downloading.
  const realRatio = totalChunks > 0 ? loadedChunks / totalChunks : 1;
  const loadingProgress = Math.round(
    Math.min(
      100,
      quickProgress + realRatio * (100 - QUICK_PROGRESS_TARGET)
    )
  );
  const isLoading = loadedChunks < totalChunks;
  const isReadyToEnter = !isLoading && loadingProgress >= 100;

  // Quick-start animation: ease-out cubic over 700ms, 0 → 20.
  useEffect(() => {
    const start = performance.now();
    const DURATION = 700;
    let raf;
    const tick = (now) => {
      const t = Math.min(1, (now - start) / DURATION);
      const eased = 1 - Math.pow(1 - t, 3);
      setQuickProgress(eased * QUICK_PROGRESS_TARGET);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  // Offer an escape hatch instead of leaving the visitor on a frozen bar.
  useEffect(() => {
    if (isRevealed || isReadyToEnter) return undefined;

    const timer = window.setTimeout(
      () => setIsSlowLoading(true),
      SLOW_LOAD_TIMEOUT_MS
    );
    return () => window.clearTimeout(timer);
  }, [isRevealed, isReadyToEnter]);

  const handleReveal = () => {
    setIsRevealed(true);
    playBackgroundMusic();
    playSound("backgroundAmbience");
    playSound("thumpHover");
    setIsExperienceReady();
  };

  // Fires after the CSS slide transition completes (500ms delay + 1s
  // transition). The timer below is a safety net for reduced-motion or a
  // missed transition event, which would otherwise leave the overlay forever.
  const handleAnimationFinished = () => {
    setIsAnimationFinished(true);
  };

  useEffect(() => {
    if (!isRevealed) return undefined;
    const timer = window.setTimeout(() => setIsAnimationFinished(true), 2000);
    return () => window.clearTimeout(timer);
  }, [isRevealed]);

  if (isAnimationFinished) {
    return null;
  }

  const showEnterButton = isReadyToEnter && !isRevealed;
  const showContinueButton = isSlowLoading && !isReadyToEnter && !isRevealed;
  const showProgress = !isRevealed && !showEnterButton;

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

          {showProgress && (
            <div className="loading-screen__progress">
              <div
                className="loading-bar-container"
                role="progressbar"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={loadingProgress}
                aria-label="Loading 3D portfolio"
              >
                <div
                  className="loading-bar"
                  style={{ width: `${loadingProgress}%` }}
                ></div>
              </div>
              <div className="percentage" aria-live="polite">
                {loadingProgress}%
              </div>
              <div className="loading-screen__status">
                Loading 3D world · {Math.min(loadedChunks, totalChunks)}/
                {totalChunks} sections
              </div>
              <div className="loading-spinner" aria-hidden="true"></div>
            </div>
          )}

          {showContinueButton && (
            <div className="loading-screen__slow" role="status">
              <p className="loading-screen__slow-message">
                The 3D scene is taking longer than expected. You can continue
                while the remaining models finish loading.
              </p>
              <div className="loading-screen__slow-actions">
                <button
                  type="button"
                  className="loading-screen-button"
                  onClick={handleReveal}
                >
                  Continue anyway
                </button>
                <a className="loading-screen__projects-link" href="/projects">
                  View projects
                </a>
              </div>
            </div>
          )}

          {showEnterButton && (
            <button
              type="button"
              className="loading-screen-button"
              onClick={handleReveal}
            >
              &nbsp; &nbsp; &nbsp; Enter &nbsp; &nbsp; &nbsp;
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default LoadingScreen;
