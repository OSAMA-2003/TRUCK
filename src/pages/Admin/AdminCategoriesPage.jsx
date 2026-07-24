import React, { useState } from 'react';
import { Plus, Trash2, Tag, Layers, Check } from 'lucide-react';

export default function AdminCategoriesPage({ categories, onAddCategory, onDeleteCategory }) {
  const [newCatName, setNewCatName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newCatName.trim()) return;

    onAddCategory(newCatName.trim());
    setNewCatName('');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-200">
      
      {/* Header Bar */}
      <div className="bg-[#3d0006] text-white p-6 sm:p-8 rounded-3xl shadow-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border border-[#fed65b]/30">
        <div>
          <span className="px-3 py-1 bg-[#fed65b] text-[#3d0006] font-montserrat font-bold text-[10px] tracking-widest rounded-full uppercase">
            TAXONOMY
          </span>
          <h1 className="font-montserrat font-black text-3xl text-[#ffe088] mt-2">
            CATEGORIES MANAGEMENT
          </h1>
          <p className="font-hanken text-xs text-[#ffb3b1]">
            Create and delete custom categories for products across storefront and menu pages.
          </p>
        </div>
      </div>

      {/* Add New Category Card */}
      <div className="bg-white rounded-3xl p-6 border border-[#e5e2e1] shadow-md">
        <h3 className="font-montserrat font-black text-lg text-[#3d0006] mb-3 flex items-center gap-2">
          <Tag className="w-5 h-5 text-[#735c00]" /> ADD NEW CATEGORY
        </h3>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            required
            value={newCatName}
            onChange={(e) => setNewCatName(e.target.value)}
            placeholder="e.g. Pastries, Cold Brews, Smoothies..."
            className="flex-grow px-4 py-3 rounded-2xl border border-[#dbc0bf] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#735c00]"
          />
          <button
            type="submit"
            className="px-6 py-3 bg-[#3d0006] text-white font-montserrat font-bold text-xs tracking-wider rounded-2xl hover:bg-[#735c00] transition-colors shadow-md flex items-center justify-center gap-2"
          >
            <Plus className="w-4 h-4 text-[#fed65b]" /> ADD CATEGORY
          </button>
        </form>
      </div>

      {/* Existing Categories List */}
      <div className="bg-white rounded-3xl p-6 border border-[#e5e2e1] shadow-md">
        <h3 className="font-montserrat font-black text-lg text-[#3d0006] mb-4 flex items-center gap-2">
          <Layers className="w-5 h-5 text-[#735c00]" /> EXISTING CATEGORIES ({categories.length})
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {categories.map((cat) => (
            <div
              key={cat}
              className="flex items-center justify-between p-4 bg-[#f6f3f2] rounded-2xl border border-[#e5e2e1] hover:border-[#735c00] transition-colors"
            >
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-[#735c00]"></div>
                <span className="font-montserrat font-bold text-sm text-[#3d0006]">{cat}</span>
              </div>

              <button
                onClick={() => onDeleteCategory(cat)}
                className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-full transition-colors"
                title="Delete category"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
