import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

// antd
import "../css/antd.css";
import { Skeleton } from "antd";

// redux
import { useSelector } from "react-redux";

// data
import { imageBaseUrl } from "../data/data";

// axios
import axiosInstance from "../axios/axiosInstance";

// components
import NoData from "../components/NoData";
import RecommendationSection from "../components/RecommendationSection";

// helpers
import { errorMessage, formatDate, formatTime } from "../helpers/helpers";

// images
import timeImg from "../assets/images/time.svg";
import dateImg from "../assets/images/date.svg";
import newsImg from "../assets/images/news.svg";
import newsAddImg from "../assets/images/news-add.svg";
import contestsImg from "../assets/images/competition.svg";
import topRightArrowImg from "../assets/images/top-right-arrow.svg";

const Newness = () => {
  const { newnessId } = useParams();
  const [loader, setLoader] = useState(true);
  const [newness, setNewness] = useState(null);
  const { newsData } = useSelector((state) => state.newsData);

  // get newness data
  const getNewnessData = () => {
    axiosInstance
      .get("News/ById?id=" + newnessId)
      .then((res) => {
        if (res.status === 200) {
          setNewness(res.data);
        } else {
          errorMessage();
        }
      })
      .catch(() => {
        setNewness(null);
        errorMessage.offline("Ma'lumotlarni yuklab bo'lmadi!");
      })
      .finally(() => setLoader(false));
  };

  useEffect(() => {
    if (newsData && newsData.length > 0) {
      const findNewness = newsData.find((newness) => newness.id === newnessId);
      if (findNewness) {
        setNewness(findNewness);
        setTimeout(() => setLoader(false), 500);
      } else {
        getNewnessData();
      }
    } else {
      getNewnessData();
    }
  }, []);

  return (
    <div className="pb-12">
      <div className="container !px-0 lg:!px-5">
        <div className="flex items-start flex-col gap-7 lg:flex-row">
          {/* newness */}
          <div className="w-full px-3 mb-4 xs:px-4 sm:px-5 lg:px-0">
            {!loader ? (
              <div className="space-y-4">
                {newness ? (
                  <div className="space-y-4">
                    {/* date & time */}
                    <div className="flex gap-5">
                      {/* date */}
                      <div className="flex items-center gap-1.5 xs:gap-2">
                        <img
                          width={20}
                          height={20}
                          src={dateImg}
                          alt="date icon"
                          className="size-4 xs:size-5 sm:size-6"
                        />

                        <span className="text-sm xs:text-base sm:text-lg">
                          {formatDate(newness.postedTime)}
                        </span>
                      </div>

                      {/* time */}
                      <div className="flex items-center gap-1.5 xs:gap-2">
                        <img
                          width={20}
                          height={20}
                          src={timeImg}
                          alt="time icon"
                          className="size-4 xs:size-5 sm:size-6"
                        />

                        <span className="text-sm xs:text-base sm:text-lg">
                          {formatTime(newness.postedTime)}
                        </span>
                      </div>
                    </div>

                    {/* content body */}
                    <div className="grow space-y-4 sm:space-y-5">
                      <img
                        width={384}
                        height={216}
                        src={imageBaseUrl + newness.imageFilePath}
                        alt="news image"
                        className="w-full h-auto bg-brand-dark-800/5 aspect-video object-cover rounded-xl sm:rounded-2xl"
                      />

                      {/* title */}
                      <h1 className="text-lg xs:text-xl sm:text-2xl lg:text-3xl">
                        {newness.name}
                      </h1>

                      {/* description */}
                      <pre className="text-base font-fira-sans sm:text-lg">
                        {newness.description}
                      </pre>
                    </div>
                  </div>
                ) : (
                  <NoData
                    title="Xatolik yuz berdi! Ma'lumotlarni yuklab bo'lmadi."
                    description=" "
                  />
                )}
              </div>
            ) : (
              // loader
              <div className="flex flex-col gap-4">
                <Skeleton.Input
                  active
                  className="!w-44 !h-6 xs:!w-52 xs:!h-7"
                />

                {/* image */}
                <Skeleton.Image
                  active
                  className="!min-w-0 !w-full !h-auto !aspect-video !rounded-xl sm:!rounded-2xl"
                />

                {/* title */}
                <div className="flex flex-col gap-1.5">
                  <Skeleton.Input
                    active
                    className="!w-2/3 !h-6 sm:!h-7 lg:!h-8"
                  />
                  <Skeleton.Input
                    active
                    className="!w-full !h-6 sm:!h-7 lg:!h-8"
                  />
                  <Skeleton.Input
                    active
                    className="!w-full !h-6 sm:!h-7 lg:!h-8"
                  />
                </div>

                {/* description */}
                <div className="flex flex-col gap-1.5">
                  <Skeleton.Input active className="!w-full !h-5 sm:!h-6" />
                  <Skeleton.Input active className="!w-full !h-5 sm:!h-6" />
                  <Skeleton.Input active className="!w-full !h-5 sm:!h-6" />
                  <Skeleton.Input active className="!w-full !h-5 sm:!h-6" />
                </div>
              </div>
            )}
          </div>

          {/* recommendation section */}
          <section className="hidden min-w-80 lg:block">
            <h2 className="mb-7">Ushbu sahifaga oid</h2>

            <ul className="space-y-5">
              <li>
                <Link
                  to="/news/add"
                  className="flex flex-col items-center justify-center gap-3 relative h-full bg-brand-dark-800/5 border-2 border-brand-dark-800 rounded-2xl py-10 px-6 group"
                >
                  <img
                    width={128}
                    height={128}
                    src={newsAddImg}
                    alt="add news image"
                    className="size-28 md:size-32"
                  />

                  {/* arrow */}
                  <img
                    width={36}
                    height={36}
                    src={topRightArrowImg}
                    className="absolute top-10 right-10 size-7 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:top-5 group-hover:right-5"
                    alt="top right arrow"
                  />

                  <h3 className="text-center text-lg xs:text-xl">
                    Yangilik qo'shish
                  </h3>
                </Link>
              </li>

              <li>
                <Link
                  to="/news"
                  className="flex flex-col items-center justify-center gap-3 relative h-full bg-brand-dark-800/5 border-2 border-brand-dark-800 rounded-2xl py-10 px-6 group"
                >
                  <img
                    width={128}
                    height={128}
                    src={newsImg}
                    alt="news image"
                    className="size-28 md:size-32"
                  />

                  {/* arrow */}
                  <img
                    width={36}
                    height={36}
                    src={topRightArrowImg}
                    className="absolute top-10 right-10 size-7 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:top-5 group-hover:right-5"
                    alt="top right arrow"
                  />

                  <h3 className="text-center text-lg xs:text-xl">
                    Yangiliklar
                  </h3>
                </Link>
              </li>

              <li className="col-span-1 sm:col-span-2 lg:col-span-1">
                <Link
                  to="/contests"
                  className="flex flex-col items-center justify-center gap-3 relative h-full bg-brand-dark-800/5 border-2 border-brand-dark-800 rounded-2xl py-10 px-6 group"
                >
                  <img
                    width={128}
                    height={128}
                    src={contestsImg}
                    alt="contests image"
                    className="size-28 md:size-32"
                  />

                  {/* arrow */}
                  <img
                    width={36}
                    height={36}
                    src={topRightArrowImg}
                    className="absolute top-10 right-10 size-7 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:top-5 group-hover:right-5"
                    alt="top right arrow"
                  />

                  <h3 className="text-center text-lg xs:text-xl">Contests</h3>
                </Link>
              </li>
            </ul>
          </section>

          {/* responsive recommendation section */}
          <div className="block w-full lg:hidden">
            <RecommendationSection
              items={[
                {
                  title: "Yangilik qo'shish",
                  path: "news",
                  image: {
                    src: newsAddImg,
                    alt: "add news image",
                  },
                },
                {
                  title: "Yangiliklar",
                  path: "news",
                  image: {
                    src: newsImg,
                    alt: "news image",
                  },
                },
                {
                  title: "Konkurslar",
                  path: "contests",
                  image: {
                    src: contestsImg,
                    alt: "contests image",
                  },
                },
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Newness;
