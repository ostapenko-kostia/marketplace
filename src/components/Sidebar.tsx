import { FC, useState } from "react";
import useCategories from "../context/CategoriesContext";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/store";
import { logout } from "../store/slices/AuthSlice";

interface SidebarProps {
  className?: string;
}

const Sidebar: FC<SidebarProps> = ({ className = "" }) => {
  const [categoriesOpen, setCategoriesOpen] = useState<boolean>(false);
  const { categories } = useCategories();
  const { isAuth } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  return (
    <aside className={`${className} bg-black border-solid  border-r-[3px] h-full border-gray min-w-[230px] overflow-hidden text-white py-7`}>
      <ul className="list-none relative h-full flex flex-col w-full [&>li]:flex [&>li]:justify-between items-start gap-7">
        <li className={`w-full h-fit flex flex-col`}>
          <button
            className={`${
              categoriesOpen ? "before:block" : "before:hidden"
            } relative before:absolute before:left-[-3px] before:h-[90%] before:top-[50%] before:translate-y-[-50%] before:size-2  before:rounded-full before:bg-primary w-full `}
            onClick={() => setCategoriesOpen((prev) => !prev)}
          >
            <div className={`${categoriesOpen ? "text-primary bg-bg-color-alt" : "text-white"} mx-4 text-left flex items-center gap-3 max-lg:text-base text-lg rounded-2xl hover:bg-bg-color-alt p-2 `}>
              <svg width="30px" height="30px" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className={categoriesOpen ? "stroke-primary" : "stroke-white"}>
                <rect x="10" y="10" width="35" height="35" fill="none" strokeWidth="7" rx="5" ry="5" />
                <rect x="55" y="10" width="35" height="35" fill="none" strokeWidth="7" rx="5" ry="5" />
                <rect x="55" y="55" width="35" height="35" fill="none" strokeWidth="7" rx="5" ry="5" />
                <rect x="10" y="55" width="35" height="35" fill="none" strokeWidth="7" rx="5" ry="5" />
              </svg>
              Categories
            </div>
          </button>

          <div className={`${categoriesOpen ? "block" : "hidden"} rounded border-gray pl-14 max-960:pl-5 pt-5`}>
            <ul className="list-none flex flex-col items-start gap-4">
              <li>
                <Link to="/search?categories=All+Categories">All Categories</Link>
              </li>
              {categories.map((c) => (
                <li key={c}>
                  <Link to={`/search?categories=${c}`}>{c}</Link>
                </li>
              ))}
            </ul>
          </div>
        </li>
        <li className="w-full h-fit flex flex-col">
          <Link to="/create" className="mx-4 text-left flex items-center gap-3 text-lg max-lg:text-base rounded-2xl hover:bg-bg-color-alt p-2">
            <i className="fa-regular fa-percent text-2xl"></i>Sell on Quicklist
          </Link>
        </li>
        {isAuth && (
          <li className="w-full absolute bottom-[20px] h-fit flex flex-col mt-auto">
            <button
              onClick={() => {
                dispatch(logout());
              }}
              className="mx-4 text-left flex items-center gap-3 text-lg rounded-2xl max-lg:text-base hover:bg-bg-color-alt p-2"
            >
              <i className="fa-solid fa-arrow-right-from-bracket text-2xl"></i>Log Out
            </button>
          </li>
        )}
      </ul>
    </aside>
  );
};

export default Sidebar;
