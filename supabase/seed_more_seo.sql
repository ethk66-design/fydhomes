-- Seed SEO data for Projects and Sell pages
INSERT INTO "public"."page_seo" ("route", "title", "description")
VALUES (
        '/projects',
        'Our Projects | FYD Homes',
        'Explore our premium ongoing and completed residential projects in Kochi.'
    ),
    (
        '/sell',
        'Sell Your Property | FYD Homes',
        'Sell your property confidently with FYD Homes. Reach thousands of buyers.'
    ) ON CONFLICT ("route") DO NOTHING;