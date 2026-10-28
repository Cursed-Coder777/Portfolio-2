// Hook that loads GLB models with self-hosted DRACO + KTX2 decoders.
//
// Decoder files live in /public/draco and /public/basis. Keeping them on the
// same origin removes a hard dependency on Google's CDN (drei's useGLTF
// defaults to gstatic for DRACO), which is a common way for the 3D scene to
// fail behind firewalls, ad blockers, or restrictive networks.

import { useGLTF } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { DRACOLoader, KTX2Loader } from "three-stdlib";

const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath("/draco/");

const ktx2Loader = new KTX2Loader();
ktx2Loader.setTranscoderPath("/basis/");

export function useGLTFWithKTX2(path) {
  const { gl } = useThree();

  return useGLTF(path, false, false, (loader) => {
    loader.setDRACOLoader(dracoLoader);
    loader.setKTX2Loader(ktx2Loader.detectSupport(gl));
  });
}
