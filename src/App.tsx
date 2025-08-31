/* eslint-disable @typescript-eslint/no-unused-vars */
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { tankAndFish as TankAndFish } from "./tankAndFish";

function App() {
  return (
    <Canvas camera={{ position: [0, 0, 10] }}>
      {/* Your 3D objects and components will go here */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1.5} castShadow />
      <OrbitControls />
      <TankAndFish position={[0, 0, 0]} />
    </Canvas>
  );
}

export default App;
