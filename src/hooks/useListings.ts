import { useQuery } from "@tanstack/react-query";
import ListingService from "../services/ListingService";
import { TypeCategories } from "../interfaces";

export function useGetAllListings() {
  const response = useQuery({
    queryKey: ["allListings"],
    queryFn: async () => {
      try {
        return await ListingService.getAll();
      } catch (e) {}
    },
    staleTime: Infinity,
  });
  return response;
}

export function useGetMyListings(isEnabled: boolean) {
  return useQuery({
    queryKey: ["myListings"],
    queryFn: async () => {
      try {
        return await ListingService.getMy();
      } catch (e) {}
    },
    enabled: isEnabled,
    staleTime: Infinity,
  });
}

export function useGetListingsByFilters(name: string | undefined, categories?: TypeCategories[] | undefined, min_price?: number | undefined, max_price?: number | undefined) {
  return useQuery({
    queryKey: ["searchListings"],
    queryFn: async () => {
      try {
        return await ListingService.getByFilters(name, categories, min_price, max_price);
      } catch (e) {}
    },
    staleTime: Infinity,
  });
}
