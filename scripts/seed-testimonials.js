
const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = 'https://cqiwkdfmfhkwqkdqaeyy.supabase.co';
const SUPABASE_SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNxaXdrZGZtZmhrd3FrZHFhZXl5Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2ODQ1NDc1NiwiZXhwIjoyMDg0MDMwNzU2fQ.ONTAMss7dqcGCEtxHW-B_V3WejBNNDJo0GwctAQzH-k';

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

const data = [
    {
        name: "Unnikrishnan",
        role: "INFOPARK",
        image_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&h=100&auto=format&fit=crop",
        content: "It was honestly difficult to choose just one house—because they had such a wide collection! They patiently took us through every option, explaining details and helping us compare. Their hospitality was so warm and friendly, we felt like family. The entire journey was smooth and memorable.",
        rating: 5,
    },
    {
        name: "Sunil Mathew",
        role: "NRI",
        image_url: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=100&h=100&auto=format&fit=crop",
        content: "We discovered them through social media and were truly impressed by their wide collection of budget-friendly and affordable homes. Choosing just one was tough because every house had something special! They patiently guided us through each visit, and their hospitality made us feels good",
        rating: 5,
    },
    {
        name: "Tirumali",
        role: "Rapper/Stage Artist",
        image_url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=100&h=100&auto=format&fit=crop",
        content: "We got to know about them through their social media handle—and we're so glad we did! They took us along every step of the way, showed us multiple houses patiently until we found the one that felt just right. Even after the purchase, their support has been amazing. Truly a dream home experience!",
        rating: 5,
    }
];

async function seed() {
    console.log('Seeding Testimonials...');
    const { error } = await supabase.from('testimonials').insert(data);
    if (error) {
        console.error('Error seeding:', error);
    } else {
        console.log('✅ Successfully seeded 3 testimonials.');
    }
}

seed();
