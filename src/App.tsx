import { useEffect, useState } from "react";
import { TypeCategories } from "./interfaces";
import { CategoriesContext } from "./context/CategoriesContext";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./components/Layout";
import { checkAuth } from "./store/slices/AuthSlice";
import Login from "./pages/Login";
import { useAppDispatch } from "./store/store";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";
import Create from "./pages/Create";
import RequireAuth from "./hoc/RequireAuth";
import SearchPage from "./pages/SearchPage";
import FavoritePage from "./pages/FavoritePage";
import MyListingsPage from "./pages/MyListingsPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import EditPage from "./pages/EditPage";
import SinglePage from "./pages/SinglePage";

function App() {
  const dispatch = useAppDispatch();
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <Layout>
          <Home />
        </Layout>
      ),
    },
    {
      path: "/log-in",
      element: (
        <Layout sidebar={false}>
          <Login />
        </Layout>
      ),
    },
    {
      path: "/sign-up",
      element: (
        <Layout sidebar={false}>
          <Signup />
        </Layout>
      ),
    },
    {
      path: "/create",
      element: (
        <RequireAuth>
          <Layout>
            <Create />
          </Layout>
        </RequireAuth>
      ),
    },
    {
      path: "/search",
      element: (
        <Layout>
          <SearchPage />
        </Layout>
      ),
    },
    {
      path: "/favorite",
      element: (
        <RequireAuth>
          <Layout>
            <FavoritePage />
          </Layout>
        </RequireAuth>
      ),
    },
    {
      path: "/my-listings",
      element: (
        <RequireAuth>
          <Layout>
            <MyListingsPage />
          </Layout>
        </RequireAuth>
      ),
    },
    {
      path: "/forgot-password",
      element: (
        <Layout sidebar={false}>
          <ForgotPasswordPage />
        </Layout>
      ),
    },
    {
      path: "/edit",
      element: (
        <RequireAuth>
          <Layout>
            <EditPage />
          </Layout>
        </RequireAuth>
      ),
    },
    {
      path: "/listing",
      element: (
        <Layout>
          <SinglePage />
        </Layout>
      ),
    },
    {
      path: "*",
      element: (
        <Layout sidebar={false}>
          <NotFound />
        </Layout>
      ),
    },
  ]);
  const [categories, setCategories] = useState<TypeCategories[]>(["Electronics", "Fashion", "Home and Garden", "Automotive", "Toys and Games", "Health and Beauty", "Sports and Outdoors", "Other"]);

  useEffect(() => {
    dispatch(checkAuth(localStorage.getItem("refresh-token")));
  }, [dispatch]);

  return (
    <CategoriesContext.Provider value={{ categories, setCategories }}>
      <RouterProvider router={router} />
    </CategoriesContext.Provider>
  );
}

export default App;
