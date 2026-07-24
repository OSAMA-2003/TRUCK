import React from 'react';
import { Gift } from 'lucide-react';

export default function Promotions({ onClaimPromo }) {
  return (
    <section className="w-full py-24 bg-[#f6f3f2] relative flex items-center justify-center overflow-hidden">
      {/* Background Dot Grid */}
      <div
        className="absolute inset-0 z-0 opacity-25"
        style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, #887271 1px, transparent 0)',
          backgroundSize: '32px 32px',
        }}
      ></div>

      <div className="relative z-10 w-full max-w-5xl mx-auto px-6">
        <div className="bg-[#fed65b] rounded-[3rem] p-8 sm:p-14 flex flex-col md:flex-row items-center justify-between shadow-2xl relative overflow-hidden border border-[#735c00]/20">
          
          {/* Glowing Radial Background Decor */}
          <div className="absolute -right-20 -top-20 w-72 h-72 bg-[#735c00] rounded-full mix-blend-multiply opacity-30 blur-3xl pointer-events-none"></div>

          <div className="md:w-2/3 relative z-10 text-[#745c00]">
            <span className="font-montserrat font-bold text-xs tracking-widest uppercase mb-3 block text-[#3d0006]">
              LIMITED TIME OFFER
            </span>
            <h2 className="font-montserrat font-black text-4xl sm:text-6xl uppercase leading-none mb-4 text-[#241a00]">
              Buy 2 <br />
              Get 1{' '}
              <span className="text-[#5d1016] font-playfair italic lowercase text-5xl sm:text-7xl font-normal">
                Free
              </span>
            </h2>
            <p className="font-hanken text-lg text-[#3d0006] max-w-md font-medium">
              On all Signature Boba Teas. Grab a friend, or keep them all to yourself. We won't judge.
            </p>
          </div>

          {/* Action CTA Button */}
          <div className="mt-8 md:mt-0 relative z-10">
            <button
              onClick={onClaimPromo}
              className="w-32 h-32 bg-[#3d0006] text-white rounded-full flex flex-col items-center justify-center shadow-2xl hover:scale-105 transition-transform duration-300 group border-4 border-[#fed65b]"
            >
              <Gift className="w-8 h-8 text-[#fed65b] mb-1 group-hover:-translate-y-1 transition-transform" />
              <span className="font-montserrat font-bold text-[10px] tracking-widest">CLAIM NOW</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
