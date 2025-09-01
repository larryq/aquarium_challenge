import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

interface BubblesProps {
  position: [number, number, number];
  topBoundary: number;
}
// Define the type for the Points component's ref
type PointsRef = THREE.Points & {
  geometry: THREE.BufferGeometry & {
    attributes: {
      position: THREE.BufferAttribute;
    };
  };
};

export function Bubbles({ position, topBoundary }: BubblesProps) {
  const pointsRef = useRef<PointsRef>(null);
  const count = 500;
  //const positions = new Float32Array(count * 3);
  const bubbleSpread = 20;
  const bubbleSpeed = 0.06;
  const bubbleSize = 0.2;
  const bubbleHeight = 10;
  const bubbleDrift = 0.1;
  const xAxisSpread = 3;
  const zAxisSpread = 3;

  // Use useMemo to prevent re-creating positions and vanishHeights on every render
  const { positions, vanishHeights } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const vanishHeights = new Float32Array(count); // An array to store unique vanish heights
    const vanishingRange = 2; // Range above the topBoundary where bubbles will vanish
    for (let i = 0; i < count; i++) {
      // Set initial positions
      positions[i * 3 + 0] = (Math.random() - 0.5) * xAxisSpread + position[0]; // X-axis spread
      positions[i * 3 + 1] = Math.random() * 10 - 5 + position[1];
      positions[i * 3 + 2] = (Math.random() - 0.5) * zAxisSpread + position[2]; // Z-axis spread

      // Assign a unique vanish height to each bubble
      vanishHeights[i] = topBoundary + (Math.random() - 0.5) * vanishingRange; // +/- vanishingRange unit /2 from topBoundary
    }
    return { positions, vanishHeights };
  }, [position, topBoundary]);

  // Set initial random positions for the bubbles
  //   for (let i = 0; i < count; i++) {
  //     positions[i * 3 + 0] = (Math.random() - 0.5) * bubbleSpread;
  //     positions[i * 3 + 1] = (Math.random() - 0.5) * bubbleSpread;
  //     positions[i * 3 + 2] = (Math.random() - 0.5) * bubbleSpread;
  //   }
  //   for (let i = 0; i < count; i++) {
  //     // Increased the multiplier from 1 to 3 for wider spread
  //     positions[i * 3 + 0] = (Math.random() - 0.5) * xAxisSpread + position[0]; // X-axis spread
  //     positions[i * 3 + 1] = Math.random() * 10 - 5 + position[1]; // Y-axis spread
  //     // Increased the multiplier from 1 to 3 for wider spread
  //     positions[i * 3 + 2] = (Math.random() - 0.5) * zAxisSpread + position[2]; // Z-axis spread
  //   }
  useFrame(() => {
    if (pointsRef.current) {
      const newPositions = pointsRef.current.geometry.attributes.position.array;
      for (let i = 0; i < newPositions.length; i += 3) {
        // // Small random change to X and Z to make them spread out
        newPositions[i + 0] += (Math.random() - 0.5) * bubbleDrift;
        newPositions[i + 2] += (Math.random() - 0.5) * bubbleDrift;

        newPositions[i + 1] += bubbleSpeed; // Adjust speed here

        // Check against the bubble's unique vanish height
        const bubbleIndex = i / 3;

        // Loop the bubbles back down when they go too high
        if (newPositions[i + 1] > vanishHeights[bubbleIndex]) {
          newPositions[i + 1] = -5 + position[1];
          // Reset X and Z to the initial position to start a new column
          const initialX = positions[i + 0] + position[0];
          const initialZ = positions[i + 2] + position[2];
          newPositions[i + 0] = initialX;
          newPositions[i + 2] = initialZ;
        }
      }
      pointsRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <Points ref={pointsRef} positions={positions}>
      <PointMaterial
        transparent
        blending={THREE.AdditiveBlending} // <--- Added for better transparency
        color="lightblue"
        size={bubbleSize}
        opacity={0.2}
        sizeAttenuation={true}
      />
    </Points>
  );
}
