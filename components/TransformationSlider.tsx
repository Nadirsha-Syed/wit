"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Sparkles, AlertTriangle } from "lucide-react";

export default function TransformationSlider() {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging) return;
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  useEffect(() => {
    const up = () => setIsDragging(false);
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", up);
      window.addEventListener("touchmove", handleTouchMove, { passive: true });
      window.addEventListener("touchend", up);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", up);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", up);
    };
  }, [isDragging]);

  return (
    <section id="transformation" className="py-20 px-4 md:px-6 bg-[#050505] relative border-t border-white/5 overflow-hidden">
      <div className="max-w-5xl mx-auto">
        
        {/* HEADER AREA */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-[10px] font-black tracking-[0.4em] text-primary block uppercase mb-2">Paint Correction Lab</span>
          <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tighter">
            THE GLOSS <span className="text-primary italic">TRANSFORMATION</span>
          </h2>
          <p className="text-gray-500 text-xs tracking-wide max-w-md mx-auto mt-2 leading-relaxed">
            Drag the middle slider line left and right to see how our multi-stage polishing systems eliminate paint defects.
          </p>
        </div>

        {/* SLIDER FRAME WORKSPACE */}
        <div 
          ref={containerRef}
          className="w-full aspect-[16/10] md:aspect-[16/8] rounded-[2rem] md:rounded-[3rem] bg-card border border-white/5 relative overflow-hidden select-none cursor-ew-resize shadow-2xl"
          onMouseDown={() => setIsDragging(true)}
          onTouchStart={() => setIsDragging(true)}
        >
          {/* ========================================================================= */}
          {/* 1. BEFORE LAYER: FACTORY DULL / SWIRLED PAINT                             */}
          {/* ========================================================================= */}
          <div className="absolute inset-0 w-full h-full bg-neutral-900">
            <img 
              src="/before-paint.jpg" // Ensure this image exists in your public/ folder
              alt="Swirled Car Paint"
              className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
            />
            {/* Styled Before Label Badge */}
            <div className="absolute top-4 left-4 md:top-6 md:left-6 px-4 py-2 rounded-xl bg-black/70 border border-red-500/20 backdrop-blur-md flex items-center gap-2 text-red-400 font-mono text-[9px] md:text-xs font-black uppercase tracking-widest z-20 pointer-events-none">
              <AlertTriangle size={12} className="animate-pulse" /> FACTORY DULL / SWIRLED PAINT
            </div>
          </div>

          {/* ========================================================================= */}
          {/* 2. AFTER LAYER: WIT STUDIO ULTRA GLOSS FINISH                             */}
          {/* ========================================================================= */}
          {/* FIXED CLIP-PATH HOOK: This prevents the underlying inner image from resizing or warping entirely */}
          <div 
            className="absolute inset-0 h-full overflow-hidden bg-neutral-900 pointer-events-none z-10"
            style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
          >
            {/* CRITICAL STRUCTURAL FIX: The width & height here are locked to match the parent frame size exactly */}
            <div className="absolute inset-0 w-full h-full max-w-none">
              <img 
                src="/after-paint.jpg" // Ensure this image exists in your public/ folder
                alt="Wit Studio Ultra Gloss Finish"
                // object-cover anchors the aspect ratio natively so it NEVER distorts when sliced
                className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
                style={{ width: containerRef.current?.getBoundingClientRect().width }}
              />
            </div>
            {/* Styled After Label Badge */}
            <div className="absolute top-4 left-4 md:top-6 md:left-6 px-4 py-2 rounded-xl bg-primary/10 border border-primary/30 backdrop-blur-md flex items-center gap-2 text-primary font-mono text-[9px] md:text-xs font-black uppercase tracking-widest z-20 pointer-events-none shadow-[0_0_15px_rgba(0,112,243,0.2)]">
              <Sparkles size={12} className="animate-spin-slow" /> WIT STUDIO ULTRA GLOSS FINISH
            </div>
          </div>

          {/* ========================================================================= */}
          {/* 3. INTERACTIVE SLIDER DRAGPER BAR HANDLE                                  */}
          {/* ========================================================================= */}
          <div 
            className="absolute top-0 bottom-0 w-1 bg-primary/50 backdrop-blur-xs z-30 cursor-ew-resize pointer-events-none shadow-[0_0_20px_#0070F3]"
            style={{ left: `${sliderPosition}%` }}
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 rounded-full bg-white text-black border-4 border-primary shadow-2xl flex items-center justify-center font-black text-xs select-none tracking-tighter">
              ↔
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}