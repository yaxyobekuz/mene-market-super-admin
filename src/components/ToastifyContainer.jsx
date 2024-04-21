import React from "react";

import { Bounce, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const ToastifyContainer = () => {
  return (
    <ToastContainer
      position="bottom-right"
      autoClose={5000}
      hideProgressBar={true}
      closeOnClick={true}
      pauseOnHover={true}
      draggable={false}
      theme={"light "}
      transition={Bounce}
      stacked
    />
  );
};

export default ToastifyContainer;
