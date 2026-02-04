-- Function to strip HTML tags (Postgres doesn't have a native strip_tags, so using regex)
UPDATE properties
SET description = REGEXP_REPLACE(description, '<[^>]+>', '', 'g')
WHERE description ~ '<[^>]+>';
-- Also clean meta_description if it has tags
UPDATE properties
SET meta_description = REGEXP_REPLACE(meta_description, '<[^>]+>', '', 'g')
WHERE meta_description ~ '<[^>]+>';