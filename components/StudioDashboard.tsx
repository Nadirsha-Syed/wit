"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useBranch } from "@/context/BranchContext"; // <-- IMPORT CONTEXT
import { 
  User, 
  Calendar, 
  History, 
  QrCode, 
  Users, 
  TrendingUp, 
  CheckCircle2, 
  Clock, 
  Plus, 
  Minus, 
  ShieldAlert,
  Sliders,
  Sparkles,
  Crown,
  MapPin,
  ChevronDown,
  Phone
} from "lucide-react";

const InstagramIcon = ({ className = "w-3 h-3" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

export default function StudioDashboard() {
  const { selectedBranch, setSelectedBranch } = useBranch(); // <-- USE GLOBAL CONTEXT INSTEAD OF LOCAL STATE
  const [isAdmin, setIsAdmin] = useState(false);
  const [washesRemaining, setWashesRemaining] = useState(7);
  const [isBranchDropdownOpen, setIsBranchDropdownOpen] = useState(false);
  const totalWashes = 12;

  const branchData: Record<string, { members: string; revenue: string; bays: string; phone: string; handle: string; link: string }> = {
    Siddipet: { members: "142 Active Members", revenue: "₹1,82,400", bays: "3 Cars in Workshop", phone: "+91 96662 00900", handle: "@witsiddipet", link: "https://www.instagram.com/witsiddipet/" },
    Karimnagar: { members: "210 Active Members", revenue: "₹2,95,000", bays: "5 Cars in Workshop", phone: "+91 88864 99902", handle: "@witdetailingstudio", link: "https://www.instagram.com/witdetailingstudio/" },
    Hanamkonda: { members: "185 Active Members", revenue: "₹2,44,800", bays: "4 Cars in Workshop", phone: "+91 96667 71819", handle: "@wit_hanamkonda", link: "https://www.instagram.com/wit_hanamkonda/" }
  };

  const usageTimeline = [
    { date: "May 14, 2026", service: "Ceramic Coating Top-Up Care", studio: `Wit Studio (${selectedBranch})`, status: "Done" },
    { date: "Apr 28, 2026", service: "Premium Foam Wash & Wax Polish", studio: "Wit Studio (Siddipet)", status: "Done" },
    { date: "Apr 14, 2026", service: "Full Interior Deep Cleaning", studio: "Wit Studio (Hanamkonda)", status: "Done" },
  ];

  const radius = 46;
  const circumference = 2 * Math.PI * radius;

  return (
    <section id="dashboard" className="py-24 px-6 bg-[#030303] border-t border-white/5 relative overflow-hidden scroll-mt-20">
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-16 gap-6 w-full">
          <div>
            <span className="text-[10px] font-black tracking-[0.5em] text-primary block uppercase mb-2">Interactive Demo</span>
            <h2 className="text-4xl font-black text-white tracking-tighter uppercase">
              WIT STUDIO <span className="text-primary italic">CUSTOMER PORTAL</span>
            </h2>
            <p className="text-gray-500 text-xs tracking-wide max-w-md mt-2 leading-relaxed">
              See exactly how a customer tracks their washes on their mobile screen versus how your workshop staff deducts a wash at the branch counter.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
            {/* DROP-DOWN SELECTOR */}
            <div className="relative w-full sm:w-56">
              <button 
                onClick={() => setIsBranchDropdownOpen(!isBranchDropdownOpen)}
                className="w-full flex items-center justify-between gap-3 px-5 py-4 rounded-xl bg-card border border-white/10 text-white font-bold text-xs tracking-widest uppercase transition-all"
              >
                <span className="flex items-center gap-2">
                  <MapPin size={14} className="text-primary" />
                  BRANCH: {selectedBranch}
                </span>
                <ChevronDown size={14} className={`text-gray-500 transition-transform ${isBranchDropdownOpen ? "rotate-180" : ""}`} />
              </button>

              <AnimatePresence>
                {isBranchDropdownOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute z-50 left-0 right-0 mt-2 rounded-xl bg-[#0d0d10] border border-white/10 overflow-hidden shadow-2xl"
                  >
                    {["Siddipet", "Karimnagar", "Hanamkonda"].map((branch) => (
                      <button
                        key={branch}
                        onClick={() => {
                          setSelectedBranch(branch); // <-- UPDATES THE SHARED STATE
                          setIsBranchDropdownOpen(false);
                        }}
                        className={`w-full text-left px-5 py-3.5 text-xs font-bold uppercase tracking-wider transition-colors border-b border-white/5 last:border-0 ${
                          selectedBranch === branch ? "text-primary bg-primary/5" : "text-gray-400 hover:text-white hover:bg-white/5"
                        }`}
                      >
                        {branch} Branch
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button 
              onClick={() => setIsAdmin(!isAdmin)}
              className="w-full sm:w-auto flex items-center justify-center gap-3 px-6 py-4 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 font-bold text-xs tracking-widest uppercase transition-all shadow-xl group"
            >
              <Sliders size={14} className="text-primary group-hover:rotate-180 transition-transform duration-500" />
              SWITCH TO: {isAdmin ? "CUSTOMER APP VIEW" : "OWNER DASHBOARD"}
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {!isAdmin ? (
            /* ========================================================================= */
            /* 1. CUSTOMER PORTAL WORKSPACE                                              */
            /* ========================================================================= */
            <motion.div 
              key="customer"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="grid lg:grid-cols-12 gap-8 items-start"
            >
              <div className="lg:col-span-4 w-full">
                <div className="w-full aspect-[1.58/1] rounded-[2.5rem] bg-gradient-to-br from-[#1c1c1e] via-[#0d0d0f] to-[#121214] p-8 border border-white/10 shadow-2xl flex flex-col justify-between relative overflow-hidden">
                  <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/10 rounded-full blur-3xl" />
                  
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[8px] font-black tracking-with-[0.4em] text-primary block uppercase">WIT STUDIO DIGITAL PASS</span>
                      <h4 className="text-xl font-black text-white tracking-tight mt-1">GOLD MEMBERSHIP</h4>
                    </div>
                    <div className="w-8 h-8 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                      <Crown size={14} className="text-yellow-500" />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between items-end border-b border-white/5 pb-3">
                      <div>
                        <p className="text-[8px] font-bold text-gray-500 uppercase tracking-widest">VEHICLE OWNER</p>
                        <p className="text-xs font-bold text-white tracking-wide mt-0.5">Nadirsha Syed</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[8px] font-bold text-gray-500 uppercase tracking-widest">CAR NUMBER</p>
                        <p className="text-xs font-mono font-bold text-white mt-0.5">TS-09-AB-1234</p>
                      </div>
                    </div>

                    <div className="flex justify-between items-center pt-1 text-[10px] font-bold text-gray-400">
                      <span>SECURE SYSTEM PROFILE</span>
                      <span className="text-primary tracking-widest font-black text-[9px]">3-BRANCH ACCESS</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 p-5 rounded-2xl bg-primary/5 border border-primary/10 flex items-center gap-4">
                  <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <Sparkles size={14} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-[9px] font-black text-primary tracking-widest uppercase">UPKEEP ALIGNMENT</p>
                    <p className="text-xs text-gray-400 mt-0.5">Your next **Ceramic Coating Free Top-Up** is due in 14 days. Visit any branch to claim.</p>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5 grid gap-6">
                <div className="p-8 rounded-[2.5rem] bg-card border border-white/5 flex items-center justify-between shadow-xl">
                  <div className="space-y-2">
                    <p className="text-[9px] font-black text-gray-500 tracking-widest uppercase">WASHES REMAINING</p>
                    <h3 className="text-5xl font-black text-white font-mono leading-none">
                      {washesRemaining} <span className="text-sm text-gray-600 font-sans font-medium">/ {totalWashes} Left</span>
                    </h3>
                    <p className="text-xs text-gray-400 pt-2 font-medium">This balance updates automatically upon scanning code at the counter.</p>
                  </div>

                  <div className="relative w-28 h-28 flex items-center justify-center shrink-0">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
                      <circle cx="60" cy="60" r={radius} className="stroke-white/5" strokeWidth="6" fill="transparent" />
                      <motion.circle 
                        cx="60" cy="60" r={radius} className="stroke-primary" strokeWidth="6" fill="transparent" strokeLinecap="round"
                        initial={{ strokeDashoffset: circumference }}
                        animate={{ strokeDashoffset: circumference - (washesRemaining / totalWashes) * circumference }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        style={{ strokeDasharray: circumference }}
                      />
                    </svg>
                    <span className="absolute text-xs font-black text-white font-mono">
                      {Math.round((washesRemaining / totalWashes) * 100)}%
                    </span>
                  </div>
                </div>

                <div className="p-8 rounded-[2.5rem] bg-card border border-white/5 flex flex-col sm:flex-row items-center gap-6 shadow-xl">
                  <div className="space-y-2 text-center sm:text-left">
                    <div className="flex items-center justify-center sm:justify-start gap-2 text-primary font-black text-[9px] tracking-widest uppercase">
                      <QrCode size={12} /> DIGITAL CHECK-IN PASS
                    </div>
                    <h4 className="text-lg font-black text-white uppercase tracking-tight">Scan Code at Front Desk</h4>
                    <p className="text-gray-500 text-xs leading-relaxed">
                      Show this barcode to the branch counter manager when you arrive. They will scan it to verify and update your wash balance instantly.
                    </p>
                  </div>
                  <div className="bg-white p-3 rounded-2xl flex items-center justify-center shadow-inner w-24 h-24 shrink-0 border-4 border-black/10">
                    <div className="w-full h-full bg-[#050505] rounded-xl flex items-center justify-center text-primary">
                      <QrCode size={36} className="animate-pulse" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-3 space-y-6">
                <div className="p-6 rounded-3xl bg-card border border-white/5 shadow-xl">
                  <div className="flex items-center gap-2 mb-4 pb-2 border-b border-white/5">
                    <History size={14} className="text-gray-500" />
                    <span className="text-[9px] font-black text-gray-400 tracking-widest uppercase">PAST SERVICE HISTORY</span>
                  </div>
                  <div className="space-y-4 relative pl-3 border-l border-white/5">
                    {usageTimeline.map((item, i) => (
                      <div key={i} className="relative space-y-0.5">
                        <span className="absolute -left-[16.5px] top-1.5 w-2 h-2 rounded-full bg-primary/40" />
                        <p className="text-[9px] font-mono font-medium text-gray-500">{item.date}</p>
                        <p className="text-xs font-bold text-white leading-tight">{item.service}</p>
                        <p className="text-[10px] text-primary/80 font-semibold">{item.studio}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            /* ========================================================================= */
            /* 2. OWNER DASHBOARD WORKSPACE VIEW                                        */
            /* ========================================================================= */
            <motion.div 
              key="admin"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-8"
            >
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                {[
                  { title: `${selectedBranch} Total Members`, val: branchData[selectedBranch].members, delta: "Registered at this shop", icon: Users },
                  { title: `${selectedBranch} Advanced Sales`, val: branchData[selectedBranch].revenue, delta: "Upfront package money", icon: TrendingUp },
                  { title: "Current Active Workshop Load", val: branchData[selectedBranch].bays, delta: "Cars inside workshop", icon: Clock },
                  { title: "Data Record Errors", val: "0 Mistakes", delta: "All branches cloud synced", icon: CheckCircle2 }
                ].map((m, idx) => (
                  <div key={idx} className="p-6 md:p-8 rounded-3xl bg-card border border-white/5 shadow-xl flex flex-col justify-between min-h-[140px]">
                    <div className="flex justify-between items-start w-full">
                      <span className="text-[9px] font-black text-gray-500 tracking-widest uppercase leading-tight">{m.title}</span>
                      <m.icon size={16} className="text-primary opacity-60" />
                    </div>
                    <div className="mt-4">
                      <h4 className="text-2xl font-black text-white tracking-tight">{m.val}</h4>
                      <p className="text-[9px] font-bold text-primary tracking-widest uppercase mt-1">{m.delta}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-7 p-6 md:p-8 rounded-[2.5rem] bg-card border border-white/5 space-y-6 shadow-xl">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/5 pb-4 gap-3">
                    <div>
                      <h3 className="text-lg font-black text-white uppercase tracking-tight">Front Counter Check-In ({selectedBranch} Desk)</h3>
                      <p className="text-gray-500 text-xs mt-0.5">Deduct a wash instantly when a member drives into your workshop.</p>
                    </div>
                    <div className="flex flex-col items-start sm:items-end text-xs font-mono gap-1 text-gray-400">
                      <span className="flex items-center gap-1.5"><Phone size={11} className="text-primary" /> {branchData[selectedBranch].phone}</span>
                      <a href={branchData[selectedBranch].link} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 hover:text-primary transition-colors">
                        <InstagramIcon className="w-3 h-3 text-primary" /> {branchData[selectedBranch].handle}
                      </a>
                    </div>
                  </div>

                  <div className="p-6 rounded-2xl bg-white/5 border border-white/5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                        <User size={18} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-black text-white">Nadirsha Syed</span>
                          <span className="text-[8px] font-bold text-yellow-500 border border-yellow-500/20 bg-yellow-500/5 px-1.5 rounded uppercase">GOLD MEMBER</span>
                        </div>
                        <p className="text-xs text-gray-500 font-medium font-mono mt-0.5">TS-09-AB-1234 • Global Multi-Pass Holder</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end border-t sm:border-t-0 pt-3 sm:pt-0 border-white/5">
                      <div className="text-right sm:mr-2">
                        <p className="text-[8px] font-black text-gray-500 tracking-widest uppercase">CLICK TO LOG A WASH TODAY</p>
                        <p className="text-xs font-mono font-black text-white mt-0.5">{washesRemaining} Washes Remaining</p>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <button 
                          onClick={() => setWashesRemaining(Math.max(0, washesRemaining - 1))}
                          className="w-9 h-9 rounded-lg bg-primary text-black flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-[0_0_15px_rgba(0,229,255,0.3)]"
                        >
                          <Minus size={14} strokeWidth={3} />
                        </button>
                        <button 
                          onClick={() => setWashesRemaining(Math.min(totalWashes, washesRemaining + 1))}
                          className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 text-white flex items-center justify-center hover:bg-white/10 transition-all active:scale-95"
                        >
                          <Plus size={14} strokeWidth={3} />
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-primary/5 border border-primary/10 flex gap-3 text-xs text-gray-400 leading-normal">
                    <ShieldAlert size={16} className="text-primary shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-white">Centralized Safety:</strong> If this customer bought a plan in Karimnagar but uses a wash at your **{selectedBranch} branch** today, clicking this button updates your system cloud network instantly. No manual book-keeping errors.
                    </span>
                  </div>
                </div>

                <div className="lg:col-span-5 p-6 md:p-8 rounded-[2.5rem] bg-card border border-white/5 shadow-xl">
                  <h4 className="text-sm font-black text-white tracking-widest uppercase mb-4 border-b border-white/5 pb-3">{selectedBranch.toUpperCase()} DAILY BAY SCHEDULE</h4>
                  <div className="space-y-3">
                    {[
                      { time: "09:30 AM", plate: "TS-10-CZ-9999", type: "Full Body Paint Protection Film (PPF)", status: "Done", color: "text-primary" },
                      { time: "11:30 AM", plate: "TS-09-AB-1234", type: "Gold Package Deep Car Polish", status: "In Workshop Bay", color: "text-yellow-500" },
                      { time: "04:15 PM", plate: "TS-15-KL-5678", type: "Ultra 9H Hardness Ceramic Coating", status: "Booked", color: "text-gray-500" }
                    ].map((q, idx) => (
                      <div key={idx} className="p-4 rounded-xl bg-white/[0.02] border border-white/5 flex justify-between items-center text-xs gap-4">
                        <div>
                          <p className="font-mono font-bold text-white">{q.time} — <span className="text-gray-400">{q.plate}</span></p>
                          <p className="text-gray-500 text-[11px] font-medium mt-0.5">{q.type}</p>
                        </div>
                        <span className={`font-mono text-[9px] font-bold ${q.color} uppercase tracking-wider shrink-0`}>{q.status}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}