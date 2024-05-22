import React from "react";

// images
import noDataImg from "../assets/images/no-data.svg";
import { Link } from "react-router-dom";

const NoData = ({ title, description }) => {
  return (
    <div className="flex items-center justify-center xs:py-4 sm:py-6 md:py-7">
      <div className="flex flex-col items-center md:gap-3 md:flex-row">
        <img
          width={320}
          height={320}
          src={noDataImg}
          alt="no data image"
          className="w-8/12 xs:size-64 sm:size-72 md:size-80"
        />

        {/* main content */}
        <div className="flex flex-col items-center text-center gap-2.5 max-w-96 md:items-start md:text-start">
          <h2 className="text-xl xs:text-2xl sm:text-3xl">
            {title ? (
              title
            ) : (
              <span>
                Xatolik yuz berdi! <br /> Ma'lumotlar mavud emas.
              </span>
            )}
          </h2>

          <p>
            {description
              ? description
              : "Ushbu sahifadada hech qanday ma'lumot mavjud emas."}
          </p>

          <div className="flex flex-col gap-3.5 w-full xs:w-auto xs:flex-row">
            <Link
              to={-1}
              className="   py-2.5 px-3 rounded-xl border-2 border-brand-dark-800"
            >
              Ortga qaytish
            </Link>
            <Link to="/" className="main-btn">
              Bosh sahifa
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoData;
