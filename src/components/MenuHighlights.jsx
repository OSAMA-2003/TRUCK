import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Check, Flame, Snowflake, Sparkles, Star, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

export default function MenuHighlights({ products, onAddToCart, activeCategory, onCategoryChange }) {
  const [addedId, setAddedId] = useState(null);
  const carouselRef = useRef(null);

  const categories = ['All', 'Coffee', 'Boba Tea', 'Mojito'];

  // Filter for Special Selections
  const specialProductsAll = products.filter((p) => Boolean(p.is_special));

  // Fallback: If admin hasn't marked any as special yet, show signature/featured items
  const baseSpecialList = specialProductsAll.length > 0
    ? specialProductsAll
    : products.filter((p) => p.is_special || p.tag === 'SIGNATURE' || p.tag === 'NEW');

  const filteredProducts = activeCategory === 'All'
    ? baseSpecialList
    : baseSpecialList.filter((p) => p.category?.toLowerCase() === activeCategory.toLowerCase());

  const handleAdd = (product) => {
    onAddToCart(product);
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1500);
  };

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -360, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 360, behavior: 'smooth' });
    }
  };

  const getTagBadge = (tag) => {
    switch (tag) {
      case 'HOT':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-[#5d1016]/80 text-[#ffe088] border border-[#ffe088]/30 rounded-full font-montserrat font-bold text-[10px] tracking-wider backdrop-blur-md">
            <Flame className="w-3 h-3 text-[#ffe088]" /> HOT
          </span>
        );
      case 'COLD':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-sky-950/80 text-sky-200 border border-sky-400/40 rounded-full font-montserrat font-bold text-[10px] tracking-wider backdrop-blur-md">
            <Snowflake className="w-3 h-3 text-sky-300" /> COLD
          </span>
        );
      case 'SIGNATURE':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-[#fed65b] text-[#3d0006] rounded-full font-montserrat font-bold text-[10px] tracking-wider shadow-sm">
            <Sparkles className="w-3 h-3" /> SIGNATURE
          </span>
        );
      default:
        return (
          <span className="inline-block px-2.5 py-0.5 bg-white/20 text-white rounded-full font-montserrat font-bold text-[10px] tracking-wider backdrop-blur-md">
            {tag || 'FRESH'}
          </span>
        );
    }
  };

  return (
    <section id="special-selections" className="w-full bg-[#3d0006] text-white py-24 relative overflow-hidden">
      {/* Subtle Background Pattern & Glow */}
      <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#fed65b_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#fed65b]/10 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 md:px-16 relative z-10">

        {/* Header & Category Filters + Slider Arrows */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-10 gap-8">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#fed65b]/10 border border-[#fed65b]/30 rounded-full text-[#ffe088] font-montserrat font-bold text-xs uppercase tracking-widest mb-4">
              <Star className="w-3.5 h-3.5 fill-[#ffe088]" /> EXCLUSIVE OFFERINGS
            </div>
            <h2 className="font-montserrat font-black text-5xl md:text-7xl mb-4 tracking-tight">
              SPECIAL <span className="text-[#ffe088] underline decoration-[#735c00]">SELECTIONS</span>
            </h2>
            <p className="font-hanken text-lg text-[#ffb3b1] max-w-lg leading-relaxed">
              Handcrafted signature creations & premium blends curated specially by our barista team.
            </p>
          </div>

          {/* Carousel Arrows */}
          <div className="flex items-center gap-3">
            <button
              onClick={scrollLeft}
              className="w-12 h-12 rounded-full bg-[#5d1016]/80 hover:bg-[#fed65b] border border-[#fed65b]/50 text-white hover:text-[#3d0006] transition-all flex items-center justify-center shadow-xl active:scale-95 group"
              aria-label="Previous special item"
            >
              <ChevronLeft className="w-6 h-6 group-hover:-translate-x-0.5 transition-transform" />
            </button>
            <button
              onClick={scrollRight}
              className="w-12 h-12 rounded-full bg-[#5d1016]/80 hover:bg-[#fed65b] border border-[#fed65b]/50 text-white hover:text-[#3d0006] transition-all flex items-center justify-center shadow-xl active:scale-95 group"
              aria-label="Next special item"
            >
              <ChevronRight className="w-6 h-6 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>

        {/* Interactive Glass Carousel Container */}
        {filteredProducts.length > 0 ? (
          <div
            ref={carouselRef}
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory py-4 px-1 mb-12 scroll-smooth no-scrollbar"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {filteredProducts.map((item) => (
              <div
                key={item.id}
                className="w-[290px] sm:w-[330px] md:w-[350px] shrink-0 snap-center group relative bg-gradient-to-b from-[#5d1016] via-[#3d0006] to-[#200003] rounded-[2.5rem] border-2 border-[#fed65b]/40 hover:border-[#fed65b] transition-all duration-500 flex flex-col justify-between shadow-[0_20px_45px_rgba(61,0,6,0.7)] hover:shadow-[0_25px_60px_rgba(254,214,91,0.35)] hover:-translate-y-2 overflow-hidden"
              >
                <div>
                  {/* Photo Stage */}
                  {item.image_url && (
                    <div className="relative w-full h-64 sm:h-72 rounded-t-[2.5rem] rounded-b-2xl overflow-hidden border-b-2 border-[#fed65b]/50 bg-[#3d0006]">
                      <img
                        src={item.image_url}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />

                      {/* Dark Vignette Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#3d0006] via-transparent to-black/40 pointer-events-none"></div>

                      {/* Floating Top Badges */}
                      <div className="absolute top-4 left-4 z-10">
                        <div className="px-3.5 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-[#fed65b]/60 text-[#ffe088] font-montserrat font-bold text-[9px] uppercase tracking-widest flex items-center gap-1.5 shadow-xl">
                          <Star className="w-3.5 h-3.5 fill-[#ffe088] text-[#ffe088]" />
                          <span>SPECIAL SELECTION</span>
                        </div>
                      </div>

                      <div className="absolute top-4 right-4 z-10">
                        {getTagBadge(item.tag)}
                      </div>
                    </div>
                  )}

                  {/* Content */}
                  <div className="p-6 pb-2 space-y-2">
                    <h3 className="font-montserrat font-black text-2xl sm:text-3xl text-white group-hover:text-[#ffe088] transition-colors tracking-tight line-clamp-1">
                      {item.name}
                    </h3>

                    <p className="font-hanken text-xs sm:text-sm text-[#ffb3b1] line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* Price & Action Button Bar */}
                <div className="flex items-center justify-between gap-3 p-6 pt-3 border-t border-white/10 mt-auto">
                  <div className="px-4 py-1.5 rounded-2xl bg-[#fed65b]/15 border border-[#fed65b]/40 text-[#ffe088] font-montserrat font-black text-base sm:text-lg">
                    {Number(item.price)} EGP
                  </div>

                  <button
                    onClick={() => handleAdd(item)}
                    className={`px-5 py-2.5 rounded-2xl font-montserrat font-bold text-xs tracking-wider transition-all duration-300 shadow-xl flex items-center gap-2 ${addedId === item.id
                      ? 'bg-emerald-500 text-white scale-105'
                      : 'bg-gradient-to-r from-[#fed65b] via-[#ffe088] to-[#fed65b] text-[#3d0006] hover:from-white hover:to-white hover:scale-105 shadow-[#fed65b]/30'
                      }`}
                  >
                    {addedId === item.id ? (
                      <>
                        <Check className="w-4 h-4" /> ADDED!
                      </>
                    ) : (
                      <>
                        <Plus className="w-4 h-4" /> ORDER NOW
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 text-[#ffb3b1] font-hanken text-lg">
            No special items in this category currently. Check out our full menu!
          </div>
        )}

        {/* Action link to view full menu page */}
        <div className="flex justify-center pt-4">
          <Link
            to="/menu"
            className="px-10 py-4 bg-[#fed65b] text-[#3d0006] font-montserrat font-black text-xs tracking-widest uppercase rounded-full hover:bg-white transition-all shadow-2xl flex items-center gap-3 group"
          >
            DISCOVER FULL MENU
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

      </div>
    </section>
  );
}
