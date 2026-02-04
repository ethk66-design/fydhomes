-- Seed Property Types Assets
INSERT INTO "public"."page_assets" (
        "page_route",
        "section_key",
        "label",
        "asset_url",
        "alt_text"
    )
VALUES (
        '/',
        'property_type_villa',
        'Explore - Villa',
        'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/0149254b-b2ea-40e6-ad6a-70e092f9e191-fydhomes-in/assets/images/WhatsApp-Image-2025-12-26-at-12_45_58-PM-1-758x564-11.jpeg',
        'Villa Property'
    ),
    (
        '/',
        'property_type_residential',
        'Explore - Residential',
        'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/0149254b-b2ea-40e6-ad6a-70e092f9e191-fydhomes-in/assets/images/WhatsApp-Image-2025-12-26-at-12_45_58-PM-758x564-12.jpeg',
        'Residential Property'
    ),
    (
        '/',
        'property_type_plot',
        'Explore - Plot',
        'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/0149254b-b2ea-40e6-ad6a-70e092f9e191-fydhomes-in/assets/images/WhatsApp-Image-2025-12-26-at-12_45_58-PM-1-758x564-11.jpeg',
        'Plot Property'
    ),
    (
        '/',
        'property_type_commercial',
        'Explore - Commercial',
        'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/0149254b-b2ea-40e6-ad6a-70e092f9e191-fydhomes-in/assets/images/WhatsApp-Image-2025-12-26-at-12_45_58-PM-758x564-12.jpeg',
        'Commercial Property'
    ),
    (
        '/',
        'property_type_office',
        'Explore - Office',
        'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/0149254b-b2ea-40e6-ad6a-70e092f9e191-fydhomes-in/assets/images/WhatsApp-Image-2025-12-26-at-12_45_58-PM-1-758x564-11.jpeg',
        'Office Property'
    ),
    (
        '/',
        'property_type_rent',
        'Explore - Rent',
        'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/0149254b-b2ea-40e6-ad6a-70e092f9e191-fydhomes-in/assets/images/WhatsApp-Image-2025-12-26-at-12_45_58-PM-758x564-12.jpeg',
        'Rent Property'
    ) ON CONFLICT ("page_route", "section_key") DO NOTHING;