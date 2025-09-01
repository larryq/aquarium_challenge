/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
//import { useRef } from "react";
import { useGLTF /*, useAnimations*/ } from "@react-three/drei";
import * as THREE from "three";
import { forwardRef, useEffect } from "react";
export const tankAndFish = forwardRef(
  (props, ref: React.ForwardedRef<THREE.Group>) => {
    // const modelRef = useRef<THREE.Group | null>(null);
    const { scene /*nodes, materials, animations*/ } = useGLTF(
      "/tank and fish.glb"
    ) as unknown as {
      scene: THREE.Group;
      nodes: { [key: string]: THREE.Mesh };
      materials: { [key: string]: THREE.Material };
      animations: any;
    };
    //const { actions } = useAnimations(animations, group);

    // A common mistake is to try and render the scene directly
    // or to clone it without preserving materials.
    // The useGLTF hook loads all the data for you.

    // Render the loaded scene.
    // The "scene" object contains all meshes, materials, and animations.
    useEffect(() => {
      if (ref && typeof ref !== "function" && ref.current) {
        // Traverse all meshes in the scene and enable shadows

        ref.current.traverse((node: THREE.Object3D) => {
          if (
            node instanceof THREE.Mesh &&
            !node.name.startsWith("tank") &&
            !node.name.startsWith("pebbles")
          ) {
            node.castShadow = true;
            node.receiveShadow = false;
          }
        });
      }
    }, [ref]);

    return <primitive object={scene} ref={ref} {...props} />;
  }
);

useGLTF.preload("/tank and fish.glb");
