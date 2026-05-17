"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Crown, Star, CheckCircle2 } from "lucide-react";

const tiers = [
  {
    name: "SILVER",
    color: "text-slate-400",
    border: "border-slate-400/20",
    glow: "shadow-slate-400/10",
    price: "₹4,999",
    washes: "6 Premium Washes",
    benefits: ["Interior Detailing", "Wax Polish", "3 Month Validity"]
  },
  {
    name: "GOLD",
    color: "text-yellow-500",
    border: "border-yellow-500/20",
    glow: "shadow-yellow-500/20",
    price: "₹9,999",
    washes: "12 Premium Washes",
    benefits: ["Ceramic Topper", "Engine Bay Cleaning", "1 Year Validity", "VIP Priority"]
  }
];

export default function MembershipCards() {
  return (
    <section id="membership" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-white mb-16 tracking-tighter">
          ELITE <span className="text-primary italic">MEMBERSHIPS</span>
        </h2>
        
        <div className="grid md:grid-cols-2 gap-10">
          {tiers.map((tier, i) => (
            <FlipCard key={i} tier={tier} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FlipCard({ tier }: { tier: any }) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div 
      className="group h-[400px] w-full [perspective:1000px] cursor-pointer"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <motion.div
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
        className="relative w-full h-full [transform-style:preserve-3d]"
      >
        {/* FRONT: The Visual Card */}
        <div className={`absolute inset-0 backface-hidden bg-card border ${tier.border} rounded-[32px] p-8 flex flex-col justify-between shadow-2xl`}>
          <div className="flex justify-between items-start">
            <div className={`p-3 rounded-2xl bg-white/5 border ${tier.border}`}>
              {tier.name === "GOLD" ? <Crown className={tier.color} /> : <Star className={tier.color} />}
            </div>
            <span className={`font-black italic text-2xl ${tier.color}`}>{tier.name}</span>
          </div>
          
          <div>
            <h3 className="text-3xl font-bold text-white mb-2">{tier.washes}</h3>
            <p className="text-gray-500 text-sm tracking-widest uppercase">Tap to see pricing</p>
          </div>

          <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              className={`h-full bg-gradient-to-r from-transparent via-primary to-transparent`}
            />
          </div>
        </div>

        {/* BACK: Pricing & Benefits */}
        <div className="absolute inset-0 backface-hidden [transform:rotateY(180deg)] bg-primary rounded-[32px] p-8 flex flex-col justify-between text-black">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest opacity-60">Membership Value</span>
            <h4 className="text-5xl font-black tracking-tighter mt-1">{tier.price}</h4>
          </div>

          <div className="space-y-3">
            {tier.benefits.map((b: string, j: number) => (
              <div key={j} className="flex items-center gap-2 font-bold text-sm">
                <CheckCircle2 className="w-4 h-4" /> {b}
              </div>
            ))}
          </div>

          <button className="w-full py-4 bg-black text-white rounded-2xl font-bold hover:scale-[1.02] transition-transform">
            UPGRADE NOW
          </button>
        </div>
      </motion.div>
    </div>
  );
}