import { useEffect, useState } from "react";
import { TypeCategories } from "./interfaces";
import { CategoriesContext } from "./context/CategoriesContext";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home/Home";
import NotFound from "./pages/NotFound/NotFound";
import CreateLisiting from "./pages/CreateListing/CreateListing";
import Layout from "./components/Layout/Layout";
import LogIn from "./pages/LogIn/LogIn";
import SignUp from "./pages/SignUp/SignUp";
import ListingPage from "./pages/ListingPage/ListingPage";
import RequireAuth from "./hoc/RequireAuth";
import { useGetAllListings, useGetMyListings } from "./hooks/useListings";
import { useQueryClient } from "@tanstack/react-query";
import { useAuthStore } from "./store/store";

// hi

// lol

function App() {
  const { isAuth, checkAuth } = useAuthStore();

  const { data: allListings } = useGetAllListings();
  const { data: myListings } = useGetMyListings(isAuth);

  const queryClient = useQueryClient();

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout page={<Home allListings={allListings} myListings={myListings} />} />,
    },
    {
      path: "/create",
      element: (
        <Layout
          page={
            <RequireAuth>
              <CreateLisiting />
            </RequireAuth>
          }
        />
      ),
    },
    {
      path: "/log-in",
      element: <Layout page={<LogIn />} />,
    },
    {
      path: "/sign-up",
      element: <Layout page={<SignUp />} />,
    },
    {
      path: "/listing/:id",
      element: <Layout page={<ListingPage />} />,
    },
    {
      path: "*",
      element: <Layout page={<NotFound />} />,
    },
  ]);

  const [categories, setCategories] = useState<TypeCategories[]>(["Electronics", "Fashion", "Home and Garden", "Automotive", "Toys and Games", "Health and Beauty", "Sports and Outdoors", "Other"]);

  useEffect(() => {
    checkAuth(localStorage.getItem("refresh-token"));
  }, []);

  return (
    <CategoriesContext.Provider value={{ categories, setCategories }}>
      <button
        onClick={() => {
          queryClient.invalidateQueries({ queryKey: ["allListings", "myListings"] });
        }}
      >
        invalidate
      </button>
      <RouterProvider router={router} />
    </CategoriesContext.Provider>
  );
}

export default App;
