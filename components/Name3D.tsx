"use client";

import { Canvas, useLoader } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Suspense, useEffect, useState } from "react";
import { useTheme } from "../context/ThemeContext";
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'

function Model() {
  // const gltf1 = useLoader(GLTFLoader, "/models/name.glb");
  // const gltf2 = useLoader(GLTFLoader, "/models/name2.glb");
  const gltf1 = useGLTF('/models/name.glb') as unknown as { scene: THREE.Group }
  const gltf2 = useGLTF('/models/name2.glb') as unknown as { scene: THREE.Group }
  const {darkMode} = useTheme();

  const [scale, setScale] = useState<[number, number, number]>([15, 15, 15]); // default (desktop)
  const[position, setPosition] = useState<[number, number, number]>([15, 15, 15]);

  useEffect(() => {
    const updateScale = () => {
      setScale([12, 17, 18]);
    };
    const updatePosition = () => {
      setPosition([-0.1, 0.1, 0]);
    };

    updateScale(); // initial check
    updatePosition();
    window.addEventListener("resize", updateScale);

    return () => window.removeEventListener("resize", updateScale);
  }, []);

  return (
    <primitive
      object={(darkMode? gltf1.scene : gltf2.scene)}
      scale={scale}
      position={position}
    />
  );
}

export default function Name3D() {
  return (
    <Canvas
      className="w-full h-full"
      camera={{ position: [0, 0, 5], fov: 35 }}
    >
      <ambientLight intensity={2} />
      <directionalLight position={[8, 80, 2]} intensity={85} />
      <Suspense fallback={null}>
        <Model />
      </Suspense>
      <OrbitControls enableZoom={false} />
    </Canvas>
  );
}
