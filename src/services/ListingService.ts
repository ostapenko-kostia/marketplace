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

  static async getByFilters(nameP?: string | null, categoriesP?: TypeCategories[] | null, minPriceP?: number | null, maxPriceP?: number| null) {
    interface Params {
      listingName?: string;
      categories?: string;
      minPrice?: number;
      maxPrice?: number;
    }
    const params: Params = {};
    if (nameP) params.listingName = nameP.toLowerCase();
    if (categoriesP && categoriesP[0]) params.categories = categoriesP.toString();
    if (minPriceP) params.minPrice = minPriceP;
    if (maxPriceP) params.maxPrice = maxPriceP;

    return (await $api.get<ListingApiResponse>("listing/search", { params })).data.listings;
  }

  static async deleteListing(listing_id: number) {
    return await $api.delete("listing/delete", { data: { listing_id } });
  }

  static async create(formData: FormData) {
    return await $api.post("listing/create", formData);
  }

  static async putToFavorite(listing_id: number) {
    return await $api.post("listing/putToFavorite", { listing_id });
  }

  static async deleteFromFavorite(listing_id: number) {
    return await $api.delete("listing/deleteFromFavorite", { data: { listing_id } });
  }

  static async edit(formData: FormData) {
    return await $api.put("listing/changeListing", formData);
  }

  static async contactSeller(recipientEmail: string, listingName: string, message: string) {
    return await $api.post("listing/contactSeller", { recipientEmail, listingName, message });
  }
}
