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
import ProductsLayout from "./layouts/ProductsLayout";

// pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Products from "./pages/Products";
import ProductAdd from "./pages/ProductAdd";

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

        <Route path="product" element={<ProductLayout />}>
          <Route path="products" element={<ProductsLayout />}>
            <Route index path=":productType" element={<Products />} />
          </Route>

          <Route path="add" element={<ProductAdd />} />
        </Route>
      </Route>
    )
  );
  return <RouterProvider router={router} />;
};

export default App;
