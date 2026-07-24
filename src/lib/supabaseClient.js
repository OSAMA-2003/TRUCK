import { createClient } from '@supabase/supabase-js';

// Read env variables (Vite or NEXT_PUBLIC fallback)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || import.meta.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || import.meta.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(
  supabaseUrl && 
  supabaseAnonKey && 
  supabaseUrl !== 'https://your-supabase-url.supabase.co' &&
  !supabaseUrl.includes('placeholder')
);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Initial Categories
export const INITIAL_CATEGORIES = ['Coffee', 'Boba Tea', 'Mojito', 'Pastries'];

// Initial Default Sample Products matching Stitch MCP Design
export const INITIAL_PRODUCTS = [
  {
    id: 'prod-1',
    name: 'V60 Pour Over',
    category: 'Coffee',
    price: 4.50,
    description: 'Ethiopian single origin, floral notes with a smooth finish.',
    tag: 'HOT',
    image_url: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80',
    is_available: true,
    is_special: true,
  },
  {
    id: 'prod-2',
    name: 'Iced Spanish Latte',
    category: 'Coffee',
    price: 5.00,
    description: 'Rich espresso over ice with sweet condensed milk.',
    tag: 'COLD',
    image_url: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=800&q=80',
    is_available: true,
    is_special: false,
  },
  {
    id: 'prod-3',
    name: 'Peach Boba Burst',
    category: 'Boba Tea',
    price: 6.50,
    description: 'Refreshing peach tea infused with popping boba pearls.',
    tag: 'SIGNATURE',
    image_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB6N8kLv0xHDnb4N34WgxXzo-f_cv-VU09vf2XXHfd-J086kKGgb3Nmp2LR8W442Ff5CdRtgmPprPh01Oy548Z0zh0NF2BXHX0mfauDchuk53wiFW01iXaZdlNnCICHg09eB4o0rza8h8B49yL07H0rGmTsdzFMFaduqbhQ9HNtbP8np31LUiww57rb1kl6Qsz9TGuQNShNSveQ7oLtVn2zMN8mQGL9m6eC1G7LtETehP7t9ekyZl-Qdml2EHqtOxYe5XJfm-02dI-v',
    is_available: true,
    is_special: true,
  },
  {
    id: 'prod-4',
    name: 'Ocean Mojito',
    category: 'Mojito',
    price: 5.50,
    description: 'Blue curacao, fresh mint, lime, and sparkling water.',
    tag: 'COLD',
    image_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCrNtPPMrHJhyiw3ViEB-2c2P2kHBN2HCEvCph_MbgzORAS3l-zO1bJNJJ4uYuD2LzgHGHP0NZsCYljMPT5dEs5wAGL9ajv383UrNluNH-FbrgPdpbEbrUBb3tA4K11SP0etjiC7Po6q8wwYUpQH0nJtq26t-Q_AzaTaFhDD9vfeq0AV_KB7QAi_Z3yJsPlXrn2xxFRTtKlNbzVpstOXn8S_ZTziQ2Bid9gFjU6k6SpdXtgiwnc5ol__BMVx-VD7YzOCePLDIPrArS7',
    is_available: true,
    is_special: false,
  },
  {
    id: 'prod-5',
    name: 'Matcha Cloud Latte',
    category: 'Boba Tea',
    price: 6.00,
    description: 'Ceremonial grade matcha with oat milk and velvety cream cold foam.',
    tag: 'NEW',
    image_url: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&w=800&q=80',
    is_available: true,
    is_special: true,
  },
  {
    id: 'prod-6',
    name: 'Signature Cold Brew',
    category: 'Coffee',
    price: 5.00,
    description: '24-hour steep single origin cold brew served over crystal ice.',
    tag: 'COLD',
    image_url: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=800&q=80',
    is_available: true,
    is_special: true,
  }
];

export const INITIAL_GALLERY = [
  {
    id: 'gal-1',
    title: 'TRUCK Trailer Setup',
    image_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD-U8rnYzYfvFyX5TyMvVEPcFJoUIjpaHInEyS5DaCg3GFKFb0u6gkVHqP2tPhtiJYmY49sGyNlfY38zZeQpnYL3mlaT_r-4jJWLhHI8qr1hQPAcHO17ZiIyjrmUy2O4BaEbQIm-mN_z4ugZAZgI1p1JBCoi67VP-EojgiwQ-Nrmb13SoB-WQlbNGBJuHHb7_Q6ydeH2xrCThRu0jRZwvZEZwJGvxVd4qfVVJ37Zhkzqm_Jw21Lyltsxw8Yr_1mXfU3-QCeM4nGa5Zv',
    caption: 'The official TRUCK location setup'
  },
  {
    id: 'gal-2',
    title: 'Boba Tea Crafting',
    image_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB6N8kLv0xHDnb4N34WgxXzo-f_cv-VU09vf2XXHfd-J086kKGgb3Nmp2LR8W442Ff5CdRtgmPprPh01Oy548Z0zh0NF2BXHX0mfauDchuk53wiFW01iXaZdlNnCICHg09eB4o0rza8h8B49yL07H0rGmTsdzFMFaduqbhQ9HNtbP8np31LUiww57rb1kl6Qsz9TGuQNShNSveQ7oLtVn2zMN8mQGL9m6eC1G7LtETehP7t9ekyZl-Qdml2EHqtOxYe5XJfm-02dI-v',
    caption: 'Signature popping boba flavors'
  },
  {
    id: 'gal-3',
    title: 'Fresh Mojitos',
    image_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCrNtPPMrHJhyiw3ViEB-2c2P2kHBN2HCEvCph_MbgzORAS3l-zO1bJNJJ4uYuD2LzgHGHP0NZsCYljMPT5dEs5wAGL9ajv383UrNluNH-FbrgPdpbEbrUBb3tA4K11SP0etjiC7Po6q8wwYUpQH0nJtq26t-Q_AzaTaFhDD9vfeq0AV_KB7QAi_Z3yJsPlXrn2xxFRTtKlNbzVpstOXn8S_ZTziQ2Bid9gFjU6k6SpdXtgiwnc5ol__BMVx-VD7YzOCePLDIPrArS7',
    caption: 'On the go strawberry and orange mojitos'
  },
  {
    id: 'gal-4',
    title: 'Pour Over Craft',
    image_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAVjZJUm5X0FlHlotH-vGh7ONbnNs0UFyTjPo_zXSbWr8Ya1NFyON0yuHmH2dMapGzs_-xYRhbgo2iX6i-HgehXDJ6Es2RbEF2nqvWwAExM-aKgQYluDMTDanc32PbyCav28TssOWgdzHqYMqM-iAJ2uaV2LXTN8KsSuhkiKBDGSbB6R3CWxHc5tyHjkKGxqg8mmEoGb0FHgrezt1iyfn4tGBzbzJK9C5Xry-qsbQ5VWYSetVS-nteS99ZdHnmaS2TYm5QsZqar0skN',
    caption: 'Artisanal coffee roasting and pouring'
  }
];

// --- FILE UPLOAD HELPER (Direct File Input Handler) ---
export async function uploadImageFile(file) {
  if (!file) return null;

  // If Supabase is connected, try uploading to Supabase Storage bucket 'truck-images'
  if (isSupabaseConfigured && supabase) {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}_${Math.random().toString(36).substring(2, 8)}.${fileExt}`;
      const filePath = `uploads/${fileName}`;

      const { data, error } = await supabase.storage
        .from('truck-images')
        .upload(filePath, file, { cacheControl: '3600', upsert: true });

      if (!error && data) {
        const { data: publicUrlData } = supabase.storage
          .from('truck-images')
          .getPublicUrl(filePath);

        if (publicUrlData?.publicUrl) {
          return publicUrlData.publicUrl;
        }
      }
    } catch (err) {
      console.warn('Supabase storage upload error, using Data URL fallback:', err);
    }
  }

  // Local Data URL Fallback (Instant preview for local/offline testing)
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
}

// --- AUTHENTICATION HELPERS ---

export async function loginAdmin(email, password) {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        if (error.message.includes('Invalid login credentials')) {
          const signUpRes = await supabase.auth.signUp({ email, password });
          if (!signUpRes.error && signUpRes.data.user) {
            return { user: signUpRes.data.user, error: null };
          }
        }
        return { user: null, error: error.message };
      }
      return { user: data.user, error: null };
    } catch (err) {
      console.warn('Supabase auth error:', err);
    }
  }

  if (email.toLowerCase() === 'admin@cafe.com' && password === 'AdminPassword123!') {
    const mockUser = { email: 'admin@cafe.com', id: 'local-admin-1' };
    localStorage.setItem('truck_admin_session', JSON.stringify(mockUser));
    return { user: mockUser, error: null };
  } else if (email && password && password.length >= 6) {
    const mockUser = { email, id: 'local-admin-' + Date.now() };
    localStorage.setItem('truck_admin_session', JSON.stringify(mockUser));
    return { user: mockUser, error: null };
  }

  return { user: null, error: 'Invalid login credentials. Please check email & password.' };
}

export async function logoutAdmin() {
  if (isSupabaseConfigured && supabase) {
    try {
      await supabase.auth.signOut();
    } catch (err) {
      console.warn('Supabase logout error:', err);
    }
  }
  localStorage.removeItem('truck_admin_session');
}

export async function getAdminSession() {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data } = await supabase.auth.getSession();
      if (data?.session?.user) return data.session.user;
    } catch (err) {
      console.warn('Supabase session fetch error:', err);
    }
  }

  const local = localStorage.getItem('truck_admin_session');
  if (local) {
    try { return JSON.parse(local); } catch (e) {}
  }
  return null;
}

// --- CATEGORY OPERATIONS ---

export async function fetchCategories() {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase.from('categories').select('*').order('created_at', { ascending: true });
      if (!error && data && data.length > 0) {
        return data.map(c => c.name);
      }
    } catch (err) {
      console.warn('Supabase fetch categories error:', err);
    }
  }

  const local = localStorage.getItem('truck_categories');
  if (local) {
    try { return JSON.parse(local); } catch (e) {}
  }
  localStorage.setItem('truck_categories', JSON.stringify(INITIAL_CATEGORIES));
  return INITIAL_CATEGORIES;
}

export async function saveCategory(categoryName) {
  if (!categoryName || !categoryName.trim()) return null;
  const name = categoryName.trim();

  if (isSupabaseConfigured && supabase) {
    try {
      await supabase.from('categories').insert([{ name }]).select();
    } catch (err) {
      console.warn('Supabase save category error:', err);
    }
  }

  const current = await fetchCategories();
  if (!current.includes(name)) {
    const updated = [...current, name];
    localStorage.setItem('truck_categories', JSON.stringify(updated));
    return updated;
  }
  return current;
}

export async function removeCategory(categoryName) {
  if (isSupabaseConfigured && supabase) {
    try {
      await supabase.from('categories').delete().eq('name', categoryName);
    } catch (err) {
      console.warn('Supabase remove category error:', err);
    }
  }

  const current = await fetchCategories();
  const updated = current.filter(c => c !== categoryName);
  localStorage.setItem('truck_categories', JSON.stringify(updated));
  return updated;
}

// --- PRODUCTS OPERATIONS ---

export async function fetchProducts() {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase.from('products').select('*').order('created_at', { ascending: false });
      if (!error && data && data.length > 0) return data;
    } catch (err) {
      console.warn('Supabase fetch products error, falling back to local storage:', err);
    }
  }

  const local = localStorage.getItem('truck_products');
  if (local) {
    try { return JSON.parse(local); } catch (e) {}
  }
  localStorage.setItem('truck_products', JSON.stringify(INITIAL_PRODUCTS));
  return INITIAL_PRODUCTS;
}

export async function saveProduct(product) {
  if (isSupabaseConfigured && supabase) {
    try {
      if (product.id && !product.id.startsWith('prod-')) {
        const { data, error } = await supabase.from('products').update(product).eq('id', product.id).select();
        if (!error && data) return data[0];
      } else {
        const { id, ...newProd } = product;
        const { data, error } = await supabase.from('products').insert([newProd]).select();
        if (!error && data) return data[0];
      }
    } catch (err) {
      console.warn('Supabase save product failed, using local storage fallback:', err);
    }
  }

  const current = await fetchProducts();
  let updated;
  if (product.id) {
    updated = current.map(p => p.id === product.id ? { ...p, ...product } : p);
  } else {
    const newObj = { ...product, id: 'prod-' + Date.now() };
    updated = [newObj, ...current];
  }
  localStorage.setItem('truck_products', JSON.stringify(updated));
  return product.id ? product : updated[0];
}

export async function removeProduct(productId) {
  if (isSupabaseConfigured && supabase) {
    try {
      await supabase.from('products').delete().eq('id', productId);
    } catch (err) {
      console.warn('Supabase delete failed:', err);
    }
  }

  const current = await fetchProducts();
  const updated = current.filter(p => p.id !== productId);
  localStorage.setItem('truck_products', JSON.stringify(updated));
  return true;
}

// --- GALLERY OPERATIONS ---

export async function fetchGallery() {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase.from('gallery').select('*').order('created_at', { ascending: false });
      if (!error && data && data.length > 0) return data;
    } catch (err) {
      console.warn('Supabase fetch gallery error:', err);
    }
  }

  const local = localStorage.getItem('truck_gallery');
  if (local) {
    try { return JSON.parse(local); } catch (e) {}
  }
  localStorage.setItem('truck_gallery', JSON.stringify(INITIAL_GALLERY));
  return INITIAL_GALLERY;
}

export async function saveGalleryItem(item) {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase.from('gallery').insert([item]).select();
      if (!error && data) return data[0];
    } catch (err) {
      console.warn('Supabase gallery insert error:', err);
    }
  }

  const current = await fetchGallery();
  const newItem = { ...item, id: 'gal-' + Date.now() };
  const updated = [newItem, ...current];
  localStorage.setItem('truck_gallery', JSON.stringify(updated));
  return newItem;
}

export async function removeGalleryItem(id) {
  if (isSupabaseConfigured && supabase) {
    try {
      await supabase.from('gallery').delete().eq('id', id);
    } catch (err) {
      console.warn('Supabase gallery delete error:', err);
    }
  }

  const current = await fetchGallery();
  const updated = current.filter(g => g.id !== id);
  localStorage.setItem('truck_gallery', JSON.stringify(updated));
  return true;
}
