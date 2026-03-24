-- FYD Homes Database Schema
-- Run this in Supabase Dashboard SQL Editor:
-- https://supabase.com/dashboard/project/oxcvbyprrvbnmoyanpgu/sql/new

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id CHAR(36) PRIMARY KEY DEFAULT gen_random_uuid()::text,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(255),
    role VARCHAR(50) DEFAULT 'user',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Sessions table
CREATE TABLE IF NOT EXISTS sessions (
    id CHAR(36) PRIMARY KEY DEFAULT gen_random_uuid()::text,
    "sessionToken" VARCHAR(255) UNIQUE NOT NULL,
    "userId" CHAR(36) NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    expires TIMESTAMPTZ NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_sessions_userId ON sessions("userId");

-- Properties table
CREATE TABLE IF NOT EXISTS properties (
    id CHAR(36) PRIMARY KEY DEFAULT gen_random_uuid()::text,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    price VARCHAR(100),
    location VARCHAR(255),
    beds INT,
    baths INT,
    area VARCHAR(100),
    land_area VARCHAR(100),
    status VARCHAR(50) DEFAULT 'active',
    type VARCHAR(100),
    listing_type VARCHAR(50),
    agent_id CHAR(36),
    youtube_video VARCHAR(500),
    parkings INT,
    meta_title VARCHAR(255),
    meta_description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_properties_created_at ON properties(created_at);
CREATE INDEX IF NOT EXISTS idx_properties_status_listing ON properties(status, listing_type);
CREATE INDEX IF NOT EXISTS idx_properties_location ON properties(location);

-- Property Images table
CREATE TABLE IF NOT EXISTS property_images (
    id CHAR(36) PRIMARY KEY DEFAULT gen_random_uuid()::text,
    property_id CHAR(36) NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
    url VARCHAR(500) NOT NULL,
    "order" INT DEFAULT 0
);
CREATE INDEX IF NOT EXISTS idx_property_images_property_id ON property_images(property_id);

-- Property Tags table
CREATE TABLE IF NOT EXISTS property_tags (
    id CHAR(36) PRIMARY KEY DEFAULT gen_random_uuid()::text,
    property_id CHAR(36) NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
    tag VARCHAR(100) NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_property_tags_property_id ON property_tags(property_id);

-- Testimonials table
CREATE TABLE IF NOT EXISTS testimonials (
    id CHAR(36) PRIMARY KEY DEFAULT gen_random_uuid()::text,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    rating INT NOT NULL,
    image_url VARCHAR(500),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Page SEO table
CREATE TABLE IF NOT EXISTS page_seo (
    id CHAR(36) PRIMARY KEY DEFAULT gen_random_uuid()::text,
    route VARCHAR(255) UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    og_image VARCHAR(500),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Page Assets table
CREATE TABLE IF NOT EXISTS page_assets (
    id CHAR(36) PRIMARY KEY DEFAULT gen_random_uuid()::text,
    page_route VARCHAR(255) NOT NULL,
    section_key VARCHAR(255) NOT NULL,
    label VARCHAR(255) NOT NULL,
    asset_url VARCHAR(500) NOT NULL,
    alt_text VARCHAR(500),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_page_assets_route_section ON page_assets(page_route, section_key);

-- Leads table
CREATE TABLE IF NOT EXISTS leads (
    id CHAR(36) PRIMARY KEY DEFAULT gen_random_uuid()::text,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    phone VARCHAR(50),
    message TEXT,
    property_id CHAR(36) REFERENCES properties(id) ON DELETE SET NULL,
    source VARCHAR(100),
    created_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_leads_property_id ON leads(property_id);

-- Prisma migrations table (needed for Prisma to work)
CREATE TABLE IF NOT EXISTS "_prisma_migrations" (
    id VARCHAR(36) PRIMARY KEY,
    checksum VARCHAR(64) NOT NULL,
    finished_at TIMESTAMPTZ,
    migration_name VARCHAR(255) NOT NULL,
    logs TEXT,
    rolled_back_at TIMESTAMPTZ,
    started_at TIMESTAMPTZ DEFAULT NOW(),
    applied_steps_count INT DEFAULT 0
);
