"use client";

import { Suspense, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, PerspectiveCamera, ContactShadows, OrbitControls } from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";
import * as THREE from "three";
import { CheckCircle2, ArrowUpRight, Eye } from "lucide-react";

// --- RE-CALIBRATED BOUNDING FOCUS MATRIX ---
const regions = [
  { 
    id: "hood", 
    label: "Hood Care", 
    mobileLabel: "Hood",
    service: "Ceramic Coating", 
    price: "Starting ₹18,000", 
    camPos: [0.0, 2.5, 5.0], 
    lookAt: [-0.22, -0.21, 2.61], 
    features: ["9H Ultra-Hard Nano Glass Shield", "Super Hydrophobic Water Beading", "3-Year Mirror Gloss Retention"] 
  },
  { 
    id: "body", 
    label: "Body Protection", 
    mobileLabel: "Body / PPF",
    service: "Paint Protection Film (PPF)", 
    price: "Starting ₹45,000", 
    camPos: [-5.0, 1.2, 1.5], 
    lookAt: [-1.56, -0.43, -0.05], 
    features: ["Self-Healing TPU Film Armour", "180 Micron Thick Stone-Chip Protection", "8-Year Clear Non-Yellowing Warranty"] 
  },
  { 
    id: "wheels", 
    label: "Alloys & Wheels", 
    mobileLabel: "Wheels",
    service: "Alloy Wheel Detailing", 
    price: "Starting ₹4,500", 
    camPos: [4.2, 0.2, 4.5], 
    lookAt: [1.39, -1.04, 2.41], 
    features: ["Deep Brake Dust Decontamination", "High-Heat Ceramic Brake Barrier", "Long-Lasting Gloss Rim Protection"] 
  },
  { 
    id: "undercarriage", 
    label: "Under-Body", 
    mobileLabel: "Underbody",
    service: "Anti-Rust Coating", 
    price: "Starting ₹5,000", 
    camPos: [0.0, 0.4, 5.5], 
    lookAt: [-0.06, -1.35, -0.64], 
    features: ["Thick Bitumen Coated Rust Barrier", "Corrosion Prevention Shield Coating", "Monsoon Road Salt Isolation"] 
  },
  { 
    id: "windows", 
    label: "Glass & Windows", 
    mobileLabel: "Windows",
    service: "Premium Sun Film", 
    price: "Starting ₹8,000", 
    camPos: [0.0, 2.8, 4.2], 
    lookAt: [-0.12, 0.22, 1.08], 
    features: ["99% UV Ray Rejection Shielding", "Advanced Infrared Car Heat Reduction", "Shatter-Resistant Safety Glass Layer"] 
  },
  { 
    id: "paint", 
    label: "Custom Wrap", 
    mobileLabel: "Wraps",
    service: "Premium Vinyl Wrapping", 
    price: "Starting ₹35,000", 
    camPos: [0.0, 4.0, -5.5], 
    lookAt: [-0.01, 0.62, -0.50], 
    features: ["Premium Cast Vinyl Material", "Endless Gloss, Satin or Matte Colors", "Protects Original Factory Clear Coat"] 
  },
  { 
    id: "interior", 
    label: "Interior Cabin", 
    mobileLabel: "Interior",
    service: "Deep Cabin Detailing", 
    price: "Starting ₹4,500", 
    camPos: [-4.2, 1.8, 3.2], 
    lookAt: [-1.16, 0.28, -0.28], 
    features: ["Anti-Bacterial Hot Steam Extraction", "Premium Leather Nourishing Cream", "Full Dashboard & AC Vent Cleaning"] 
  },
];

function StableRig({ targetPos, targetLookAt }: { targetPos: number[], targetLookAt: number[] }) {
  const vPos = new THREE.Vector3();
  const vLook = new THREE.Vector3();
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkViewport = () => setIsDesktop(window.innerWidth >= 1024);
    checkViewport();
    window.addEventListener("resize", checkViewport);
    return () => window.removeEventListener("resize", checkViewport);
  }, []);

  useFrame((state) => {
    // INTELLIGENT DESKTOP VIEWPORT ACCORDION FILTER
    // Keeps mobile framing standard (1.0x) but backs the camera out safely on desktop monitors
    const distanceMultiplier = isDesktop ? 1.45 : 1.0;

    vPos.set(
      targetPos[0] * distanceMultiplier, 
      targetPos[1] * distanceMultiplier, 
      targetPos[2] * distanceMultiplier
    );
    vLook.set(targetLookAt[0], targetLookAt[1], targetLookAt[2]);
    
    state.camera.position.lerp(vPos, 0.05);
    
    const controls = state.controls as any;
    if (controls && typeof controls.update === "function") {
      controls.target.lerp(vLook, 0.05);
      controls.update();
    }
  });

  return null;
}

function CarModel() {
  const { scene } = useGLTF("/car.glb");
  return (
    <primitive 
      object={scene} 
      scale={1.8} 
      position={[0, -0.5, 0]} 
    />
  );
}

export default function InteractiveBlueprint() {
  const [activeIdx, setActiveIdx] = useState(0);
  const currentRegion = regions[activeIdx];
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const adjustedScale = isMobile ? 1.2 : 1.6;

  return (
    <section id="blueprint" className="py-20 px-4 md:px-6 bg-[#050505] relative border-t border-white/5 overflow-hidden scroll-mt-20">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto flex flex-col lg:grid lg:grid-cols-12 gap-6 md:gap-8 items-center relative z-10">
        
        {/* ========================================================================= */}
        {/* 1. SELECTION CONTROLS HUB                                                 */}
        {/* ========================================================================= */}
        <div className="w-full lg:col-span-3 space-y-4 order-1">
          <div>
            <span className="text-[10px] font-black tracking-[0.5em] text-primary block uppercase mb-2">Interactive Blueprint</span>
            <h2 className="text-2xl md:text-4xl font-black text-white tracking-tighter uppercase leading-tight mt-1">
              OUR DETAILING <br className="hidden lg:block" />
              <span className="text-primary italic">SERVICES</span>
            </h2>
            <p className="text-gray-500 text-xs tracking-wide max-w-sm pt-1 leading-relaxed hidden md:block">
              Choose a section below to see what our premium studio equipment treats and how we shield your vehicle structure.
            </p>
          </div>

          <div className="flex flex-row lg:flex-col gap-2 overflow-x-auto pb-3 lg:pb-0 scrollbar-hide snap-x w-full lg:max-w-xs">
            {regions.map((reg, index) => (
              <button
                key={reg.id}
                onClick={() => setActiveIdx(index)}
                className={`text-left px-5 py-3.5 rounded-xl text-[9px] md:text-[10px] font-black uppercase tracking-widest border transition-all shrink-0 snap-center cursor-pointer ${
                  activeIdx === index 
                    ? "bg-primary text-black border-primary shadow-[0_0_20px_rgba(0,112,243,0.2)]" 
                    : "bg-card text-gray-400 border-white/5 hover:border-white/10 hover:text-white"
                }`}
              >
                <span className="hidden sm:inline">{reg.label}</span>
                <span className="sm:hidden">{reg.mobileLabel}</span>
              </button>
            ))}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 2. THREE.JS 3D SHOWROOM PREVIEW BOX WITH BRAND LIGHTING                   */}
        {/* ========================================================================= */}
        <div className="w-full lg:col-span-6 h-[300px] md:h-[550px] bg-card/20 border border-white/5 rounded-[2rem] md:rounded-[3.5rem] relative overflow-hidden backdrop-blur-sm order-2 shadow-2xl">
          <Canvas dpr={isMobile ? [1, 1.5] : [1, 2]} shadows>
            <PerspectiveCamera makeDefault position={isMobile ? [0, 2, 7] : [0, 2.8, 9.0]} fov={isMobile ? 35 : 28} />
            
            {/* BRAND BLUE ILLUMINATION LAYER PROFILE */}
            <ambientLight intensity={1.2} />
            <spotLight position={[0, 20, 0]} angle={0.6} penumbra={1} intensity={2.0} castShadow shadow-bias={-0.0001} />
            <directionalLight position={[10, 5, 10]} intensity={1.5} color="#ffffff" />
            
            {/* HIGH-INTENSITY BRAND ROYAL BLUE GLOSS SOURCE ACCENT */}
            <directionalLight position={[-10, 5, -5]} intensity={3.5} color="#0070F3" />
            <directionalLight position={[0, 5, -10]} intensity={1.2} color="#ffffff" />
            
            <Suspense fallback={null}>
              <group scale={adjustedScale}>
                <CarModel />
              </group>
              <StableRig targetPos={currentRegion.camPos} targetLookAt={currentRegion.lookAt} />
              <OrbitControls makeDefault enableZoom={false} enablePan={false} minPolarAngle={Math.PI / 2.5} maxPolarAngle={Math.PI / 1.9} />
              <ContactShadows position={[0, -0.51, 0]} opacity={isMobile ? 0.35 : 0.6} scale={12} blur={isMobile ? 3.2 : 2.4} far={2} />
            </Suspense>
          </Canvas>
          
          <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6 p-3 md:p-4 rounded-xl bg-black/70 border border-white/5 backdrop-blur-md pointer-events-none">
            <div className="flex items-center gap-1.5 text-[8px] font-bold text-primary tracking-widest uppercase">
              <Eye size={10} /> 3D RADAR VIEW
            </div>
            <p className="text-xs md:text-sm font-black text-white uppercase tracking-tight mt-0.5">{currentRegion.label}</p>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 3. DETAILS & FEATURE BREAKDOWN OVERLAY CARD                               */}
        {/* ========================================================================= */}
        <div className="w-full lg:col-span-3 order-3">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentRegion.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] bg-card border border-white/10 relative overflow-hidden shadow-2xl flex flex-col justify-between min-h-auto md:min-h-[440px]"
            >
              <div>
                <div className="flex flex-col gap-0.5 w-full">
                  <span className="text-[8px] md:text-[9px] font-black tracking-[0.3em] text-gray-500 uppercase">PACKAGE COST</span>
                  <span className="text-primary text-xl md:text-2xl font-black tracking-tight">{currentRegion.price}</span>
                </div>

                <h3 className="text-lg md:text-xl font-black text-white uppercase tracking-tight mt-4 md:mt-6 leading-none border-b border-white/5 pb-3">
                  {currentRegion.service}
                </h3>

                <div className="space-y-3.5 mt-5">
                  {currentRegion.features.map((feat, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs font-semibold text-gray-400">
                      <CheckCircle2 size={13} className="text-primary shrink-0 mt-0.5" />
                      <span className="leading-tight text-gray-300">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <a 
                href={`https://wa.me/919666200900?text=I%20want%20to%20book%20a%20slot%20for%20${currentRegion.service}%20at%20Wit%20Studio.`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full mt-6 md:mt-8 py-4 bg-primary text-black font-black text-xs tracking-widest rounded-xl hover:scale-[1.02] transition-transform flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(0,112,243,0.15)] uppercase"
              >
                BOOK SERVICE <ArrowUpRight size={13} />
              </a>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}

useGLTF.preload("/car.glb");