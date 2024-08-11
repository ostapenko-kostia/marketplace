import { FC } from "react";
import useCategories from "../context/CategoriesContext";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

interface SearchProps {
  className?: string;
}

const Search: FC<SearchProps> = ({ className = "" }) => {
  const { categories } = useCategories();
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate()
  return (
    <search className={`${className} bg-bg-color-alt pl-3 rounded-xl h-full border-gray border-r-transparent border-solid border-2`}>
      <form autoComplete="off" className="flex items-center text-white h-full gap-4" onSubmit={handleSubmit((data)=>{
        const searchParams = new URLSearchParams({
          name: data.search,
          categories: data.category
        })
        navigate({pathname: `/search`, search: searchParams.toString()})
      })}>
        <input
          {...register("search")}
          className="bg-transparent placeholder:text-[inherit] focus-visible:outline-none h-full w-[250px] border-transparent border-r-gray border-solid border-2"
          type="text"
          name="search"
          placeholder="Search..."
        />
        <select {...register("category")} name="category" className="h-full bg-transparent max-w-[8rem] [&>*]:bg-bg-color-alt">
          <option>All Categories</option>
          {categories &&
            categories.map((c) => (
              <option key={c} value={c as string}>
                {c}
              </option>
            ))}
        </select>
        <button type="submit" className="w-[3rem] h-[3rem] bg-primary rounded-r-xl translate-x-1">
          <i className="fa-solid fa-search"></i>
        </button>
      </form>
    </search>
  );
};

export default Search;
