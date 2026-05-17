"use client";

import { motion } from "framer-motion";
import { Star, Quote, MapPin } from "lucide-react";

const reviews = [
  {
    name: "Ravi Teja",
    vehicle: "Toyota Fortuner (White)",
    location: "Siddipet Branch",
    rating: 5,
    text: "Got the self-healing PPF installed here. The gloss is unbelievable, and minor scratches from highway driving literally vanished under the sun. Truly premium software tracking too, got a WhatsApp alert when my car was ready!",
    date: "2 weeks ago"
  },
  {
    name: "Ananya Reddy",
    vehicle: "Hyundai Verna (Black)",
    location: "Hanamkonda Branch",
    rating: 5,
    text: "The swirl marks on my black Verna were terrible. Their multi-stage paint correction brought back the factory mirror finish. I took their Gold Membership package—12 washes at this price across Telangana is an absolute steal.",
    date: "1 month ago"
  },
  {
    name: "Md. Ali",
    vehicle: "Mahindra Thar",
    location: "Karimnagar Branch",
    rating: 5,
    text: "Outstanding interior steam cleaning and engine detailing. They removed tough mud stains from off-roading completely. Love how I can check my remaining wash balance live on my phone before driving into the bay.",
    date: "3 days ago"
  }
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-20 px-4 md:px-6 bg-[#050505] relative border-t border-white/5 overflow-hidden scroll-mt-20">
      {/* Glow Accent Background */}
      <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* SECTION HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <span className="text-[10px] font-black tracking-[0.4em] text-primary block uppercase mb-2">Customer Trust</span>
          <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tighter">
            WHAT RECENT <span className="text-primary italic">OWNERS SAY</span>
          </h2>
          <p className="text-gray-500 text-xs tracking-wide max-w-md mx-auto mt-2 leading-relaxed">
            Real feedback from car enthusiasts across our Telangana detailing studio network tracks.
          </p>
        </div>

        {/* RESPONSIVE DISPLAY: SIDE-SCROLLS ON MOBILE, CRISP GRID ON LAPTOP */}
        <div className="flex flex-row lg:grid lg:grid-cols-3 gap-6 overflow-x-auto pb-4 lg:pb-0 scrollbar-hide snap-x snap-mandatory w-full">
          {reviews.map((rev, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="w-[85vw] sm:w-[400px] lg:w-full bg-card border border-white/5 rounded-[2rem] p-6 md:p-8 flex flex-col justify-between shrink-0 snap-center shadow-xl hover:border-primary/20 transition-all duration-300 relative group"
            >
              <Quote className="absolute top-6 right-6 text-white/[0.02] group-hover:text-primary/5 transition-colors w-12 h-12 pointer-events-none" />

              <div>
                {/* RATING STARS */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} size={12} className="fill-primary text-primary" />
                  ))}
                </div>

                {/* REVIEW TEXT */}
                <p className="text-gray-300 text-xs md:text-sm leading-relaxed font-medium italic">
                  "{rev.text}"
                </p>
              </div>

              {/* USER METADATA ACCENT PANEL */}
              <div className="mt-6 pt-4 border-t border-white/5 flex flex-col gap-1">
                <div className="flex justify-between items-baseline">
                  <h4 className="text-sm font-black text-white uppercase tracking-tight">{rev.name}</h4>
                  <span className="text-[9px] font-mono text-gray-600">{rev.date}</span>
                </div>
                <p className="text-[11px] font-semibold text-primary font-mono">{rev.vehicle}</p>
                
                <div className="flex items-center gap-1 text-[9px] font-bold text-gray-500 uppercase tracking-wider mt-1">
                  <MapPin size={10} className="text-gray-600" />
                  <span>{rev.location}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}