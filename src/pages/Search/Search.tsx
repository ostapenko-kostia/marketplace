import { FC } from "react";
import styles from "./styles.module.scss";
import { useGetListingsByFilters } from "../../hooks/useListings";
import HomeListingCards from "../../components/HomeListingCards/HomeListingCards";
import { useSearchParams } from "react-router-dom";
import { TypeCategories } from "../../interfaces";

const Search: FC = () => {
  const [searchParams] = useSearchParams();

  const categories: TypeCategories[] | undefined = searchParams.getAll("categories") as TypeCategories[];
  const minPrice: number | undefined = parseInt(searchParams.get("min_price")!);
  const maxPrice: number | undefined = parseInt(searchParams.get("max_price")!);
  const name: string | undefined = searchParams.getAll("name")[0];

  const { data: searchListings } = useGetListingsByFilters(name, categories, minPrice, maxPrice);

  return (
    <section className={styles.container}>
      <div className={styles.header}>
        <h2>Search{name ? ` results for "${name}"` : ""}</h2>
        <p>
          Search Params:
          <br />
          {name ? `Name: ${name}` : ""}
          <br />
          {categories[0] ? `Categories: ${categories}` : ""}
          <br />
          {maxPrice ? `Maximum Price: ${maxPrice}` : ""}
          <br />
          {minPrice ? `Minimum Price: ${minPrice}` : ""}
          <br />
        </p>
      </div>
      <div className={styles.listings}>{searchListings ? <HomeListingCards listings={searchListings} /> : "No Listings Found"}</div>
    </section>
  );
};

export default Search;
