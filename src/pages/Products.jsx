import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";

// axios
import axios from "../axios/axios";

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

// images
import copyIcon from "../assets/images/copy.svg";
import doneIcon from "../assets/images/done.svg";
import searchImg from "../assets/images/search.svg";
import reloadImg from "../assets/images/reload.svg";
import deleteIcon from "../assets/images/delete.svg";
import productAddImg from "../assets/images/product-add.svg";
import findProductImg from "../assets/images/find-product.svg";
import ProductSkeletonLoader from "../components/ProductSkeletonLoader";
const Products = () => {
  const dispatch = useDispatch();
  const isOnline = navigator.onLine;
  const [error, setError] = useState(false);
  const [loader, setLoader] = useState(false);
  const [loader2, setLoader2] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [productData, setProductData] = useState([]);
  const { authData } = useSelector((store) => store.authData);
  const { productsData } = useSelector((store) => store.productsData);

  // get products data
  const getProductsData = () => {
    setError(false);
    setLoader(true);

    // fetch products data
    axios
      .get("/Product", {
        headers: {
          Authorization: "Bearer " + authData.data.token,
        },
      })
      .then((res) => {
        dispatch(setProductsData(res.data));
      })
      .catch(() => {
        setError(true);
        // error notification
        if (isOnline) {
          toast.error("Ma'lumotlarni yuklab bo'lmadi");
        } else {
          toast.error("Internet aloqasi mavjud emas!");
        }
      })
      .finally(() => setLoader(false));
  };

  useEffect(() => {
    if (productsData.length === 0) {
      getProductsData();
    }
  }, []);

  // delete product
  const deleteProduct = () => {
    if (isOnline) {
      setLoader2(true);

      // delete product
      axios
        .delete("/Product?id=" + productData.productId, {
          headers: { Authorization: "Bearer " + authData.data.token },
        })
        .then(() => {
          dispatch(filterProductsData(productData.productId));
          toast.success("Mahsulot muvafaqiyatli o'chirildi!");
          setOpenModal(false);
        })
        .catch(() => toast.error("Nimadir xato ketdi!"))
        .finally(() => setLoader2(false));
    } else {
      toast.error("Internet aloqasi mavjud emas!");
    }
  };

  return (
    <>
      {/* top */}
      <div>
        <div className="container">
          <h1 className="mb-7">Mahsulotlar</h1>

          {/* product add link */}
          <div className="grid grid-cols-1 gap-5 mb-7 xs:grid-cols-2 xs:gap-6">
            <Link
              to="/product/add"
              className="flex flex-col items-center gap-3 border-2 border-brand-dark-800 border-dashed rounded-2xl py-5 px-5"
            >
              <img
                width={160}
                height={160}
                src={productAddImg}
                alt="product add image"
                className="size-28 sm:size-32 md:size-40"
              />
              <span className=" font-bold text-center sm:text-xl md:text-2xl">
                Yangi mahsulot qo'shish
              </span>
            </Link>
            <Link
              to="/product/find-by-id"
              className="flex flex-col items-center gap-3 border-2 border-brand-dark-800 border-dashed rounded-2xl py-5 px-5"
            >
              <img
                width={209}
                height={160}
                src={findProductImg}
                alt="find product by id image"
                className="w-[146px] h-28 sm:w-[167px] sm:h-32 md:w-[209px] md:h-40"
              />
              <span className=" font-bold text-center sm:text-xl md:text-2xl">
                Mahsulotni qidirish
              </span>
            </Link>
          </div>

          {/* nav */}
          <nav className="overflow-x-auto hidden-scroll p-1 mb-4 bg-brand-dark-800/5 rounded-2xl md:mb-7 xs:p-1.5">
            <ul className="flex justify-between gap-2 w-full sm:gap-5">
              {tabButtons.map((button) => {
                return (
                  <li key={button.id}>
                    <NavLink
                      to={"/product/" + button.name}
                      className="inline-block min-w-max p-2.5 rounded-xl text-sm transition-colors duration-300 hover:bg-brand-dark-800 hover:text-brand-creamy-400 xs:text-base sm:px-3 sm:py-2.5"
                      end
                    >
                      {button.body}
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* search wrapper */}
          <div className="flex flex-col-reverse gap-4 md:flex-row">
            {/* reload btn */}
            <button
              onClick={getProductsData}
              className="flex items-center justify-center gap-2 shrink-0 bg-brand-dark-800/5 rounded-xl px-5 py-3 xs:py-4"
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

            {/* search */}
            <div className="w-full">
              {/* search input wrapper */}
              <form className="flex items-center relative">
                <input
                  placeholder="Mahsulotlarni qidirish"
                  name="search"
                  type="text"
                  className="w-full bg-brand-dark-800/5 rounded-2xl py-2.5 pl-9 pr-24 xs:py-3.5 xs:pl-12 xs:pr-28"
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
            </div>
          </div>
        </div>
      </div>

      {/* products */}
      <div className="py-12">
        <div className="container">
          {!loader ? (
            <ul className="grid grid-cols-1 gap-5 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {productsData.map((product, index) => {
                return (
                  <li key={index} className="flex flex-col gap-2.5">
                    {/* image wrapper */}
                    <div className="relative">
                      <img
                        width={295}
                        height={295}
                        src={
                          product.images &&
                          "https://menemarket-cdcc7e43d37f.herokuapp.com/" +
                            product.images[0]
                        }
                        alt="product image"
                        className="w-full aspect-square bg-brand-dark-800/10 rounded-2xl object-cover object-center"
                      />

                      {/* badges */}
                      <div className="flex items-center gap-2 w-full flex-wrap absolute top-4 inset-x-0 px-4">
                        {product.isArchived ? (
                          <span className="bg-red-600 py-0.5 px-1.5 rounded text-xs font-normal text-white">
                            Arxivlangan
                          </span>
                        ) : (
                          <span className="bg-green-600 py-0.5 px-1.5 rounded text-xs font-normal text-white">
                            Sotuvda
                          </span>
                        )}
                      </div>
                    </div>

                    {/* content header */}
                    <div className="flex items-center justify-between">
                      <p>{product.productType}</p>
                      <button
                        className="flex items-center gap-0.5 disabled:opacity-70"
                        onClick={(e) => {
                          const btn = e.currentTarget;
                          const copyIcon = btn.querySelector(".js-copy-icon");
                          const doneIcon = btn.querySelector(".js-done-icon");

                          // set disabled
                          btn.disabled = true;
                          copyIcon.classList.add("hidden");
                          doneIcon.classList.remove("hidden");
                          navigator.clipboard.writeText(product.productId);

                          // remove disabled
                          setTimeout(() => {
                            btn.disabled = false;
                            copyIcon.classList.remove("hidden");
                            doneIcon.classList.add("hidden");
                          }, 2000);
                        }}
                      >
                        ID{" "}
                        <img
                          width={20}
                          height={20}
                          src={copyIcon}
                          alt="copy icon"
                          className="js-copy-icon"
                        />
                        <img
                          width={20}
                          height={20}
                          src={doneIcon}
                          alt="done icon"
                          className="js-done-icon hidden"
                        />
                      </button>
                    </div>

                    {/* main */}
                    <div className="flex flex-col grow gap-2">
                      {/* title */}
                      <h3 className="text-lg font-semibold">
                        Lorem ipsum dolor sit amet consectetur.
                      </h3>

                      {/* product owner */}
                      <div className="flex items-end gap-1 text-sm">
                        <p className="whitespace-nowrap">Ega</p>
                        <div className="w-full border-b-2 border-brand-dark-800 border-dotted mb-1.5"></div>
                        <p className="whitespace-nowrap">
                          {product.productOwner}
                        </p>
                      </div>

                      {/* product brand */}
                      <div className="flex items-end gap-1 text-sm">
                        <p className="whitespace-nowrap">Brend</p>
                        <div className="w-full border-b-2 border-brand-dark-800 border-dotted mb-1.5"></div>
                        <p className="whitespace-nowrap">{product.brand}</p>
                      </div>

                      {/* count */}
                      <div className="flex items-end gap-1 text-sm">
                        <p className="whitespace-nowrap">Sotuvda mavjud</p>
                        <div className="w-full border-b-2 border-brand-dark-800 border-dotted mb-1.5"></div>
                        <p className="whitespace-nowrap">
                          {"0".toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}{" "}
                          ta
                        </p>
                      </div>

                      {/* sold count */}
                      <div className="flex items-end gap-1 text-sm">
                        <p className="whitespace-nowrap">Sotilgan</p>
                        <div className="w-full border-b-2 border-brand-dark-800 border-dotted mb-1.5"></div>
                        <p className="whitespace-nowrap">
                          {product.numberSold
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}{" "}
                          ta
                        </p>
                      </div>

                      {/* ads price */}
                      <div className="flex items-end gap-1 text-sm">
                        <p className="whitespace-nowrap">Reklama narxi</p>
                        <div className="w-full border-b-2 border-brand-dark-800 border-dotted mb-1.5"></div>
                        <p className="whitespace-nowrap">
                          {product.advertisingPrice
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}{" "}
                          so'm
                        </p>
                      </div>

                      {/* price wrapper */}
                      <div className="flex items-center flex-wrap gap-x-3 gap-y-0">
                        <p>
                          {product.price
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}{" "}
                          so'm
                        </p>

                        {/* product scid price */}
                        {product.scidPrice && product.scidPrice !== 0 ? (
                          <del className="text-brand-dark-800/70">
                            {product.scidPrice
                              .toString()
                              .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}{" "}
                            so'm
                          </del>
                        ) : (
                          ""
                        )}
                      </div>

                      {/* buttons wrapper */}
                      <div className="flex items-end grow">
                        <div className="flex gap-3 w-full">
                          <Link
                            to={"/product/edit/" + product.productId}
                            className="flex items-center justify-center gap-1 w-full border-2 border-brand-dark-800  rounded-xl py-2.5"
                          >
                            {/* <img src="" alt="" /> */}
                            <span className="font-semibold text-center">
                              Tahrirlash
                            </span>
                          </Link>

                          {/* delete product btn */}
                          <button
                            onClick={() => {
                              setProductData(product);
                              setOpenModal(true);
                            }}
                            className="flex items-center justify-center w-12 shrink-0 aspect-square bg-brand-dark-800 rounded-xl"
                          >
                            <img
                              width={32}
                              height={32}
                              src={deleteIcon}
                              alt=""
                            />
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          ) : (
            // skeleton loader
            <ul className="grid grid-cols-1 gap-5 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((item) => (
                <ProductSkeletonLoader key={item} />
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* modal (delete product) */}
      {openModal && (
        <ConfirmModal
          setOpenModal={setOpenModal}
          title="Haqiqatdan ham ushbu mahsulotni o'chirmoqchimisiz?"
          description={productData.description}
          subtitle="Mahsulot nomi:"
          image={{
            src: productData.images[0],
            alt: "product image",
          }}
          loader={loader2}
          button={{
            cancel: {
              body: "Bekor qilish",
              action: null,
            },
            confirm: {
              body: "O'chirish",
              action: deleteProduct,
            },
          }}
        />
      )}
    </>
  );
};

export default Products;
