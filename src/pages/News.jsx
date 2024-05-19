import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";

// axios
import axios from "../axios/axios";

// helpers
import {
  errorMessage,
  formatDate,
  formatTime,
  successMessage,
} from "../helpers/helpers";

// data
import { imageBaseUrl } from "../data/data";

// components
import ConfirmModal from "../components/ConfirmModal";
import RecommendationSection from "../components/RecommendationSection";

// antd
import "../css/antd.css";
import { Skeleton } from "antd";

// redux
import { useDispatch, useSelector } from "react-redux";
import { deleteNewsData, setNewsData } from "../store/newsDataSlice";

// images
import timeImg from "../assets/images/time.svg";
import dateImg from "../assets/images/date.svg";
import newsImg from "../assets/images/news.svg";
import plusImg from "../assets/images/plus.svg";
import reloadImg from "../assets/images/reload.svg";
import deleteImg from "../assets/images/delete.svg";
import reviewsImg from "../assets/images/reviews.svg";
import newsAddImg from "../assets/images/news-add.svg";
import productsImg from "../assets/images/products.svg";
import arrowRightImg from "../assets/images/arrow-right-solid.svg";
const News = () => {
  const currentPageIndex = 0;
  const dispatch = useDispatch();
  const [news, setNews] = useState([]);
  const [loader, setLoader] = useState(true);
  const [loader2, setLoader2] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [newnessData, setNewnessData] = useState([]);
  const { newsData } = useSelector((store) => store.newsData);
  const { authData } = useSelector((store) => store.authData);

  // get news data from server
  const getNewsData = () => {
    setLoader(true);

    axios
      .get("News")
      .then((res) => {
        if (res.status === 200) {
          // setNews(res.data);
          dispatch(
            setNewsData({ dataIndex: currentPageIndex, data: res.data })
          );
        } else {
          errorMessage("Malumotlarni yuklab bo'lmadi!");
        }
      })
      .catch(() => errorMessage.offline("Ma'lumotlarni yuklab bo'lmadi!"))
      .finally(() => setLoader(false));
  };

  // get news data
  useEffect(() => {
    if (!newsData[currentPageIndex]) {
      getNewsData();
    } else {
      setNews(newsData[currentPageIndex]);
      setTimeout(() => setLoader(false), 500);
    }
  }, [newsData]);

  // delete news
  const deleteNews = () => {
    setLoader2(true);

    axios
      .delete("News?Id=" + newnessData.id, {
        headers: { Authorization: "Bearer " + authData.data.token },
      })
      .then((res) => {
        if (res.status === 200) {
          setOpenModal(false);
          dispatch(
            deleteNewsData({ dataIndex: currentPageIndex, id: res.data.id })
          );
          successMessage("Yangilik muvaffaqiyatli o'chirildi!");
        } else {
          errorMessage();
        }
      })
      .catch(() => errorMessage.offline("Yangilikni o'chirib bo'lmadi!"))
      .finally(() => setLoader2(false));
  };

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
            <button
              onClick={getNewsData}
              disabled={loader}
              className="flex items-center justify-center gap-2 bg-brand-dark-800/5 rounded-xl px-5 py-4"
            >
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
              // news
              <ul className="space-y-5">
                {news.map((newness) => {
                  return (
                    <li key={newness.id} className="w-full">
                      <div className="flex flex-col gap-4 w-full sm:bg-brand-dark-800/5 rounded-2xl sm:flex-row md:gap-5 md:p-5">
                        {/* image wrapper */}
                        <div className="relative w-full h-auto sm:w-80 sm:h-[180px] md:aspect-auto md:rounded-lg lg:w-96 lg:h-[216px] shrink-0">
                          <img
                            width={384}
                            height={216}
                            src={imageBaseUrl + newness.imageFilePath}
                            alt="newness image"
                            className="w-full h-auto aspect-video object-cover rounded-xl bg-brand-dark-800/10"
                          />

                          {/* delete btn */}
                          <button
                            onClick={() => {
                              setNewnessData(newness);
                              setOpenModal(true);
                            }}
                            className="main-btn absolute top-5 left-5 p-2.5"
                          >
                            <img
                              width={20}
                              height={20}
                              src={deleteImg}
                              alt="delete icon"
                              className="size-5"
                            />
                          </button>
                        </div>

                        {/* main content */}
                        <Link
                          to={`/news/newness/${newness.id}`}
                          className="flex flex-col gap-3 min-h-full w-full rounded-lg group sm:py-5 sm:pr-5 sm:gap-3 md:pr-0 md:py-0 lg:py-2"
                        >
                          {/* content body (title & desctipion) */}
                          <div className="space-y-2 h-full sm:space-y-1">
                            <h3 className="text-base md:text-xl lg:text-2xl line-clamp-3">
                              {newness.name}
                            </h3>

                            <p className="text-sm line-clamp-2 md:text-base ">
                              {newness.description}
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
                                  {formatDate(newness.postedTime)}
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
                                  {formatTime(newness.postedTime)}
                                </span>
                              </div>
                            </div>

                            {/* arrow right */}
                            <img
                              width={24}
                              height={24}
                              src={arrowRightImg}
                              alt="arrow right icon"
                              className="size-5 opacity-0 -translate-x-3 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 sm:size-6"
                            />
                          </div>
                        </Link>
                      </div>
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
      <RecommendationSection
        items={[
          {
            title: "Yangilik qo'shish",
            path: "news/add",
            image: {
              src: newsAddImg,
              alt: "news add image",
            },
          },
          {
            title: "Izohlarni boshqarish",
            path: "reviews",
            image: {
              src: reviewsImg,
              alt: "reviews image",
            },
          },
          {
            title: "Mahsulotlarni boshqarish",
            path: "products",
            image: {
              src: productsImg,
              alt: "products image",
            },
          },
        ]}
      />

      {/* confirm modal (delete product) */}
      {openModal && (
        <ConfirmModal
          loader={loader2}
          action={deleteNews}
          subtitle="Yangilik nomi:"
          description={newnessData.name}
          closeModal={() => setOpenModal(false)}
          imageSrc={imageBaseUrl + newnessData.imageFilePath}
          button={{ cancel: "Bekor qilish", confirm: "O'chirish" }}
          title="Haqiqatdan ham ushbu yangilikni o'chirmoqchimisiz?"
        />
      )}
    </>
  );
};

export default News;
