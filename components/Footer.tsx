"use client";

import { MapPin, Phone, Gauge, Sparkles, Briefcase } from "lucide-react";

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
      link: "https://www.instagram.com/witsiddipet/",
      // FIXED: Clean, direct Google Maps search query link that opens natively on iOS/Android
      mapUrl: "https://www.google.com/maps/search/?api=1&query=WIT+CAR+WASH+%26+DETAILING+STUDIO+Siddipet" 
    },
    {
      name: "Karimnagar Branch",
      phone: "+91 88864 99902",
      rawPhone: "8886499902",
      handle: "@witdetailingstudio",
      link: "https://www.instagram.com/witdetailingstudio/",
      mapUrl: "https://www.google.com/maps/search/?api=1&query=WIT+Studio+Karimnagar" 
    },
    {
      name: "Hanamkonda Branch",
      phone: "+91 96667 71819",
      rawPhone: "9666771819",
      handle: "@wit_hanamkonda",
      link: "https://www.instagram.com/wit_hanamkonda/",
      mapUrl: "https://www.google.com/maps/search/?api=1&query=WIT+Studio+Hanamkonda" 
    }
  ];

  return (
    <footer className="w-full bg-[#030303] border-t border-white/5 pt-16 pb-8 px-6 relative overflow-hidden mt-20">
      
      {/* 1. TOP INFORMATION & DIRECTORY GRID */}
      <div className="max-w-7xl mx-auto grid md:grid-cols-12 gap-10 items-start pb-12 border-b border-white/5 relative z-10">
        
        {/* BRAND SIGNATURE */}
        <div className="md:col-span-4 space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(0,112,243,0.2)]">
              <Gauge className="text-black w-5 h-5" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-sm font-black tracking-tighter text-white">WIT</span>
              <span className="text-[9px] text-primary tracking-[0.2em] font-bold">STUDIO</span>
            </div>
          </div>
          <p className="text-gray-500 text-xs leading-relaxed max-w-sm">
            Telangana's premier detailing network. Delivering ultimate paint protection, paint correction, and custom premium car care across active studio locations.
          </p>
        </div>

        {/* ACTIVE THREE BRANCH DIRECTORY GRID */}
        <div className="md:col-span-8 grid sm:grid-cols-3 gap-6 w-full">
          {branches.map((b, i) => (
            <div key={i} className="space-y-3 p-5 rounded-2xl bg-white/[0.01] border border-white/5 shadow-md flex flex-col justify-between">
              <div className="space-y-3">
                {/* PARSEABLE MAP REDIRECTION CHANNEL */}
                <a 
                  href={b.mapUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center gap-2 text-white font-black text-xs uppercase tracking-wider hover:text-primary transition-colors group"
                >
                  <MapPin size={12} className="text-primary group-hover:scale-110 transition-transform" />
                  <span>{b.name}</span>
                  <span className="text-[9px] text-gray-600 font-mono font-normal lowercase pl-0.5 opacity-0 group-hover:opacity-100 transition-opacity">maps↗</span>
                </a>
                
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
            </div>
          ))}
        </div>
      </div>

      {/* 2. FRANCHISE OPPORTUNITY CAPTURE SECTION */}
      <div className="max-w-7xl mx-auto py-10 border-b border-white/5 relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4 text-center md:text-left">
          <div className="w-10 h-10 rounded-2xl bg-[#0070F3]/10 border border-[#0070F3]/20 flex items-center justify-center text-primary shrink-0">
            <Briefcase size={16} />
          </div>
          <div>
            <h4 className="text-white text-sm font-black uppercase tracking-tight flex items-center justify-center md:justify-start gap-2">
              OWN A WIT STUDIO FRANCHISE <Sparkles size={12} className="text-primary animate-pulse" />
            </h4>
            <p className="text-gray-500 text-xs mt-0.5 max-w-xl">
              Partner with the highest-rated auto detailing brand in Telangana. Tap below to directly contact our franchise desk line.
            </p>
          </div>
        </div>

        {/* FRANCHISE SMART TEXT INQUIRY BUTTON ROUTE */}
        <a 
          href="https://wa.me/918977507720?text=I%20am%20interested%20in%20the%20WIT%20Studio%20Franchise%20Opportunity.%20Please%20share%20the%20business%20proposal."
          target="_blank"
          rel="noopener noreferrer"
          className="w-full md:w-auto px-6 py-3.5 bg-card text-primary hover:bg-primary hover:text-black border border-[#0070F3]/30 hover:border-primary font-black text-xs tracking-widest rounded-xl transition-all flex items-center justify-center gap-2 uppercase shrink-0 shadow-[0_0_20px_rgba(0,112,243,0.05)]"
        >
          📞 CONTACT FRANCHISE DESK
        </a>
      </div>

      {/* 3. FOOTER BAR COPYRIGHT METRICS */}
      <div className="max-w-7xl mx-auto pt-8 flex flex-col sm:flex-row justify-between items-center text-[10px] text-gray-600 font-mono gap-4 relative z-10">
        <span>© 2026 WIT STUDIO NETWORK. ALL RIGHTS RESERVED.</span>
        <span className="text-primary/40 tracking-wider">CENTRALIZED NETWORK SYSTEM SECURE</span>
      </div>
    </footer>
  );
}