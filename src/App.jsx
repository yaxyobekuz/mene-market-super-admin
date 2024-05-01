import React from "react";

import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

// redux
import { useSelector } from "react-redux";

// components
import ToastifyContainer from "./components/ToastifyContainer";

// layouts
import MainRoot from "./layouts/MainRoot";
import ProductLayout from "./layouts/ProductLayout";

// pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Products from "./pages/Products";
import ProductAdd from "./pages/ProductAdd";
import EditProduct from "./pages/EditProduct";
import FindProductById from "./pages/FindProductById";
import Users from "./pages/Users";

const App = () => {
  const { authData } = useSelector((store) => store.authData);
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route
        path="/"
        element={
          <>
            {authData.isLoggedIn ? <MainRoot /> : <Login />}
            {/* notification */}
            <ToastifyContainer />
          </>
        }
      >
        <Route index element={<Home />} />

        {/* product */}
        <Route path="product" element={<ProductLayout />}>
          <Route index element={<Products />} />

          <Route path="add" element={<ProductAdd />} />

          <Route path="edit/:productId" element={<EditProduct />} />

          <Route path="find-by-id" element={<FindProductById />} />
        </Route>

        {/* users */}
        <Route path="users" element={<Users />} />
      </Route>
    )
  );
  return <RouterProvider router={router} />;
};

export default App;
