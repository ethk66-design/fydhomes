-- Add SEO columns to properties table
ALTER TABLE "public"."properties"
ADD COLUMN IF NOT EXISTS "meta_title" text,
    ADD COLUMN IF NOT EXISTS "meta_description" text;