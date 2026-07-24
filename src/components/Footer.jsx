import React from 'react';
import { Phone, MapPin, Coffee, Camera, Share2 } from 'lucide-react';
import truckLogo from '../assets/truck-logo.png';

export default function Footer() {
  return (
    <footer className="w-full bg-[#3d0006] text-white py-16">
      <div className="max-w-7xl mx-auto px-6 md:px-16 grid grid-cols-1 md:grid-cols-3 gap-12">

        {/* Brand Summary */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <img
              src={truckLogo}
              alt="TRUCK Logo"
              className="w-26  object-contain"
            />

          </div>
          <p className="font-hanken text-sm text-[#e27675] max-w-xs leading-relaxed">
            Brewing high-end urban coffee, artisan V60, and premium boba tea for the explorers and dreamers.
          </p>
        </div>

        {/* Contact Info */}
        <div className="space-y-4">
          <h4 className="font-montserrat font-bold text-xs tracking-widest text-[#fed65b]">
            CONTACT US
          </h4>
          <div className="flex items-center gap-3 text-white">
            <Phone className="w-5 h-5 text-[#fed65b]" />
            <a href="tel:01035363026" className="font-hanken text-lg hover:text-[#fed65b] transition-colors">
              0103 5363026
            </a>
          </div>
          <div className="flex items-center gap-3 text-white">
            <MapPin className="w-5 h-5 text-[#fed65b]" />
            <span className="font-hanken text-lg" dir="rtl">
              شارع القاعات امام الشيخ رجب
            </span>
          </div>
        </div>

        {/* Social Links */}
        <div className="space-y-4">
          <h4 className="font-montserrat font-bold text-xs tracking-widest text-[#fed65b]">
            FOLLOW THE TRUCK
          </h4>
          <div className="flex gap-4">
            <a
              href="#"
              className="p-3 border border-[#887271] rounded-full hover:bg-[#735c00] hover:border-[#fed65b] transition-colors"
              aria-label="Share"
            >
              <Share2 className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="p-3 border border-[#887271] rounded-full hover:bg-[#735c00] hover:border-[#fed65b] transition-colors"
              aria-label="Cafe"
            >
              <Coffee className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="p-3 border border-[#887271] rounded-full hover:bg-[#735c00] hover:border-[#fed65b] transition-colors"
              aria-label="Camera"
            >
              <Camera className="w-5 h-5" />
            </a>
          </div>
        </div>

      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-16 mt-16 pt-8 border-t border-white/10 text-center text-[#e27675] text-xs font-montserrat tracking-widest">
        © {new Date().getFullYear()} TRUCK COFFEE TO GO. ALL RIGHTS RESERVED.
      </div>
    </footer>
  );
}
