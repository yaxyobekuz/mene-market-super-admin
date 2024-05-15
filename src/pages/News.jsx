import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// antd
import "../css/antd.css";
import { Skeleton } from "antd";

// images
import timeImg from "../assets/images/time.svg";
import dateImg from "../assets/images/date.svg";
import newsImg from "../assets/images/news.svg";
import newsAddImg from "../assets/images/news-add.svg";
import plusImg from "../assets/images/plus.svg";
import reloadImg from "../assets/images/reload.svg";
import reviewsImg from "../assets/images/reviews.svg";
import productsImg from "../assets/images/products.svg";
import findProductImg from "../assets/images/find-product.svg";
import arrowRightImg from "../assets/images/arrow-right-solid.svg";
import topRightArrowImg from "../assets/images/top-right-arrow.svg";
const News = () => {
  const [news, setNews] = useState([]);
  const [loader, setLoader] = useState(true);
  useEffect(() => {
    const items = [];
    for (let index = 0; index < 4; index++) {
      items.push(index + 1);
    }
    setTimeout(() => {
      setNews(items);
      setLoader(false);
    }, 3000);
  }, []);

  return (
    <>
      {/* main section */}
      <div className="pb-12">
        <div className="container space-y-7">
          {/* title wrapper */}
          <div className="flex items-center justify-between gap-4">
            <h1>Yangiliklar</h1>

            {/* link */}
            <Link
              to="/news/add"
              className="main-btn hidden items-center justify-center bg-brand-dark-800/5 text-brand-dark-800 group xs:flex"
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
                src={newsImg}
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
          {news &&
            (!loader ? (
              <ul className="space-y-5">
                {news.map((item) => {
                  return (
                    <li key={item} className="w-full">
                      <Link
                        to={`/news/newness/${item}`}
                        className="flex flex-col gap-4 w-full sm:bg-brand-dark-800/5 rounded-2xl group sm:flex-row md:gap-5 md:p-5"
                      >
                        <img
                          width={384}
                          height={216}
                          src="https://images.unsplash.com/photo-1495020689067-958852a7765e?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bmV3c3xlbnwwfHwwfHx8MA%3D%3D"
                          alt="news image"
                          className="w-full sm:w-80 lg:w-96 h-auto aspect-video object-cover rounded-xl md:rounded-lg"
                        />

                        {/* main content */}
                        <div className="flex flex-col gap-3 min-h-full sm:py-5 sm:pr-5 sm:gap-3 md:pr-0 md:py-0 lg:py-2">
                          {/* content body (title & desctipion) */}
                          <div className="space-y-2 h-full sm:space-y-1">
                            <h3 className="text-base md:text-xl lg:text-2xl line-clamp-3">
                              Lorem ipsum dolor sit amet consectetur adipisicing
                              elit. Quas natus ipsum, libero in illum suscipit.
                              Nobis delectus numquam beatae architecto!
                            </h3>

                            <p className="text-sm line-clamp-2 md:text-base ">
                              Konkursda yutuqli o'rinlar 5 ta va umumiy mablag'
                              15,000,000 so'm. Konkurs g'oliblari kamida 500 ta
                              maxsulot sotganlar ichidan olinadi. Konkursda
                              yutuqli o'rinlar 5 ta va umumiy mablag' 15,000,000
                              so'm. o'rinlar 5 ta va umumiy mablag' 15,000,000
                              so'm.
                            </p>
                          </div>

                          {/* content footer (date & time ) */}
                          <div className="flex items-center justify-between gap-5">
                            {/* date & time */}
                            <div className="flex gap-4">
                              {/* date */}
                              <div className="flex items-end gap-1.5 xs:items-center xs:gap-2">
                                <img
                                  width={20}
                                  height={20}
                                  src={dateImg}
                                  alt="date icon"
                                  className="size-4 xs:size-5"
                                />

                                <span className="text-sm leading-none xs:text-base xs:tracking-[1px]">
                                  08.12.2024
                                </span>
                              </div>

                              {/* time */}
                              <div className="flex items-end gap-1.5 xs:items-center xs:gap-2">
                                <img
                                  width={20}
                                  height={20}
                                  src={timeImg}
                                  alt="time icon"
                                  className="size-4 xs:size-5"
                                />

                                <span className="text-sm leading-none xs:text-base xs:tracking-[1px]">
                                  11:59
                                </span>
                              </div>
                            </div>

                            {/* arrow right */}
                            <img
                              width={24}
                              height={24}
                              src={arrowRightImg}
                              alt="arrow right icon"
                              className="size-6 opacity-0 -translate-x-3 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                            />
                          </div>
                        </div>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            ) : (
              // loader
              <ul className="space-y-5">
                {[0, 1, 2, 3, 4, 5, 6, 7].map((item) => {
                  return (
                    <li key={item} className="flex flex-col gap-4">
                      <Skeleton.Input
                        active
                        className="!w-full !h-auto  aspect-video sm:aspect-auto sm:!h-[192px] md:!h-[220px] lg:!h-[256px] !rounded-2xl"
                      />

                      {/* content */}
                      <div className="flex flex-col gap-2.5 sm:hidden">
                        {/* title */}
                        <Skeleton.Input
                          active
                          className="!w-2/3 !h-5 !rounded-lg"
                        />
                        <Skeleton.Input
                          active
                          className="!w-full !h-5 !rounded-lg"
                        />

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
                        </div>

                        {/* date & timeF */}
                        <Skeleton.Input
                          active
                          className="!w-1/2 !h-4 !rounded-lg xs:!h-5"
                        />
                      </div>
                    </li>
                  );
                })}
              </ul>
            ))}
        </div>
      </div>

      {/* recommendation section */}
      <section className="py-12">
        <div className="container">
          <h2 className="mb-7">Ushbu sahifaga oid</h2>
          <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <li>
              <Link
                to="/news/add"
                className="flex flex-col items-center justify-center gap-3 relative h-full border-2 border-brand-dark-800 rounded-2xl py-10 px-6 group"
              >
                <img
                  width={192}
                  height={192}
                  src={newsAddImg}
                  alt="go to find product by id page"
                  className="size-28 sm:size-32 md:size-[147px] "
                />
                {/* arrow */}
                <img
                  width={36}
                  height={36}
                  src={topRightArrowImg}
                  className="absolute top-9 right-9 size-9 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:top-5 group-hover:right-5"
                  alt="top right arrow"
                />
                <h3 className="text-center text-lg xs:text-xl">
                  Yangilik qo'shish
                </h3>
              </Link>
            </li>
            <li>
              <Link
                to="/reviews"
                className="flex flex-col items-center justify-center gap-3 relative h-full border-2 border-brand-dark-800 rounded-2xl py-10 px-6 group"
              >
                <img
                  width={192}
                  height={192}
                  src={reviewsImg}
                  alt="go to reviews page"
                  className="size-28 sm:size-32 md:size-[147px]"
                />
                {/* arrow */}
                <img
                  width={36}
                  height={36}
                  src={topRightArrowImg}
                  className="absolute top-9 right-9 size-9 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:top-5 group-hover:right-5"
                  alt="top right arrow"
                />
                <h3 className="text-center text-lg xs:text-xl">
                  Izohlarni boshqarish
                </h3>
              </Link>
            </li>
            <li className="col-span-1 sm:col-span-2 lg:col-span-1">
              <Link
                to="/product"
                className="flex flex-col items-center justify-center gap-3 relative h-full border-2 border-brand-dark-800 rounded-2xl py-10 px-6 group"
              >
                <img
                  width={192}
                  height={192}
                  src={productsImg}
                  alt="go to products page image"
                  className="size-28 sm:size-32 md:size-[147px]"
                />
                {/* arrow */}
                <img
                  width={36}
                  height={36}
                  src={topRightArrowImg}
                  className="absolute top-9 right-9 size-9 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:top-5 group-hover:right-5"
                  alt="top right arrow"
                />
                <h3 className="text-center text-lg xs:text-xl">
                  Mahsulotlarni boshqarish
                </h3>
              </Link>
            </li>
          </ul>
        </div>
      </section>
    </>
  );
};

export default News;
