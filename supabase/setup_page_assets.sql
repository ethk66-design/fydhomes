-- Create page_assets table
CREATE TABLE IF NOT EXISTS "public"."page_assets" (
    "id" uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    "page_route" text NOT NULL,
    "section_key" text NOT NULL,
    "label" text NOT NULL,
    "asset_url" text,
    "alt_text" text,
    "updated_at" timestamp with time zone DEFAULT now(),
    CONSTRAINT "page_assets_route_key_unique" UNIQUE ("page_route", "section_key")
);
-- Enable RLS
ALTER TABLE "public"."page_assets" ENABLE ROW LEVEL SECURITY;
-- Policies
CREATE POLICY "Enable read access for all users" ON "public"."page_assets" FOR
SELECT USING (true);
CREATE POLICY "Enable update for authenticated users only" ON "public"."page_assets" FOR
UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Enable insert for authenticated users only" ON "public"."page_assets" FOR
INSERT WITH CHECK (auth.role() = 'authenticated');
-- Seed Data (Initial Slots)
INSERT INTO "public"."page_assets" (
        "page_route",
        "section_key",
        "label",
        "asset_url",
        "alt_text"
    )
VALUES (
        '/',
        'hero_bg',
        'Home Hero Background',
        'https://images.unsplash.com/photo-1600596542815-6ad4c727dd2d?q=80&w=2000',
        'Luxury Home Hero'
    ),
    (
        '/',
        'cta_bg',
        'Home CTA Background',
        '/expert-guidance-bg.png',
        'Expert Guidance Background'
    ),
    (
        '/about',
        'hero_bg',
        'About Hero Background',
        'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
        'About Us Banner'
    ),
    (
        '/contact',
        'hero_bg',
        'Contact Hero Background',
        'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
        'Contact Us Banner'
    ),
    (
        '/projects',
        'hero_bg',
        'Projects Hero Background',
        'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
        'Projects Banner'
    ),
    (
        '/sell',
        'hero_bg',
        'Sell Hero Background',
        'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=2000',
        'Sell Property Banner'
    ) ON CONFLICT ("page_route", "section_key") DO NOTHING;