// 3D Scene — the core R3F world.
//
// Flow:
//   1. LoadingManager reports loading state to experienceStore (for LoadingScreen)
//   2. useChunkedLoading staggers model rendering across 4 chunks so the page
//      doesn't freeze while all GLBs load simultaneously
//   3. useFrame runs every render tick:
//      a. Reads scrollProgressRef (0–1, no React overhead)
//      b. Gets a point on cameraCurve (CatmullRom spline) at that progress
//      c. Lerps cameraGroup position toward the spline point
//      d. Slerps cameraGroup rotation between rotationTargets
//      e. Applies mouse-derived offsets for parallax
//   4. Environment (cubemap) + fog create the atmospheric lighting
//   5. Models render inside Suspense boundaries; each chunk appears once
//      the previous chunk's GLBs finish loading

import { Suspense, useState, useRef, useEffect, useCallback } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";

import First from "./models/First";
import Second from "./models/Second";
import Third from "./models/Third";
import Fourth from "./models/Fourth";
import Fifth from "./models/Fifth";
import Sixth from "./models/Sixth";
import Seventh from "./models/Seventh";
import Eighth from "./models/Eighth";
import Ninth from "./models/Ninth";
import Tenth from "./models/Tenth";
import Eleventh from "./models/Eleventh";
import Bird from "./models/Bird";
import Background from "./models/Background";
import {
  cameraCurve,
  DebugCurve,
  rotationTargets,
} from "./utils/curve";
import Fire from "./components/Fire";
import WaterFall from "./components/WaterFall";
import { useExperienceStore } from "../stores/experienceStore";

// Reports when a Suspense boundary's models have loaded.
// Renders inside Suspense so it only mounts after all children resolve.
const ChunkTracker = ({ onLoaded }) => {
  useEffect(() => {
    onLoaded();
  }, [onLoaded]);
  return null;
};

const Scene = ({
  cameraGroup,
  camera,
  scrollProgressRef,
  mousePositionOffset,
  mouseRotationOffset,
}) => {
  const [pulseIntensity, setPulseIntensity] = useState(0);
  const [rotationBufferQuat] = useState(
    new THREE.Quaternion().setFromEuler(rotationTargets[0].rotation)
  );
  const timeRef = useRef(0);
  const progressRef = useRef(0);

  const [loadingStage, setLoadingStage] = useState(0);
  const incrementLoadedChunks = useExperienceStore((s) => s.incrementLoadedChunks);

  const handleChunkLoaded = useCallback(() => {
    setLoadingStage((prev) => prev + 1);
    incrementLoadedChunks();
  }, [incrementLoadedChunks]);

  // Interpolates rotation between two keyframes based on current progress.
  // rotationTargets is an array of { progress, rotation } from curve.jsx.
  const getLerpedRotation = (progress) => {
    for (let i = 0; i < rotationTargets.length - 1; i++) {
      const start = rotationTargets[i];
      const end = rotationTargets[i + 1];
      if (progress >= start.progress && progress <= end.progress) {
        const lerpFactor =
          (progress - start.progress) / (end.progress - start.progress);

        const startQuaternion = new THREE.Quaternion().setFromEuler(
          start.rotation
        );
        const endQuaternion = new THREE.Quaternion().setFromEuler(end.rotation);

        const lerpingQuaternion = new THREE.Quaternion();
        lerpingQuaternion.slerpQuaternions(
          startQuaternion,
          endQuaternion,
          lerpFactor
        );

        return lerpingQuaternion;
      }
    }

    return new THREE.Quaternion().setFromEuler(
      rotationTargets[rotationTargets.length - 1].rotation
    );
  };

  useFrame((state) => {
    if (camera) {
      // Clamp progress to [0, 1] — the scroll event already does this,
      // but this is a safety net for edge cases.
      const progress = Math.max(0, Math.min(1, scrollProgressRef.current));
      progressRef.current = progress;

      // Animate a pulse for the Ninth model's glow effect
      timeRef.current = state.clock.getElapsedTime();
      const newPulseIntensity = (Math.sin(state.clock.elapsedTime * 3) + 1) / 2;
      setPulseIntensity(newPulseIntensity);

      // Move cameraGroup along the pre-baked CatmullRom spline
      const basePoint = cameraCurve.getPoint(progress);

      cameraGroup.current.position.x = THREE.MathUtils.lerp(
        cameraGroup.current.position.x,
        basePoint.x,
        0.1
      );
      cameraGroup.current.position.y = THREE.MathUtils.lerp(
        cameraGroup.current.position.y,
        basePoint.y,
        0.1
      );
      cameraGroup.current.position.z = THREE.MathUtils.lerp(
        cameraGroup.current.position.z,
        basePoint.z,
        0.1
      );

      // Apply mouse-derived offset to the camera (not the group) for parallax
      camera.current.position.x = THREE.MathUtils.lerp(
        camera.current.position.x,
        mousePositionOffset.current.x,
        0.1
      );
      camera.current.position.y = THREE.MathUtils.lerp(
        camera.current.position.y,
        -mousePositionOffset.current.y,
        0.1
      );
      camera.current.position.z = 0;

      const targetRotation = getLerpedRotation(progress);

      // Smoothly slerp the camera group rotation
      rotationBufferQuat.slerp(targetRotation, 0.05);

      cameraGroup.current.quaternion.copy(rotationBufferQuat);

      // Slight camera rotation from mouse (independent of group rotation)
      camera.current.rotation.x = THREE.MathUtils.lerp(
        camera.current.rotation.x,
        -mouseRotationOffset.current.x,
        0.1
      );
      camera.current.rotation.y = THREE.MathUtils.lerp(
        camera.current.rotation.y,
        -mouseRotationOffset.current.y,
        0.1
      );
    }
  });

  return (
    <>
      <Environment
        background={true}
        backgroundRotation={[0, Math.PI / 2, 0]}
        files={[
          "/cubemap/px.webp",
          "/cubemap/nx.webp",
          "/cubemap/py.webp",
          "/cubemap/ny.webp",
          "/cubemap/pz.webp",
          "/cubemap/nz.webp",
        ]}
      />
      <fogExp2 attach="fog" color="#403e3e" density={0.0125} />
      {/* Uncomment below to visualize the camera path during development */}
      {/* <DebugCurve curve={cameraCurve} /> */}

      {/* Chunk 0 — always renders */}
      <Suspense fallback={null}>
        <ChunkTracker onLoaded={handleChunkLoaded} />
        <First />
        <Second />
        <Background />
      </Suspense>

      {/* Chunk 1 — renders after chunk 0 loads */}
      {loadingStage >= 1 && (
        <Suspense fallback={null}>
          <ChunkTracker onLoaded={handleChunkLoaded} />
          <Third />
          <Fourth />
          <Fifth />
        </Suspense>
      )}

      {/* Chunk 2 */}
      {loadingStage >= 2 && (
        <Suspense fallback={null}>
          <ChunkTracker onLoaded={handleChunkLoaded} />
          <Sixth />
          <Seventh />
          <Eighth time={timeRef.current} />
        </Suspense>
      )}

      {/* Chunk 3 — animated models, fire shader, waterfall particles */}
      {loadingStage >= 3 && (
        <Suspense fallback={null}>
          <ChunkTracker onLoaded={handleChunkLoaded} />
          <Ninth progress={progressRef.current} pulseIntensity={pulseIntensity} />
          <Tenth />
          <Eleventh />
          <Bird time={timeRef.current} position={[-20, 40, -45]} scale={0.02} />
          <Fire time={timeRef.current} />
          <WaterFall time={timeRef.current} />
        </Suspense>
      )}
    </>
  );
};

export default Scene;
