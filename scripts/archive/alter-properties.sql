-- Add original_url column to properties table
ALTER TABLE properties
ADD COLUMN IF NOT EXISTS original_url TEXT;
-- Verify it worked (optional select)
SELECT column_name,
    data_type
FROM information_schema.columns
WHERE table_name = 'properties'
    AND column_name = 'original_url';