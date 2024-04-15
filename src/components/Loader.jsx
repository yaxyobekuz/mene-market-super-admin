import React from "react";

// images
import loaderImg from "../assets/images/loader.png";
const Loader = ({ size }) => {
  return (
    <img
      style={{ height: size + "px", width: size + "px" }}
      className="rotate-animation"
      width={size}
      height={size}
      src={loaderImg}
      alt="loader"
    />
  );
};

export default Loader;
