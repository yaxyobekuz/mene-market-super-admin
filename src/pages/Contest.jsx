import React from "react";
import { Link } from "react-router-dom";

// helpers
import { formatNumber } from "../helpers/helpers";

// components
import ContestItem from "../components/ContestItem";
import RecommendationSection from "../components/RecommendationSection";

// images
import plusImg from "../assets/images/plus.svg";
import userImg from "../assets/images/user.jpg";
import laurelImg from "../assets/images/laurel.svg";
import usersImg from "../assets/images/edit-user.svg";
import competitionImg from "../assets/images/competition.svg";
import arrowRightImg from "../assets/images/arrow-right.svg";
import transactionsImg from "../assets/images/transactions.svg";
import createContestImg from "../assets/images/create-contest.svg";
const Contest = () => {
  const prizes = [
    {
      id: 0,
      value: 2000000,
    },
    {
      id: 1,
      value: 1500000,
    },
    {
      id: 2,
      value: 1000000,
    },
    {
      id: 3,
      value: 900000,
    },
    {
      id: 4,
      value: 800000,
    },
    {
      id: 5,
      value: 700000,
    },
    {
      id: 6,
      value: 600000,
    },
    {
      id: 7,
      value: 500000,
    },
    {
      id: 8,
      value: 400000,
    },
    {
      id: 9,
      value: 300000,
    },
    {
      id: 10,
      value: 200000,
    },
    {
      id: 11,
      value: 100000,
    },
  ];

  return (
    <>
      {/* main section */}
      <div className="pb-12">
        <div className="container space-y-7">
          {/* header */}
          <div className="flex items-center justify-between gap-5 bg-brand-dark-800/5 py-3.5 px-4 rounded-xl">
            <Link to="/contests/1" className="inline-block p-1 rounded-lg">
              <img
                width={20}
                height={20}
                src={arrowRightImg}
                alt="arrow left icon"
                className="size-5 rotate-180"
              />
            </Link>

            {/* title */}
            <h1 className="text-base font-semibold sm:text-lg md:text-xl">
              Eng yaxshi savdo
            </h1>

            {/* add */}
            <Link
              to="/product"
              className="p-1.5 border-2 border-brand-dark-800/10 rounded-full md:p-3"
            >
              <img
                width={20}
                height={20}
                src={plusImg}
                alt="arrow left icon"
                className="size-5 rotate-180"
              />
            </Link>
          </div>

          {/* main content */}
          <ContestItem />

          {/* prizes */}
          <div className="bg-brand-dark-800/5 p-0 py-5 rounded-2xl xs:!p-5">
            <ul className="flex justify-center items-center flex-wrap gap-6">
              {/*  */}

              {prizes.map((prize) => (
                <li
                  key={prize.id}
                  className="flex items-center flex-col gap-1.5"
                >
                  {/* laurel image wrapper */}
                  <div className="flex items-center justify-center relative">
                    <img
                      width={144}
                      height={144}
                      src={laurelImg}
                      alt="laurel image"
                      className="size-28 md:size-32 lg:size-36"
                    />

                    {/* prize number */}
                    <span className="absolute text-2xl sm:text-3xl lg:text-4xl font-bold">
                      {prize.id + 1}
                    </span>
                  </div>

                  {/* money */}
                  <span className="bg-brand-dark-800/5 py-1.5 px-3.5 rounded-full text-sm text-center min-w-[132px] sm:min-w-36 sm:text-base">
                    {formatNumber(prize.value)}0 so'm
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* users */}
          <div className="bg-brand-dark-800/5 py-5 rounded-2xl">
            <ul className="">
              {prizes.map((item) => (
                <li
                  key={item.id}
                  className="flex items-center justify-between gap-5 px-0.5 py-3 even:bg-brand-dark-800/5 xs:px-2.5 sm:px-5 md:gap-8"
                >
                  {/* profile */}
                  <div className="flex items-center gap-2 xs:gap-3 sm:gap-4">
                    {/* count */}
                    <span className="font-semibold text-end shrink-0 w-5 sm:w-6 sm:text-lg">
                      {item.id + 1}.
                    </span>

                    {/* user profile image */}
                    <img
                      width={64}
                      height={64}
                      src={userImg}
                      alt="user profile image"
                      className="size-12 object-cover bg-brand-dark-800/10 rounded-full border-2 border-brand-dark-800 xs:size-14 sm:size-16"
                    />

                    {/* user first name wrapper */}
                    <div className="space-y-2.5">
                      <h3 className="text-base font-semibold line-clamp-1 sm:text-lg">
                        Ketmonov Qo'chqorbek Teshabek o'g'li sila
                      </h3>
                      <p className="font-semibold opacity-70 leading-none line-clamp-1 text-sm sm:text-base">
                        #asf275-sgs26es-269s9-abbb288-asuhd73
                      </p>
                    </div>
                  </div>

                  {/* product sell counts */}
                  <div className="flex flex-col items-end gap-0.5 shrink-0 sm:gap-2.5">
                    <p className="font-semibold sm:text-lg">265/500</p>
                    <p className="font-semibold sm:text-lg">2.000.000 so'm</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* recommendation section */}
      <RecommendationSection
        items={[
          {
            title: "Konkurslar",
            path: "contests",
            image: {
              src: competitionImg,
              alt: "news image",
            },
          },
          {
            title: "Konkurs uyushtirish",
            path: "product",
            image: {
              src: createContestImg,
              alt: "create new contest image",
            },
          },
          {
            title: "Foydalanuvchilarni boshqarish",
            path: "users",
            image: {
              src: usersImg,
              alt: "users image",
            },
          },
        ]}
      />
    </>
  );
};

export default Contest;
