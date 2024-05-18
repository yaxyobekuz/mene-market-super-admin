import React, { useEffect, useRef, useState } from "react";
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
import ProductSkeletonLoader from "../components/ProductSkeletonLoader";

// images
import copyIcon from "../assets/images/copy.svg";
import doneIcon from "../assets/images/done.svg";
import searchImg from "../assets/images/search.svg";
import reloadImg from "../assets/images/reload.svg";
import userImg from "../assets/images/edit-user.svg";
import deleteIcon from "../assets/images/delete.svg";
import reviewsImg from "../assets/images/reviews.svg";
import requestsImg from "../assets/images/requests.svg";
import productAddImg from "../assets/images/product-add.svg";
import findProductImg from "../assets/images/find-product.svg";
import topRightArrowImg from "../assets/images/top-right-arrow.svg";
const Products = () => {
  const dispatch = useDispatch();
  const isOnline = navigator.onLine;
  const searchInputRef = useRef(null);
  const [loader, setLoader] = useState(false);
  const [loader2, setLoader2] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [productData, setProductData] = useState([]);
  const { authData } = useSelector((store) => store.authData);
  const { productsData } = useSelector((store) => store.productsData);
  const [products, setProducts] = useState(productsData ? productsData : []);

  // get products data
  const getProductsData = () => {
    setLoader(true);
    // fetch products data
    axios
      .get("/Product?userRoleString=2", {
        headers: {
          Authorization: "Bearer " + authData.data.token,
        },
      })
      .then((res) => {
        dispatch(setProductsData(res.data.allProducts));
        setProducts(res.data.allProducts);
      })
      .catch(() => {
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

  // format number
  const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  // search products
  const handleProductsSearch = (event) => {
    event.preventDefault();
    const input = event.target.querySelector(".js-input");
    const value = input.value.trim().toLowerCase();

    if (value.length > 0) {
      const filteredProducts = productsData.filter((product) => {
        return product.brand.toLowerCase().includes(value);
      });

      setProducts(filteredProducts);
    } else {
      productsData.length !== products.length && setProducts(productsData);
    }
  };

  // set products
  useEffect(() => {
    setProducts(productsData);
  }, [productsData]);

  const calculateTotalCount = (arr) => {
    let totalCount = 0;
    for (let index = 0; index < arr.length; index++) {
      totalCount += arr[index].count;
    }
    return totalCount;
  };

  return (
    <>
      {/* page main content */}
      <div className="container pb-12">
        {/* top */}
        <div className="mb-7">
          <h1 className="mb-7">Mahsulotlar</h1>

          {/* product add link */}
          <div className="grid grid-cols-1 gap-5 mb-7 xs:grid-cols-2 xs:gap-6">
            <Link
              to="/products/product/add"
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
              to="/products/product/find-by-id"
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
                      to={"/products" + button.name}
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
              onClick={() => {
                !loader && getProductsData(),
                  (searchInputRef.current.value = "");
              }}
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
              <form
                onSubmit={handleProductsSearch}
                className="flex items-center relative"
              >
                <input
                  placeholder="Mahsulotlarni qidirish"
                  name="search"
                  type="text"
                  ref={searchInputRef}
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
            </div>
          </div>
        </div>

        {/* products */}
        <div>
          {!loader ? (
            <ul className="grid grid-cols-1 gap-5 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {products &&
                products.map((product, index) => {
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
                        <p>
                          {product.productType ? product.productType : "Boshqa"}
                        </p>

                        {/* copy id button */}
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
                          {product.name}
                        </h3>

                        {/* product brand */}
                        <div className="flex items-end gap-1 text-sm">
                          <p className="whitespace-nowrap">Brend</p>
                          <div className="grow min-w-4 border-b-2 border-brand-dark-800 border-dotted mb-1.5"></div>
                          <p className="whitespace-nowrap truncate">
                            {product.brand}
                          </p>
                        </div>

                        {/* count */}
                        <div className="flex items-end gap-1 text-sm">
                          <p className="whitespace-nowrap">Sotuvda mavjud</p>
                          <div className="grow min-w-4 border-b-2 border-brand-dark-800 border-dotted mb-1.5"></div>
                          <p className="whitespace-nowrap truncate">
                            {calculateTotalCount(product.productTypes)} ta
                          </p>
                        </div>

                        {/* sold count */}
                        <div className="flex items-end gap-1 text-sm">
                          <p className="whitespace-nowrap">Sotilgan</p>
                          <div className="grow min-w-4 border-b-2 border-brand-dark-800 border-dotted mb-1.5"></div>
                          <p className="whitespace-nowrap truncate">
                            {formatNumber(product.numberSold)} ta
                          </p>
                        </div>

                        {/* ads price */}
                        <div className="flex items-end gap-1 text-sm">
                          <p className="whitespace-nowrap">Reklama narxi</p>
                          <div className="grow min-w-4 border-b-2 border-brand-dark-800 border-dotted mb-1.5"></div>
                          <p className="whitespace-nowrap truncate">
                            {formatNumber(product.advertisingPrice)} so'm
                          </p>
                        </div>

                        {/* price wrapper */}
                        <div className="flex items-center flex-wrap gap-x-3 gap-y-0">
                          <p>{formatNumber(product.price)} so'm</p>

                          {/* product scid price */}
                          {product.scidPrice && product.scidPrice !== 0 ? (
                            <del className="text-brand-dark-800/70">
                              {formatNumber(product.scidPrice)} so'm
                            </del>
                          ) : (
                            ""
                          )}
                        </div>

                        {/* buttons wrapper */}
                        <div className="flex items-end grow">
                          <div className="flex gap-3 w-full">
                            <Link
                              to={"/products/product/edit/" + product.productId}
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
                                alt="delete iconx"
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

      {/* recommendation section */}
      <section className="py-12">
        <div className="container">
          <h2 className="mb-7">Ushbu sahifaga oid</h2>

          {/* list */}
          <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
            <li className="col-span-1 sm:col-span-2 lg:col-span-1">
              <Link
                to="/users"
                className="flex flex-col items-center justify-center gap-3 relative h-full border-2 border-brand-dark-800 rounded-2xl py-10 px-6 group"
              >
                <img
                  width={192}
                  height={192}
                  src={userImg}
                  alt="user image"
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
                  Foydalanuvchilarni boshqarish
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
          description={productData.name}
          closeModal={() => setOpenModal(false)}
          button={{ cancel: "Bekor qilish", confirm: "O'chirish" }}
          title="Haqiqatdan ham ushbu mahsulotni o'chirmoqchimisiz?"
          imageSrc={
            productData.imageMetadatas.length > 0 &&
            "https://menemarket-cdcc7e43d37f.herokuapp.com/" +
              productData.imageMetadatas[0]
          }
        />
      )}
    </>
  );
};

export default Products;
