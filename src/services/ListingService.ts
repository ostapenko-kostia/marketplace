import { IListing, TypeCategories } from "../interfaces";
import $api from ".";

interface ListingApiResponse {
  listings: IListing[];
}

export default class ListingService {
  static async getAll() {
    return (await $api.get<ListingApiResponse>("listing/")).data.listings;
  }

  static async getMy() {
    return (await $api.get<ListingApiResponse>("listing/my")).data.listings;
  }

  static async getFavorite() {
    return (await $api.get<ListingApiResponse>("listing/favorite")).data.listings;
  }

  static async getByFilters(nameP?: string, categoriesP?: TypeCategories[], minPriceP?: number, maxPriceP?: number) {
    interface Params {
      name?: string;
      categories?: TypeCategories[];
      minPrice?: number;
      maxPrice?: number;
    }
    const params: Params = {};
    if (nameP) params.name = nameP;
    if (categoriesP) params.categories = categoriesP;
    if (minPriceP) params.minPrice = minPriceP;
    if (maxPriceP) params.maxPrice = maxPriceP;

    return await $api.get<ListingApiResponse>("listing/search", { params });
  }

  static async deleteListing(listing_id: number) {
    return await $api.delete("listing/delete", { data: { listing_id } });
  }
}