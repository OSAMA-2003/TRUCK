import React, { useState } from 'react';
import {
  Plus, Trash2, Edit3, Image as ImageIcon, Coffee,
  Search, Check, X, Database, LogOut, Sparkles, UserCheck
} from 'lucide-react';
import { isSupabaseConfigured } from '../../lib/supabaseClient';

export default function AdminDashboard({
  adminUser,
  products,
  gallery,
  onAddProduct,
  onUpdateProduct,
  onDeleteProduct,
  onAddGallery,
  onDeleteGallery,
  onLogout,
  onCloseAdmin
}) {
  const [activeTab, setActiveTab] = useState('products'); // 'products' | 'gallery'
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');

  // Product Form Modal State
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const [formName, setFormName] = useState('');
  const [formCategory, setFormCategory] = useState('Coffee');
  const [formPrice, setFormPrice] = useState('');
  const [formTag, setFormTag] = useState('HOT');
  const [formDescription, setFormDescription] = useState('');
  const [formImageUrl, setFormImageUrl] = useState('');

  // Gallery Form Modal State
  const [isGalleryModalOpen, setIsGalleryModalOpen] = useState(false);
  const [galTitle, setGalTitle] = useState('');
  const [galUrl, setGalUrl] = useState('');
  const [galCaption, setGalCaption] = useState('');

  // Sample preset images for quick selection
  const SAMPLE_IMAGES = [
    'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&w=800&q=80',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuB6N8kLv0xHDnb4N34WgxXzo-f_cv-VU09vf2XXHfd-J086kKGgb3Nmp2LR8W442Ff5CdRtgmPprPh01Oy548Z0zh0NF2BXHX0mfauDchuk53wiFW01iXaZdlNnCICHg09eB4o0rza8h8B49yL07H0rGmTsdzFMFaduqbhQ9HNtbP8np31LUiww57rb1kl6Qsz9TGuQNShNSveQ7oLtVn2zMN8mQGL9m6eC1G7LtETehP7t9ekyZl-Qdml2EHqtOxYe5XJfm-02dI-v',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCrNtPPMrHJhyiw3ViEB-2c2P2kHBN2HCEvCph_MbgzORAS3l-zO1bJNJJ4uYuD2LzgHGHP0NZsCYljMPT5dEs5wAGL9ajv383UrNluNH-FbrgPdpbEbrUBb3tA4K11SP0etjiC7Po6q8wwYUpQH0nJtq26t-Q_AzaTaFhDD9vfeq0AV_KB7QAi_Z3yJsPlXrn2xxFRTtKlNbzVpstOXn8S_ZTziQ2Bid9gFjU6k6SpdXtgiwnc5ol__BMVx-VD7YzOCePLDIPrArS7'
  ];

  const handleOpenProductForm = (product = null) => {
    if (product) {
      setEditingProduct(product);
      setFormName(product.name || '');
      setFormCategory(product.category || 'Coffee');
      setFormPrice(product.price || '');
      setFormTag(product.tag || 'HOT');
      setFormDescription(product.description || '');
      setFormImageUrl(product.image_url || '');
    } else {
      setEditingProduct(null);
      setFormName('');
      setFormCategory('Coffee');
      setFormPrice('');
      setFormTag('HOT');
      setFormDescription('');
      setFormImageUrl(SAMPLE_IMAGES[0]);
    }
    setIsProductModalOpen(true);
  };

  const handleSaveProductSubmit = (e) => {
    e.preventDefault();
    if (!formName || !formPrice) return;

    const prodData = {
      id: editingProduct ? editingProduct.id : undefined,
      name: formName,
      category: formCategory,
      price: parseFloat(formPrice),
      tag: formTag,
      description: formDescription,
      image_url: formImageUrl || SAMPLE_IMAGES[0],
      is_available: true
    };

    if (editingProduct) {
      onUpdateProduct(prodData);
    } else {
      onAddProduct(prodData);
    }

    setIsProductModalOpen(false);
  };

  const handleSaveGallerySubmit = (e) => {
    e.preventDefault();
    if (!galUrl) return;

    onAddGallery({
      title: galTitle || 'TRUCK Shot',
      image_url: galUrl,
      caption: galCaption
    });

    setGalTitle('');
    setGalUrl('');
    setGalCaption('');
    setIsGalleryModalOpen(false);
  };

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || p.category?.toLowerCase() === categoryFilter.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-[#fcf9f8] text-[#1c1b1b] pt-24 pb-16 px-4 md:px-12">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* Top Header Banner */}
        <div className="bg-[#3d0006] text-white p-6 md:p-8 rounded-3xl shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border border-[#fed65b]/30">
          <div>
            <div className="flex items-center gap-3 mb-2 flex-wrap">
              <span className="px-3 py-1 bg-[#fed65b] text-[#3d0006] font-montserrat font-bold text-[10px] tracking-widest rounded-full uppercase">
                AUTHENTICATED ADMIN
              </span>
              {/* Backend Status Indicator */}
              <div className="flex items-center gap-1.5 px-3 py-1 bg-white/10 rounded-full text-xs font-hanken">
                <Database className={`w-3.5 h-3.5 ${isSupabaseConfigured ? 'text-green-400' : 'text-amber-400'}`} />
                <span>{isSupabaseConfigured ? 'Supabase Connected' : 'Local Storage Mode'}</span>
              </div>
            </div>

            <h1 className="font-montserrat font-black text-3xl md:text-5xl text-[#ffe088] tracking-tight">
              TRUCK MANAGER
            </h1>

            {/* Authenticated User info */}
            {adminUser && (
              <div className="flex items-center gap-2 font-hanken text-xs text-[#ffb3b1] mt-2">
                <UserCheck className="w-4 h-4 text-[#fed65b]" />
                <span>Logged in as: <strong className="text-white">{adminUser.email}</strong></span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onCloseAdmin}
              className="flex-1 sm:flex-none px-5 py-2.5 bg-white/10 text-white font-montserrat font-bold text-xs tracking-wider rounded-full hover:bg-white/20 transition-all border border-white/20"
            >
              STOREFRONT
            </button>
            <button
              onClick={onLogout}
              className="flex-1 sm:flex-none px-5 py-2.5 bg-red-600 text-white font-montserrat font-bold text-xs tracking-wider rounded-full hover:bg-red-700 transition-all flex items-center justify-center gap-2 shadow"
            >
              <LogOut className="w-3.5 h-3.5" /> LOGOUT
            </button>
          </div>
        </div>

        {/* Overview Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-[#f0eded] p-6 rounded-3xl border border-[#e5e2e1] shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#5d1016] text-[#fed65b] flex items-center justify-center font-bold">
              <Coffee className="w-6 h-6" />
            </div>
            <div>
              <span className="font-montserrat font-bold text-xs text-[#887271] uppercase">Total Products</span>
              <p className="font-montserrat font-black text-3xl text-[#3d0006]">{products.length}</p>
            </div>
          </div>

          <div className="bg-[#f0eded] p-6 rounded-3xl border border-[#e5e2e1] shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#735c00] text-white flex items-center justify-center font-bold">
              <ImageIcon className="w-6 h-6" />
            </div>
            <div>
              <span className="font-montserrat font-bold text-xs text-[#887271] uppercase">Gallery Images</span>
              <p className="font-montserrat font-black text-3xl text-[#3d0006]">{gallery.length}</p>
            </div>
          </div>

          <div className="bg-[#f0eded] p-6 rounded-3xl border border-[#e5e2e1] shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#322e1c] text-[#ffe088] flex items-center justify-center font-bold">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <span className="font-montserrat font-bold text-xs text-[#887271] uppercase">Active Categories</span>
              <p className="font-montserrat font-black text-3xl text-[#3d0006]">3</p>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center justify-between border-b border-[#dbc0bf]/40 pb-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveTab('products')}
              className={`px-6 py-3 rounded-full font-montserrat font-bold text-xs tracking-wider transition-all ${activeTab === 'products'
                  ? 'bg-[#3d0006] text-white shadow-md'
                  : 'bg-[#f0eded] text-[#554241] hover:bg-[#eae7e7]'
                }`}
            >
              PRODUCTS ({products.length})
            </button>
            <button
              onClick={() => setActiveTab('gallery')}
              className={`px-6 py-3 rounded-full font-montserrat font-bold text-xs tracking-wider transition-all ${activeTab === 'gallery'
                  ? 'bg-[#3d0006] text-white shadow-md'
                  : 'bg-[#f0eded] text-[#554241] hover:bg-[#eae7e7]'
                }`}
            >
              GALLERY IMAGES ({gallery.length})
            </button>
          </div>

          {activeTab === 'products' ? (
            <button
              onClick={() => handleOpenProductForm()}
              className="px-5 py-3 bg-[#735c00] text-white font-montserrat font-bold text-xs tracking-wider rounded-full hover:bg-[#3d0006] transition-all flex items-center gap-2 shadow-md"
            >
              <Plus className="w-4 h-4" /> ADD NEW PRODUCT
            </button>
          ) : (
            <button
              onClick={() => setIsGalleryModalOpen(true)}
              className="px-5 py-3 bg-[#735c00] text-white font-montserrat font-bold text-xs tracking-wider rounded-full hover:bg-[#3d0006] transition-all flex items-center gap-2 shadow-md"
            >
              <Plus className="w-4 h-4" /> UPLOAD IMAGE
            </button>
          )}
        </div>

        {/* PRODUCTS TAB CONTENT */}
        {activeTab === 'products' && (
          <div className="space-y-6">
            {/* Search and Filters */}
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-[#f0eded] p-4 rounded-2xl border border-[#e5e2e1]">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 absolute left-3.5 top-3 text-[#887271]" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-white rounded-xl text-sm border border-[#dbc0bf] focus:outline-none focus:ring-2 focus:ring-[#735c00]"
                />
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto">
                {['All', 'Coffee', 'Boba Tea', 'Mojito'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setCategoryFilter(cat)}
                    className={`px-4 py-1.5 rounded-full font-montserrat font-bold text-xs whitespace-nowrap ${categoryFilter === cat
                        ? 'bg-[#3d0006] text-white'
                        : 'bg-white text-[#554241] hover:bg-[#eae7e7]'
                      }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Products Table/Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((p) => (
                <div
                  key={p.id}
                  className="bg-white rounded-3xl p-5 border border-[#e5e2e1] shadow-md flex flex-col justify-between hover:shadow-lg transition-shadow"
                >
                  <div>
                    {/* Image preview */}
                    <div className="w-full h-44 rounded-2xl overflow-hidden mb-4 bg-[#f6f3f2] relative border border-[#e5e2e1]">
                      <img
                        src={p.image_url}
                        alt={p.name}
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute top-3 right-3 px-3 py-1 bg-[#3d0006] text-[#fed65b] font-montserrat font-bold text-[10px] rounded-full uppercase shadow">
                        {p.tag}
                      </span>
                    </div>

                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-montserrat font-black text-xl text-[#3d0006]">{p.name}</h3>
                      <span className="font-playfair font-bold text-xl text-[#735c00]">
                        ${Number(p.price).toFixed(2)}
                      </span>
                    </div>

                    <span className="inline-block px-2.5 py-0.5 bg-[#f0eded] text-[#887271] font-montserrat font-bold text-[10px] rounded mb-3 uppercase">
                      {p.category}
                    </span>

                    <p className="font-hanken text-xs text-[#554241] line-clamp-2 mb-4">
                      {p.description}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#f0eded]">
                    <button
                      onClick={() => handleOpenProductForm(p)}
                      className="p-2.5 bg-[#f0eded] text-[#3d0006] rounded-full hover:bg-[#fed65b] transition-colors"
                      title="Edit product"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onDeleteProduct(p.id)}
                      className="p-2.5 bg-red-50 text-red-600 rounded-full hover:bg-red-500 hover:text-white transition-colors"
                      title="Delete product"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* GALLERY TAB CONTENT */}
        {activeTab === 'gallery' && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {gallery.map((g) => (
              <div
                key={g.id}
                className="bg-white rounded-3xl overflow-hidden border border-[#e5e2e1] shadow-md group relative"
              >
                <div className="w-full h-48 bg-[#f6f3f2] relative">
                  <img
                    src={g.image_url}
                    alt={g.title}
                    className="w-full h-full object-cover"
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
                  {g.caption && <p className="font-hanken text-xs text-[#887271]">{g.caption}</p>}
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* ADD/EDIT PRODUCT MODAL */}
      {isProductModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#fcf9f8] w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl border border-[#dbc0bf]">
            <div className="bg-[#3d0006] text-white p-6 flex justify-between items-center">
              <h3 className="font-montserrat font-black text-xl text-[#ffe088]">
                {editingProduct ? 'EDIT PRODUCT' : 'ADD NEW PRODUCT'}
              </h3>
              <button onClick={() => setIsProductModalOpen(false)} className="text-white/80 hover:text-white">
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSaveProductSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
              <div>
                <label className="block font-montserrat font-bold text-xs text-[#3d0006] mb-1">Product Name</label>
                <input
                  type="text"
                  required
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="e.g. Spanish Latte"
                  className="w-full px-4 py-2.5 rounded-xl border border-[#dbc0bf] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#735c00]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-montserrat font-bold text-xs text-[#3d0006] mb-1">Category</label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#dbc0bf] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#735c00]"
                  >
                    <option value="Coffee">Coffee</option>
                    <option value="Boba Tea">Boba Tea</option>
                    <option value="Mojito">Mojito</option>
                  </select>
                </div>

                <div>
                  <label className="block font-montserrat font-bold text-xs text-[#3d0006] mb-1">Price ($)</label>
                  <input
                    type="number"
                    step="0.1"
                    required
                    value={formPrice}
                    onChange={(e) => setFormPrice(e.target.value)}
                    placeholder="4.50"
                    className="w-full px-4 py-2.5 rounded-xl border border-[#dbc0bf] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#735c00]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-montserrat font-bold text-xs text-[#3d0006] mb-1">Tag Badge</label>
                <select
                  value={formTag}
                  onChange={(e) => setFormTag(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#dbc0bf] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#735c00]"
                >
                  <option value="HOT">HOT</option>
                  <option value="COLD">COLD</option>
                  <option value="SIGNATURE">SIGNATURE</option>
                  <option value="NEW">NEW</option>
                </select>
              </div>

              <div>
                <label className="block font-montserrat font-bold text-xs text-[#3d0006] mb-1">Description</label>
                <textarea
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  placeholder="Floral notes, single origin..."
                  rows="3"
                  className="w-full px-4 py-2.5 rounded-xl border border-[#dbc0bf] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#735c00]"
                ></textarea>
              </div>

              <div>
                <label className="block font-montserrat font-bold text-xs text-[#3d0006] mb-1">Image URL</label>
                <input
                  type="url"
                  value={formImageUrl}
                  onChange={(e) => setFormImageUrl(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-4 py-2.5 rounded-xl border border-[#dbc0bf] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#735c00]"
                />
                <div className="mt-2 text-xs text-[#887271]">Quick Select Sample:</div>
                <div className="flex gap-2 mt-1 overflow-x-auto pb-2">
                  {SAMPLE_IMAGES.map((img, i) => (
                    <img
                      key={i}
                      src={img}
                      onClick={() => setFormImageUrl(img)}
                      className={`w-10 h-10 rounded-lg object-cover cursor-pointer border-2 ${formImageUrl === img ? 'border-[#735c00]' : 'border-transparent'
                        }`}
                    />
                  ))}
                </div>
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-[#dbc0bf]/40">
                <button
                  type="button"
                  onClick={() => setIsProductModalOpen(false)}
                  className="px-5 py-2.5 rounded-full font-montserrat font-bold text-xs text-[#554241] bg-[#f0eded]"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-full font-montserrat font-bold text-xs text-white bg-[#3d0006] hover:bg-[#735c00]"
                >
                  SAVE PRODUCT
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ADD GALLERY IMAGE MODAL */}
      {isGalleryModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#fcf9f8] w-full max-w-md rounded-3xl overflow-hidden shadow-2xl border border-[#dbc0bf]">
            <div className="bg-[#3d0006] text-white p-6 flex justify-between items-center">
              <h3 className="font-montserrat font-black text-xl text-[#ffe088]">UPLOAD GALLERY IMAGE</h3>
              <button onClick={() => setIsGalleryModalOpen(false)} className="text-white/80 hover:text-white">
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSaveGallerySubmit} className="p-6 space-y-4">
              <div>
                <label className="block font-montserrat font-bold text-xs text-[#3d0006] mb-1">Image Title</label>
                <input
                  type="text"
                  value={galTitle}
                  onChange={(e) => setGalTitle(e.target.value)}
                  placeholder="e.g. TRUCK Boba Crafting"
                  className="w-full px-4 py-2.5 rounded-xl border border-[#dbc0bf] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#735c00]"
                />
              </div>

              <div>
                <label className="block font-montserrat font-bold text-xs text-[#3d0006] mb-1">Image URL</label>
                <input
                  type="url"
                  required
                  value={galUrl}
                  onChange={(e) => setGalUrl(e.target.value)}
                  placeholder="https://..."
                  className="w-full px-4 py-2.5 rounded-xl border border-[#dbc0bf] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#735c00]"
                />
              </div>

              <div>
                <label className="block font-montserrat font-bold text-xs text-[#3d0006] mb-1">Caption</label>
                <input
                  type="text"
                  value={galCaption}
                  onChange={(e) => setGalCaption(e.target.value)}
                  placeholder="On the go drinks..."
                  className="w-full px-4 py-2.5 rounded-xl border border-[#dbc0bf] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#735c00]"
                />
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-[#dbc0bf]/40">
                <button
                  type="button"
                  onClick={() => setIsGalleryModalOpen(false)}
                  className="px-5 py-2.5 rounded-full font-montserrat font-bold text-xs text-[#554241] bg-[#f0eded]"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-full font-montserrat font-bold text-xs text-white bg-[#3d0006] hover:bg-[#735c00]"
                >
                  ADD IMAGE
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
