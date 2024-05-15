import React from "react";
import { Link } from "react-router-dom";

// images
import image from "../assets/images/404.svg";

const Page404 = () => {
  return (
    <div className="container flex items-center justify-center h-screen">
      <div className="flex items-center flex-col md:gap-10 md:flex-row">
        <img
          width={384}
          height={384}
          src={image}
          alt="404 page"
          className="w-11/12 aspect-square -mb-4 xs:size-80 md:mb-0 lg:size-96"
        />

        <div className="max-w-sm space-y-4 text-center md:text-start">
          <h1 className="text-3xl xs:text-4xl">
            Xatolik yuz berdi. <br /> Sahifa topilmadi!
          </h1>
          <p className="text-lg">
            Siz noto'g'ri sahifaga kirib qoldingiz. Havola to'g'ri
            kiritilinganiga ishonch hosil qiling!
          </p>
          <div className="flex flex-col gap-4 xs:flex-row">
            <Link
              to={-1}
              className="w-full border-2 border-brand-dark-800 py-3 rounded-xl text-center"
            >
              Ortga qaytish
            </Link>
            <Link
              to="/"
              className="main-btn w-full py-3.5 rounded-xl text-center"
            >
              Bosh sahifa
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page404;
