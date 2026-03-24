/**
 * Create database schema on new US project using Supabase REST API
 * This bypasses the need for direct PostgreSQL connections (blocked by India outage)
 */
const { createClient } = require('@supabase/supabase-js');

const NEW_URL = 'https://oxcvbyprrvbnmoyanpgu.supabase.co';
const NEW_SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im94Y3ZieXBycnZibm1veWFucGd1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MjEwMjE3MCwiZXhwIjoyMDg3Njc4MTcwfQ.5KztY2yg730lLwp96xbB9ACkgwrG_wlCzOO3PxdSH-Q';

const supabase = createClient(NEW_URL, NEW_SERVICE_KEY, {
    db: { schema: 'public' }
});

// SQL to create all tables matching Prisma schema
const CREATE_TABLES_SQL = `
-- Users table (must come first for FK references)
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
`;

async function main() {
    console.log('╔════════════════════════════════════════════╗');
    console.log('║  Creating Schema via Supabase REST API     ║');
    console.log('╚════════════════════════════════════════════╝');

    // Test connectivity first
    console.log('\nTesting connectivity to new US project...');

    try {
        const { data, error } = await supabase.rpc('', {}).catch(() => null) || {};
    } catch (e) {
        // Ignore RPC error, just testing connectivity
    }

    // Execute SQL via the Supabase SQL endpoint
    const response = await fetch(`${NEW_URL}/rest/v1/rpc/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'apikey': NEW_SERVICE_KEY,
            'Authorization': `Bearer ${NEW_SERVICE_KEY}`,
        },
        body: JSON.stringify({})
    });

    console.log(`API Response Status: ${response.status}`);

    if (response.status === 404 || response.status === 200) {
        console.log('✅ REST API is reachable!');
    } else {
        const text = await response.text();
        console.log(`Response: ${text}`);
    }

    // Use the pg endpoint to run SQL
    console.log('\nExecuting schema SQL...');
    const sqlResponse = await fetch(`${NEW_URL}/pg/query`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'apikey': NEW_SERVICE_KEY,
            'Authorization': `Bearer ${NEW_SERVICE_KEY}`,
        },
        body: JSON.stringify({ query: CREATE_TABLES_SQL })
    });

    if (sqlResponse.ok) {
        console.log('✅ Schema created successfully!');
    } else {
        const errorText = await sqlResponse.text();
        console.log(`SQL endpoint status: ${sqlResponse.status}`);
        console.log(`Response: ${errorText}`);

        // Fallback: try creating tables one by one via individual inserts
        console.log('\n⚠️  Trying alternative approach: using Supabase Dashboard SQL Editor');
        console.log('Please run the SQL manually in your Supabase Dashboard:');
        console.log('1. Go to https://supabase.com/dashboard/project/oxcvbyprrvbnmoyanpgu/sql/new');
        console.log('2. Paste the SQL below and click "Run"');
        console.log('\n' + CREATE_TABLES_SQL);
    }
}

main().catch(err => {
    console.error('Fatal error:', err.message);

    console.log('\n═══════════════════════════════════════════');
    console.log('FALLBACK: Run this SQL in your Supabase Dashboard SQL Editor:');
    console.log('https://supabase.com/dashboard/project/oxcvbyprrvbnmoyanpgu/sql/new');
    console.log('═══════════════════════════════════════════\n');
    console.log(CREATE_TABLES_SQL);
});
