// Animated eagle following a spline path with skeleton animation and KTX2 textures.
import { useMemo, useEffect, useRef } from "react";
import { useFrame, useGraph } from "@react-three/fiber";
import { SkeletonUtils } from "three-stdlib";
import { useGLTFWithKTX2 } from "../utils/useGLTFWithKTX2";
import { useAnimations } from "@react-three/drei";

import { convertMaterialsToBasic } from "../utils/convertToBasic";
import { createBirdPath, getBirdPosition } from "../utils/birdPath";

export default function Bird({ speed = 0.01, ...props }) {
  const group = useRef();
  const { scene, animations } = useGLTFWithKTX2("/models/Bird.glb");
  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const { nodes, materials } = useGraph(clone);
  const { actions } = useAnimations(animations, group);

  const newMaterials = useMemo(
    () => convertMaterialsToBasic(materials),
    [materials]
  );

  const birdPath = useMemo(() => createBirdPath(), []);

  useEffect(() => {
    if (actions) {
      Object.values(actions).forEach((action) => {
        action.play();
      });
    }
  }, [actions]);

  // The mixer advances on its own; the flight path just needs the clock.
  useFrame((state) => {
    if (!group.current) return;
    group.current.position.copy(
      getBirdPosition(birdPath, state.clock.elapsedTime, speed)
    );
  });

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="Lol_what_even_is_this" rotation={[0, 0, 0]}>
          <group name="Eagle" rotation={[0, 0, 0]}>
            <primitive object={nodes._rootJoint} />
            <group name="White_Eagle" />
            <skinnedMesh
              name="Object_7_Baked"
              geometry={nodes.Object_7_Baked.geometry}
              material={newMaterials.Bird_Real_Baked}
              skeleton={nodes.Object_7_Baked.skeleton}
            />
          </group>
        </group>
      </group>
    </group>
  );
}
