// Root component — orchestrates the entire experience.
//
// Flow:
//   1. LoadingScreen shows → user clicks "Enter" → isExperienceReady = true
//   2. Scroll event listener activates — reads window.scrollY, maps to 0–1 progress
//   3. progressRef (useRef) avoids React re-renders on every scroll tick
//   4. #scroll-container (7000vh) provides the scroll range
//   5. #canvas-wrapper is position:fixed covering the viewport — pointer-events:none
//      lets native scroll through; R3F eventSource on #root captures clicks
//   6. Modal blocks scroll progress updates while open (but native scroll still works)

import { useEffect, useRef } from "react";
import "./App.scss";
import Experience from "./Experience/Experience";
import Modal from "./components/Modal/Modal";
import LoadingScreen from "./components/LoadingScreen/LoadingScreen";
import NavBar from "./components/NavBar/NavBar";
import { useExperienceStore } from "./stores/experienceStore";
import { useModalStore } from "./stores/useModalStore";

function App() {
  const isExperienceReady = useExperienceStore((s) => s.isExperienceReady);
  const scrollProgressRef = useRef(0);

  // Prevent native scrolling while the loading screen is visible
  useEffect(() => {
    document.documentElement.classList.toggle("no-scroll", !isExperienceReady);
    return () => document.documentElement.classList.remove("no-scroll");
  }, [isExperienceReady]);

  useEffect(() => {
    if (!isExperienceReady) return;

    // Start at the top so the scene begins at progress 0
    window.scrollTo(0, 0);

    const handleScroll = () => {
      if (useModalStore.getState().isModalOpen) return;
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      if (maxScroll <= 0) return;
      scrollProgressRef.current = Math.max(
        0,
        Math.min(1, window.scrollY / maxScroll)
      );
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isExperienceReady]);

  return (
    <>
      <LoadingScreen />
      <Modal />
      <NavBar />
      {/* Tall invisible div that makes the page scrollable */}
      <div id="scroll-container" />
      {/* Fixed overlay that covers the viewport — the 3D canvas lives here */}
      <div id="canvas-wrapper">
        <Experience scrollProgressRef={scrollProgressRef} />
      </div>
    </>
  );
}

export default App;
