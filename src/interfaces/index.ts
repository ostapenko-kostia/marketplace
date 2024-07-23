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
  price: {
    min: number;
    max: number;
  };
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
  file?: string;
  id: number;
  name: string;
  category: TypeCategories;
  price: number;
  location: string;
  description: string;
}
