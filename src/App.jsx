import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import FeaturedDrinks from './components/FeaturedDrinks';
import MenuHighlights from './components/MenuHighlights';
import Promotions from './components/Promotions';
import MasonryGallery from './components/MasonryGallery';
import FindUsBanner from './components/FindUsBanner';
import Footer from './components/Footer';
import OrderModal from './components/OrderModal';

// Pages
import MenuPage from './pages/MenuPage';
import AdminLayout from './components/Admin/AdminLayout';
import AdminLoginPage from './pages/Admin/AdminLoginPage';
import AdminDashboardPage from './pages/Admin/AdminDashboardPage';
import AdminProductsPage from './pages/Admin/AdminProductsPage';
import AdminProductFormPage from './pages/Admin/AdminProductFormPage';
import AdminCategoriesPage from './pages/Admin/AdminCategoriesPage';
import AdminGalleryPage from './pages/Admin/AdminGalleryPage';

// Supabase Layer
import { 
  fetchProducts, saveProduct, removeProduct, 
  fetchGallery, saveGalleryItem, removeGalleryItem,
  fetchCategories, saveCategory, removeCategory,
  getAdminSession, logoutAdmin
} from './lib/supabaseClient';

function LandingPage({ products, onAddToCart, activeCategory, onCategoryChange, onClaimPromo, gallery }) {
  return (
    <main className="w-full">
      <Hero onExploreMenu={() => onCategoryChange('All')} />
      <FeaturedDrinks onSelectCategory={(cat) => onCategoryChange(cat)} />
      <MenuHighlights
        products={products}
        onAddToCart={onAddToCart}
        activeCategory={activeCategory}
        onCategoryChange={onCategoryChange}
      />
      <Promotions onClaimPromo={onClaimPromo} />
      <MasonryGallery gallery={gallery} />
      <FindUsBanner />
    </main>
  );
}

function AppContent() {
  const [products, setProducts] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [categories, setCategories] = useState(['Coffee', 'Boba Tea', 'Mojito', 'Pastries']);
  const [loading, setLoading] = useState(true);

  // App UI state
  const [adminUser, setAdminUser] = useState(null);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');
  const [cartItems, setCartItems] = useState([]);

  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  // Scroll to top 0 on every route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Load initial data & session
  useEffect(() => {
    async function loadData() {
      try {
        const [prodData, galData, catData, sessionUser] = await Promise.all([
          fetchProducts(),
          fetchGallery(),
          fetchCategories(),
          getAdminSession()
        ]);
        setProducts(prodData);
        setGallery(galData);
        if (catData && catData.length > 0) setCategories(catData);
        if (sessionUser) setAdminUser(sessionUser);
      } catch (err) {
        console.error('Error loading data:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const handleLogout = async () => {
    await logoutAdmin();
    setAdminUser(null);
  };

  // Cart Operations
  const handleAddToCart = (product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (id, newQty) => {
    if (newQty <= 0) {
      handleRemoveCartItem(id);
      return;
    }
    setCartItems(prev => prev.map(item => item.id === id ? { ...item, quantity: newQty } : item));
  };

  const handleRemoveCartItem = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  // Category CRUD
  const handleAddCategory = async (catName) => {
    const updated = await saveCategory(catName);
    if (updated) setCategories(updated);
  };

  const handleDeleteCategory = async (catName) => {
    const updated = await removeCategory(catName);
    if (updated) setCategories(updated);
  };

  // Product CRUD
  const handleSaveProduct = async (prodData) => {
    const saved = await saveProduct(prodData);
    setProducts(prev => {
      const exists = prev.some(p => p.id === saved.id);
      if (exists) return prev.map(p => p.id === saved.id ? saved : p);
      return [saved, ...prev];
    });
  };

  const handleDeleteProduct = async (id) => {
    await removeProduct(id);
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  // Gallery CRUD
  const handleAddGallery = async (item) => {
    const saved = await saveGalleryItem(item);
    setGallery(prev => [saved, ...prev]);
  };

  const handleDeleteGallery = async (id) => {
    await removeGalleryItem(id);
    setGallery(prev => prev.filter(g => g.id !== id));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#3d0006] text-white flex flex-col items-center justify-center gap-4">
        <div className="w-16 h-16 rounded-full border-4 border-[#fed65b] border-t-transparent animate-spin"></div>
        <span className="font-montserrat font-bold text-lg text-[#ffe088] tracking-widest uppercase">
          LOADING TRUCK...
        </span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fcf9f8] text-[#1c1b1b] font-sans antialiased">
      
      {/* Hide Storefront Navigation on Admin Routes */}
      {!isAdminRoute && (
        <Header
          onOpenOrderModal={() => setIsOrderModalOpen(true)}
          cartCount={cartItems.reduce((acc, curr) => acc + curr.quantity, 0)}
        />
      )}

      <Routes>
        {/* Storefront Home */}
        <Route
          path="/"
          element={
            <LandingPage
              products={products}
              onAddToCart={handleAddToCart}
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
              onClaimPromo={() => setIsOrderModalOpen(true)}
              gallery={gallery}
            />
          }
        />

        {/* Dedicated Menu Page (Visual List Menu from Stitch MCP) */}
        <Route
          path="/menu"
          element={
            <MenuPage
              products={products}
              categories={categories}
              onAddToCart={handleAddToCart}
              onOpenOrderModal={() => setIsOrderModalOpen(true)}
            />
          }
        />

        {/* Admin Login Route */}
        <Route
          path="/admin/login"
          element={
            <AdminLoginPage
              onLoginSuccess={(user) => setAdminUser(user)}
            />
          }
        />

        {/* Admin Multi-Page Protected Layout */}
        <Route
          path="/admin"
          element={
            <AdminLayout
              adminUser={adminUser}
              onLogout={handleLogout}
            />
          }
        >
          <Route index element={<AdminDashboardPage products={products} gallery={gallery} />} />
          <Route
            path="products"
            element={
              <AdminProductsPage
                products={products}
                categories={categories}
                onDeleteProduct={handleDeleteProduct}
                onSaveProduct={handleSaveProduct}
              />
            }
          />
          <Route
            path="products/new"
            element={
              <AdminProductFormPage
                products={products}
                categories={categories}
                onSaveProduct={handleSaveProduct}
                onAddCategory={handleAddCategory}
              />
            }
          />
          <Route
            path="products/edit/:id"
            element={
              <AdminProductFormPage
                products={products}
                categories={categories}
                onSaveProduct={handleSaveProduct}
                onAddCategory={handleAddCategory}
              />
            }
          />
          <Route
            path="categories"
            element={
              <AdminCategoriesPage
                categories={categories}
                onAddCategory={handleAddCategory}
                onDeleteCategory={handleDeleteCategory}
              />
            }
          />
          <Route
            path="gallery"
            element={
              <AdminGalleryPage
                gallery={gallery}
                onAddGallery={handleAddGallery}
                onDeleteGallery={handleDeleteGallery}
              />
            }
          />
        </Route>
      </Routes>

      {/* Hide Storefront Footer on Admin Routes */}
      {!isAdminRoute && <Footer />}

      <OrderModal
        isOpen={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={() => setCartItems([])}
      />

    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
