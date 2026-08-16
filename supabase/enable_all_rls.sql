-- Supabase RLS Security Fix
-- Enables RLS on all public tables. 
-- Since the application accesses the database using Prisma via the `postgres` role, 
-- this correctly blocks the Supabase Data API (anonymous access) while leaving app functionality intact.

ALTER TABLE "public"."properties" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."users" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."testimonials" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."page_seo" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."page_assets" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."sessions" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."property_images" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."property_tags" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."leads" ENABLE ROW LEVEL SECURITY;
