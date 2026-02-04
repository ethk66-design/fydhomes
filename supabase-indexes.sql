-- Create indexes for faster search filtering
CREATE INDEX IF NOT EXISTS idx_properties_location ON properties(location);
CREATE INDEX IF NOT EXISTS idx_properties_type ON properties(type);
CREATE INDEX IF NOT EXISTS idx_properties_listing_type ON properties(listing_type);
CREATE INDEX IF NOT EXISTS idx_properties_price ON properties(price);
CREATE INDEX IF NOT EXISTS idx_properties_beds ON properties(beds);
CREATE INDEX IF NOT EXISTS idx_properties_baths ON properties(baths);
-- Combined index for common search patterns (Location + Type)
CREATE INDEX IF NOT EXISTS idx_properties_location_type ON properties(location, type);