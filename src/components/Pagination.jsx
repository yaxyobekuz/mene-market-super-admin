import React from "react";
import { Link } from "react-router-dom";

// images
import arrowRightImg from "../assets/images/arrow-right.svg";
const Pagination = ({ currentIndex, lastIndex, link }) => {
  const index = {
    current: Number(currentIndex),
    last: Number(lastIndex),
  };

  return (
    <div className="flex items-center justify-center gap-2">
      {/* previous */}
      {index.current > 1 ? (
        <Link
          aria-label="Next page"
          to={link + (index.current - 1)}
          className="rotate-180 border-2 border-brand-dark-800 rounded-full p-2"
        >
          <img
            width={24}
            height={24}
            src={arrowRightImg}
            alt="arrow left icon"
            className="size-6"
          />
        </Link>
      ) : (
        <span className="opacity-70 rotate-180 border-2 border-brand-dark-800 rounded-full p-2">
          <img
            width={24}
            height={24}
            src={arrowRightImg}
            alt="arrow left icon"
            className="size-6"
          />
        </span>
      )}

      {/* page number */}
      <span className="min-w-36 text-center text-lg">
        Sahifa {index.current} / {lastIndex}
      </span>

      {/* next */}
      {index.last > index.current ? (
        <Link
          aria-label="Next page"
          to={link + (index.current + 1)}
          className="border-2 border-brand-dark-800 rounded-full p-2"
        >
          <img
            width={24}
            height={24}
            src={arrowRightImg}
            alt="arrow right icon"
            className="size-6"
          />
        </Link>
      ) : (
        <span className="opacity-70 border-2 border-brand-dark-800 rounded-full p-2">
          <img
            width={24}
            height={24}
            src={arrowRightImg}
            alt="arrow right icon"
            className="size-6"
          />
        </span>
      )}
    </div>
  );
};

export default Pagination;
