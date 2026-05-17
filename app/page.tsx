"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  ArrowRight, 
  ShieldCheck, 
  Zap, 
  Star, 
  Clock, 
  CheckCircle2, 
  ChevronDown,
  MessageSquare,
  MapPin,
  Sparkles
} from "lucide-react";

// Import custom sub-modules
import Car3D from "@/components/Car3D";
import InteractiveBlueprint from "@/components/InteractiveBlueprint";
import StudioDashboard from "@/components/StudioDashboard";
import TransformationSlider from "@/components/TransformationSlider";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";

const tiers = [
  {
    name: "SILVER MEMBERSHIP",
    color: "text-slate-400",
    border: "border-slate-400/20",
    price: "₹4,999",
    washes: "6 ADVANCED WASHES & POLISH", 
    benefits: ["Deep Interior Steam Cleaning", "Ultra Gloss Cream Wax Polish", "Works at All 3 Branches", "Complete Under-Chassis Wash"]
  },
  {
    name: "GOLD MEMBERSHIP",
    color: "text-yellow-500",
    border: "border-yellow-500/20",
    price: "₹9,999",
    washes: "12 ULTIMATE SERVICES & COATING", 
    benefits: ["Hydrophobic Ceramic Spray Shield", "Detailed Chemical Engine Bay Cleaning", "Valid for 1 Full Year", "VIP Priority Lane (No Waiting)", "AC Vent Disinfection Treatment"]
  }
];

export default function Home() {
  const [activeTier, setActiveTier] = useState<number | null>(null);

  const stats = [
    { label: "Cars Detailed in Telangana", value: "4000+", icon: Star },
    { label: "Car Paint Protection Warranty", value: "8-Years", icon: ShieldCheck },
    { label: "Same-Day Car Delivery", value: "Fast Track", icon: Clock },
    { label: "Premium Studio Locations", value: "3 Branches", icon: Zap },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <main className="relative min-h-screen bg-[#050505] text-foreground overflow-x-hidden selection:bg-primary/20 pb-20">
      
      {/* 1. HERO LAYER */}
      <section className="relative z-10 pt-24 pb-10 px-4 md:px-6 max-w-7xl mx-auto min-h-[95vh] flex flex-col items-center justify-between">
        <div className="text-center w-full max-w-6xl mx-auto">
          
          {/* BRAND NAV EMBLEM */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col items-center justify-center mb-10 w-full relative"
          >
            <div className="absolute top-0 w-[300px] md:w-[400px] h-[100px] bg-primary/10 rounded-full blur-[60px] pointer-events-none" />

            <div className="px-8 md:px-12 py-5 md:py-6 border border-white/5 rounded-[2rem] bg-card/10 backdrop-blur-md shadow-2xl border-b-primary/20 relative z-10">
              <h2 className="text-4xl md:text-8xl font-black tracking-[0.05em] text-white uppercase leading-none">
                WIT <span className="text-primary font-light italic tracking-tight">STUDIO</span>
              </h2>
              
              <div className="flex items-center justify-center gap-2 mt-4 text-gray-400">
                <MapPin size={12} className="text-primary" />
                <p className="text-[8px] md:text-xs font-black tracking-[0.4em] uppercase pl-[0.4em]">
                  SIDDIPET • KARIMNAGAR • HANAMKONDA
                </p>
              </div>
            </div>
          </motion.div>

          {/* SIMPLIFIED BANNER */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/5 border border-primary/10 mb-6 text-[9px] font-bold text-primary tracking-widest uppercase"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-ping" />
            3 LOCATIONS, 1 MEMBERSHIP • WORKS ACROSS TELANGANA
          </motion.div>

          {/* MAIN HEADLINES */}
          <div className="space-y-2 md:space-y-4">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
              className="text-4xl md:text-[7.5rem] font-black tracking-tighter text-white leading-[0.85] uppercase"
            >
              PREMIUM CAR CARE
            </motion.h1>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              className="text-4xl md:text-[7.5rem] font-black tracking-tighter text-primary italic leading-[0.85] uppercase"
            >
              EXPERIENCE.
            </motion.h1>
          </div>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-10 text-gray-500 text-[10px] md:text-xs uppercase tracking-[0.6em] font-light"
          >
            Protection • Perfection • Prestige
          </motion.p>
        </div>

        {/* 3D CAR CANVAS */}
        <div className="w-full max-w-5xl mx-auto my-4 md:my-6 relative z-10">
          <Car3D />
        </div>

        {/* RE-ENGINEERED SIMPLE BUTTONS */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 w-full max-w-lg px-4 relative z-30">
          <a 
            href="https://wa.me/919666200900?text=Hello%20Wit%20Studio,%20I%20want%20to%20book%20a%20car%20detailing%20slot." 
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-8 py-4 bg-[#25D366] text-black font-black text-xs tracking-[0.15em] rounded-full hover:scale-105 active:scale-95 transition-all shadow-lg flex items-center justify-center gap-3 cursor-pointer"
          >
            <MessageSquare size={14} fill="black" /> BOOK ON WHATSAPP
          </a>
          <button 
            onClick={() => scrollToSection("dashboard")}
            className="w-full sm:w-auto px-8 py-4 bg-primary text-black font-black text-xs tracking-[0.15em] rounded-full hover:scale-105 active:scale-95 transition-all shadow-[0_0_30px_rgba(0,229,255,0.25)] flex items-center justify-center gap-3 cursor-pointer"
          >
            TRY LIVE DEMO PORTAL <ArrowRight size={14} />
          </button>
        </div>
      </section>

      {/* STATS COUNTERS */}
      <section id="services" className="max-w-7xl mx-auto px-4 md:px-6 py-16 grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 scroll-mt-20">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-6 md:p-10 rounded-[2rem] md:rounded-[2.5rem] bg-card border border-white/5 flex flex-col items-center text-center group hover:border-primary/20 transition-all duration-500"
          >
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-4 md:mb-6">
              <stat.icon className="text-primary w-4 h-4 md:w-5 md:h-5" />
            </div>
            <span className="text-2xl md:text-4xl font-black text-white tracking-tighter">{stat.value}</span>
            <span className="text-[8px] md:text-[9px] text-gray-500 uppercase tracking-[0.35em] mt-2 font-bold leading-relaxed">{stat.label}</span>
          </motion.div>
        ))}
      </section>

      {/* 2. VISUAL CAR FINISH SLIDER */}
      <TransformationSlider />

      {/* 3. HARDWARE OPERATIONAL PORTAL HUB */}
      <StudioDashboard />

      {/* 4. SERVICE BLUEPRINT GUIDE SHOWROOM */}
      <section id="blueprint" className="scroll-mt-20">
        <InteractiveBlueprint />
      </section>

      {/* 5. MEMBERSHIP PACKAGES — SLIM RESPONSIVE PLATFORM BOXES */}
      <section id="membership" className="py-20 px-4 md:px-6 relative bg-gradient-to-b from-[#050505] to-[#090909] scroll-mt-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-white tracking-tighter mb-3 italic">CHOOSE YOUR MEMBERSHIP</h2>
            <p className="text-primary text-[10px] tracking-[0.5em] font-bold uppercase">Save Big with Multi-Wash Packages</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {tiers.map((tier, idx) => (
              <div 
                key={idx}
                className="group relative [perspective:2000px] cursor-pointer touch-none w-full min-h-[260px] md:min-h-[300px]"
                onClick={() => setActiveTier(activeTier === idx ? null : idx)}
                onMouseEnter={() => setActiveTier(idx)}
                onMouseLeave={() => setActiveTier(null)}
              >
                <motion.div
                  animate={{ rotateY: activeTier === idx ? 180 : 0 }}
                  transition={{ duration: 0.5, type: "spring", stiffness: 120, damping: 22 }}
                  className="relative w-full h-full [transform-style:preserve-3d] min-h-[260px] md:min-h-[300px]"
                >
                  
                  {/* FRONT CARD PANEL */}
                  <div className="absolute inset-0 backface-hidden bg-card border border-white/5 rounded-[2rem] p-6 md:p-8 flex flex-col justify-between overflow-hidden shadow-xl">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-white/[0.01] rounded-full blur-2xl" />
                    <div className="space-y-2">
                      <div className={`text-[9px] font-black tracking-[0.3em] ${tier.color} uppercase`}>{tier.name}</div>
                      <h3 className="text-lg md:text-xl font-black text-white uppercase tracking-tight leading-tight pt-1">
                        {tier.washes}
                      </h3>
                    </div>
                    <div className="flex items-center gap-2 text-gray-500 text-[9px] font-bold tracking-wider group-hover:text-primary transition-colors uppercase mt-6 pt-4 border-t border-white/5">
                      <Sparkles size={11} className="text-primary animate-pulse" />
                      <span>Tap or Hover to see pricing</span>
                      <ChevronDown size={11} className="ml-auto animate-bounce text-gray-600" />
                    </div>
                  </div>

                  {/* BACK CARD PANEL */}
                  <div className="absolute inset-0 backface-hidden [transform:rotateY(180deg)] bg-primary rounded-[2rem] p-6 md:p-8 flex flex-col justify-between text-black shadow-2xl">
                    <div className="space-y-4">
                      <div className="flex justify-between items-baseline border-b border-black/10 pb-3">
                        <span className="text-[9px] font-black uppercase tracking-wider opacity-70">Package Price</span>
                        <h4 className="text-3xl font-black tracking-tight font-mono">{tier.price}</h4>
                      </div>
                      
                      <div className="space-y-2">
                        {tier.benefits.map((benefit, j) => (
                          <div key={j} className="flex items-start gap-2 font-bold text-[11px] md:text-xs tracking-tight leading-tight">
                            <CheckCircle2 size={12} className="text-black/80 shrink-0 mt-0.5" />
                            <span>{benefit}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <a
                      href={`https://wa.me/919666200900?text=I%20am%20interested%20in%20joining%20the%20${tier.name}.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3 bg-black text-white rounded-xl font-black text-[10px] tracking-[0.2em] block text-center uppercase mt-4 hover:bg-neutral-900 transition-colors"
                    >
                      BUY PACKAGE NOW
                    </a>
                  </div>

                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5.5 CUSTOMER TRUST SHOWROOM CARD HUB */}
      <Testimonials />

      {/* 6. MULTI-BRANCH MAPS & SOCIAL LINK DIRECTORY FOOTER */}
      <Footer />

    </main>
  );
}