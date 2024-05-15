import React from "react";
import { Link } from "react-router-dom";

// images
import dateImg from "../assets/images/date.svg";
import awardImg from "../assets/images/award.svg";
import arrowRightImg from "../assets/images/arrow-right-solid.svg";
const ContestItem = () => {
  return (
    <li className="flex flex-col gap-4 w-full md:bg-brand-dark-800/5 rounded-2xl group md:flex-row md:gap-5 lg:p-5">
      <img
        width={384}
        height={216}
        src="https://optinmonster.com/wp-content/uploads/2019/08/how-to-run-an-online-contest.png"
        alt="news image"
        className="w-full aspect-video md:aspect-auto md:w-80 lg:w-96 h-auto object-cover rounded-xl lg:rounded-lg"
      />

      {/* main content */}
      <div className="flex flex-col gap-3 min-h-full md:py-5 sm:pr-5 sm:gap-5 md:pr-5 lg:py-2">
        {/* content header (date, prize, arrow right) */}
        <div className="flex items-center justify-between gap-5">
          {/* date prize */}
          <div className="flex gap-4">
            {/* date */}
            <div className="flex items-end gap-1.5 xs:items-center xs:gap-2">
              <img
                width={24}
                height={24}
                src={dateImg}
                alt="date icon"
                className="size-5 xs:size-6"
              />
              <span className="text-base xs:text-lg">08.12.2024</span>-
              <span className="text-base xs:text-lg">08.12.2024</span>
            </div>

            {/* total prize */}
            <div className="flex items-end gap-1.5 xs:items-center xs:gap-2">
              <img
                width={24}
                height={24}
                src={awardImg}
                alt="award icon"
                className="size-5 xs:size-6"
              />

              <span className="text-base xs:text-lg">10ta</span>
            </div>
          </div>

          {/* arrow right */}
          <Link
            aria-label="contest"
            to="/contests/contest/1"
            className="hidden sm:inline-block"
          >
            <img
              width={24}
              height={24}
              src={arrowRightImg}
              alt="arrow right icon"
              className="size-6 opacity-0 -translate-x-3 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
            />
          </Link>
        </div>

        {/* mid content (title, description & product image) */}
        <div className="flex items-start gap-3.5 sm:gap-5">
          <img
            width={160}
            height={160}
            src="https://i.ytimg.com/vi/l7O49lYbI8Q/maxresdefault.jpg"
            alt="furniture image"
            className="size-20 rounded-lg object-cover xs:size-24 sm:size-28 md:size-32 lg:size-40 md:rounded-xl"
          />

          {/* (title & description) */}
          <div className="space-y-2 h-full sm:space-y-1">
            <h3 className="text-base md:text-lg lg:text-xl line-clamp-3">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas
              natus ipsum, libero in illum suscipit. Nobis delectus numquam
              beatae architecto!
            </h3>

            <p className="text-sm md:text-base ">
              Konkursda jami yutuqli o'rinlar soni 5 ta va umumiy mablag'
              15,000,000 so'm. Konkurs g'oliblari kamida 500 ta mahsulot sotgan
              bo'lishi kerak.
            </p>
          </div>
        </div>

        {/* content footer  */}
        <div className="flex gap-3.5 sm:gap-5">
          <Link
            to="/contests/contest/1"
            className="w-full text-center py-2.5 px-5 border-2 border-brand-dark-800 rounded-xl xs:w-auto"
          >
            Ba'tafsil
          </Link>
          <button className="main-btn">O'chirish</button>
        </div>
      </div>
    </li>
  );
};

export default ContestItem;
