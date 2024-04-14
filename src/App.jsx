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

const App = () => {
  const { authData } = useSelector((store) => store.authData);
  useEffect(() => console.log("app rendered", authData), [authData]);
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route
        path="/"
        element={<>{authData.isLoggedIn ? <MainRoot /> : <Login />}</>}
      >
        <Route index element={<Home />} />
      </Route>
    )
  );
  return <RouterProvider router={router} />;
};

export default App;
