"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { Sparkles, AlertTriangle } from "lucide-react";

export default function TransformationSlider() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  
  // High-performance hardware-accelerated motion values
  const sliderPosition = useMotionValue(50); 

  // Directly map the raw percentage to layout tracking streams
  const leftHandleStyle = useTransform(sliderPosition, (v) => `${v}%`);
  const clipPercentage = useTransform(sliderPosition, (v) => `${v}%`);

  const handleUpdate = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    sliderPosition.set(percentage);
  };

  // Listens to global window move frames seamlessly to avoid drag release stuttering
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
            Drag the middle line slider right and left to reveal the true transformation differences across our detailing bay tracks.
          </p>
        </div>

        {/* INTERACTIVE WORKSPACE VIEWPORT LAYER */}
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
          {/* 1. BEFORE LAYER: STATIC BASE VIEWPORT                                     */}
          {/* ========================================================================= */}
          <div className="absolute inset-0 w-full h-full bg-neutral-950 z-0">
            <img 
              src="/before-detailing.jpg" 
              alt="Before Paint Detailing Work"
              className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none opacity-50"
            />
            {/* Styled Left Identity Tag */}
            <div className="absolute top-4 left-4 md:top-6 md:left-6 px-4 py-2.5 rounded-xl bg-black/80 border border-red-500/20 backdrop-blur-md flex items-center gap-2 text-red-400 font-mono text-[9px] md:text-xs font-black uppercase tracking-widest z-20 pointer-events-none">
              <AlertTriangle size={12} className="animate-pulse shrink-0" /> FACTORY DULL / SWIRLED PAINT
            </div>
          </div>

          {/* ========================================================================= */}
          {/* 2. AFTER LAYER: DYNAMIC CLIP VIEWER WINDOW CLOSURE                         */}
          {/* ========================================================================= */}
          {/* FIXED: Keeps image at 100% size, sliding handle simply cuts the window boundary dynamically */}
          <motion.div 
            className="absolute inset-0 w-full h-full bg-neutral-950 pointer-events-none z-10 overflow-hidden"
            style={{ clipPath: useTransform(clipPercentage, (p) => `polygon(0 0, ${p} 0, ${p} 100%, 0 100%)`) }}
          >
            <img 
              src="/after-detailing.jpg" 
              alt="Wit Studio Premium Treatment Finish"
              className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
            />
            {/* Styled Right Identity Tag with Premium Blue Branding */}
            <div className="absolute top-4 left-4 md:top-6 md:left-6 px-4 py-2.5 rounded-xl bg-[#0070F3]/10 border border-[#0070F3]/30 backdrop-blur-md flex items-center gap-2 text-primary font-mono text-[9px] md:text-xs font-black uppercase tracking-widest z-20 pointer-events-none shadow-[0_0_20px_rgba(0,112,243,0.25)]">
              <Sparkles size={12} className="text-primary shrink-0" /> WIT STUDIO ULTRA GLOSS FINISH
            </div>
          </motion.div>

          {/* ========================================================================= */}
          {/* 3. HARDWARE SLIDER CONTROL HANDLE LINE BAR                                */}
          {/* ========================================================================= */}
          <motion.div 
            className="absolute top-0 bottom-0 w-[2px] bg-primary z-30 pointer-events-none shadow-[0_0_15px_#0070F3]"
            style={{ left: leftHandleStyle }}
          >
            <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 md:w-11 md:h-11 rounded-full bg-white text-black border-4 border-primary shadow-[0_0_20px_rgba(0,112,243,0.4)] z-40 flex items-center justify-center font-black text-sm select-none tracking-tighter">
              ↔
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}