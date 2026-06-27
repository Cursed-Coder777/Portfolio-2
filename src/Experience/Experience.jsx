// Experience container — renders the R3F Canvas and overlay ScrollText.
//
// Responsible for:
//   - Polling scrollProgressRef via RAF to sync ScrollText opacity (React state)
//   - Tracking mouse position for subtle camera offset/rotation (parallax)
//   - Passing refs down to Scene.jsx for direct read in useFrame (no re-renders)
//
// The Canvas uses eventSource={document.getElementById("root")} so pointer
// events bubble past the fixed wrapper and are captured by R3F's event system.

import React, { useRef, useEffect, useState } from "react";
import Scene from "./Scene";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import { PerspectiveCamera } from "@react-three/drei";
import ScrollText from "../components/ScrollText/ScrollText";

const Experience = ({ scrollProgressRef }) => {
  const camera = useRef();
  const cameraGroup = useRef();
  const mousePositionOffset = useRef(new THREE.Vector3());
  const mouseRotationOffset = useRef(new THREE.Euler());
  const [scrollProgress, setScrollProgress] = useState(0);

  // Poll scrollProgressRef on every frame — only update React state when
  // the value actually changes (bail-out optimization).
  useEffect(() => {
    let rafId;
    const update = () => {
      const next = scrollProgressRef.current;
      setScrollProgress((prev) => (Math.abs(prev - next) > 0.001 ? next : prev));
      rafId = requestAnimationFrame(update);
    };
    rafId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(rafId);
  }, [scrollProgressRef]);

  // Track mouse for parallax camera offset + slight rotation
  useEffect(() => {
    const handleMouseMove = (e) => {
      const mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      const mouseY = (e.clientY / window.innerHeight) * 2 - 1;

      const sensitivityX = 0.25;
      const sensitivityY = 0.25;

      const rotationSensitivityX = 0.1;
      const rotationSensitivityY = 0.1;

      mousePositionOffset.current.x = mouseX * sensitivityX;
      mousePositionOffset.current.y = mouseY * sensitivityY;

      mouseRotationOffset.current.x = mouseY * rotationSensitivityX;
      mouseRotationOffset.current.y = mouseX * rotationSensitivityY;
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <>
      <ScrollText progress={scrollProgress} />
      <Canvas eventSource={document.getElementById("root")}>
        <group ref={cameraGroup}>
          <PerspectiveCamera ref={camera} fov={72} makeDefault />
        </group>
        <Scene
          cameraGroup={cameraGroup}
          camera={camera}
          scrollProgressRef={scrollProgressRef}
          mousePositionOffset={mousePositionOffset}
          mouseRotationOffset={mouseRotationOffset}
        />
      </Canvas>
    </>
  );
};

export default Experience;
