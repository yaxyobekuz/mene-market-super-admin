import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";

// components
import Header from "../components/Header";
import Footer from "../components/Footer";

const MainRoot = () => {
  const location = useLocation();
  const pathArr = location.pathname.split("/").filter((i) => i !== "");

  // scroll to top
  useEffect(() => {
    if (pathArr[0] === "products" && pathArr.length === 2) {
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

  return (
    <div className="flex flex-col min-h-screen">
      {pathArr[1] !== "chat" && <Header />}
      <main className="grow">
        <Outlet />
      </main>
      {/* <Footer /> */}
    </div>
  );
};

export default MainRoot;
