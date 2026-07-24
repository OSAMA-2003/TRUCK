import React from 'react';
import { MapPin, PhoneCall, Clock } from 'lucide-react';

export default function FindUsBanner() {
  return (
    <section id="find-us" className="w-full bg-[#eae7e7] py-14 border-t border-b border-[#dbc0bf]/40">
      <div className="max-w-7xl mx-auto px-6 md:px-16 flex flex-col md:flex-row items-center justify-around gap-10 text-center md:text-left">
        
        {/* Location Info */}
        <div className="flex items-center gap-5 text-[#1c1b1b]">
          <div className="w-14 h-14 rounded-full bg-[#3d0006] text-[#fed65b] flex items-center justify-center shrink-0 shadow-lg border-2 border-[#fed65b]">
            <MapPin className="w-7 h-7" />
          </div>
          <div>
            <span className="font-montserrat font-bold block text-[#887271] text-[10px] tracking-widest uppercase">
              FIND US
            </span>
            <span className="font-hanken font-bold text-xl sm:text-2xl text-[#3d0006]" dir="rtl">
              شارع القاعات امام الشيخ رجب
            </span>
          </div>
        </div>

        <div className="w-px h-16 bg-[#dbc0bf]/60 hidden md:block"></div>

        {/* Phone Order Info */}
        <div className="flex items-center gap-5 text-[#1c1b1b]">
          <div className="w-14 h-14 rounded-full bg-[#735c00] text-white flex items-center justify-center shrink-0 shadow-lg border-2 border-[#ffe088]">
            <PhoneCall className="w-7 h-7" />
          </div>
          <div>
            <span className="font-montserrat font-bold block text-[#887271] text-[10px] tracking-widest uppercase">
              ORDER AHEAD
            </span>
            <a
              href="tel:01035363026"
              className="font-montserrat font-black text-xl sm:text-2xl text-[#3d0006] tracking-wider hover:text-[#735c00] transition-colors"
            >
              0103 5363026
            </a>
          </div>
        </div>

        <div className="w-px h-16 bg-[#dbc0bf]/60 hidden md:block"></div>

        {/* Operating Hours */}
        <div className="flex items-center gap-5 text-[#1c1b1b]">
          <div className="w-14 h-14 rounded-full bg-[#5d1016] text-[#ffb3b1] flex items-center justify-center shrink-0 shadow-lg border-2 border-[#ffb3b1]">
            <Clock className="w-7 h-7" />
          </div>
          <div>
            <span className="font-montserrat font-bold block text-[#887271] text-[10px] tracking-widest uppercase">
              OPEN EVERYDAY
            </span>
            <span className="font-montserrat font-bold text-lg text-[#3d0006]">
              3:00 PM - 2:00 AM
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}
