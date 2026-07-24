import React from 'react';
import { NavLink, Outlet, Navigate, Link } from 'react-router-dom';
import { 
  LayoutDashboard, ShoppingBag, PlusCircle, Image as ImageIcon, 
  LogOut, Store, Database, UserCheck, Tag
} from 'lucide-react';
import { isSupabaseConfigured } from '../../lib/supabaseClient';
import truckLogo from '../../assets/truck-logo.png';

export default function AdminLayout({ adminUser, onLogout }) {
  if (!adminUser) {
    return <Navigate to="/admin/login" replace />;
  }

  const navItems = [
    { label: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { label: 'Products', path: '/admin/products', icon: ShoppingBag },
    { label: 'Add Product', path: '/admin/products/new', icon: PlusCircle },
    { label: 'Categories', path: '/admin/categories', icon: Tag },
    { label: 'Gallery', path: '/admin/gallery', icon: ImageIcon },
  ];

  return (
    <div className="min-h-screen bg-[#fcf9f8] text-[#1c1b1b] flex flex-col md:flex-row">
      
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-[#3d0006] text-white flex flex-col justify-between shrink-0 p-6 shadow-2xl border-r border-[#fed65b]/20">
        <div className="space-y-8">
          
          {/* Brand Logo */}
          <div className="flex items-center gap-3">
            <img
              src={truckLogo}
              alt="TRUCK Logo"
              className="w-10 h-10 rounded-full object-cover border-2 border-[#fed65b] shadow-md"
            />
            <div>
              <h2 className="font-montserrat font-black text-xl text-[#ffe088] tracking-tight">TRUCK ADMIN</h2>
              <span className="font-hanken text-[10px] text-[#ffb3b1] block">Management Panel</span>
            </div>
          </div>

          {/* User Session Info */}
          <div className="bg-[#5d1016] p-3 rounded-2xl border border-white/10 text-xs">
            <div className="flex items-center gap-2 text-[#ffe088] font-bold mb-1">
              <UserCheck className="w-4 h-4 text-[#fed65b]" />
              <span>Admin Account</span>
            </div>
            <p className="text-white/80 font-hanken truncate">{adminUser.email}</p>
            <div className="mt-2 flex items-center gap-1 text-[10px] text-white/60">
              <Database className={`w-3 h-3 ${isSupabaseConfigured ? 'text-green-400' : 'text-amber-400'}`} />
              <span>{isSupabaseConfigured ? 'Supabase Live' : 'Local Sandbox'}</span>
            </div>
          </div>

          {/* Nav Links */}
          <nav className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === '/admin'}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-2xl font-montserrat font-bold text-xs tracking-wider transition-all ${
                      isActive
                        ? 'bg-[#fed65b] text-[#3d0006] shadow-md shadow-[#fed65b]/20'
                        : 'text-[#ffb3b1] hover:bg-white/10 hover:text-white'
                    }`
                  }
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Footer Actions */}
        <div className="pt-6 border-t border-white/10 space-y-2">
          <Link
            to="/"
            className="flex items-center gap-3 px-4 py-2.5 rounded-2xl font-montserrat font-bold text-xs text-white/80 hover:text-white hover:bg-white/10 transition-colors"
          >
            <Store className="w-4 h-4 text-[#fed65b]" />
            <span>View Storefront</span>
          </Link>
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-2xl font-montserrat font-bold text-xs text-red-400 hover:bg-red-500/20 transition-colors text-left"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-grow p-6 md:p-10 max-w-7xl overflow-y-auto">
        <Outlet />
      </main>

    </div>
  );
}
