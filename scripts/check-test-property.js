
const { createClient } = require('@supabase/supabase-js');

// Config from check-db.js
const SUPABASE_URL = 'https://cqiwkdfmfhkwqkdqaeyy.supabase.co';
const SUPABASE_SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNxaXdrZGZtZmhrd3FrZHFhZXl5Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2ODQ1NDc1NiwiZXhwIjoyMDg0MDMwNzU2fQ.ONTAMss7dqcGCEtxHW-B_V3WejBNNDJo0GwctAQzH-k';

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

async function check() {
    console.log('Fetching latest 5 properties...');
    const { data: properties, error } = await supabase
        .from('properties')
        .select('id, title, created_at')
        .order('created_at', { ascending: false })
        .limit(5);

    if (error) {
        console.error('Error fetching properties:', error);
        return;
    }

    console.log('Latest Properties:', JSON.stringify(properties, null, 2));

    if (properties.length > 0) {
        const targetProp = properties[0];
        console.log(`Checking images for latest property: "${targetProp.title}" (${targetProp.id})`);

        const { data: images, error: imgError } = await supabase
            .from('property_images')
            .select('url, order')
            .eq('property_id', targetProp.id)
            .order('order', { ascending: true });

        if (imgError) {
            console.error('Error fetching images:', imgError);
        } else {
            console.log('Images Found:', JSON.stringify(images, null, 2));
        }
    }
}

check();
