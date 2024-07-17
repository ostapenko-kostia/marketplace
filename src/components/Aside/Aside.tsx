import useCategories from "../../context/CategoriesContext";
import AsideRow from "../AsideRow/AsideRow";
import styles from "./styles.module.scss";
import { useRef } from "react";

interface Props {
  className?: string;
}

export default function Aside({ className }: Props) {
  const minPriceInput = useRef<HTMLInputElement>(null);
  const maxPriceInput = useRef<HTMLInputElement>(null);
  function checkNumber() {
    if (parseInt(minPriceInput.current!.value) <= 0)
      minPriceInput.current!.value = "0";
    if (parseInt(maxPriceInput.current!.value) <= 0)
      maxPriceInput.current!.value = "0";
  }

  const {categories} = useCategories()
  
  return (
    <aside className={`${className} ${styles.container}`}>
      <div className={styles.asideRowCategories}>
        <AsideRow title="Categories">
          <form autoComplete="off">
            {categories ? (
              <div className={styles.categoriesContainer}>
                {categories.map((category) => (
                  <div key={category} className={styles.categoryContainer}>
                    <input type="checkbox" id={`checkbox-${category}`} />
                    <label htmlFor={`checkbox-${category}`}>{category}</label>
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
                  <input
                    ref={minPriceInput}
                    onChange={checkNumber}
                    type="number"
                    placeholder="Minimum price"
                  />
                  <input
                    ref={maxPriceInput}
                    onChange={checkNumber}
                    type="number"
                    placeholder="Maximum price"
                  />
                </div>
                <button type="submit">Search</button>
              </form>
            </div>
          </div>
        </AsideRow>
      </div>
    </aside>
  );
}
