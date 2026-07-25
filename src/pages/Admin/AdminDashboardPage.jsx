import React from 'react';
import { Link } from 'react-router-dom';
import { Coffee, Image as ImageIcon, Sparkles, Plus, ArrowRight, Tag } from 'lucide-react';

export default function AdminDashboardPage({ products = [], gallery = [], categories = [] }) {
  const totalCategories = categories.length > 0
    ? categories.length
    : new Set(products.map((p) => p.category)).size;

  return (
    <div className="space-y-8 animate-in fade-in duration-200">

      {/* Welcome Banner */}
      <div className="bg-[#3d0006] text-white p-8 rounded-3xl shadow-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 border border-[#fed65b]/30">
        <div>
          <span className="px-3 py-1 bg-[#fed65b] text-[#3d0006] font-montserrat font-bold text-[10px] tracking-widest rounded-full uppercase">
            OVERVIEW
          </span>
          <h1 className="font-montserrat font-black text-3xl sm:text-4xl text-[#ffe088] mt-2">
            ADMIN DASHBOARD
          </h1>
          <p className="font-hanken text-sm text-[#ffb3b1]">
            Manage products, pricing, and gallery photos across TRUCK Coffee to Go.
          </p>
        </div>

        <Link
          to="/admin/products/new"
          className="px-6 py-3.5 bg-[#fed65b] text-[#3d0006] font-montserrat font-bold text-xs tracking-wider rounded-full hover:bg-white transition-all shadow-lg flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> ADD NEW PRODUCT
        </Link>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-[#f0eded] p-6 rounded-3xl border border-[#e5e2e1] shadow-sm flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-[#5d1016] text-[#fed65b] flex items-center justify-center font-bold">
            <Coffee className="w-7 h-7" />
          </div>
          <div>
            <span className="font-montserrat font-bold text-xs text-[#887271] uppercase">Total Products</span>
            <p className="font-montserrat font-black text-3xl text-[#3d0006]">{products.length}</p>
          </div>
        </div>

        <div className="bg-[#f0eded] p-6 rounded-3xl border border-[#e5e2e1] shadow-sm flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-[#735c00] text-white flex items-center justify-center font-bold">
            <ImageIcon className="w-7 h-7" />
          </div>
          <div>
            <span className="font-montserrat font-bold text-xs text-[#887271] uppercase">Gallery Images</span>
            <p className="font-montserrat font-black text-3xl text-[#3d0006]">{gallery.length}</p>
          </div>
        </div>

        <div className="bg-[#f0eded] p-6 rounded-3xl border border-[#e5e2e1] shadow-sm flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-[#322e1c] text-[#ffe088] flex items-center justify-center font-bold">
            <Tag className="w-7 h-7" />
          </div>
          <div>
            <span className="font-montserrat font-bold text-xs text-[#887271] uppercase">Total Categories</span>
            <p className="font-montserrat font-black text-3xl text-[#3d0006]">{totalCategories}</p>
          </div>
        </div>
      </div>

      {/* Quick Navigation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Manage Products Card */}
        <div className="bg-white p-8 rounded-3xl border border-[#e5e2e1] shadow-md flex flex-col justify-between space-y-6">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-[#f0eded] text-[#3d0006] flex items-center justify-center font-bold mb-4">
              <Coffee className="w-6 h-6" />
            </div>
            <h3 className="font-montserrat font-black text-2xl text-[#3d0006]">Product Management</h3>
            <p className="font-hanken text-sm text-[#554241] mt-2">
              Add new beverages, update prices, descriptions, and tags (`HOT`, `COLD`, `SIGNATURE`).
            </p>
          </div>

          <Link
            to="/admin/products"
            className="inline-flex items-center gap-2 font-montserrat font-bold text-xs text-[#735c00] hover:text-[#3d0006] group"
          >
            VIEW PRODUCTS LIST
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Manage Gallery Card */}
        <div className="bg-white p-8 rounded-3xl border border-[#e5e2e1] shadow-md flex flex-col justify-between space-y-6">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-[#f0eded] text-[#735c00] flex items-center justify-center font-bold mb-4">
              <ImageIcon className="w-6 h-6" />
            </div>
            <h3 className="font-montserrat font-black text-2xl text-[#3d0006]">Gallery Manager</h3>
            <p className="font-hanken text-sm text-[#554241] mt-2">
              Upload photos of truck locations, boba crafting, and customer vibes.
            </p>
          </div>

          <Link
            to="/admin/gallery"
            className="inline-flex items-center gap-2 font-montserrat font-bold text-xs text-[#735c00] hover:text-[#3d0006] group"
          >
            MANAGE GALLERY IMAGES
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

      </div>

    </div>
  );
}
