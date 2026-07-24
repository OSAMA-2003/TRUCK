-- TRUCK Coffee to Go - Supabase Schema Setup

-- 1. Create Categories Table
CREATE TABLE IF NOT EXISTS public.categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Create Products Table
CREATE TABLE IF NOT EXISTS public.products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    category TEXT NOT NULL, -- e.g. 'Coffee', 'Boba Tea', 'Mojito', 'Pastries'
    price DECIMAL(10, 2) NOT NULL,
    description TEXT,
    tag TEXT DEFAULT 'HOT', -- 'HOT', 'COLD', 'SIGNATURE', 'NEW'
    image_url TEXT,
    is_available BOOLEAN DEFAULT TRUE,
    is_special BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Create Gallery Table
CREATE TABLE IF NOT EXISTS public.gallery (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT,
    image_url TEXT NOT NULL,
    caption TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Enable Row Level Security (RLS)
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery ENABLE ROW LEVEL SECURITY;

-- 5. Create Policies for Public Read & Anon Insert/Update/Delete
CREATE POLICY "Allow public read access on categories" ON public.categories FOR SELECT USING (true);
CREATE POLICY "Allow anon insert on categories" ON public.categories FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow anon delete on categories" ON public.categories FOR DELETE USING (true);

CREATE POLICY "Allow public read access on products" ON public.products FOR SELECT USING (true);
CREATE POLICY "Allow anon insert on products" ON public.products FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow anon update on products" ON public.products FOR UPDATE USING (true);
CREATE POLICY "Allow anon delete on products" ON public.products FOR DELETE USING (true);

CREATE POLICY "Allow public read access on gallery" ON public.gallery FOR SELECT USING (true);
CREATE POLICY "Allow anon insert on gallery" ON public.gallery FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow anon update on gallery" ON public.gallery FOR UPDATE USING (true);
CREATE POLICY "Allow anon delete on gallery" ON public.gallery FOR DELETE USING (true);

-- 6. Insert Initial Categories
INSERT INTO public.categories (name) VALUES
('Coffee'),
('Boba Tea'),
('Mojito'),
('Pastries')
ON CONFLICT (name) DO NOTHING;

-- 7. Insert Initial Sample Products
INSERT INTO public.products (name, category, price, description, tag, image_url) VALUES
('V60 Pour Over', 'Coffee', 4.50, 'Ethiopian single origin, floral notes with a smooth finish.', 'HOT', 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80'),
('Iced Spanish Latte', 'Coffee', 5.00, 'Rich espresso over ice with sweet condensed milk.', 'COLD', 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=800&q=80'),
('Peach Boba Burst', 'Boba Tea', 6.50, 'Refreshing peach tea infused with popping boba pearls.', 'SIGNATURE', 'https://lh3.googleusercontent.com/aida-public/AB6AXuB6N8kLv0xHDnb4N34WgxXzo-f_cv-VU09vf2XXHfd-J086kKGgb3Nmp2LR8W442Ff5CdRtgmPprPh01Oy548Z0zh0NF2BXHX0mfauDchuk53wiFW01iXaZdlNnCICHg09eB4o0rza8h8B49yL07H0rGmTsdzFMFaduqbhQ9HNtbP8np31LUiww57rb1kl6Qsz9TGuQNShNSveQ7oLtVn2zMN8mQGL9m6eC1G7LtETehP7t9ekyZl-Qdml2EHqtOxYe5XJfm-02dI-v'),
('Ocean Mojito', 'Mojito', 5.50, 'Blue curacao, fresh mint, lime, and sparkling water.', 'COLD', 'https://lh3.googleusercontent.com/aida-public/AB6AXuCrNtPPMrHJhyiw3ViEB-2c2P2kHBN2HCEvCph_MbgzORAS3l-zO1bJNJJ4uYuD2LzgHGHP0NZsCYljMPT5dEs5wAGL9ajv383UrNluNH-FbrgPdpbEbrUBb3tA4K11SP0etjiC7Po6q8wwYUpQH0nJtq26t-Q_AzaTaFhDD9vfeq0AV_KB7QAi_Z3yJsPlXrn2xxFRTtKlNbzVpstOXn8S_ZTziQ2Bid9gFjU6k6SpdXtgiwnc5ol__BMVx-VD7YzOCePLDIPrArS7');
