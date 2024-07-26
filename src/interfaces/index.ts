export type TypeCategories =
  | "Electronics"
  | "Fashion"
  | "Home and Garden"
  | "Automotive"
  | "Toys and Games"
  | "Health and Beauty"
  | "Sports and Outdoors"
  | "Other"
  | null;

export interface IFilters {
  name?: string;
  categories?: TypeCategories[];
  min_price?: number;
  max_price?: number;
}

export interface IUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}

export interface AuthResponse {
  access_token: string;
  refresh_token: string;
  userDetails: IUser;
}

export interface IListing {
  listing_id: number;
  name: string;
  category: TypeCategories;
  price: number;
  location: string;
  description: string;
  photo_ref?: string;
}
