"use client";

import { Suspense, useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { PerspectiveCamera, ContactShadows, useGLTF } from "@react-three/drei";
import * as THREE from "three";

function PassiveCarModel() {
  const { scene } = useGLTF("/car.glb");
  const modelRef = useRef<THREE.Group>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Safely tracks screen dimensions to avoid server-side build mismatch errors
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Smooth cinematic background rotation loop
  useFrame((state) => {
    if (modelRef.current) {
      modelRef.current.rotation.y = state.clock.getElapsedTime() * 0.15;
    }
  });

  return (
    <group ref={modelRef}>
      <primitive 
        object={scene.clone()} 
        // FIXED: Dynamically scales down the car model on mobile phones so it fits without pushing down your CTAs
        scale={isMobile ? 1.1 : 1.8} 
        position={[0, 0.5, 0]} 
      />
    </group>
  );
}

export default function Car3D() {
  return (
    <div className="h-[300px] md:h-[450px] w-full relative" style={{ touchAction: 'none' }}>
      <Canvas dpr={[1, 2]} shadows>
        <PerspectiveCamera makeDefault position={[0, 1.2, 8.5]} fov={30} />
        
        {/* Premium Studio Showroom Lighting */}
        <ambientLight intensity={1.5} />
        <spotLight position={[0, 20, 0]} angle={0.6} penumbra={1} intensity={2.5} castShadow />
        <directionalLight position={[10, 5, 10]} intensity={2.0} />
        <directionalLight position={[-10, 5, -5]} intensity={2.5} color="#00E5FF" />

        <Suspense fallback={null}>
          <PassiveCarModel />
          <ContactShadows position={[0, 0.49, 0]} opacity={0.6} scale={14} blur={2.8} far={2} />
        </Suspense>
      </Canvas>
    </div>
  );
}