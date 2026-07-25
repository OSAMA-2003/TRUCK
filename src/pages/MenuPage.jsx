import React, { useState } from 'react';
import { Sparkles, Flame, Snowflake, Plus, Check, ArrowLeft, Coffee } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function MenuPage({ products, categories = ['Coffee', 'Boba Tea', 'Mojito'], onAddToCart, onOpenOrderModal }) {
  const [activeFilter, setActiveFilter] = useState('All');
  const [addedId, setAddedId] = useState(null);

  const filterTabs = ['All', ...categories];

  const filteredProducts = activeFilter === 'All'
    ? products
    : products.filter(p => p.category?.toLowerCase() === activeFilter.toLowerCase());

  const handleAdd = (product) => {
    onAddToCart(product);
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1500);
  };

  const getTagBadge = (tag) => {
    switch (tag) {
      case 'HOT':
        return (
          <span className="bg-white/10 text-white/80 text-[10px] px-2 py-0.5 rounded font-bold uppercase tracking-wider inline-flex items-center gap-1">
            <Flame className="w-3 h-3 text-[#ffb3b1]" /> Hot
          </span>
        );
      case 'COLD':
        return (
          <span className="bg-white/10 text-white/80 text-[10px] px-2 py-0.5 rounded font-bold uppercase tracking-wider inline-flex items-center gap-1">
            <Snowflake className="w-3 h-3 text-[#fed65b]" /> Cold
          </span>
        );
      case 'SIGNATURE':
        return (
          <span className="bg-[#fed65b]/20 text-[#ffe088] text-[10px] px-2 py-0.5 rounded font-bold uppercase tracking-wider inline-flex items-center gap-1 border border-[#fed65b]/40">
            <Sparkles className="w-3 h-3" /> Signature
          </span>
        );
      default:
        return (
          <span className="bg-white/10 text-white/70 text-[10px] px-2 py-0.5 rounded font-bold uppercase tracking-wider">
            {tag || 'Fresh'}
          </span>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#3d0006] text-white pt-24 pb-20">



      {/* Header Banner from Stitch MCP Visual List Menu */}
      <div className="relative w-full py-12 overflow-hidden flex justify-center items-center text-center">
        <div className="absolute inset-0 bg-[#5d1016]/40 -z-10 blur-3xl rounded-full scale-150 pointer-events-none"></div>
        <div className="space-y-3 relative z-10 px-6">
          <span className="inline-block px-4 py-1.5 bg-[#fed65b] text-[#3d0006] font-montserrat font-black text-xs tracking-widest rounded-full uppercase shadow">
            URBAN ROAST & FLOW
          </span>
          <h1 className="font-montserrat font-black text-5xl md:text-7xl text-[#ffe088] uppercase tracking-tighter drop-shadow-md">
            OUR MENU
          </h1>

          <div className="w-20 h-1 bg-[#fed65b] mx-auto rounded-full mt-4"></div>
        </div>
      </div>

      {/* Category Filter Navigation */}
      <div className="max-w-4xl mx-auto px-6 mb-12">
        <div className="bg-[#5d1016] shadow-2xl rounded-2xl p-3 grid grid-cols-2 sm:flex sm:flex-wrap justify-center gap-2.5 items-center border border-white/10">
          {filterTabs.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`font-montserrat font-bold text-xs tracking-wider px-4 py-2.5 rounded-full transition-all text-center flex items-center justify-center ${activeFilter === cat
                ? 'bg-[#fed65b] text-[#3d0006] shadow-md scale-105'
                : 'text-[#ffe088] hover:text-white hover:bg-white/10'
                }`}
            >
              {cat === 'All' ? 'ALL ' : cat.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Visual List Menu Items - Compact Grid to fit many products per screen */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
          {filteredProducts.map((item) => (
            <div
              key={item.id}
              className="group bg-[#5d1016]/40 hover:bg-[#5d1016]/80 p-3 sm:p-4 rounded-2xl border border-white/10 hover:border-[#fed65b]/50 transition-all duration-300 shadow-lg flex flex-col justify-between hover:-translate-y-1"
            >
              <div>
                {/* Compact Image thumbnail with badge overlay */}
                {item.image_url && (
                  <div className="w-full h-28 sm:h-36 rounded-xl overflow-hidden border border-white/10 group-hover:border-[#fed65b]/60 transition-colors relative bg-[#3d0006] mb-3">
                    <img
                      src={item.image_url}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-2 right-2 z-10">
                      {getTagBadge(item.tag)}
                    </div>
                  </div>
                )}

                {/* Title & Description */}
                <h3 className="font-montserrat font-black text-xs sm:text-sm text-white uppercase tracking-tight group-hover:text-[#ffe088] transition-colors line-clamp-1 mb-1">
                  {item.name}
                </h3>
                <p className="text-[#ffb3b1] font-hanken text-[10px] sm:text-xs line-clamp-2 leading-tight mb-3">
                  {item.description}
                </p>
              </div>

              {/* Compact Price & Add button bar */}
              <div className="flex items-center justify-between pt-2 border-t border-white/10 mt-auto">
                <span className="font-montserrat font-black text-xs sm:text-sm text-[#ffe088]">
                  {Number(item.price).toFixed(2)} EGP
                </span>
                <button
                  onClick={() => handleAdd(item)}
                  className={`p-2 rounded-full transition-all shadow-md ${addedId === item.id
                    ? 'bg-emerald-500 text-white'
                    : 'bg-[#fed65b] text-[#3d0006] hover:bg-white hover:scale-110'
                    }`}
                  title="Add to order"
                >
                  {addedId === item.id ? <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> : <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-16 text-[#ffb3b1] font-hanken">
            No items in this category yet.
          </div>
        )}
      </div>

      {/* Floating View Cart Footer Bar */}
      <div className="fixed bottom-6 inset-x-0 z-40 max-w-md mx-auto px-4">
        <button
          onClick={onOpenOrderModal}
          className="w-full py-4 bg-[#fed65b] text-[#3d0006] font-montserrat font-black text-xs tracking-widest uppercase rounded-full shadow-2xl hover:bg-white transition-all flex items-center justify-center gap-3 border-2 border-[#3d0006]"
        >
          <Coffee className="w-5 h-5" /> VIEW YOUR ORDER & CHECKOUT
        </button>
      </div>

    </div>
  );
}
