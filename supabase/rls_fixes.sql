-- RLS Security Fixes (Updated)
-- Run this script in your Supabase SQL Editor
-- 1. Fix 'public.properties'
-- Drop potential existing policies to ensure clean slate
DROP POLICY IF EXISTS "Allow authenticated users to manage properties" ON "public"."properties";
DROP POLICY IF EXISTS "Allow public read access on properties" ON "public"."properties";
DROP POLICY IF EXISTS "Enable read access for all users" ON "public"."properties";
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON "public"."properties";
DROP POLICY IF EXISTS "Enable update for authenticated users only" ON "public"."properties";
DROP POLICY IF EXISTS "Enable delete for authenticated users only" ON "public"."properties";
ALTER TABLE "public"."properties" ENABLE ROW LEVEL SECURITY;
-- A. Public Read Access (SELECT only)
CREATE POLICY "Enable read access for all users" ON "public"."properties" FOR
SELECT TO public USING (true);
-- B. Authenticated Write Access (Split to avoid overlap with SELECT)
CREATE POLICY "Enable insert for authenticated users only" ON "public"."properties" FOR
INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Enable update for authenticated users only" ON "public"."properties" FOR
UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Enable delete for authenticated users only" ON "public"."properties" FOR DELETE TO authenticated USING (true);
-- 2. Fix 'public.testimonials'
-- Drop existing policies
DROP POLICY IF EXISTS "Allow authenticated users to manage testimonials" ON "public"."testimonials";
DROP POLICY IF EXISTS "Allow public read access on testimonials" ON "public"."testimonials";
DROP POLICY IF EXISTS "Enable read access for all users" ON "public"."testimonials";
DROP POLICY IF EXISTS "Enable write access for authenticated users" ON "public"."testimonials";
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON "public"."testimonials";
DROP POLICY IF EXISTS "Enable update for authenticated users only" ON "public"."testimonials";
DROP POLICY IF EXISTS "Enable delete for authenticated users only" ON "public"."testimonials";
ALTER TABLE "public"."testimonials" ENABLE ROW LEVEL SECURITY;
-- A. Public Read Access (SELECT only)
CREATE POLICY "Enable read access for all users" ON "public"."testimonials" FOR
SELECT TO public USING (true);
-- B. Authenticated Write Access (Split to avoid overlap with SELECT)
CREATE POLICY "Enable insert for authenticated users only" ON "public"."testimonials" FOR
INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Enable update for authenticated users only" ON "public"."testimonials" FOR
UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Enable delete for authenticated users only" ON "public"."testimonials" FOR DELETE TO authenticated USING (true);
-- 3. Fix 'public.leads'
-- Drop existing policies
DROP POLICY IF EXISTS "Allow public to submit leads" ON "public"."leads";
DROP POLICY IF EXISTS "Allow authenticated users to manage leads" ON "public"."leads";
ALTER TABLE "public"."leads" ENABLE ROW LEVEL SECURITY;
-- A. Public Insert Only (Contact Form)
CREATE POLICY "Allow public to submit leads" ON "public"."leads" FOR
INSERT TO public WITH CHECK (true);
-- B. Authenticated Full Access (Using FOR ALL is fine here as there is no public SELECT)
CREATE POLICY "Allow authenticated users to manage leads" ON "public"."leads" FOR ALL TO authenticated USING (true) WITH CHECK (true);