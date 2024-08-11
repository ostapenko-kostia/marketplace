import { Dispatch, FC, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/store";
import Search from "./Search";
import { Link } from "react-router-dom";
import { logout } from "../store/slices/AuthSlice";

interface HeaderProps {
  setIsMenuOpen: Dispatch<React.SetStateAction<boolean>>;
}

const Header: FC<HeaderProps> = ({ setIsMenuOpen }) => {
  const { isAuth, user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch()
  const [isPopupShown, setIsPopupShown] = useState<boolean>(false);
  return (
    <header className="bg-black w-full py-5 border-b-[3px] border-solid border-gray">
      <div className="container relative max-md:px-5 flex h-[50px] mx-auto items-center gap-[100px] max-960:gap-[20px]">
        <button onClick={() => setIsMenuOpen((prev: boolean) => !prev)} className="md:hidden text-white text-3xl">
          <i className="fa-solid fa-bars" />
        </button>
        <Link to="/">
          <h1 className="text-white text-3xl max-xs:text-2xl">Quicklist</h1>
        </Link>
        <Search className="max-md:hidden" />
        <div className="ml-auto max-[450px]:pr-5">
          <ul className="list-none flex gap-10 text-white [&>li]:text-xl max-lg:gap-4">
            {isAuth ? (
              <>
                <li className="flex items-center">
                  <Link to="/favorite">
                    <i className="fa-regular fa-heart"></i>
                  </Link>
                </li>
                <li className="flex justify-between items-center text-base">
                  <button onClick={()=>setIsPopupShown((prev) => !prev)} className="h-[2.5rem] w-[2.5rem] rounded-full flex gap-1 items-center">
                    <img height={100} width={100} className="rounded-full" src={user?.profile_pic} alt={user?.firstName} />
                    <i className="fa-solid fa-chevron-down text-xs"></i>
                  </button>
                  <div className={`${isPopupShown ? "flex" : "hidden"} absolute w-32 h-fit z-[1000] top-14 right-[-10px] max-[450px]:right-4 text-black flex-col bg-white border-2 border-solid border-gray`}>
                    <ul className="w-full h-full p-2 [&>li]:border-b-gray [&>li]:text-center [&>li]:border-b-[1px] [&>li]:border-b-solid flex flex-col gap-2">
                      <li className="hover:bg-gray hover:text-white text-nowrap">
                        <Link className="w-full h-full inline-block" to='/my-listings'>My Listings</Link>
                      </li>
                      <li className="hover:bg-gray hover:text-white text-nowrap">
                        <button className="w-full h-full inline-block" onClick={()=>dispatch(logout())}>Logout</button>
                      </li>
                    </ul>
                  </div>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/log-in">
                    <button className="max-lg:text-sm max-lg:text-nowrap">Log in</button>
                  </Link>
                </li>
                <li>
                  <Link to="/sign-up">
                    <button className="max-lg:text-sm max-lg:text-nowrap">Sign up</button>
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
