import { useForm } from "react-hook-form";
import useCategories from "../../context/CategoriesContext";
import AsideRow from "../AsideRow/AsideRow";
import styles from "./styles.module.scss";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TypeCategories } from "../../interfaces";

interface Props {
  className?: string;
}

export default function Aside({ className }: Props) {
  const { categories } = useCategories();
  const { register, getValues } = useForm();
  const navigate = useNavigate();

  const [minPrice, setMinPrice] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<string>("");
  const [categoriesData, setCategoriesData] = useState<TypeCategories[]>([]);
  const categoriesFormRef = useRef<HTMLFormElement>(null);

  return (
    <aside className={`${className} ${styles.container}`}>
      <div className={styles.asideRowCategories}>
        <AsideRow title="Categories">
          <form ref={categoriesFormRef} autoComplete="off" onChange={()=>{
            const values = getValues();
            setCategoriesData((Object.keys(values).filter((key) => values[key]) as TypeCategories[]))
          }}>
            {categories ? (
              <div className={styles.categoriesContainer}>
                {categories.map((category) => (
                  <div key={category} className={styles.categoryContainer}>
                    <input {...register(category as string)} title={category as string} type="checkbox" />
                    <label>{category}</label>
                  </div>
                ))}
              </div>
            ) : (
              <p>No categories {`:(`}</p>
            )}
          </form>
        </AsideRow>
      </div>
      <div className={styles.asideRowFilters}>
        <AsideRow title="Filters">
          <div className={styles.filterPrice}>
            <h4>price</h4>
            <div className={styles.filterPriceContainer}>
              <form autoComplete="off">
                <div className={styles.filterPriceInputs}>
                  <div style={{ display: "flex", alignItems: "center", width: "100%", flexDirection: "column" }}>
                    <label htmlFor="min-price">Minimum Price</label>
                    <input min={0} value={minPrice} onChange={(e) => setMinPrice(e.target.value)} type="number" id="min-price" />
                  </div>
                  <div style={{ display: "flex", alignItems: "center", width: "100%", flexDirection: "column", marginBottom: "20px" }}>
                    <label htmlFor="max-price">Maximum Price</label>
                    <input min={0} value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} type="number" id="max-price" />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </AsideRow>
      </div>
      <button
        onClick={() => {
          const params = new URLSearchParams({
            categories: categoriesData.join(","),
            min_price: minPrice,
            max_price: maxPrice,
          });
          navigate({
            pathname: "/search",
            search: params.toString(),
          });
        }}
      >
        Apply
      </button>
    </aside>
  );
}
