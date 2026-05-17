"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { Sparkles } from "lucide-react";

export default function TransformationSlider() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  
  // High-performance hardware-accelerated motion values
  const sliderPosition = useMotionValue(50); 

  // Maps the tracking values to handle left-to-right window masking reveal flow
  const leftHandleStyle = useTransform(sliderPosition, (v) => `${v}%`);
  const clipPercentage = useTransform(sliderPosition, (v) => `${v}%`);

  const handleUpdate = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    sliderPosition.set(percentage);
  };

  // Global window listeners to keep drag events uniform across mobile and desktop frames
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      handleUpdate(e.clientX);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging) return;
      handleUpdate(e.touches[0].clientX);
    };

    const handleMouseUp = () => setIsDragging(false);

    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      window.addEventListener("touchmove", handleTouchMove, { passive: true });
      window.addEventListener("touchend", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleMouseUp);
    };
  }, [isDragging]);

  return (
    <section id="transformation" className="py-20 px-4 md:px-6 bg-[#050505] relative overflow-hidden border-t border-white/5 scroll-mt-20">
      <div className="max-w-5xl mx-auto">
        
        {/* HEADER AREA */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-[10px] font-black tracking-[0.4em] text-primary block uppercase mb-2">Paint Correction Lab</span>
          <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tighter">
            THE GLOSS <span className="text-primary italic">TRANSFORMATION</span>
          </h2>
          <p className="text-gray-500 text-xs tracking-wide max-w-md mx-auto mt-2 leading-relaxed">
            Drag the middle slider line left and right to reveal the authentic multi-stage restoration layout tracks.
          </p>
        </div>

        {/* SLIDER WORKSPACE VIEWPORT */}
        <div 
          ref={containerRef}
          className="w-full aspect-[16/10] md:aspect-[16/8] rounded-[2rem] md:rounded-[3rem] bg-card border border-white/5 relative overflow-hidden select-none cursor-ew-resize shadow-2xl"
          style={{ touchAction: "none" }}
          onMouseDown={() => setIsDragging(true)}
          onTouchStart={() => setIsDragging(true)}
          onClick={(e) => {
            if (!isDragging) handleUpdate(e.clientX);
          }}
        >
          {/* ========================================================================= */}
          {/* 1. BASE BACKGROUND TIER: AFTER HIGH-GLOSS PICTURE LAYOUT                 */}
          {/* ========================================================================= */}
          <div className="absolute inset-0 w-full h-full bg-neutral-950 z-0">
            <img 
              src="/after-detailing.jpg" 
              alt="Wit Studio High Gloss Finish"
              className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
            />
            {/* Minimal Right Aligned Label */}
            <div className="absolute top-4 right-4 md:top-6 md:right-6 px-4 py-2 rounded-xl bg-[#0070F3]/20 border border-[#0070F3]/40 backdrop-blur-md flex items-center gap-1.5 text-primary font-mono text-[10px] md:text-xs font-black uppercase tracking-widest z-20 pointer-events-none shadow-[0_0_15px_rgba(0,112,243,0.2)]">
              <Sparkles size={11} className="text-primary" /> AFTER
            </div>
          </div>

          {/* ========================================================================= */}
          {/* 2. DYNAMIC WINDOW MASK TIER: BEFORE PICTURE VIEWPORT LAYER                 */}
          {/* ========================================================================= */}
          {/* Clips the before frame on top. Both asset textures stay 100% wide so they NEVER warp or squish */}
          <motion.div 
            className="absolute inset-0 w-full h-full bg-neutral-950 pointer-events-none z-10 overflow-hidden"
            style={{ clipPath: useTransform(clipPercentage, (p) => `polygon(0 0, ${p} 0, ${p} 100%, 0 100%)`) }}
          >
            <img 
              src="/before-detailing.jpg" 
              alt="Factory Dull Paint Defect Sample"
              className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none opacity-65"
            />
            {/* Minimal Left Aligned Label */}
            <div className="absolute top-4 left-4 md:top-6 md:left-6 px-4 py-2 rounded-xl bg-black/80 border border-white/5 backdrop-blur-md text-gray-400 font-mono text-[10px] md:text-xs font-black uppercase tracking-widest z-20 pointer-events-none">
              BEFORE
            </div>
          </motion.div>

          {/* ========================================================================= */}
          {/* 3. HARDWARE SLIDER DIVIDER CONTROL HANDLE LINE                           */}
          {/* ========================================================================= */}
          <motion.div 
            className="absolute top-0 bottom-0 w-[2px] bg-primary z-30 pointer-events-none shadow-[0_0_15px_#0070F3]"
            style={{ left: leftHandleStyle }}
          >
            {/* Orbit grip node toggle */}
            <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 md:w-11 md:h-11 rounded-full bg-white text-black border-4 border-primary shadow-[0_0_20px_rgba(0,112,243,0.4)] z-40 flex items-center justify-center font-black text-sm select-none tracking-tighter">
              ↔
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}