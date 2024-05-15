import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// antd
import "../css/antd.css";
import { Skeleton } from "antd";

// components
import Pagination from "../components/Pagination";
import ContestItem from "../components/ContestItem";
import RecommendationSection from "../components/RecommendationSection";

// images
import plusImg from "../assets/images/plus.svg";
import newsImg from "../assets/images/news.svg";
import reloadImg from "../assets/images/reload.svg";
import competitionImg from "../assets/images/competition.svg";
import transactionsImg from "../assets/images/transactions.svg";
import createContestImg from "../assets/images/create-contest.svg";
const Contests = () => {
  const [contests, setContests] = useState([]);
  const [loader, setLoader] = useState(false);
  useEffect(() => {
    const items = [];
    for (let index = 0; index < 4; index++) {
      items.push(index + 1);
    }
    setContests(items);
    setLoader(false);
  }, []);

  return (
    <>
      {/* main section */}
      <div className="pb-12">
        <div className="container space-y-7">
          {/* title wrapper */}
          <div className="flex items-center justify-between gap-4">
            <h1>Konkurslar</h1>

            {/* link */}
            <Link
              to="/product"
              className="main-btn hidden items-center justify-center bg-brand-dark-800/5 text-brand-dark-800 group xs:flex"
            >
              <span className="transition-opacity duration-300 group-hover:opacity-0">
                Konkurs uyushtirish
              </span>

              <img
                width={24}
                height={24}
                src={plusImg}
                alt="plus icon"
                className="absolute size-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              />
            </Link>
          </div>

          {/* reload btn & news count wrapper  */}
          <div className="flex justify-between flex-col-reverse gap-4 xs:flex-row">
            <button className="flex items-center justify-center gap-2 bg-brand-dark-800/5 rounded-xl px-5 py-4">
              <img
                width={24}
                height={24}
                src={reloadImg}
                alt="reload news data icon"
                className="size-6"
              />
              <span>Ma'lumotlarni yangilash</span>
            </button>

            {/* news count */}
            <div
              title="total news count"
              aria-label="total news count"
              className="flex items-center justify-center gap-2 bg-brand-dark-800/5 py-4 px-5 rounded-xl"
            >
              <img
                width={24}
                height={24}
                src={competitionImg}
                alt="news icon"
                className="size-6"
              />
              <span>{4}ta</span>
            </div>

            <Link
              to="/news/add"
              className="main-btn flex items-center justify-center bg-brand-dark-800/5 text-brand-dark-800 group py-4 xs:hidden"
            >
              <span className="transition-opacity duration-300 group-hover:opacity-0">
                Yangilik qo'shish
              </span>

              <img
                width={24}
                height={24}
                src={plusImg}
                alt="plus icon"
                className="absolute size-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              />
            </Link>
          </div>

          {/* news list */}
          {contests &&
            (!loader ? (
              <>
                <ul className="space-y-5">
                  {contests.map((item) => {
                    return <ContestItem key={item} />;
                  })}
                </ul>

                {/* pagination */}
                <Pagination link="/contests/" currentIndex={1} lastIndex={2} />
              </>
            ) : (
              // loader
              <ul className="space-y-5">
                {[0, 1, 2, 3, 4, 5, 6, 7].map((item) => {
                  return (
                    <li key={item} className="flex flex-col gap-4">
                      <Skeleton.Input
                        active
                        className="!hidden md:!h-[316px] lg:!h-[332px] !rounded-2xl md:!block"
                      />

                      <Skeleton.Image
                        active
                        className="!flex !w-full !h-auto aspect-video !rounded-2xl md:!hidden"
                      />

                      {/* body */}
                      <div className="flex flex-col gap-5 md:hidden">
                        {/* top */}
                        <Skeleton.Input
                          active
                          className="!w-full !h-6 xs:!h-7 !rounded-lg"
                        />

                        {/* product */}
                        <div className="flex items-start gap-5">
                          {/* product imaege */}
                          <Skeleton.Input
                            active
                            className="!size-20 !rounded-lg xs:!size-24 sm:!size-28 shrink-0"
                          />

                          {/* title and description */}
                          <div className="flex flex-col gap-3 w-full">
                            {/* title */}
                            <div className="flex flex-col gap-2">
                              <Skeleton.Input
                                active
                                className="!w-1/2 !h-5 !rounded-lg"
                              />
                              <Skeleton.Input
                                active
                                className="!w-full !h-5 !rounded-lg"
                              />
                              <Skeleton.Input
                                active
                                className="!w-full !h-5 !rounded-lg"
                              />
                            </div>

                            {/* description */}
                            <div className="flex flex-col gap-2">
                              <Skeleton.Input
                                active
                                className="!w-full !h-4 !rounded-lg"
                              />
                              <Skeleton.Input
                                active
                                className="!w-full !h-4 !rounded-lg"
                              />
                              <Skeleton.Input
                                active
                                className="!w-full !h-4 !rounded-lg"
                              />
                            </div>
                          </div>
                        </div>

                        {/* buttons */}
                        <div className="flex gap-5">
                          <Skeleton.Input
                            active
                            className="w-full xs:!w-[103px] !h-12 !rounded-lg"
                          />
                          <Skeleton.Input
                            active
                            className="!w-[103px] !h-12 !rounded-lg shrink-0"
                          />
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            ))}
        </div>
      </div>

      {/* recommendation section */}
      <RecommendationSection
        items={[
          {
            title: "Konkurs uyushtirish",
            path: "product",
            image: {
              src: createContestImg,
              alt: "create new contest image",
            },
          },
          {
            title: "Yangiliklarni boshqarish",
            path: "news",
            image: {
              src: newsImg,
              alt: "news image",
            },
          },
          {
            title: "To'lovlar",
            path: "payments",
            image: {
              src: transactionsImg,
              alt: "payments image",
            },
          },
        ]}
      />
    </>
  );
};

export default Contests;
