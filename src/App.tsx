/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Canvas,
  type EventHandlers,
  type InstanceProps,
  type MathProps,
  type ReactProps,
} from "@react-three/fiber";
import { Environment, OrbitControls, useVideoTexture } from "@react-three/drei";
import { tankAndFish as TankAndFish } from "./tankAndFish";
import { useRef } from "react";
import { LightWithHelper } from "./LightWithHelper";
import { Object3D, SpotLight } from "three";
import type {
  Mutable,
  Overwrite,
} from "@react-three/fiber/dist/declarations/src/core/utils";
import type { JSX } from "react/jsx-runtime";
import {
  EffectComposer,
  Bloom,
  ToneMapping,
  WaterEffect,
} from "@react-three/postprocessing";
import { Bubbles } from "./Bubbles";
// Import other postprocessing effects from "@react-three/postprocessing" as needed
function App() {
  const modelRef = useRef(null);
  const target = useRef(new Object3D()).current;
  target.position.set(0, 0, 0);

  function Caustics(
    props: JSX.IntrinsicAttributes &
      Mutable<
        Overwrite<
          Partial<
            Overwrite<
              SpotLight,
              MathProps<SpotLight> &
                ReactProps<SpotLight> &
                Partial<EventHandlers>
            >
          >,
          Omit<InstanceProps<SpotLight, SpotLight>, "object">
        >
      >
  ) {
    const texture = useVideoTexture("/caustics.mp4");
    const spotLightRef = useRef<SpotLight>(null);

    return (
      <primitive
        object={new SpotLight()}
        ref={spotLightRef}
        decay={0.2}
        castShadow
        {...props}
        // @ts-ignore
        map={texture}
      />
    );
  }

  // Example Postpro function using @react-three/postprocessing components

  function Postpro() {
    return (
      <EffectComposer>
        {/* Add postprocessing effects here, e.g.: */}
        {/* <HueSaturation saturation={-1} /> */}
        {/* <BrightnessContrast brightness={0} contrast={0.25} /> */}
        <WaterEffect factor={0.75} />
        {/* <TiltShift2 samples={6} blur={0.5} /> */}
        <Bloom mipmapBlur luminanceThreshold={0} intensity={3} />
        <ToneMapping />
      </EffectComposer>
    );
  }

  return (
    <Canvas
      camera={{ position: [35, 30, 0] }}
      style={{ background: "#000" }} // A solid black background>
      shadows={true}
    >
      <Environment preset="night" />
      {/* Your 3D objects and components will go here */}
      {/* Ambient Light for overall scene brightness */}
      <ambientLight intensity={0.5} />

      <Caustics
        distance={100}
        intensity={13}
        angle={1.9}
        penumbra={1}
        position={[0, 40, 0]}
        args={[]}
      />

      {/* Key Light for main illumination and shadows */}
      <directionalLight
        position={[10, 20, 10]}
        intensity={1.5}
        // castShadow
        // shadow-mapSize-width={2048} // <-- Increased resolution
        // shadow-mapSize-height={2048} // <-- Increased resolution
        // shadow-camera-left={-20} // <-- Adjusted clipping planes
        // shadow-camera-right={20}
        // shadow-camera-top={20}
        // shadow-camera-bottom={-20}
        // shadow-camera-near={0.1}
        // shadow-camera-far={50} // <-- Set a generous far distance
      />
      {/* Fill Light to soften shadows */}
      <directionalLight position={[-10, 5, 10]} intensity={0.8} />

      {/* Spotlight with its helper, targeting the center of the scene */}
      <LightWithHelper target={target} />

      {/* The main model, receiving the ref for shadow-casting logic */}
      <TankAndFish ref={modelRef} />
      {/* A floor mesh to receive shadows and provide a ground plane */}
      <mesh
        receiveShadow
        position={[0, -2.5, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <planeGeometry args={[200, 200]} />
        <meshStandardMaterial color="pink" />
      </mesh>
      <Bubbles position={[5, -1, 5]} topBoundary={8} />
      <OrbitControls
        autoRotate
        autoRotateSpeed={1.7}
        enableZoom={true}
        minPolarAngle={0}
        maxPolarAngle={Math.PI / 2.5}
      />
    </Canvas>
  );
}

export default App;
