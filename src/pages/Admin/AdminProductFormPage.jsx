import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { ArrowLeft, Save, Plus, Star } from 'lucide-react';
import ImageFileUploader from '../../components/Admin/ImageFileUploader';

export default function AdminProductFormPage({ products, categories, onSaveProduct, onAddCategory }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = Boolean(id);

  const [formName, setFormName] = useState('');
  const [formCategory, setFormCategory] = useState(categories[0] || 'Coffee');
  const [formPrice, setFormPrice] = useState('');
  const [formTag, setFormTag] = useState('HOT');
  const [formDescription, setFormDescription] = useState('');
  const [formImageUrl, setFormImageUrl] = useState('');
  const [formIsSpecial, setFormIsSpecial] = useState(false);

  // Quick Add New Category Inline
  const [showAddCatInline, setShowAddCatInline] = useState(false);
  const [newCatInput, setNewCatInput] = useState('');

  useEffect(() => {
    if (isEditing && products.length > 0) {
      const target = products.find((p) => p.id === id);
      if (target) {
        setFormName(target.name || '');
        setFormCategory(target.category || categories[0] || 'Coffee');
        setFormPrice(target.price || '');
        setFormTag(target.tag || 'HOT');
        setFormDescription(target.description || '');
        setFormImageUrl(target.image_url || '');
        setFormIsSpecial(Boolean(target.is_special));
      }
    }
  }, [id, products, isEditing, categories]);

  const handleQuickAddCategory = async () => {
    if (!newCatInput.trim()) return;
    const catName = newCatInput.trim();
    await onAddCategory(catName);
    setFormCategory(catName);
    setNewCatInput('');
    setShowAddCatInline(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formName || !formPrice) return;

    onSaveProduct({
      id: isEditing ? id : undefined,
      name: formName,
      category: formCategory,
      price: parseFloat(formPrice),
      tag: formTag,
      description: formDescription,
      image_url: formImageUrl,
      is_available: true,
      is_special: formIsSpecial
    });

    navigate('/admin/products');
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-in fade-in duration-200">

      <Link
        to="/admin/products"
        className="inline-flex items-center gap-2 text-xs font-montserrat font-bold text-[#887271] hover:text-[#3d0006]"
      >
        <ArrowLeft className="w-4 h-4" /> BACK TO PRODUCTS LIST
      </Link>

      <div className="bg-white rounded-3xl p-8 border border-[#e5e2e1] shadow-xl space-y-6">

        <div className="border-b border-[#f0eded] pb-4">
          <span className="px-3 py-1 bg-[#f0eded] text-[#735c00] font-montserrat font-bold text-[10px] tracking-widest rounded-full uppercase">
            {isEditing ? 'UPDATE ITEM' : 'CREATE ITEM'}
          </span>
          <h1 className="font-montserrat font-black text-3xl text-[#3d0006] mt-2">
            {isEditing ? 'EDIT PRODUCT' : 'ADD NEW PRODUCT'}
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block font-montserrat font-bold text-xs text-[#3d0006] mb-1">
              Product Name
            </label>
            <input
              type="text"
              required
              value={formName}
              onChange={(e) => setFormName(e.target.value)}
              placeholder="e.g. Spanish Latte"
              className="w-full px-4 py-3 rounded-2xl border border-[#dbc0bf] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#735c00]"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="block font-montserrat font-bold text-xs text-[#3d0006]">
                  Category
                </label>
                <button
                  type="button"
                  onClick={() => setShowAddCatInline(!showAddCatInline)}
                  className="text-[11px] font-montserrat font-bold text-[#735c00] hover:underline"
                >
                  + Add Category
                </button>
              </div>

              {showAddCatInline ? (
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newCatInput}
                    onChange={(e) => setNewCatInput(e.target.value)}
                    placeholder="New category..."
                    className="w-full px-3 py-2 text-xs border border-[#dbc0bf] rounded-xl"
                  />
                  <button
                    type="button"
                    onClick={handleQuickAddCategory}
                    className="px-3 py-2 bg-[#3d0006] text-white font-bold text-xs rounded-xl"
                  >
                    Add
                  </button>
                </div>
              ) : (
                <select
                  value={formCategory}
                  onChange={(e) => setFormCategory(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl border border-[#dbc0bf] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#735c00]"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              )}
            </div>

            <div>
              <label className="block font-montserrat font-bold text-xs text-[#3d0006] mb-1">
                Price ($)
              </label>
              <input
                type="number"
                step="0.1"
                required
                value={formPrice}
                onChange={(e) => setFormPrice(e.target.value)}
                placeholder="4.50"
                className="w-full px-4 py-3 rounded-2xl border border-[#dbc0bf] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#735c00]"
              />
            </div>
          </div>

          <div>
            <label className="block font-montserrat font-bold text-xs text-[#3d0006] mb-1">
              Tag Badge
            </label>
            <select
              value={formTag}
              onChange={(e) => setFormTag(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl border border-[#dbc0bf] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#735c00]"
            >
              <option value="HOT">HOT</option>
              <option value="COLD">COLD</option>
              <option value="SIGNATURE">SIGNATURE</option>
              <option value="NEW">NEW</option>
            </select>
          </div>

          {/* Special Selection Toggle */}
          <div className="flex items-center gap-3 p-4 bg-[#fcf9f8] rounded-2xl border border-[#dbc0bf]/50">
            <input
              type="checkbox"
              id="isSpecialCheckbox"
              checked={formIsSpecial}
              onChange={(e) => setFormIsSpecial(e.target.checked)}
              className="w-5 h-5 accent-[#3d0006] rounded cursor-pointer"
            />
            <label htmlFor="isSpecialCheckbox" className="font-montserrat font-bold text-xs text-[#3d0006] cursor-pointer flex items-center gap-1.5 select-none">
              <Star className={`w-4 h-4 ${formIsSpecial ? 'text-[#fed65b] fill-[#fed65b]' : 'text-gray-400'}`} />
              Mark as Special Selection (Featured on Home Page)
            </label>
          </div>

          <div>
            <label className="block font-montserrat font-bold text-xs text-[#3d0006] mb-1">
              Description
            </label>
            <textarea
              value={formDescription}
              onChange={(e) => setFormDescription(e.target.value)}
              placeholder="Single origin, smooth espresso..."
              rows="3"
              className="w-full px-4 py-3 rounded-2xl border border-[#dbc0bf] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#735c00]"
            ></textarea>
          </div>

          {/* Direct Image File Uploader Component (No URL typing required!) */}
          <ImageFileUploader
            value={formImageUrl}
            onChange={(url) => setFormImageUrl(url)}
            label="Product Photo (File Upload)"
          />

          {/* Action buttons */}
          <div className="pt-6 flex justify-end gap-3 border-t border-[#f0eded]">
            <button
              type="button"
              onClick={() => navigate('/admin/products')}
              className="px-6 py-3 rounded-full font-montserrat font-bold text-xs text-[#554241] bg-[#f0eded] hover:bg-[#eae7e7]"
            >
              CANCEL
            </button>
            <button
              type="submit"
              className="px-8 py-3 rounded-full font-montserrat font-bold text-xs text-white bg-[#3d0006] hover:bg-[#735c00] transition-colors flex items-center gap-2 shadow-lg"
            >
              <Save className="w-4 h-4 text-[#fed65b]" /> SAVE PRODUCT
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
