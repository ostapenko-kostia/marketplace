import { createContext, Dispatch, SetStateAction, useContext } from "react";
import { TypeCategories } from "../interfaces";

export interface TypeCategoriesContext {
  categories: TypeCategories[];
  setCategories: Dispatch<SetStateAction<TypeCategories[]>>;
}

export const CategoriesContext = createContext<
  TypeCategoriesContext | undefined
>(undefined);

export default function useCategories() {
  const context = useContext(CategoriesContext);

  if (!context) {
    throw new Error("No Context Provided");
  }

  return context;
}
