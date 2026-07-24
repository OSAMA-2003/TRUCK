import React from 'react';
import { ArrowDownRight, Sparkles } from 'lucide-react';
import hero from '../assets/hero.png';
import heroVid1 from '../assets/hero-vid-2.mp4';

export default function Hero({ onExploreMenu }) {
  return (
    <section id="home" className="relative w-full h-screen min-h-[640px] flex items-center justify-center pt-20">
      {/* Background Media & Vignette Overlay */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Mobile View Video */}
        <video
          src={heroVid1}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover block md:hidden mix-blend-luminosity filter contrast-125"
        />
        {/* Desktop View Image */}
        <img
          src={hero}
          alt="TRUCK Coffee Trailer urban setup"
          className="w-full h-full object-cover hidden md:block mix-blend-luminosity filter contrast-125"
        />
        <div className="absolute inset-0 bg-black/20 pointer-events-none" />
      </div>

      {/* Hero Content */}



      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-16 flex flex-col items-start text-white">

        {/* <div className="inline-flex items-center gap-2 px-5 py-2 bg-[#fed65b]/90 backdrop-blur-md rounded-full font-montserrat font-bold text-xs uppercase tracking-widest text-[#745c00] mb-6 shadow-xl transform -rotate-2 hover:rotate-0 transition-transform">
          <Sparkles className="w-3.5 h-3.5 text-[#3d0006]" />
          Ready when you are.
        </div>

        <h1 className="font-montserrat font-black text-6xl sm:text-7xl md:text-9xl leading-[0.85] tracking-tighter uppercase mb-6 mix-blend-difference drop-shadow-2xl">
          BEFORE<br />
          <span className="text-[#ffe088] underline decoration-[#735c00]/60 decoration-wavy underline-offset-8">YOU GO</span>
        </h1> */}




        {/* <div className="mt-10 flex flex-wrap items-center gap-4">
          <a
            href="#menu"
            onClick={onExploreMenu}
            className="px-8 py-4 bg-[#fed65b] text-[#3d0006] font-montserrat font-black text-xs tracking-widest uppercase rounded-full hover:bg-white transition-all shadow-xl hover:shadow-[#fed65b]/20 hover:-translate-y-0.5 flex items-center gap-2"
          >
            DISCOVER MENU
            <ArrowDownRight className="w-4 h-4" />
          </a>
          <a
            href="#find-us"
            className="px-8 py-4 bg-transparent border-2 border-white/40 text-white font-montserrat font-bold text-xs tracking-widest uppercase rounded-full hover:bg-white/10 transition-all backdrop-blur-sm"
          >
            LOCATION & TIMINGS
          </a>
        </div> */}
      </div>



    </section>
  );
}
