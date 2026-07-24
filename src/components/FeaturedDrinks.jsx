import React from 'react';
import { ArrowRight, Sparkles, Flame, Snowflake } from 'lucide-react';

export default function FeaturedDrinks({ onSelectCategory }) {
  return (
    <section id="our-drinks" className="w-full bg-[#fcf9f8] py-24 relative overflow-hidden">
      {/* Background Decorative Blur Spheres */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#fed65b]/15 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#3d0006]/10 rounded-full blur-[100px] translate-y-1/4 -translate-x-1/4 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 md:px-16">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 relative z-10">
          <div>
            <span className="font-montserrat font-bold text-xs text-[#554241] tracking-widest uppercase block mb-3">
              SIGNATURE SERIES
            </span>
            <h2 className="font-montserrat font-black text-4xl md:text-6xl text-[#3d0006] leading-none uppercase tracking-tight">
              CRAFTED FOR<br />THE STREET
            </h2>
          </div>
          <a
            href="/menu"
            className="mt-6 md:mt-0 px-8 py-4 bg-[#3d0006] text-[#ffffff] font-montserrat font-bold text-xs tracking-wider rounded-full hover:bg-[#735c00] transition-all duration-300 shadow-xl shadow-[#3d0006]/20 flex items-center gap-2 group"
          >
            VIEW FULL MENU
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">

          {/* Card 1: Boba Tea */}
          <div
            onClick={() => onSelectCategory && onSelectCategory('Boba Tea')}
            className="col-span-1 lg:col-span-7 relative group cursor-pointer"
          >
            <div className="absolute inset-0 bg-[#3d0006] translate-x-3 translate-y-3 rounded-3xl transition-transform group-hover:translate-x-5 group-hover:translate-y-5"></div>
            <div className="relative bg-[#f6f3f2] rounded-3xl overflow-hidden shadow-2xl h-[480px] flex flex-col justify-end p-8 border border-[#e5e2e1]">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB6N8kLv0xHDnb4N34WgxXzo-f_cv-VU09vf2XXHfd-J086kKGgb3Nmp2LR8W442Ff5CdRtgmPprPh01Oy548Z0zh0NF2BXHX0mfauDchuk53wiFW01iXaZdlNnCICHg09eB4o0rza8h8B49yL07H0rGmTsdzFMFaduqbhQ9HNtbP8np31LUiww57rb1kl6Qsz9TGuQNShNSveQ7oLtVn2zMN8mQGL9m6eC1G7LtETehP7t9ekyZl-Qdml2EHqtOxYe5XJfm-02dI-v"
                alt="Colorful Signature Boba Tea"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 mix-blend-multiply"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#3d0006] via-[#3d0006]/30 to-transparent"></div>

              <div className="relative z-10 text-white">
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-[#735c00]/90 backdrop-blur-sm rounded-full font-montserrat font-bold text-[10px] tracking-widest uppercase mb-4 text-[#ffe088]">
                  <Sparkles className="w-3 h-3" /> NEW ARRIVAL
                </span>
                <h3 className="font-montserrat font-black text-4xl sm:text-5xl uppercase leading-none mb-2">
                  Pop. Sip.<br />Repeat.
                </h3>
                <p className="font-playfair text-2xl text-[#ffe088] italic">
                  Premium Boba Tea Series
                </p>
              </div>
            </div>
          </div>

          {/* Card 2: Mojitos */}
          <div
            onClick={() => onSelectCategory && onSelectCategory('Mojito')}
            className="col-span-1 lg:col-span-5 relative group cursor-pointer"
          >
            <div className="absolute inset-0 bg-[#735c00] translate-x-3 translate-y-3 rounded-3xl transition-transform group-hover:translate-x-5 group-hover:translate-y-5"></div>
            <div className="relative bg-[#f6f3f2] rounded-3xl overflow-hidden shadow-2xl h-[480px] flex flex-col justify-between p-8 border border-[#e5e2e1]">
              <img
                src='https://scontent.fcai21-2.fna.fbcdn.net/v/t39.30808-6/748597576_122118293493357843_2518584682834826250_n.jpg?stp=dst-jpg_tt6&cstp=mx1080x1350&ctp=s1080x1350&_nc_cat=111&ccb=1-7&_nc_sid=127cfc&_nc_ohc=t_mjCBIiOR8Q7kNvwFSDPTi&_nc_oc=AdootjDfYQTBaxTm0_5RMK-cxuWN0mbtYNH4XQwPfMMvcVROEBrQMqjS44XS7aczI6c&_nc_zt=23&_nc_ht=scontent.fcai21-2.fna&_nc_gid=T9LzP0ORJJYHSLSVSP5WCg&_nc_ss=7b2a8&oh=00_AQDA869FhLsFJYaXqt73ARS0Z5i5rOzS9DgVCKAqty9abQ&oe=6A699244'
                alt="Refreshing Ice Mojitos"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 mix-blend-multiply"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-[#3d0006]/70 via-transparent to-[#3d0006]/90"></div>

              <div className="relative z-10 text-white self-end text-right w-full">
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-white/20 backdrop-blur-md border border-white/30 rounded-full font-montserrat font-bold text-[10px] tracking-widest uppercase mb-4">
                  <Snowflake className="w-3 h-3 text-[#fed65b]" /> REFRESH
                </span>
              </div>

              <div className="relative z-10 text-white">
                <h3 className="font-montserrat font-black text-4xl uppercase leading-none mb-2">
                  Love<br />At First Sip
                </h3>
                <p className="font-playfair text-xl text-[#ffb3b1] italic">
                  Blue Passion
                </p>
              </div>
            </div>
          </div>

          {/* Card 3: Coffee Philosophy Banner */}
          <div className="col-span-1 lg:col-span-12 relative group mt-4">
            <div className="absolute inset-0 bg-[#322e1c] translate-x-3 translate-y-3 rounded-3xl"></div>
            <div className="relative bg-[#fcf9f8] rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row border border-[#e5e2e1]">
              <div className="md:w-1/2 h-[320px] md:h-auto relative">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAVjZJUm5X0FlHlotH-vGh7ONbnNs0UFyTjPo_zXSbWr8Ya1NFyON0yuHmH2dMapGzs_-xYRhbgo2iX6i-HgehXDJ6Es2RbEF2nqvWwAExM-aKgQYluDMTDanc32PbyCav28TssOWgdzHqYMqM-iAJ2uaV2LXTN8KsSuhkiKBDGSbB6R3CWxHc5tyHjkKGxqg8mmEoGb0FHgrezt1iyfn4tGBzbzJK9C5Xry-qsbQ5VWYSetVS-nteS99ZdHnmaS2TYm5QsZqar0skN"
                  alt="Spilled roasted coffee newspaper art"
                  className="absolute inset-0 w-full h-full object-cover mix-blend-multiply"
                />
              </div>
              <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-[#ffffff]">
                <div className="inline-flex items-center gap-2 mb-4 text-[#735c00] font-montserrat font-bold text-xs tracking-widest uppercase">
                  <Flame className="w-4 h-4 text-[#5d1016]" /> COFFEE CULTURE
                </div>
                <h3 className="font-montserrat font-black text-3xl md:text-5xl text-[#3d0006] uppercase leading-tight mb-4">
                  We Don't<br />Sell Coffee
                </h3>
                <p className="font-hanken text-lg text-[#554241] mb-8 leading-relaxed">
                  We sell fuel for the dreamers. Our signature V60s, lattes, and artisanal brews are crafted to go wherever you go, ready when you are.
                </p>
                <a
                  href="#menu"
                  onClick={() => onSelectCategory && onSelectCategory('Coffee')}
                  className="self-start px-8 py-3.5 border-2 border-[#3d0006] text-[#3d0006] font-montserrat font-bold text-xs tracking-wider rounded-full hover:bg-[#3d0006] hover:text-white transition-all duration-300"
                >
                  EXPLORE BLENDS
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
