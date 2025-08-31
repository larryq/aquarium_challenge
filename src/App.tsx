/* eslint-disable @typescript-eslint/no-unused-vars */
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useHelper } from "@react-three/drei";
import { tankAndFish as TankAndFish } from "./tankAndFish";
import { SpotLightHelper } from "three";
import { useRef } from "react";
import { Object3D } from "three";
import { LightWithHelper } from "./LightWithHelper"; // Import the new component

function App() {
  const target = useRef(new Object3D()).current;
  target.position.set(0, 0, 0); // This sets the target to the center of the scene.
  const spotLightRef = useRef<Object3D>(new Object3D());

  // Use the useHelper hook to attach a helper to the spotlight
  //useHelper(spotLightRef, SpotLightHelper, "hotpink");
  return (
    <Canvas camera={{ position: [0, 4, 10] }}>
      {/* Your 3D objects and components will go here */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1.5} castShadow />
      {/* Fill Light: A softer light from the front-left to reduce shadows */}
      <directionalLight position={[-10, 5, 10]} intensity={0.8} />

      {/* Rim Light: A spotlight from behind and above for a "rim" effect */}
      {/* <spotLight
        ref={spotLightRef}
        position={[0, 15, -10]}
        //angle={0.3}
        penumbra={1}
        intensity={2}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        target={target}
      /> */}
      <LightWithHelper target={target} />
      <OrbitControls />
      <TankAndFish position={[0, 0, 0]} />
    </Canvas>
  );
}

export default App;
