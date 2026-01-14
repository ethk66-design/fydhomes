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
  images: string[];
  status: PropertyStatus;
  type: string | null;
  listing_type: ListingType | null;
  tags: string[];
  agent_id: string | null;
  created_at: string;
  updated_at: string;
}

export interface User {
  id: string;
  email: string;
  full_name?: string;
  role: 'admin' | 'user';
}
