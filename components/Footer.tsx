"use client";

import { MapPin, Phone, Gauge } from "lucide-react";

// Native SVG path for Instagram to completely bypass lucide-react export mismatches
const InstagramIcon = ({ className = "w-3 h-3" }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

export default function Footer() {
  const branches = [
    {
      name: "Siddipet Branch",
      phone: "+91 96662 00900",
      rawPhone: "9666200900",
      handle: "@witsiddipet",
      link: "https://www.instagram.com/witsiddipet/"
    },
    {
      name: "Karimnagar Branch",
      phone: "+91 88864 99902",
      rawPhone: "8886499902",
      handle: "@witdetailingstudio",
      link: "https://www.instagram.com/witdetailingstudio/"
    },
    {
      name: "Hanamkonda Branch",
      phone: "+91 96667 71819",
      rawPhone: "9666771819",
      handle: "@wit_hanamkonda",
      link: "https://www.instagram.com/wit_hanamkonda/"
    }
  ];

  return (
    <footer className="w-full bg-[#030303] border-t border-white/5 pt-16 pb-8 px-6 relative overflow-hidden mt-20">
      <div className="max-w-7xl mx-auto grid md:grid-cols-12 gap-10 items-start pb-12 border-b border-white/5 relative z-10">
        
        {/* BRAND SIGNATURE */}
        <div className="md:col-span-4 space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(0,229,255,0.2)]">
              <Gauge className="text-black w-5 h-5" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-sm font-black tracking-tighter text-white">WIT</span>
              <span className="text-[9px] text-primary tracking-[0.2em] font-bold">STUDIO</span>
            </div>
          </div>
          <p className="text-gray-500 text-xs leading-relaxed max-w-sm">
            Telangana's premier detailing network. Delivering ultimate paint protection, paint correction, and custom premium car care across 3 active studio locations.
          </p>
        </div>

        {/* ACTIVE THREE BRANCH DIRECTORY GRID */}
        <div className="md:col-span-8 grid sm:grid-cols-3 gap-6 w-full">
          {branches.map((b, i) => (
            <div key={i} className="space-y-3 p-5 rounded-2xl bg-white/[0.01] border border-white/5 shadow-md">
              <div className="flex items-center gap-2 text-white font-black text-xs uppercase tracking-wider">
                <MapPin size={12} className="text-primary" />
                {b.name}
              </div>
              <div className="space-y-2 text-[11px] font-mono text-gray-400">
                <a href={`tel:${b.rawPhone}`} className="flex items-center gap-2 hover:text-primary transition-colors w-max">
                  <Phone size={11} className="text-gray-500 shrink-0" />
                  {b.phone}
                </a>
                <a href={b.link} target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-primary transition-colors w-max">
                  <InstagramIcon className="w-3 h-3 text-gray-500 shrink-0" />
                  {b.handle}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FOOTER BAR COPYRIGHT METRICS */}
      <div className="max-w-7xl mx-auto pt-6 flex flex-col sm:flex-row justify-between items-center text-[10px] text-gray-600 font-mono gap-4 relative z-10">
        <span>© 2026 WIT STUDIO NETWORK. ALL RIGHTS RESERVED.</span>
        <span className="text-primary/40">CENTRALIZED NETWORK SYSTEM SECURE</span>
      </div>
    </footer>
  );
}