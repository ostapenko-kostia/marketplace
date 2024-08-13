import { useSearchParams } from "react-router-dom";
import { useGetFavoriteListings, useGetListingsByFilters } from "../hooks/useListings";
import { TypeCategories } from "../interfaces";
import Card from "../components/Card";
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useAppSelector } from "../store/store";

function SearchPage() {
  const [urlParams, setUrlParams] = useSearchParams();
  const queryClient = useQueryClient();
  const { isAuth } = useAppSelector((state) => state.auth);

  const { register, handleSubmit } = useForm();

  setTimeout(() => {
    queryClient.invalidateQueries({ queryKey: ["searchListings"] });
  });

  let name = urlParams.get("name");
  let category = urlParams.get("categories");
  if (!name || name == "") name = null;
  if (category == "All Categories") category = null;
  const min_price: number | null = Number(urlParams.get("min_price"));
  const max_price: number | null = Number(urlParams.get("max_price"));

  const { data: listings } = useGetListingsByFilters(name, category as TypeCategories[] | null, min_price, max_price);
  const { data: favListings } = useGetFavoriteListings(isAuth);

  return (
    <section className="mx-auto w-full px-5 py-12 flex items-center flex-col">
      <h2 className="text-3xl mb-4">Search {name && name != "null" ? `results for '${name}'` : "results"}</h2>
      <h3 className="text-lg mb-4">Category: {category ? category : "All Categories"}</h3>
      <div className="w-full mb-4">
        <form
          className="flex gap-3 w-full max-sm:flex-col"
          onSubmit={handleSubmit((data) =>
            setUrlParams((prev) => {
              console.log(prev);
              if (prev.get("min_price") || prev.get("max_price")) {
                prev.delete("min_price");
                prev.delete("max_price");
              }
              const params = new URLSearchParams(prev);
              params.append("min_price", data.min_price);
              params.append("max_price", data.max_price);
              return params;
            })
          )}
        >
          <input type="number" {...register("min_price", { min: 0 })} className="max-sm:w-full w-1/3 border-gray border-solid border-[1px] px-5 py-2 rounded-xl" placeholder="Min Price" />
          <input type="number" {...register("max_price", { min: 0 })} className="max-sm:w-full w-1/3 border-gray border-solid border-[1px] px-5 py-2 rounded-xl" placeholder="Max Price" />
          <button type="submit" className="bg-primary px-12 py-2 w-fit mx-auto text-lg rounded-xl">
            Apply
          </button>
        </form>
      </div>
      <div className="w-full flex flex-wrap gap-5 items-center max-md:flex-col max-md:w-fit max-md: mx-auto h-full">
        {listings?.map((listing) => {
          const isFavorite = favListings?.some((fav) => fav.listing_id === listing.listing_id);
          return (
            <div className="w-72" key={listing.listing_id}>
              <Card isFavorite={isFavorite} listing={listing} />
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default SearchPage;
