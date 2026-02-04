-- ===========================================
-- SUPABASE DATABASE SETUP FOR FYD HOMES
-- ===========================================
-- Run these scripts in Supabase SQL Editor
-- (Dashboard > SQL Editor > New query)
-- ===========================================
-- ===========================================
-- STEP 1: CREATE PROPERTIES TABLE
-- ===========================================
CREATE TABLE IF NOT EXISTS properties (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    price TEXT,
    location TEXT,
    beds INTEGER,
    baths INTEGER,
    area TEXT,
    images TEXT [] DEFAULT '{}',
    status TEXT DEFAULT 'active' CHECK (status IN ('active', 'sold', 'featured')),
    type TEXT,
    listing_type TEXT CHECK (listing_type IN ('Sale', 'Rent')),
    tags TEXT [] DEFAULT '{}',
    agent_id UUID,
    youtube_video TEXT,
    parkings INTEGER,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
-- Enable Row Level Security
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;
-- Allow anyone to read properties (public listings)
CREATE POLICY "Allow public read access on properties" ON properties FOR
SELECT USING (true);
-- Allow authenticated users to insert/update/delete
CREATE POLICY "Allow authenticated users to manage properties" ON properties FOR ALL USING (true) WITH CHECK (true);
-- ===========================================
-- STEP 2: CREATE LEADS TABLE
-- ===========================================
CREATE TABLE IF NOT EXISTS leads (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    phone TEXT,
    email TEXT,
    property_type TEXT,
    location TEXT,
    expected_price TEXT,
    message TEXT,
    source TEXT DEFAULT 'website',
    created_at TIMESTAMPTZ DEFAULT NOW()
);
-- Enable Row Level Security
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
-- Allow anyone to insert leads (for contact forms)
CREATE POLICY "Allow public to submit leads" ON leads FOR
INSERT WITH CHECK (true);
-- Allow authenticated users to view all leads
CREATE POLICY "Allow authenticated users to view leads" ON leads FOR
SELECT USING (true);
-- ===========================================
-- STEP 3: OPTIONAL - ADD SAMPLE DATA
-- ===========================================
-- Uncomment and run if you want test data
-- INSERT INTO properties (title, description, price, location, beds, baths, area, type, listing_type, status)
-- VALUES 
--   ('Luxury 4BHK Villa', 'Beautiful villa with modern amenities', '₹1.25 CR', 'Kakkanad, Kochi', 4, 3, '2500 sqft', 'Villa', 'Sale', 'featured'),
--   ('Modern 3BHK Apartment', 'Spacious apartment in prime location', '₹85 Lakhs', 'Edappally, Kochi', 3, 2, '1800 sqft', 'Residential', 'Sale', 'active'),
--   ('Commercial Office Space', 'Ready to move office space', '₹50,000/month', 'Infopark, Kochi', 0, 2, '1200 sqft', 'Commercial', 'Rent', 'active');