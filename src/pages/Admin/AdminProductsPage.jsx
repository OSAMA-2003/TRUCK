import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Edit3, Trash2, Search, Star } from 'lucide-react';

export default function AdminProductsPage({ products, categories = ['Coffee', 'Boba Tea', 'Mojito'], onDeleteProduct, onSaveProduct }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');

  const filterTabs = ['All', 'Special Selections', ...categories];

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'All'
      ? true
      : categoryFilter === 'Special Selections'
        ? Boolean(p.is_special)
        : p.category?.toLowerCase() === categoryFilter.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  const handleToggleSpecial = (product) => {
    if (onSaveProduct) {
      onSaveProduct({
        ...product,
        is_special: !product.is_special
      });
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">

      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-[#3d0006] text-white p-6 rounded-3xl shadow-xl border border-[#fed65b]/30">
        <div>
          <h1 className="font-montserrat font-black text-2xl sm:text-3xl text-[#ffe088]">
            PRODUCTS MANAGEMENT
          </h1>
          <p className="font-hanken text-xs text-[#ffb3b1] mt-1">
            Total {products.length} products ({products.filter(p => p.is_special).length} Special Selections)
          </p>
        </div>

        <Link
          to="/admin/products/new"
          className="px-6 py-3 bg-[#fed65b] text-[#3d0006] font-montserrat font-bold text-xs tracking-wider rounded-full hover:bg-white transition-all shadow-md flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> ADD PRODUCT
        </Link>
      </div>

      {/* Search & Filter bar */}
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
          {filterTabs.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-4 py-1.5 rounded-full font-montserrat font-bold text-xs whitespace-nowrap ${categoryFilter === cat
                  ? 'bg-[#3d0006] text-white'
                  : 'bg-white text-[#554241] hover:bg-[#eae7e7]'
                }`}
            >
              {cat === 'Special Selections' ? '⭐ Special Selections' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((p) => (
          <div
            key={p.id}
            className={`bg-white rounded-3xl p-5 border shadow-md flex flex-col justify-between hover:shadow-lg transition-shadow relative ${p.is_special ? 'border-[#fed65b] ring-2 ring-[#fed65b]/40' : 'border-[#e5e2e1]'
              }`}
          >
            <div>
              <div className="w-full h-44 rounded-2xl overflow-hidden mb-4 bg-[#f6f3f2] relative border border-[#e5e2e1]">
                <img
                  src={p.image_url}
                  alt={p.name}
                  className="w-full h-full object-cover"
                />

                {/* Special Selection Badge */}
                {p.is_special && (
                  <span className="absolute top-3 left-3 px-3 py-1 bg-[#fed65b] text-[#3d0006] font-montserrat font-bold text-[10px] rounded-full uppercase shadow flex items-center gap-1">
                    <Star className="w-3 h-3 fill-[#3d0006]" /> SPECIAL
                  </span>
                )}

                <span className="absolute top-3 right-3 px-3 py-1 bg-[#3d0006] text-[#fed65b] font-montserrat font-bold text-[10px] rounded-full uppercase shadow">
                  {p.tag}
                </span>
              </div>

              <div className="flex justify-between items-start mb-2">
                <h3 className="font-montserrat font-black text-xl text-[#3d0006]">{p.name}</h3>
                <span className="font-playfair font-bold text-lg text-[#735c00]">
                  {Number(p.price).toFixed(2)} EGP
                </span>
              </div>

              <div className="flex items-center gap-2 mb-3">
                <span className="inline-block px-2.5 py-0.5 bg-[#f0eded] text-[#887271] font-montserrat font-bold text-[10px] rounded uppercase">
                  {p.category}
                </span>
                {p.is_special && (
                  <span className="inline-block px-2.5 py-0.5 bg-[#fed65b]/20 text-[#745c00] font-montserrat font-bold text-[10px] rounded uppercase">
                    ⭐ Special Selection
                  </span>
                )}
              </div>

              <p className="font-hanken text-xs text-[#554241] line-clamp-2 mb-4">
                {p.description}
              </p>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-[#f0eded]">
              <button
                onClick={() => handleToggleSpecial(p)}
                className={`px-3 py-1.5 rounded-full text-[11px] font-montserrat font-bold transition-all flex items-center gap-1.5 ${p.is_special
                    ? 'bg-[#fed65b] text-[#3d0006] hover:bg-[#ffe088]'
                    : 'bg-[#f0eded] text-[#887271] hover:bg-[#fed65b]/50 hover:text-[#3d0006]'
                  }`}
                title={p.is_special ? 'Remove from Special Selections' : 'Mark as Special Selection'}
              >
                <Star className={`w-3.5 h-3.5 ${p.is_special ? 'fill-[#3d0006]' : ''}`} />
                {p.is_special ? 'Special' : 'Make Special'}
              </button>

              <div className="flex items-center gap-2">
                <Link
                  to={`/admin/products/edit/${p.id}`}
                  className="p-2.5 bg-[#f0eded] text-[#3d0006] rounded-full hover:bg-[#fed65b] transition-colors"
                  title="Edit product"
                >
                  <Edit3 className="w-4 h-4" />
                </Link>
                <button
                  onClick={() => onDeleteProduct(p.id)}
                  className="p-2.5 bg-red-50 text-red-600 rounded-full hover:bg-red-500 hover:text-white transition-colors"
                  title="Delete product"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-16 text-[#887271] font-hanken">
          No products found matching your search.
        </div>
      )}

    </div>
  );
}
