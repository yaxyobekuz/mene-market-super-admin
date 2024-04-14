import React, { useEffect } from "react";

import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

// layouts
import MainRoot from "./layouts/MainRoot";

// pages
import Home from "./pages/Home";
import Login from "./pages/Login";

// redux
import { useSelector } from "react-redux";

// components
import ToastifyContainer from "./components/ToastifyContainer";

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
      </Route>
    )
  );
  return <RouterProvider router={router} />;
};

export default App;
