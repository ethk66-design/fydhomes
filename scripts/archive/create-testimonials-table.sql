-- Create Testimonials Table
CREATE TABLE IF NOT EXISTS testimonials (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    role TEXT,
    -- Displayed as "Location" or "Designation" e.g. INFOPARK, NRI
    content TEXT NOT NULL,
    rating INTEGER DEFAULT 5,
    image_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
-- Enable Row Level Security
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
-- Policies
-- 1. Public can view testimonials
CREATE POLICY "Allow public read access on testimonials" ON testimonials FOR
SELECT USING (true);
-- 2. Authenticated users (Admins) can insert, update, delete
CREATE POLICY "Allow authenticated users to manage testimonials" ON testimonials FOR ALL USING (true) WITH CHECK (true);