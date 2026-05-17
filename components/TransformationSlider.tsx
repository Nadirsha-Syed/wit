"use client";

import { useRef } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { Sparkles } from "lucide-react";

export default function TransformationSlider() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // High-performance hardware-accelerated value tracking
  const sliderPosition = useMotionValue(50); 

  // Map position numbers to handle the right-side calculation fold cleanly
  // If the slider is at 40% from the left, the right-anchored After image needs to take up 60% width
  const widthStyle = useTransform(sliderPosition, (v) => `${100 - v}%`);
  const leftStyle = useTransform(sliderPosition, (v) => `${v}%`);

  const handleUpdate = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    sliderPosition.set(percentage);
  };

  return (
    <section className="py-20 px-6 bg-[#050505] relative overflow-hidden border-t border-white/5">
      <div className="max-w-4xl mx-auto text-center mb-10">
        <span className="text-[10px] font-black tracking-[0.4em] text-primary block uppercase mb-2">The Wit Studio Standard</span>
        <h2 className="text-3xl font-black text-white uppercase tracking-tighter">
          THE ART OF THE <span className="text-primary italic">TRANSFORMATION</span>
        </h2>
        <p className="text-gray-500 text-xs tracking-wide max-w-md mx-auto mt-2 leading-relaxed">
          Drag the slider to see the difference between a weathered factory finish and our multi-stage paint correction and ultra-gloss ceramic shielding.
        </p>
      </div>

      <div 
        ref={containerRef}
        className="max-w-4xl mx-auto aspect-[16/9] rounded-[2rem] border border-white/10 overflow-hidden relative cursor-ew-resize select-none shadow-2xl bg-[#08080a]"
        style={{ touchAction: "none" }}
        onMouseMove={(e) => {
          if (e.buttons === 1) handleUpdate(e.clientX);
        }}
        onTouchMove={(e) => handleUpdate(e.touches[0].clientX)}
        onClick={(e) => handleUpdate(e.clientX)}
      >
        {/* BEFORE IMAGE — STATIC BASE TIER (Now perfectly showcasing on the Left hand side) */}
        <div className="absolute inset-0 select-none pointer-events-none z-0 w-full h-full">
          <img 
            src="/before-detailing.jpg" 
            alt="Before Detailing"
            className="w-full h-full object-cover select-none pointer-events-none opacity-60" 
          />
          <div className="absolute left-6 top-6 bg-black/70 px-4 py-2 rounded-xl text-[10px] font-black text-gray-400 tracking-widest uppercase border border-white/5 z-30">
            FACTORY DULL / SWIRLED PAINT
          </div>
        </div>

        {/* AFTER IMAGE — DYNAMIC OVERLAY CONTAINER */}
        {/* FIXED: Shifted alignment from left-0 to right-0 and inverted width tracking logic */}
        <motion.div 
          className="absolute inset-y-0 right-0 select-none pointer-events-none overflow-hidden z-10 will-change-[width] flex justify-end"
          style={{ width: widthStyle }}
        >
          {/* Maintained fixed structural boundary width profile matching parent layout */}
          <div 
            className="h-full border-l-2 border-primary relative"
            style={{ width: containerRef.current ? containerRef.current.getBoundingClientRect().width : "100%" }}
          >
            <img 
              src="/after-detailing.jpg" 
              alt="After Detailing"
              className="w-full h-full object-cover select-none pointer-events-none absolute right-0 top-0 h-full"
              style={{ width: containerRef.current ? containerRef.current.getBoundingClientRect().width : "100%", maxWidth: "none" }}
            />
            <div className="absolute right-6 top-6 bg-primary text-black px-4 py-2 rounded-xl text-[10px] font-black tracking-widest uppercase shadow-[0_0_20px_rgba(0,229,255,0.4)] z-30 whitespace-nowrap">
              WIT STUDIO ULTRA GLOSS FINISH
            </div>
          </div>
        </motion.div>

        {/* HIGH-PERFORMANCE SLIDER HANDLE LINE BAR */}
        <motion.div 
          className="absolute top-0 bottom-0 w-1 bg-primary pointer-events-none shadow-[0_0_10px_rgba(0,229,255,0.8)] z-20"
          style={{ left: leftStyle }}
        >
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-primary text-black flex items-center justify-center shadow-xl border-4 border-black z-30">
            <Sparkles size={12} className="animate-pulse" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}