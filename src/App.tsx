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
import { useAuthStore } from "./store/store";
import SearchPage from "./pages/Search/Search";

// hi

// lol

function App() {
  const { checkAuth } = useAuthStore();
  useEffect(() => {
    checkAuth(localStorage.getItem("refresh-token"));
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout page={<Home />} />,
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
      path: "/listing",
      element: <Layout page={<ListingPage />} />,
    },
    {
      path: "/search",
      element: <Layout page={<SearchPage />} />,
    },
    {
      path: "*",
      element: <Layout page={<NotFound />} />,
    },
  ]);
  const [categories, setCategories] = useState<TypeCategories[]>(["Electronics", "Fashion", "Home and Garden", "Automotive", "Toys and Games", "Health and Beauty", "Sports and Outdoors", "Other"]);

  return (
    <CategoriesContext.Provider value={{ categories, setCategories }}>
      <RouterProvider router={router} />
    </CategoriesContext.Provider>
  );
}

export default App;
