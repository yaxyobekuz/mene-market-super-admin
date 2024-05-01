import React, { useState } from "react";
import { Link } from "react-router-dom";

// components
import Loader from "../components/Loader";
import ConfirmModal from "../components/ConfirmModal";

// regex
import { guidRegex } from "../helpers/regexes";

// toast
import { toast } from "react-toastify";

// redux
import { useDispatch, useSelector } from "react-redux";
import { filterProductsData } from "../store/productsDataSlice";

// axios
import axios from "../axios/axios";

// images
import copyIcon from "../assets/images/copy.svg";
import doneIcon from "../assets/images/done.svg";
import searchImg from "../assets/images/search.svg";
import deleteIcon from "../assets/images/delete.svg";
import reviewsImg from "../assets/images/reviews.svg";
import productsImg from "../assets/images/products.svg";
import productAddImg from "../assets/images/product-add.svg";
import findProductImg from "../assets/images/find-product.svg";
import topRightArrowImg from "../assets/images/top-right-arrow.svg";

const FindProductById = () => {
  const dispatch = useDispatch();
  const isOnline = navigator.onLine;
  const [loader, setLoader] = useState(false);
  const [productData, setProductData] = useState(null);
  const [loader2, setLoader2] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const { authData } = useSelector((store) => store.authData);
  const { productsData } = useSelector((store) => store.productsData);

  const getProductByServer = (id) => {
    axios
      .get("/Product/ById?id=" + id, {
        headers: {
          Authorization: "Bearer " + authData.data.token,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          setProductData(res.data);
        } else {
          setLoader(false);
          toast.error("Ma'lumotlarni yuklab bo'lmadi!");
        }
      })
      .catch(() => toast.error("Ma'lumotlarni yuklab bo'lmadi!"))
      .finally(() => setLoader(false));
  };

  // handle (get product)
  const getProduct = (event) => {
    event.preventDefault();
    const input = event.target.querySelector(".js-input");
    const id = input.value.trim();

    if (isOnline) {
      // check value
      if (guidRegex.test(id)) {
        setLoader(true);
        // get product
        if (!loader) {
          setProductData(null);
          // find product by products data
          if (productsData.length > 0) {
            const findProduct = productsData.find((product) => {
              return product.productId === id;
            });

            if (findProduct) {
              setProductData(findProduct);
              setLoader(false);
            } else {
              getProductByServer(id);
            }
            //
          } else {
            getProductByServer(id);
          }
          //
        }
        //
      } else {
        toast.error("Muqobil id kiritilmadi!");
      }
      //
    } else {
      toast.error("Internet aloqasi mavjud emas!");
    }
  };

  // delete product
  const deleteProduct = () => {
    setLoader2(true);

    axios
      .delete("/Product?id=" + productData.productId, {
        headers: { Authorization: "Bearer " + authData.data.token },
      })
      .then(() => {
        if (productsData.length > 0) {
          dispatch(filterProductsData(productData.productId));
        }
        setProductData(null);
        toast.success("Mahsulot muvafaqiyatli o'chirildi!");
        setOpenModal(false);
      })
      .catch(() => toast.error("Nimadir xato ketdi!"))
      .finally(() => setLoader2(false));
  };

  // format number
  const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  return (
    <>
      {/* page content */}
      <div className="container pb-12 space-y-7">
        <h1>Mahsulotni qidirsh</h1>

        {/* search */}
        <div className="w-full">
          {/* search input wrapper */}
          <form onSubmit={getProduct} className="flex items-center relative">
            <input
              placeholder="Qidirish uchun idni bu yerga kiriting"
              name="search"
              type="text"
              className="js-input w-full bg-brand-dark-800/5 rounded-2xl py-2.5 pl-9 pr-24 xs:py-3.5 xs:pl-12 xs:pr-28"
            />

            {/* search icon */}
            <img
              width={24}
              height={24}
              src={searchImg}
              alt="search icon"
              className="absolute size-5 left-3 xs:left-3.5 xs:size-6"
            />

            {/* submit btn */}
            <button
              disabled={loader}
              className="flex items-center justify-center absolute right-1 w-24 bg-brand-dark-800 text-sm text-brand-creamy-400 py-2.5 rounded-xl xs:text-base xs:right-1.5"
            >
              {loader ? <Loader size={24} /> : "Qidirish"}
            </button>
          </form>
        </div>

        {/* product */}
        {productData && (
          <div className="flex flex-col gap-2.5 w-full xs:w-80">
            {/* image wrapper */}
            <div className="relative">
              <img
                width={295}
                height={295}
                src={
                  productData.images &&
                  "https://menemarket-cdcc7e43d37f.herokuapp.com/" +
                    productData.images[0]
                }
                alt="product image"
                className="w-full aspect-square bg-brand-dark-800/10 rounded-2xl object-cover object-center"
              />

              {/* badges */}
              <div className="flex items-center gap-2 w-full flex-wrap absolute top-4 inset-x-0 px-4">
                {productData.isArchived ? (
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
              <p>{productData.productType}</p>
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
                  navigator.clipboard.writeText(productData.productId);

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
                <div className="grow min-w-4 border-b-2 border-brand-dark-800 border-dotted mb-1.5"></div>
                <p className="whitespace-nowrap truncate">
                  {productData.productOwner}
                </p>
              </div>

              {/* product brand */}
              <div className="flex items-end gap-1 text-sm">
                <p className="whitespace-nowrap">Brend</p>
                <div className="grow min-w-4 border-b-2 border-brand-dark-800 border-dotted mb-1.5"></div>
                <p className="whitespace-nowrap truncate">
                  {productData.brand}
                </p>
              </div>

              {/* count */}
              <div className="flex items-end gap-1 text-sm">
                <p className="whitespace-nowrap">Sotuvda mavjud</p>
                <div className="grow min-w-4 border-b-2 border-brand-dark-800 border-dotted mb-1.5"></div>
                <p className="whitespace-nowrap truncate">
                  {formatNumber(0)} ta
                </p>
              </div>

              {/* sold count */}
              <div className="flex items-end gap-1 text-sm">
                <p className="whitespace-nowrap">Sotilgan</p>
                <div className="grow min-w-4 border-b-2 border-brand-dark-800 border-dotted mb-1.5"></div>
                <p className="whitespace-nowrap truncate">
                  {formatNumber(productData.numberSold)} ta
                </p>
              </div>

              {/* ads price */}
              <div className="flex items-end gap-1 text-sm">
                <p className="whitespace-nowrap">Reklama narxi</p>
                <div className="grow min-w-4 border-b-2 border-brand-dark-800 border-dotted mb-1.5"></div>
                <p className="whitespace-nowrap truncate">
                  {formatNumber(productData.advertisingPrice)} so'm
                </p>
              </div>

              {/* price wrapper */}
              <div className="flex items-center flex-wrap gap-x-3 gap-y-0">
                <p>{formatNumber(productData.price)} so'm</p>

                {/* product scid price */}
                {productData.scidPrice && productData.scidPrice !== 0 ? (
                  <del className="text-brand-dark-800/70">
                    {formatNumber(productData.scidPrice)} so'm
                  </del>
                ) : (
                  ""
                )}
              </div>

              {/* buttons wrapper */}
              <div className="flex items-end grow">
                <div className="flex gap-3 w-full">
                  <Link
                    to={"/product/edit/" + productData.productId}
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
                      setProductData(productData);
                      setOpenModal(true);
                    }}
                    className="flex items-center justify-center w-12 shrink-0 aspect-square bg-brand-dark-800 rounded-xl"
                  >
                    <img
                      width={32}
                      height={32}
                      src={deleteIcon}
                      alt="delete iconx"
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* recommendation section */}
      <section className="py-12">
        <div className="container">
          <h2 className="mb-7">Ushbu sahifaga oid</h2>
          <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <li>
              <Link
                to="/product/add"
                className="flex flex-col items-center justify-center gap-3 relative h-full border-2 border-brand-dark-800 rounded-2xl py-10 px-6 group"
              >
                <img
                  width={192}
                  height={192}
                  src={productAddImg}
                  alt="add product image"
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
                  Yangi mahsulot qo'shish
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

export default FindProductById;
