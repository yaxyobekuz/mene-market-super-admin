import React, { useEffect, useState } from "react";

// axios
import axios from "../axios/axios";

// antd
import "../css/antd.css";
import { Button, Popover } from "antd";

// redux
import { useSelector, useDispatch } from "react-redux";
import {
  filterProductsData,
  setProductsData,
} from "../store/productsDataSlice";

// tab buttons
import { tabButtons } from "../data/data";

// toast
import { toast } from "react-toastify";

// components
import ConfirmModal from "../components/ConfirmModal";
import ProductSkeletonLoader from "../components/ProductSkeletonLoader";

// images
import userImg from "../assets/images/user.jpg";
import copyIcon from "../assets/images/copy.svg";
import doneIcon from "../assets/images/done.svg";
import adminImg from "../assets/images/admin.svg";
import searchImg from "../assets/images/search.svg";
import reloadImg from "../assets/images/reload.svg";
import deleteIcon from "../assets/images/delete.svg";
import reviewsImg from "../assets/images/reviews.svg";
import archiveImg from "../assets/images/archive.svg";
import requestsImg from "../assets/images/requests.svg";
import dotsImg from "../assets/images/dots-vertical.svg";
import unarchiveImg from "../assets/images/unarchive.svg";
import productAddImg from "../assets/images/product-add.svg";
import findProductImg from "../assets/images/find-product.svg";
import transactionsImg from "../assets/images/transactions.svg";
import topRightArrowImg from "../assets/images/top-right-arrow.svg";
import { Link } from "react-router-dom";

const Users = () => {
  const isOnline = navigator.onLine;
  const [loader, setLoader] = useState(false);
  const [users, setUsers] = useState([]);
  const dispatch = useDispatch();
  const [loader2, setLoader2] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [productData, setProductData] = useState([]);
  const { authData } = useSelector((store) => store.authData);
  const { productsData } = useSelector((store) => store.productsData);
  const [products, setProducts] = useState(productsData ? productsData : []);

  useEffect(() => {
    const getUsersData = () => {
      if (isOnline) {
        axios
          .get("/User", {
            headers: {
              Authorization: "Bearer " + authData.data.token,
            },
          })
          .then((res) => {
            setUsers(res.data);
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

    getUsersData();
  });

  // user popover content
  const userPopoverContent = () => {
    return (
      <div className="flex flex-col">
        <button className="flex items-center gap-3 px-3 py-2 transition-colors hover:bg-brand-dark-800/5">
          <img
            width={24}
            height={24}
            src={adminImg}
            alt="admin icon"
            className="size-6"
          />
          <span>Admin etib tayinlash</span>
        </button>

        {/* archive user */}
        <button className="flex items-center gap-3 px-3 py-2 transition-colors hover:bg-brand-dark-800/5 sm:hidden">
          <img
            width={24}
            height={24}
            src={archiveImg}
            alt="archive icon"
            className="size-6"
          />
          <span>Arxivlash</span>
        </button>
      </div>
    );
  };
  return (
    <>
      <div className="pb-12">
        <div className="container">
          <h1 className="mb-7">Foydalanuvchilar</h1>

          {/* main content */}
          <div className="space-y-7">
            {/* search */}
            <form
              // onSubmit={handleProductsSearch}
              className="flex items-center relative"
            >
              <input
                placeholder="Foydalanuvchilarni qidirish"
                name="search"
                type="text"
                className="js-input w-full bg-brand-dark-800/5 rounded-2xl py-2.5 pl-9 pr-24 xs:py-3.5 xs:pl-12 xs:pr-28"
              />

              <img
                width={24}
                height={24}
                src={searchImg}
                alt="search icon"
                className="absolute size-5 left-3 xs:left-3.5 xs:size-6"
              />

              {/* submit btn */}
              <button className="absolute text-sm right-1 bg-brand-dark-800 text-brand-creamy-400 py-2.5 px-4 rounded-xl xs:text-base xs:right-1.5">
                Qidirish
              </button>
            </form>

            {/* users */}
            {users && users.length > 0 && (
              <ul className="space-y-3">
                {!loader ? (
                  users.map((user, index) => {
                    return (
                      <li
                        key={index}
                        className={`${
                          user.role === 0
                            ? "border-brand-dark-800/10"
                            : "border-brand-dark-800"
                        } flex items-center justify-between gap-5 relative bg-brand-dark-800/5 py-2.5 px-2 rounded-l-xl border-r-2 xs:border-r-4 xs:px-4`}
                      >
                        {/* profile */}
                        <div className="flex items-center gap-3.5 sm:gap-5">
                          {/* image */}
                          <img
                            width={64}
                            height={64}
                            src={
                              user.image
                                ? "https://menemarket-cdcc7e43d37f.herokuapp.com/" +
                                  user.image
                                : userImg
                            }
                            alt="user image"
                            className="size-12 object-cover bg-brand-dark-800/10 rounded-full border-2 border-brand-dark-800 xs:size-14 sm:size-16"
                          />

                          {/* name */}
                          <div className="sm:space-y-0.5">
                            <h3 className="text-base capitalize line-clamp-1 sm:text-lg">
                              {user.lastName &&
                                user.lastName + " " + user.firstName}
                            </h3>

                            {/* role */}
                            <p className="text-sm sm:text-base">
                              {user.role === 0
                                ? "Foydalanuvchi"
                                : "Administrator"}
                            </p>
                          </div>
                        </div>

                        {/* buttons   */}
                        <div className="flex items-center gap-2 min-w-max xs:gap-4">
                          <button className="hidden border-2 border-brand-dark-800 py-2 px-3.5 rounded-xl sm:inline-block">
                            Arxivlash
                          </button>

                          {/* delete user */}
                          <button className="flex bg-brand-dark-800 p-2 rounded-xl text-white xs:inline-block xs:p-3 sm:py-2.5 sm:px-4">
                            <span className="hidden sm:inline">
                              Yo'q qilish
                            </span>
                            <img
                              width={24}
                              height={24}
                              src={deleteIcon}
                              alt="delete icon"
                              className="inline-block size-5 xs:size-6 sm:hidden"
                            />
                          </button>

                          {/* popover */}
                          <Popover trigger="click" content={userPopoverContent}>
                            <button className="p-1 rounded-full transition-colors hover:bg-brand-dark-800/10">
                              <img
                                width={28}
                                height={28}
                                src={dotsImg}
                                alt="dots icon"
                                className="size-7"
                              />
                            </button>
                          </Popover>
                        </div>
                      </li>
                    );
                  })
                ) : (
                  <>loding...</>
                )}
              </ul>
            )}
          </div>
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
                to="/transactions"
                className="flex flex-col items-center justify-center gap-3 relative h-full border-2 border-brand-dark-800 rounded-2xl py-10 px-6 group"
              >
                <img
                  width={192}
                  height={192}
                  src={transactionsImg}
                  alt="transactions image"
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

      {/* confirm modal (delete product) */}
      {openModal && (
        <ConfirmModal
          loader={loader2}
          action={deleteProduct}
          subtitle="Mahsulot nomi:"
          description={productData.description}
          closeModal={() => setOpenModal(false)}
          button={{ cancel: "Bekor qilish", confirm: "O'chirish" }}
          title="Haqiqatdan ham ushbu mahsulotni o'chirmoqchimisiz?"
          imageSrc={
            productData.images.length > 0 &&
            "https://menemarket-cdcc7e43d37f.herokuapp.com/" +
              productData.images[0]
          }
        />
      )}
    </>
  );
};

export default Users;
