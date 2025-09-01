/* eslint-disable @typescript-eslint/no-explicit-any */
// src/LightWithHelper.tsx
import { useRef } from "react";
import { useHelper } from "@react-three/drei";
import { SpotLightHelper, SpotLight, Object3D } from "three";

// Define the types for the props
interface LightWithHelperProps {
  target: Object3D;
}

// Use the interface to type the component's props
export function LightWithHelper({ target }: LightWithHelperProps) {
  const spotLightRef = useRef<SpotLight | null>(null);

  return (
    <spotLight
      ref={spotLightRef}
      position={[0, 50, 0]}
      angle={0.8}
      penumbra={1}
      intensity={2}
      target={target}
    />
  );
}
