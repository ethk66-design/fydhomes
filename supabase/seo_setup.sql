-- Create page_seo table for Dynamic Metadata
CREATE TABLE IF NOT EXISTS "public"."page_seo" (
    "id" uuid DEFAULT gen_random_uuid() NOT NULL PRIMARY KEY,
    "route" text NOT NULL UNIQUE,
    -- e.g. '/', '/about', '/contact'
    "title" text NOT NULL,
    "description" text,
    "og_image" text,
    "created_at" timestamp with time zone DEFAULT now() NOT NULL,
    "updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
-- Enable RLS
ALTER TABLE "public"."page_seo" ENABLE ROW LEVEL SECURITY;
-- Policies
-- 1. Public Read (Everyone can fetch SEO data to display pages)
CREATE POLICY "Enable read access for all users" ON "public"."page_seo" FOR
SELECT TO public USING (true);
-- 2. Authenticated Write (Admins/Agents can update SEO)
CREATE POLICY "Enable access for authenticated users only" ON "public"."page_seo" FOR ALL TO authenticated USING (true) WITH CHECK (true);
-- Seed Initial Data (Common Routes)
INSERT INTO "public"."page_seo" ("route", "title", "description")
VALUES (
        '/',
        'FYD Homes | Find Your Dream Home in Kochi',
        'Your Trusted Real Estate Partner in Kochi. Find beautiful villas, residential homes, and commercial spaces.'
    ),
    (
        '/about',
        'About Us | FYD Homes',
        'Learn more about FYD Homes, our mission, vision, and the team behind your dream home.'
    ),
    (
        '/contact',
        'Contact Us | FYD Homes',
        'Get in touch with FYD Homes for inquiries, consultations, or property visits.'
    ),
    (
        '/listings',
        'Property Listings | FYD Homes',
        'Explore our wide range of properties for sale and rent in Kochi and surrounding areas.'
    ) ON CONFLICT ("route") DO NOTHING;