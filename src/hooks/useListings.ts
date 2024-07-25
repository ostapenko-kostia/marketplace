import { DefaultError, useQuery } from "@tanstack/react-query";
import ListingService from "../services/ListingService";
import { IListing } from "../interfaces";

export function useGetAllListings() {
  return useQuery<void, DefaultError, IListing[]>({
    queryKey: ["allListings"],
    queryFn: async () => {
      try {
        await ListingService.getAll();
      } catch (e) {}
    },
  });
}

export function useGetMyListings(isEnabled: boolean) {
  return useQuery<void, DefaultError, IListing[]>({
    queryKey: ["myListings"],
    queryFn: async () => {
      try {
        await ListingService.getMy();
      } catch (e) {}
    },
    enabled: isEnabled,
  });
}
