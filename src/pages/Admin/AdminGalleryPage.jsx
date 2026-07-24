import React, { useState } from 'react';
import { Plus, Trash2, Image as ImageIcon, X } from 'lucide-react';
import ImageFileUploader from '../../components/Admin/ImageFileUploader';

export default function AdminGalleryPage({ gallery, onAddGallery, onDeleteGallery }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [caption, setCaption] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!url) return;

    onAddGallery({
      title: title || 'TRUCK Photo',
      image_url: url,
      caption: caption
    });

    setTitle('');
    setUrl('');
    setCaption('');
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-[#3d0006] text-white p-6 rounded-3xl shadow-xl border border-[#fed65b]/30">
        <div>
          <h1 className="font-montserrat font-black text-2xl sm:text-3xl text-[#ffe088]">
            GALLERY MANAGEMENT
          </h1>
          <p className="font-hanken text-xs text-[#ffb3b1] mt-1">
            Total {gallery.length} lifestyle and beverage images published
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-6 py-3 bg-[#fed65b] text-[#3d0006] font-montserrat font-bold text-xs tracking-wider rounded-full hover:bg-white transition-all shadow-md flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> UPLOAD IMAGE
        </button>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {gallery.map((g) => (
          <div
            key={g.id}
            className="bg-white rounded-3xl overflow-hidden border border-[#e5e2e1] shadow-md group relative hover:shadow-xl transition-shadow"
          >
            <div className="w-full h-48 bg-[#f6f3f2] relative">
              <img
                src={g.image_url}
                alt={g.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <button
                onClick={() => onDeleteGallery(g.id)}
                className="absolute top-3 right-3 p-2 bg-red-600 text-white rounded-full opacity-90 hover:opacity-100 transition-opacity shadow"
                title="Delete image"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
            <div className="p-4">
              <h4 className="font-montserrat font-bold text-sm text-[#3d0006]">{g.title}</h4>
              {g.caption && <p className="font-hanken text-xs text-[#887271] mt-0.5">{g.caption}</p>}
            </div>
          </div>
        ))}
      </div>

      {/* Upload Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#fcf9f8] w-full max-w-md rounded-3xl overflow-hidden shadow-2xl border border-[#dbc0bf]">
            <div className="bg-[#3d0006] text-white p-6 flex justify-between items-center">
              <h3 className="font-montserrat font-black text-xl text-[#ffe088]">UPLOAD GALLERY PHOTO</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-white/80 hover:text-white">
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block font-montserrat font-bold text-xs text-[#3d0006] mb-1">Photo Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. TRUCK Location Setup"
                  className="w-full px-4 py-2.5 rounded-xl border border-[#dbc0bf] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#735c00]"
                />
              </div>

              {/* Direct Image File Uploader Component */}
              <ImageFileUploader
                value={url}
                onChange={(newUrl) => setUrl(newUrl)}
                label="Gallery Image File"
              />

              <div>
                <label className="block font-montserrat font-bold text-xs text-[#3d0006] mb-1">Caption</label>
                <input
                  type="text"
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  placeholder="Fresh vibes..."
                  className="w-full px-4 py-2.5 rounded-xl border border-[#dbc0bf] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#735c00]"
                />
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-[#dbc0bf]/40">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-full font-montserrat font-bold text-xs text-[#554241] bg-[#f0eded]"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  disabled={!url}
                  className="px-6 py-2.5 rounded-full font-montserrat font-bold text-xs text-white bg-[#3d0006] hover:bg-[#735c00] disabled:opacity-40"
                >
                  ADD TO GALLERY
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
