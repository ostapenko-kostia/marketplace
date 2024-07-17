import { createContext, useContext, useEffect, useState } from "react";
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
import Store from "./services/store/store";

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

const store = new Store();

interface State {
  store: Store;
}

export const Context = createContext<State>({ store });

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
  const { store } = useContext(Context);
  useEffect(() => {
    if (localStorage.getItem("token")) {
      store.checkAuth();
    }
  }, []);

  return (
    <Context.Provider value={{ store }}>
      <CategoriesContext.Provider value={{ categories, setCategories }}>
        <RouterProvider router={router} />
      </CategoriesContext.Provider>
    </Context.Provider>
  );
}

export default App;