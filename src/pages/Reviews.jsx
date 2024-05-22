import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";

// axios
import axiosInstance from "../axios/axiosInstance";

// antd
import "../css/antd.css";
import { Popover, Skeleton } from "antd";

// redux
import { useSelector, useDispatch } from "react-redux";
import { deleteReviewData, setReviewsData } from "../store/reviewsDataSlice";

// toast
import { toast } from "react-toastify";

// components
import Pagination from "../components/Pagination";
import ConfirmModal from "../components/ConfirmModal";

// images
import linkImg from "../assets/images/link.svg";
import reloadImg from "../assets/images/reload.svg";
import deleteIcon from "../assets/images/delete.svg";
import commentImg from "../assets/images/comment.svg";
import reviewsImg from "../assets/images/reviews.svg";
import archiveImg from "../assets/images/archive.svg";
import productsImg from "../assets/images/products.svg";
import requestsImg from "../assets/images/requests.svg";
import dotsImg from "../assets/images/dots-vertical.svg";
import unArchiveImg from "../assets/images/unarchive.svg";
import starFilledImg from "../assets/images/star-filled.svg";
import starOutlineImg from "../assets/images/star-outline.svg";
import noUsersDataImg from "../assets/images/no-users-data.svg";
import transactionsImg from "../assets/images/transactions.svg";
import topRightArrowImg from "../assets/images/top-right-arrow.svg";

const Reviews = () => {
  // helpers
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const isOnline = navigator.onLine;

  // reviews data
  const [reviewData, setReviewData] = useState({});
  const { reviewsData } = useSelector((store) => store.reviewsData);
  const [reviews, setReviews] = useState([]);

  // loaders
  const [loader, setLoader] = useState(true);
  const [loader2, setLoader2] = useState(false);

  // modal
  const [openDeleteReviewModal, setOpenDeleteReviewModal] = useState(false);

  // page index
  const { reviewsPageIndex } = useParams();
  const [lastPageIndex, setLastPageIndex] = useState(1);

  const getReviewsData = () => {
    if (isOnline) {
      setLoader(true);

      axiosInstance
        .get("/Comment")
        .then((res) => {
          dispatch(setReviewsData(res.data));
        })
        .catch(() => {
          // err notification
          toast.error("Ma'lumotlarni yuklab bo'lmadi");
        })
        .finally(() => setLoader(false));
    } else {
      toast.error("Internet aloqasi mavjud emas!");
    }
  };

  // get reviews
  useEffect(() => {
    if (!reviewsData || reviewsData.length === 0) {
      getReviewsData();
    } else {
      setLoader(false);
    }
  }, []);

  // set reviews data with page index
  useEffect(() => {
    if (reviewsData.length > 0) {
      const reviewsDataForEachPage = 50;
      const lastIndex = Math.ceil(reviewsData.length / reviewsDataForEachPage);
      setLastPageIndex(lastIndex);

      if (
        Number(reviewsPageIndex) <= lastIndex &&
        Number(reviewsPageIndex) > 0
      ) {
        setReviews(
          reviewsData.slice(
            reviewsPageIndex * reviewsDataForEachPage - reviewsDataForEachPage,
            reviewsPageIndex * reviewsDataForEachPage
          )
        );
      } else if (!reviewsPageIndex) {
        setReviews(reviewsData.slice(0, reviewsDataForEachPage));
      } else {
        setReviews([]);
      }
    }
  }, [location, reviewsData]);

  // delete user
  const deleteReview = () => {
    setLoader2(true);

    axiosInstance
      .delete("/Comment?id=" + reviewData.id)
      .then((res) => {
        dispatch(deleteReviewData(res.data.id));
        setReviews(reviews.filter((review) => review.id !== res.data.id));
        toast.success("Izoh muvaffaqiyatli o'chirildi!");
        setOpenDeleteReviewModal(false);
        if (
          reviews.length === 1 &&
          lastPageIndex === Number(reviewsPageIndex)
        ) {
          navigate("/reviews/" + (lastPageIndex - 1));
        }
      })
      .catch(() => {
        // err notification
        toast.error("Izohni o'chirib bo'lmadi");
      })
      .finally(() => setLoader2(false));
  };

  // toggle archive user
  const toggleArchiveUser = () => {
    setLoader2(true);
    const userDataIndex = reviewsData.findIndex(
      (user) => user.userId === reviewData.userId
    );

    axiosInstance
      .put("/User", {
        user: {
          userId: reviewData.userId,
          firstName: reviewData.firstName,
          lastName: reviewData.lastName,
          email: reviewData.email,
          password: reviewData.password,
          balance: reviewData.balance,
          isArchived: reviewData.isArchived ? false : true,
          role: reviewData.role,
          image: reviewData.image,
          offerLinks: reviewData.offerLinks,
          balanceHistorys: reviewData.balanceHistorys,
        },
      })
      .then((res) => {
        dispatch(
          editUserData({
            index: userDataIndex,
            reviewData: res.data,
          })
        );

        // notification
        toast.success(
          `Foydalanuvchi mavaffaqiyatli ${
            reviewData.isArchived ? "arxivdan chiqarildi" : "arxivlandi"
          }!`
        );
        setOpenToggleArchiveUserModal(false);
      })
      .catch(() => {
        // err notification
        toast.error(
          `Foydalanuvchini ${
            reviewData.isArchived ? "arxivdan chiqarib" : "arxivlab"
          } bo'lmadi!`
        );
      })
      .finally(() => setLoader2(false));
  };

  return (
    <>
      {/* main section (reviews) */}
      <div className="pb-12">
        <div className="container">
          <h1 className="mb-7">Izohlar</h1>

          {/* main content */}
          {reviews &&
            (!loader ? (
              (Number(reviewsPageIndex) <= lastPageIndex &&
                Number(reviewsPageIndex) > 0) ||
              !reviewsPageIndex ? (
                // reviews wrapper
                <div className="space-y-7">
                  {/* filter reviews */}
                  <div className="flex gap-5 justify-between">
                    <div className="flex gap-5 min-w-0 flex-col w-full md:flex-row md:w-auto">
                      {/* reload btn wrapper */}
                      <div className="flex gap-5 justify-between shrink-0 flex-col-reverse sm:flex-row md:justify-normal">
                        <button
                          onClick={getReviewsData}
                          className="flex items-center justify-center gap-2 bg-brand-dark-800/5 rounded-xl px-5 py-4"
                        >
                          <img
                            width={24}
                            height={24}
                            src={reloadImg}
                            alt="reload products data icon"
                            className="size-6"
                          />
                          <span>Ma'lumotlarni yangilash</span>
                        </button>

                        {/* responsive reviews count (statistics) */}
                        <div className="flex gap-5 shrink-0 md:hidden">
                          <div
                            title="total reviews"
                            aria-label="total reviews"
                            className="flex items-center gap-2 bg-brand-dark-800/5 py-4 px-5 rounded-xl"
                          >
                            <img
                              width={24}
                              height={24}
                              src={commentImg}
                              alt="comment icon"
                              className="size-6"
                            />
                            <span>{reviewsData.length}ta</span>
                          </div>

                          {/* archive users count */}
                          <div
                            title="archive reviews"
                            aria-label="archive reviews"
                            className="flex items-center gap-2 bg-brand-dark-800/5 py-4 px-5 rounded-xl"
                          >
                            <img
                              width={24}
                              height={24}
                              src={archiveImg}
                              alt="archive icon"
                              className="size-6"
                            />
                            <span>10ta</span>
                          </div>
                        </div>
                      </div>

                      {/* filter reviews with archives */}
                      <div className="flex gap-3 overflow-x-auto hidden-scroll !min-w-0 bg-brand-dark-800/5 p-1.5 rounded-2xl xs:justify-center md:justify-normal">
                        <button className="main-btn py-2.5 px-4 transition-colors hover:bg-brand-dark-800 hover:text-white">
                          Barchasi
                        </button>
                        <button className="main-btn bg-transparent py-2.5 px-4 text-brand-dark-800 transition-colors hover:bg-brand-dark-800 hover:text-white">
                          Arxivlangan
                        </button>
                        <button className="main-btn bg-transparent py-2.5 px-4 text-brand-dark-800 transition-colors hover:bg-brand-dark-800 hover:text-white">
                          Arxivlanmagan
                        </button>
                      </div>
                    </div>

                    <div className="hidden gap-5 shrink-0 md:flex">
                      <div
                        title="total reviews"
                        aria-label="total reviews"
                        className="flex items-center gap-2 bg-brand-dark-800/5 py-4 px-5 rounded-xl"
                      >
                        <img
                          width={24}
                          height={24}
                          src={commentImg}
                          alt="comment icon"
                          className="size-6"
                        />
                        <span>{reviewsData.length}ta</span>
                      </div>

                      {/* archive users count */}
                      <div
                        title="archive reviews"
                        aria-label="archive reviews"
                        className="flex items-center gap-2 bg-brand-dark-800/5 py-4 px-5 rounded-xl"
                      >
                        <img
                          width={24}
                          height={24}
                          src={archiveImg}
                          alt="archive icon"
                          className="size-6"
                        />
                        <span>10ta</span>
                      </div>
                    </div>
                  </div>

                  {/* reviews */}
                  <ul className="space-y-3">
                    {reviews.map((review, index) => {
                      return (
                        <li
                          key={index}
                          className="flex items-center gap-3 relative w-full bg-brand-dark-800/5 py-2.5 px-2 rounded-xl xs:gap-5 xs:px-4"
                        >
                          {/* review body */}
                          <div className="grow !min-w-0 space-y-1">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <Link
                                  to={
                                    "/products/product/find-by-id/" +
                                    review.productId
                                  }
                                  className="flex items-center gap-1"
                                >
                                  <span className="text-base font-bold line-clamp-1 sm:text-lg">
                                    Mahsulot
                                  </span>

                                  <img
                                    width={16}
                                    height={16}
                                    src={linkImg}
                                    alt="link icon"
                                    className="size-4"
                                  />
                                </Link>

                                {/* user name */}
                                <h3 className="hidden min-w-0 text-base capitalize line-clamp-1 sm:block sm:text-lg">
                                  Foydalanuvchi: {review.userName}
                                </h3>
                              </div>

                              {/* rating status (stars) */}
                              <div className="flex gap-1">
                                <img
                                  width={20}
                                  height={20}
                                  src={starFilledImg}
                                  alt="star"
                                  className="size-4 xs:size-5"
                                />
                                <img
                                  width={20}
                                  height={20}
                                  src={starFilledImg}
                                  alt="star"
                                  className="size-4 xs:size-5"
                                />
                                <img
                                  width={20}
                                  height={20}
                                  src={starFilledImg}
                                  alt="star"
                                  className="size-4 xs:size-5"
                                />
                                <img
                                  width={20}
                                  height={20}
                                  src={starOutlineImg}
                                  alt="star"
                                  className="size-4 xs:size-5"
                                />
                                <img
                                  width={20}
                                  height={20}
                                  src={starOutlineImg}
                                  alt="star"
                                  className="size-4 xs:size-5"
                                />
                              </div>
                            </div>

                            {/* review */}
                            <div
                              onClick={(e) => {
                                const text =
                                  e.currentTarget.querySelector(
                                    ".js-review-text"
                                  );
                                const btn = e.currentTarget.querySelector(
                                  ".js-toggle-open-review-text-btn"
                                );
                                const btnText1 =
                                  btn.querySelector(".js-text-1");
                                const btnText2 =
                                  btn.querySelector(".js-text-2");

                                text.classList.toggle("line-clamp-1");
                                btnText1.classList.toggle("hidden");
                                btnText2.classList.toggle("hidden");
                              }}
                              className="flex items-end justify-between gap-1"
                            >
                              {/* description */}
                              <p className="js-review-text text-sm sm:text-base line-clamp-1">
                                {review.description}
                              </p>

                              {/* btn */}
                              <button className="js-toggle-open-review-text-btn py-0.5 px-1 text-sm rounded-lg transition-colors hover:bg-brand-dark-800/10">
                                <span className="js-text-1">Ba'tafsil</span>
                                <span className="js-text-2 hidden">Yopish</span>
                              </button>
                            </div>
                          </div>

                          {/* buttons (delete, archive) */}
                          <div className="flex items-center gap-2 min-w-max xs:gap-4">
                            {/* toggle archive review */}
                            {/* <button
                                onClick={() => {
                                  setReviewData(review);
                                  setOpenToggleArchiveUserModal(true);
                                }}
                                className="hidden border-2 border-brand-dark-800 py-2 px-3.5 rounded-xl sm:inline-block"
                              >
                                {user.isArchived
                                  ? "Arxivdan chiqarish"
                                  : "Arxivlash"}
                              </button> */}

                            {/* delete user */}
                            <button
                              onClick={() => {
                                setReviewData(review);
                                setOpenDeleteReviewModal(true);
                              }}
                              className="flex bg-brand-dark-800 p-2 rounded-xl text-white xs:inline-block xs:p-3 sm:py-2.5 sm:px-4"
                            >
                              <span className="hidden sm:inline">
                                O'chirish
                              </span>
                              <img
                                width={24}
                                height={24}
                                src={deleteIcon}
                                alt="delete icon"
                                className="inline-block size-5 xs:size-6 sm:hidden"
                              />
                            </button>
                          </div>
                        </li>
                      );
                    })}
                  </ul>

                  {/* pagination */}
                  <Pagination
                    currentIndex={reviewsPageIndex ? reviewsPageIndex : 1}
                    lastIndex={lastPageIndex}
                    link={"/reviews/"}
                  />
                </div>
              ) : (
                // error
                <div className="flex items-center flex-col gap-3 max-w-md text-center mx-auto">
                  <img
                    width={160}
                    height={160}
                    src={noUsersDataImg}
                    alt="no reviews data image"
                    className="size-40"
                  />

                  {/* title */}
                  <h2 className="">
                    Foydalanuvchilar ma'lumotlari mavjud emas!
                  </h2>

                  {/* description */}
                  <p className="text-lg">
                    Ushbu sahifada hech qanday foydalanuvchi ma'lumotlari mavjud
                    emas.
                  </p>

                  {/* buttons */}
                  <div className="flex gap-2.5">
                    <Link
                      to={-1}
                      className="py-2.5 px-5 rounded-xl border-2 border-brand-dark-800"
                    >
                      Oldingi sahifaga qaytish
                    </Link>
                    <Link to="/reviews/1" className="main-btn">
                      Birinchi sahifaga qaytish
                    </Link>
                  </div>
                </div>
              )
            ) : (
              // loader
              <div className="space-y-7">
                <div className="flex gap-5 justify-between flex-col md:flex-row">
                  <div className="flex gap-5 justify-between flex-col-reverse w-full sm:flex-row md:justify-normal">
                    <Skeleton.Input
                      active
                      className="!w-full !h-[56px] shrink-0 !rounded-xl sm:!w-[246px]"
                    />
                    <Skeleton.Input
                      active
                      className="!w-[218px] md:!w-full lg:!w-[386px] !h-[56px] !rounded-xl"
                    />
                  </div>

                  <Skeleton.Input
                    active
                    className="w-full md:!w-[218px] !h-[56px] shrink-0 !rounded-xl"
                  />
                </div>

                {/* reviews Skeleton */}
                <ul className="space-y-3">
                  {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => {
                    return (
                      <Skeleton.Input
                        active
                        key={i}
                        className="!h-[72px] sm:!h-[76px] !rounded-xl"
                      ></Skeleton.Input>
                    );
                  })}
                </ul>
              </div>
            ))}
        </div>
      </div>

      {/* recommendation section */}
      <section className="py-12">
        <div className="container">
          <h2 className="mb-7">Ushbu sahifaga oid</h2>

          {/* list */}
          <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <li>
              <Link
                to="/requests"
                className="flex flex-col items-center justify-center gap-3 relative h-full border-2 border-brand-dark-800 rounded-2xl py-10 px-6 group"
              >
                <img
                  width={147}
                  height={147}
                  src={requestsImg}
                  alt="requests image"
                  className="w-[146px] h-28 sm:w-[167px] sm:h-32 md:size-[147px]"
                />
                {/* arrow */}
                <img
                  width={36}
                  height={36}
                  src={topRightArrowImg}
                  className="absolute top-9 right-9 size-9 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:top-5 group-hover:right-5"
                  alt="top right arrow"
                />
                <h3 className="text-center text-lg xs:text-xl">Murojaatlar</h3>
              </Link>
            </li>
            <li>
              <Link
                to="/products"
                className="flex flex-col items-center justify-center gap-3 relative h-full border-2 border-brand-dark-800 rounded-2xl py-10 px-6 group"
              >
                <img
                  width={192}
                  height={192}
                  src={productsImg}
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
                  Mahsulotlarni boshqarish
                </h3>
              </Link>
            </li>
            <li className="col-span-1 sm:col-span-2 lg:col-span-1">
              <Link
                to="/payments"
                className="flex flex-col items-center justify-center gap-3 relative h-full border-2 border-brand-dark-800 rounded-2xl py-10 px-6 group"
              >
                <img
                  width={192}
                  height={192}
                  src={transactionsImg}
                  alt="payments image"
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
                <h3 className="text-center text-lg xs:text-xl">To'lovlar</h3>
              </Link>
            </li>
          </ul>
        </div>
      </section>

      {/* confirm modal (delete user) */}
      {openDeleteReviewModal && (
        <ConfirmModal
          loader={loader2}
          action={deleteReview}
          subtitle="Izoh:"
          description={reviewData.description}
          closeModal={() => setOpenDeleteReviewModal(false)}
          button={{ cancel: "Bekor qilish", confirm: "O'chirish" }}
          title="Haqiqatdan ham ushbu izohni o'chirmoqchimisiz?"
        />
      )}
    </>
  );
};

export default Reviews;
