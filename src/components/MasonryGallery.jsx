import React, { useState } from 'react';
import { Camera, X, Maximize2 } from 'lucide-react';

export default function MasonryGallery({ gallery }) {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <section id="gallery" className="w-full bg-[#fcf9f8] pt-16 pb-32">
      <div className="max-w-7xl mx-auto px-6 md:px-16">
        
        {/* Title */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#f0eded] rounded-full text-[#735c00] font-montserrat font-bold text-xs tracking-widest uppercase mb-3">
            <Camera className="w-4 h-4 text-[#5d1016]" /> #TRUCKCOFFEE
          </div>
          <h2 className="font-montserrat font-black text-4xl md:text-5xl text-[#3d0006] uppercase tracking-tight">
            The Truck Vibe
          </h2>
          <p className="font-playfair text-xl text-[#554241] mt-2 italic">
            Snap. Share. Tag.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[220px]">
          {gallery.map((item, index) => {
            const isLarge = index === 0;
            const isTall = index === 2;
            const isWide = index === gallery.length - 1 && gallery.length > 3;

            return (
              <div
                key={item.id}
                onClick={() => setSelectedImage(item)}
                className={`rounded-3xl overflow-hidden relative group cursor-pointer shadow-md border border-[#e5e2e1] ${
                  isLarge ? 'col-span-2 row-span-2' : isTall ? 'col-span-1 row-span-2' : isWide ? 'col-span-2 row-span-1' : 'col-span-1 row-span-1'
                }`}
              >
                <img
                  src={item.image_url}
                  alt={item.title || 'TRUCK Coffee moment'}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-[#3d0006]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 text-white">
                  <Maximize2 className="w-6 h-6 text-[#fed65b] mb-2 self-end" />
                  <h4 className="font-montserrat font-bold text-lg">{item.title}</h4>
                  {item.caption && <p className="font-hanken text-xs text-[#ffb3b1]">{item.caption}</p>}
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Image Modal Lightbox */}
      {selectedImage && (
        <div
          onClick={() => setSelectedImage(null)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200"
        >
          <div className="relative max-w-4xl max-h-[90vh] bg-[#3d0006] rounded-3xl overflow-hidden border border-[#fed65b]/40 shadow-2xl p-2" onClick={e => e.stopPropagation()}>
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 z-10 p-2 bg-black/50 text-white rounded-full hover:bg-[#fed65b] hover:text-[#3d0006] transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            <img
              src={selectedImage.image_url}
              alt={selectedImage.title}
              className="max-h-[75vh] w-auto object-contain rounded-2xl mx-auto"
            />
            <div className="p-6 text-center text-white">
              <h3 className="font-montserrat font-bold text-2xl text-[#ffe088]">{selectedImage.title}</h3>
              {selectedImage.caption && <p className="font-hanken text-sm text-[#ffb3b1] mt-1">{selectedImage.caption}</p>}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
