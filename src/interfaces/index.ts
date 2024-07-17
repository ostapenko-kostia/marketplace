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
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: IUser;
}

export interface IListing {
  file?: string;
  id: number;
  name: string;
  category: TypeCategories;
  price: number;
  location: string;
  description: string;
  seller_name: IUser["first_name"];
  seller_email: IUser["email"];
}
