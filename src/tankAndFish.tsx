/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
//import { useRef } from "react";
import { useGLTF /*, useAnimations*/ } from "@react-three/drei";
import * as THREE from "three";
import type {
  MathProps,
  ReactProps,
  EventHandlers,
  InstanceProps,
} from "@react-three/fiber";
import type {
  Mutable,
  Overwrite,
} from "@react-three/fiber/dist/declarations/src/core/utils";
import type { JSX } from "react/jsx-runtime";
import { useEffect, useRef } from "react";
export function tankAndFish(
  props: JSX.IntrinsicAttributes &
    Mutable<
      Overwrite<
        Partial<
          Overwrite<
            THREE.Group<THREE.Object3DEventMap>,
            MathProps<THREE.Group<THREE.Object3DEventMap>> &
              ReactProps<THREE.Group<THREE.Object3DEventMap>> &
              Partial<EventHandlers>
          >
        >,
        Omit<
          InstanceProps<
            THREE.Group<THREE.Object3DEventMap>,
            typeof THREE.Group
          >,
          "object"
        >
      >
    >
) {
  const modelRef = useRef<THREE.Group | null>(null);
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
    console.log("hello");
    if (modelRef.current) {
      // Traverse all meshes in the scene and enable shadows
      console.log("hellooooo");
      modelRef.current.traverse((node) => {
        console.log("Mesh:", node.name);
        if (node instanceof THREE.Mesh && !node.name.startsWith("pebbles")) {
          node.castShadow = true;
          node.receiveShadow = true;
        }
      });
    }
  }, [modelRef]);

  return <primitive object={scene} {...props} />;
}

useGLTF.preload("/tank and fish.glb");
