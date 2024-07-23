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
import { useStore } from "./main";

// hi

// lol

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout page={<Home />} />,
  },
  {
    path: "/create",
    element: <Layout page={<CreateLisiting />} />,
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

function App() {
  const [categories, setCategories] = useState<TypeCategories[]>([
    "Electronics",
    "Fashion",
    "Home and Garden",
    "Automotive",
    "Toys and Games",
    "Health and Beauty",
    "Sports and Outdoors",
    "Other",
  ]);

  const {store} = useStore();

  useEffect(()=>{
    store.checkAuth(localStorage.getItem('refresh-token'))
  },[])

  return (
    <CategoriesContext.Provider value={{ categories, setCategories }}>
      <RouterProvider router={router} />
    </CategoriesContext.Provider>
  );
}

export default App;
