import React from "react";
import { Outlet } from "react-router-dom";

// components
import Header from "../components/Header";
import Footer from "../components/Footer";

// toast
import { ToastContainer, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const MainRoot = () => {
  return (
    <div className="flex flex-col min-h-screen font-fira_sans">
      <Header />

      <main className="grow">
        <Outlet />
      </main>

      {/* <Footer /> */}

      {/* notification */}
      <ToastContainer
        position="bottom-right"
        autoClose={3500}
        hideProgressBar={true}
        closeOnClick={true}
        pauseOnHover={true}
        draggable={false}
        theme={"light "}
        transition={Zoom}
      />
    </div>
  );
};

export default MainRoot;
