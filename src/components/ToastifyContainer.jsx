import React from "react";

import { ToastContainer, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const ToastifyContainer = () => {
  return (
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
  );
};

export default ToastifyContainer;
