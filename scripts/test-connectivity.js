const { createClient } = require('@supabase/supabase-js');

const OLD_URL = 'https://vexsmxrfxbatpyelugch.supabase.co';
const OLD_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZleHNteHJmeGJhdHB5ZWx1Z2NoIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MDcwNzkwMCwiZXhwIjoyMDg2MjgzOTAwfQ.MSWhyE0hrk5DEqATa4EcZU7fSBpTtjJXi-WLHYBRJfk';

const NEW_URL = 'https://oxcvbyprrvbnmoyanpgu.supabase.co';
const NEW_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im94Y3ZieXBycnZibm1veWFucGd1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MjEwMjE3MCwiZXhwIjoyMDg3Njc4MTcwfQ.5KztY2yg730lLwp96xbB9ACkgwrG_wlCzOO3PxdSH-Q';

async function test() {
    console.log('Testing OLD (India)...');
    try {
        const old = createClient(OLD_URL, OLD_KEY);
        const { count, error } = await old.from('properties').select('*', { count: 'exact', head: true });
        if (error) console.log('  OLD:', error.message);
        else console.log('  OLD: OK, properties count =', count);
    } catch (e) { console.log('  OLD FAIL:', e.message); }

    console.log('Testing NEW (US)...');
    try {
        const nw = createClient(NEW_URL, NEW_KEY);
        const { count, error } = await nw.from('properties').select('*', { count: 'exact', head: true });
        if (error) console.log('  NEW:', error.code, error.message);
        else console.log('  NEW: OK, properties count =', count);
    } catch (e) { console.log('  NEW FAIL:', e.message); }
}

test();
