
const { createClient } = require('@supabase/supabase-js');

// Config
const SUPABASE_URL = 'https://cqiwkdfmfhkwqkdqaeyy.supabase.co';
const SUPABASE_SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNxaXdrZGZtZmhrd3FrZHFhZXl5Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2ODQ1NDc1NiwiZXhwIjoyMDg0MDMwNzU2fQ.ONTAMss7dqcGCEtxHW-B_V3WejBNNDJo0GwctAQzH-k';

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

async function check() {
    console.log('Checking "properties" table...');
    const { count, error } = await supabase
        .from('properties')
        .select('*', { count: 'exact', head: true });

    if (error) {
        console.error('Error fetching count:', error);
    } else {
        console.log(`Total Rows: ${count}`);
    }

    console.log('Fetching first 1 row...');
    const { data, error: dataError } = await supabase
        .from('properties')
        .select('id, title')
        .limit(1);

    if (dataError) {
        console.error('Error fetching data:', dataError);
    } else {
        console.log('Sample Data:', data);
    }
}

check();
