"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Gauge, User, MapPin, ChevronDown } from "lucide-react";
import { useBranch } from "@/context/BranchContext"; // <-- IMPORT CONTEXT
import Link from "next/link";

export default function Navbar() {
  const { selectedBranch, setSelectedBranch } = useBranch(); // <-- USE CONTEXT
  const [isOpen, setIsOpen] = useState(false);

  const branches = ["Siddipet", "Karimnagar", "Hanamkonda"];

  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 w-full z-50 px-4 md:px-6 py-4 flex justify-between items-center bg-[#050505]/80 backdrop-blur-xl border-b border-white/5"
    >
      <div className="flex items-center gap-2 md:gap-4 relative">
        <div className="flex items-center gap-1.5 md:gap-2">
          <div className="w-8 h-8 md:w-10 md:h-10 bg-primary rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(0,229,255,0.3)] shrink-0">
            <Gauge className="text-black w-5 h-5 md:w-6 md:h-6" />
          </div>
          <div className="flex flex-col leading-none mr-1 md:mr-2">
            <span className="text-base md:text-lg font-black tracking-tighter text-white">WIT</span>
            <span className="text-[8px] md:text-[10px] text-primary tracking-[0.2em] font-bold">STUDIO</span>
          </div>
        </div>

        {/* INTERACTIVE DROPDOWN — SYNCED VIA CONTEXT */}
        <div className="relative">
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-white/5 border border-white/10 font-mono text-[8px] md:text-[9px] font-bold text-gray-300 tracking-wider hover:bg-white/10 hover:border-primary/30 transition-all uppercase cursor-pointer"
          >
            <MapPin size={9} className="text-primary animate-pulse shrink-0" />
            <span className="max-w-[65px] md:max-w-none truncate">{selectedBranch}</span>
            <ChevronDown size={9} className={`text-gray-500 shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
          </button>

          <AnimatePresence>
            {isOpen && (
              <motion.div 
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 5 }}
                transition={{ duration: 0.2 }}
                className="absolute left-0 mt-2 w-36 md:w-44 rounded-xl bg-[#0d0d10] border border-white/10 overflow-hidden shadow-2xl z-50"
              >
                {branches.map((branch) => (
                  <button
                    key={branch}
                    onClick={() => {
                      setSelectedBranch(branch); // <-- UPDATES BOTH NAVBAR AND DASHBOARD
                      setIsOpen(false);
                      const dashboardSelector = document.getElementById("dashboard");
                      if (dashboardSelector) {
                        dashboardSelector.scrollIntoView({ behavior: "smooth" });
                      }
                    }}
                    className={`w-full text-left px-4 py-2.5 text-[9px] md:text-[10px] font-mono font-bold uppercase tracking-wider transition-colors border-b border-white/5 last:border-0 ${
                      selectedBranch === branch ? "text-primary bg-primary/5" : "text-gray-400 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {branch}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="hidden lg:flex gap-10 text-[11px] font-bold tracking-[0.2em] text-gray-400">
        <Link href="#services" className="hover:text-primary transition-colors cursor-pointer">OVERVIEW</Link>
        <Link href="#dashboard" className="hover:text-primary transition-colors cursor-pointer">TRACK WASHES</Link>
        <Link href="#blueprint" className="hover:text-primary transition-colors cursor-pointer">OUR SERVICES</Link>
        <Link href="#membership" className="hover:text-primary transition-colors cursor-pointer">MEMBERSHIPS</Link>
      </div>

      <div className="flex items-center gap-4 shrink-0">
        <Link 
          href="#dashboard"
          className="flex items-center gap-1.5 md:gap-2 px-4 md:px-5 py-2 bg-white/5 border border-white/10 rounded-full text-[10px] md:text-xs font-bold text-white hover:bg-white/10 transition-all cursor-pointer"
        >
          <User className="w-3.5 h-3.5 text-primary" />
          LOGIN
        </Link>
      </div>
    </motion.nav>
  );
}