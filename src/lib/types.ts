export type PropertyStatus = 'active' | 'sold' | 'featured';
export type ListingType = 'Sale' | 'Rent';

export interface Property {
  id: string;
  title: string;
  description: string | null;
  price: string | null;
  location: string | null;
  beds: number | null;
  baths: number | null;
  area: string | null;
  land_area: string | null;
  images: string[];
  status: PropertyStatus;
  type: string | null;
  listing_type: ListingType | null;
  tags: string[];
  agent_id: string | null;
  created_at: string;
  updated_at: string;
  youtube_video?: string | null;
  parkings?: number | null;
  meta_title?: string | null;
  meta_description?: string | null;
}

export interface User {
  id: string;
  email: string;
  full_name?: string;
  role: 'admin' | 'user' | 'agent';
}

export interface AgentUser {
  id: string;
  email?: string;
  user_metadata: {
    full_name?: string;
    role?: string;
  };
  created_at: string;
  last_sign_in_at?: string;
}

export interface PageSeo {
  id: string;
  route: string;
  title: string;
  description: string | null;
  og_image: string | null;
  updated_at: string;
}

export interface PageAsset {
  id: string;
  page_route: string;
  section_key: string;
  label: string;
  asset_url: string;
  alt_text: string | null;
  updated_at: string;
}
