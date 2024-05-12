import React from "react";

import {
  Outlet,
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
import Users from "./pages/Users";
import Products from "./pages/Products";
import ProductAdd from "./pages/ProductAdd";
import EditProduct from "./pages/EditProduct";
import FindProductById from "./pages/FindProductById";
import Reviews from "./pages/Reviews";
import ProductRequests from "./pages/ProductRequests";
import AddNews from "./pages/AddNews";

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

          <Route path="find-by-id/:productId?" element={<FindProductById />} />
        </Route>

        {/* users */}
        <Route path="users/:usersPageIndex?" element={<Users />} />

        {/* comments */}
        <Route path="reviews/:reviewsPageIndex?" element={<Reviews />} />

        {/* product requests */}
        <Route
          path="product-requests/:productRequestsPageIndex?"
          element={<ProductRequests />}
        />

        {/* news */}
        <Route path="news" element={<Outlet />}>
          <Route path="add" element={<AddNews />} />
        </Route>
      </Route>
    )
  );
  return <RouterProvider router={router} />;
};

export default App;
