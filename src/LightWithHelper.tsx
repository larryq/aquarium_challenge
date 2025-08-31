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

  useHelper(spotLightRef as any, SpotLightHelper, "hotpink");

  return (
    <spotLight
      ref={spotLightRef}
      position={[0, 50, 0]}
      angle={0.5}
      penumbra={1}
      intensity={22}
      castShadow
      target={target}
      shadow-mapSize-width={1024}
      shadow-mapSize-height={1024}
      shadow-camera-near={0.5}
      shadow-camera-far={200} // <--- Increase this value
      // shadow-camera-fov={30}
    />
  );
}
