import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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

export function useGetFavoriteListings(isEnabled: boolean) {
  return useQuery({
    queryKey: ["favoriteListings"],
    queryFn: async () => {
      try {
        return await ListingService.getFavorite();
      } catch (e) {}
    },
    staleTime: Infinity,
    enabled: isEnabled,
  });
}

interface CreateListingContext {
  callback?: () => void;
}

export const useCreateListing = (context?: CreateListingContext) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["createListing"],
    mutationFn: async (formData: FormData) => {
      return await ListingService.create(formData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries();
      context?.callback?.();
    },
  });
};

export function usePutToFavorite(listing_id: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["putToFavorite"],
    mutationFn: async () => {
      return await ListingService.putToFavorite(listing_id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["favoriteListings"],
      });
    },
  });
}

export function useDeleteFromFavorite(listing_id: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["deleteFromFavorite"],
    mutationFn: async () => {
      return await ListingService.deleteFromFavorite(listing_id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["favoriteListings"],
      });
    },
  });
}

export function useDeleteListing(listing_id: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["deleteListing"],
    mutationFn: async () => {
      return await ListingService.deleteListing(listing_id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });
}
