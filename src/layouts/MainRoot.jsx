import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";

// components
import Header from "../components/Header";
import Footer from "../components/Footer";

const MainRoot = () => {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  return (
    <div className="flex flex-col min-h-screen font-fira_sans">
      <Header />
      <main className="grow">
        <Outlet />
      </main>
      {/* <Footer /> */}
    </div>
  );
};

export default MainRoot;
