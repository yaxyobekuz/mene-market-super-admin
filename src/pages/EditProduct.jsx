import { useParams } from "react-router-dom";
import React, { useEffect, useRef, useState } from "react";

// redux
import { useSelector } from "react-redux";

// axios
import axiosInstance from "../axios/axiosInstance";

// helpers
import {
  getElement,
  removeDotsFromNumber,
  checkTheInputsValueLength,
  errorMessage,
  formatNumber,
  successMessage,
} from "../helpers/helpers";

// components
import NoData from "../components/NoData";
import Loader from "../components/Loader";
import RecommendationSection from "../components/RecommendationSection";

// antd
import "../css/antd.css";
import { Select } from "antd";
import { Skeleton } from "antd";

// data
import { imageBaseUrl, productTypesData } from "../data/data";

// swiper
import "swiper/css";
import "../css/swiper.css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation } from "swiper/modules";

// images
import resetIcon from "../assets/images/reset.svg";
import deleteImg from "../assets/images/delete.svg";
import deleteIcon from "../assets/images/delete.svg";
import reviewsImg from "../assets/images/reviews.svg";
import productsImg from "../assets/images/products.svg";
import arrowDownImg from "../assets/images/down-arrow.svg";
import findProductImg from "../assets/images/find-product.svg";

const EditProduct = () => {
  const { productId } = useParams();
  const [loader, setLoader] = useState(true);
  const [loader2, setLoader2] = useState(false);
  const newProductTypeDropdownRef = useRef(null);
  const [productType, setProductType] = useState("");
  const [productData, setproductData] = useState(null);
  const [newProductTypes, setNewProductTypes] = useState([]);
  const [deletableImages, setDeletableImages] = useState([]);
  const { productsData } = useSelector((store) => store.productsData);
  const [openNewProductTypes, setOpenNewProductTypes] = useState(false);

  // format the input value
  const formatTheValue = (e) => {
    const value = e.target.value;

    const numbers = value.trim().match(/\d/g);

    if (numbers) {
      e.target.value = numbers.join("").replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    } else {
      e.target.value = numbers;
    }
  };

  // delete new product type
  const handleNewProductTypeDelete = (index) => {
    const filteredNewProductTypes = newProductTypes.filter((_, typeIndex) => {
      return typeIndex !== index;
    });

    setNewProductTypes(filteredNewProductTypes);
  };

  // close dropdowns
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        newProductTypeDropdownRef.current &&
        !newProductTypeDropdownRef.current.contains(event.target)
      ) {
        setOpenNewProductTypes(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [newProductTypeDropdownRef]);

  // get product data
  const getProductData = () => {
    setLoader(true);

    axiosInstance
      .get("/Product/ById?id=" + productId)
      .then((res) => {
        if (res.status === 200) {
          setproductData(res.data);
          setProductType(res.data.productType);
          setNewProductTypes(res.data.productTypes.filter((_, i) => i !== 0));
        } else {
          errorMessage("Mahsulot ma'lumotlari mavjud emas!");
        }
      })
      .catch(() => errorMessage.offline("Ma'lumotlarni yuklab bo'lmadi!"))
      .finally(() => setLoader(false));
  };

  useEffect(() => {
    if (productsData && productsData.length > 0) {
      const findProduct = productsData.find(
        (product) => product.productId === productId
      );

      setproductData(findProduct);
      setTimeout(() => setLoader(false), 500);
      setProductType(findProduct.productType);
      setNewProductTypes(findProduct.productTypes.filter((_, i) => i !== 0));
    } else {
      getProductData();
    }
  }, []);

  // edit product
  const editProduct = (event) => {
    event.preventDefault();

    // form elements
    const elProductNameInput = getElement(event, ".js-product-name-input");
    const elProductPriceInput = getElement(event, ".js-product-price-input");
    const elProductTCountInput = getElement(event, ".js-product-count-input");
    const elProductTypeNameInput = getElement(
      event,
      ".js-product-type-name-input"
    );
    const elProductAdsPriceInput = getElement(
      event,
      ".js-product-ads-price-input"
    );
    const elProductDescriptionTextarea = getElement(
      event,
      ".js-product-description-textarea"
    );
    const elProductAkciyaPriceInput = getElement(
      event,
      ".js-product-akciya-price-input"
    );

    // some inputs
    const inputs = [
      elProductNameInput,
      elProductTypeNameInput,
      elProductPriceInput,
      elProductAdsPriceInput,
      elProductTCountInput,
      elProductDescriptionTextarea,
    ];

    // add product
    if (!loader && checkTheInputsValueLength(inputs)) {
      // filtered product images
      const filteredProductImages = productData.imageMetadatas.filter(
        (image) => {
          return !deletableImages.some((item) => image.id === item.id);
        }
      );

      if (filteredProductImages.length !== 0) {
        setLoader2(true);

        // form data
        const formData = {
          product: {
            productType: productType,
            comments: productData.comments,
            productId: productData.productId,
            isArchived: productData.isArchived,
            numberSold: productData.numberSold,
            createdDate: productData.createdDate,
            name: elProductNameInput.value.trim(),
            imageMetadatas: filteredProductImages,
            productTypes: [
              {
                productId: productData.productId,
                name: elProductTypeNameInput.value.trim(),
                count: removeDotsFromNumber(elProductTCountInput.value),
                productTypeId: productData.productTypes[0].productTypeId,
              },
              ...newProductTypes,
            ],
            description: elProductDescriptionTextarea.value.trim(),
            price: removeDotsFromNumber(elProductPriceInput.value),
            scidPrice: removeDotsFromNumber(elProductAkciyaPriceInput.value),
            advertisingPrice: removeDotsFromNumber(
              elProductAdsPriceInput.value
            ),
          },
          bytes: [],
        };

        // edit product
        axiosInstance
          .put("/Product", formData)
          .then((res) => {
            if (res.status === 200) {
              setLoader(true);
              setTimeout(() => {
                setproductData(res.data);
                setLoader(false);
                setProductType(res.data.productType);
                setDeletableImages([]);
              }, 500);

              // notification
              successMessage("Mahsulot muvafaqiyatli o'zgartirildi!");
            } else {
              errorMessage();
            }
          })
          .catch(() => errorMessage.offline())
          .finally(() => setLoader2(false));
      } else {
        errorMessage(
          "O'zgartirishni amalga oshirish uchun kamida 1dona rasm qoldirilishi kerak!"
        );
      }
    }
  };

  return (
    <>
      {/* page body (main content) */}
      <div className="pb-12">
        <div className="container">
          <h1 className="mb-7">Mahsulotni tahrirlash</h1>

          {!loader ? (
            productData ? (
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                {/* poduct images */}
                <Swiper
                  spaceBetween={20}
                  navigation={true}
                  modules={[FreeMode, Navigation]}
                  className="edit-product-page-swiper w-full grow rounded-xl pb-0 select-none sm:rounded-2xl"
                >
                  {productData.imageMetadatas.map((image, index) => {
                    return (
                      <SwiperSlide key={index}>
                        {/* product image */}
                        <img
                          width={608}
                          height={571}
                          alt="product image"
                          src={imageBaseUrl + image.hightImageFilePath}
                          className="swiper-image relative w-full h-auto aspect-square bg-brand-dark-800/10 object-cover rounded-xl sm:rounded-2xl lg:h-full lg:aspect-auto"
                        />

                        {/* delete image button */}
                        <button
                          disabled={loader2}
                          onClick={(e) => {
                            const elDeleteIcon =
                              e.currentTarget.querySelector(".js-delete-icon");
                            const elResetIcon =
                              e.currentTarget.querySelector(".js-reset-icon");
                            elDeleteIcon.classList.toggle("hidden");
                            elResetIcon.classList.toggle("hidden");
                            if (
                              deletableImages.find((i) => i.id === image.id)
                            ) {
                              setDeletableImages(
                                deletableImages.filter((i) => i.id !== image.id)
                              );
                            } else {
                              setDeletableImages([
                                ...deletableImages,
                                {
                                  id: image.id,
                                },
                              ]);
                            }
                          }}
                          className="main-btn absolute top-3 right-3 p-2 sm:top-5 sm:right-5"
                        >
                          <img
                            width={24}
                            height={24}
                            src={deleteIcon}
                            alt="delete icon"
                            className="js-delete-icon size-5 select-none sm:size-6"
                          />
                          <img
                            width={24}
                            height={24}
                            src={resetIcon}
                            alt="reset icon"
                            className="js-reset-icon hidden size-5 select-none sm:size-6"
                          />
                        </button>
                      </SwiperSlide>
                    );
                  })}
                </Swiper>

                {/* add product */}
                <form onSubmit={editProduct} className="space-y-3">
                  {/* product name */}
                  <label className="flex flex-col items-start gap-2">
                    <span>Mahsulot nomi</span>
                    <input
                      type="text"
                      disabled={loader2}
                      name="product name"
                      placeholder="Mahsulot nomi"
                      defaultValue={productData && productData.name}
                      className="js-product-name-input w-full bg-brand-dark-800/5 rounded-xl py-2.5 px-3.5 border-brand-dark-800"
                    />
                  </label>

                  {/* new product type */}
                  <div className="flex flex-col items-start gap-2">
                    <div>Yangi mahsulot turini qo'shish</div>

                    {/* main content  */}
                    <div
                      ref={newProductTypeDropdownRef}
                      className="relative w-full"
                    >
                      <button
                        type="button"
                        disabled={loader2}
                        id="add-new-product-type-button"
                        onClick={() => {
                          if (!loader) {
                            setOpenNewProductTypes(!openNewProductTypes);
                          }
                        }}
                        className="flex items-center justify-between gap-5 w-full bg-brand-dark-800/5 pl-3.5 pr-3 py-2.5 border-2 border-brand-dark-800 rounded-xl"
                      >
                        <span>
                          Yangi mahsulot turlari soni: {newProductTypes.length}{" "}
                          ta
                        </span>

                        <img
                          width={24}
                          height={24}
                          src={arrowDownImg}
                          alt="arrow down icon"
                          className="size-6"
                        />
                      </button>

                      {/* dropdown conetnt */}
                      {openNewProductTypes && (
                        <div className="absolute top-[calc(100%+4px)] left-0 z-10 max-w-full w-full max-h-96 overflow-y-auto default-scroll bg-brand-creamy-400 border-2 border-brand-dark-800 rounded-xl shadow-xl py-1.5">
                          {newProductTypes.length > 0 ? (
                            <ol>
                              {newProductTypes.map((type, index) => (
                                <li
                                  key={index}
                                  className="flex items-center gap-4 px-4 py-2 even:bg-brand-dark-800/5"
                                >
                                  {/* count */}
                                  <span
                                    className={`${
                                      newProductTypes.length < 10
                                        ? "w-3"
                                        : newProductTypes.length < 100
                                        ? "w-5"
                                        : "w-8"
                                    } inline-block shrink-0 font-semibold `}
                                  >
                                    {index + 1}.
                                  </span>

                                  {/* type name */}
                                  <h3 className="line-clamp-1 font-semibold w-full">
                                    {type.name}
                                  </h3>

                                  {/* delete btn */}
                                  <button
                                    type="button"
                                    disabled={loader2}
                                    onClick={() =>
                                      handleNewProductTypeDelete(index)
                                    }
                                    className="shrink-0 bg-brand-dark-800 p-2 rounded-xl"
                                  >
                                    <img
                                      width={24}
                                      height={24}
                                      src={deleteImg}
                                      alt="delete icon "
                                      className="size-6"
                                    />
                                  </button>
                                </li>
                              ))}
                            </ol>
                          ) : (
                            <div className="px-4 py-2 opacity-70">
                              Hech qanday mahsulot turi mavjud emas!
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* product type name & product type */}
                  <div className="flex flex-col gap-3 xs:gap-4 sm:gap-5 xs:flex-row">
                    <label className="flex flex-col items-start gap-2 w-full">
                      <span>Mahsulot turining nomi</span>
                      <input
                        type="text"
                        disabled={loader2}
                        name="product type name"
                        placeholder="Mahsulot turining nomi"
                        defaultValue={
                          productData.productTypes &&
                          productData.productTypes.length !== 0 &&
                          productData.productTypes[0].name
                        }
                        className="js-product-type-name-input w-full bg-brand-dark-800/5 rounded-xl py-2.5 px-3.5 border-brand-dark-800"
                      />
                    </label>

                    <label className="flex flex-col items-start gap-2 w-full">
                      <span>Mahsulot turi</span>
                      <Select
                        disabled={loader2}
                        options={productTypesData}
                        onChange={(value) => setProductType(value)}
                        defaultValue={productData && productData.productType}
                      />
                    </label>
                  </div>

                  {/* product price */}
                  <div className="flex flex-col gap-3 xs:gap-4 sm:gap-5 xs:flex-row">
                    <label className="flex flex-col items-start gap-2 w-full">
                      <span>Mahsulot narxi</span>
                      <input
                        min={0}
                        type="text"
                        step={20000}
                        disabled={loader2}
                        name="product price"
                        onChange={formatTheValue}
                        placeholder="Mahsulot narxi"
                        defaultValue={
                          productData && formatNumber(productData.price)
                        }
                        className="js-product-price-input w-full bg-brand-dark-800/5 rounded-xl py-2.5 px-3.5 border-brand-dark-800"
                      />
                    </label>

                    <label className="flex flex-col items-start gap-2 w-full">
                      <span>Mahsulot aksiya narxi</span>
                      <input
                        type="text"
                        disabled={loader2}
                        name="product sale price"
                        onChange={formatTheValue}
                        placeholder="Mahsulot aksiya narxi"
                        defaultValue={
                          productData && formatNumber(productData.scidPrice)
                        }
                        className="js-product-akciya-price-input w-full bg-brand-dark-800/5 rounded-xl py-2.5 px-3.5 border-brand-dark-800"
                      />
                    </label>
                  </div>

                  {/* product counts */}
                  <div className="flex flex-col gap-3 xs:gap-4 sm:gap-5 xs:flex-row">
                    <label className="flex flex-col items-start gap-2 w-full">
                      <span>Mahsulot reklama narxi</span>
                      <input
                        type="text"
                        disabled={loader2}
                        name="product ads price"
                        onChange={formatTheValue}
                        placeholder="Mahsulot reklama narxi"
                        defaultValue={
                          productData &&
                          formatNumber(productData.advertisingPrice)
                        }
                        className="js-product-ads-price-input w-full bg-brand-dark-800/5 rounded-xl py-2.5 px-3.5 border-brand-dark-800"
                      />
                    </label>
                    <label className="flex flex-col items-start gap-2 w-full">
                      <span>Mahsulot soni</span>
                      <input
                        type="text"
                        disabled={loader2}
                        name="product count"
                        onChange={formatTheValue}
                        placeholder="Mahsulot soni"
                        defaultValue={
                          productData &&
                          productData.productTypes[0] &&
                          formatNumber(productData.productTypes[0].count)
                        }
                        className="js-product-count-input w-full bg-brand-dark-800/5 rounded-xl py-2.5 px-3.5 border-brand-dark-800"
                      />
                    </label>
                  </div>

                  {/* product description */}
                  <label className="flex flex-col items-start gap-2">
                    <span>Mahsulot tavsifi</span>
                    <textarea
                      disabled={loader2}
                      name="description"
                      placeholder="Mahsulot tavsifi"
                      defaultValue={productData && productData.description}
                      className="js-product-description-textarea w-full min-h-44 max-h-72 resize-y hidden-scroll bg-brand-dark-800/5 rounded-xl py-2.5 px-3.5 border-brand-dark-800"
                    ></textarea>
                  </label>

                  <button
                    disabled={loader2}
                    className="main-btn flex justify-center w-full px-20 disabled:cursor-not-allowed xs:w-auto"
                  >
                    {loader2 ? <Loader size={24} /> : <span>O'zgartirish</span>}
                  </button>
                </form>
              </div>
            ) : (
              // no data
              <NoData description="Mahsulot ma'lumotlarini yuklab bo'lmadi. Internet aloqasi sifati past yoki havola noto'g'ri kiritilgan bo'lishi mumkin." />
            )
          ) : (
            // Skeleton loader
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              {/* child 1 (image) */}
              <Skeleton.Image
                active
                className="!w-full !h-auto aspect-square !rounded-xl sm:!rounded-2xl lg:aspect-auto lg:!h-full"
              />

              {/* child 2 (form) */}
              <div className="space-y-3">
                <div className="flex flex-col items-start gap-2">
                  <Skeleton.Input active className="!w-5/12 h-6" />
                  <Skeleton.Input active className="h-12" />
                </div>

                <div className="flex flex-col items-start gap-2">
                  <Skeleton.Input active className="!w-5/12 h-6" />
                  <Skeleton.Input active className="h-12" />
                </div>

                <div className="flex flex-col gap-3 xs:gap-4 sm:gap-5 xs:flex-row">
                  <div className="flex flex-col items-start gap-2 w-full">
                    <Skeleton.Input active className="!w-5/12 h-6" />
                    <Skeleton.Input active className="h-12" />
                  </div>
                  <div className="flex flex-col items-start gap-2 w-full">
                    <Skeleton.Input active className="!w-5/12 h-6" />
                    <Skeleton.Input active className="h-12" />
                  </div>
                </div>

                <div className="flex flex-col gap-3 xs:gap-4 sm:gap-5 xs:flex-row">
                  <div className="flex flex-col items-start gap-2 w-full">
                    <Skeleton.Input active className="!w-5/12 h-6" />
                    <Skeleton.Input active className="h-12" />
                  </div>
                  <div className="flex flex-col items-start gap-2 w-full">
                    <Skeleton.Input active className="!w-5/12 h-6" />
                    <Skeleton.Input active className="h-12" />
                  </div>
                </div>

                <div className="flex flex-col gap-3 xs:gap-4 sm:gap-5 xs:flex-row">
                  <div className="flex flex-col items-start gap-2 w-full">
                    <Skeleton.Input active className="!w-5/12 h-6" />
                    <Skeleton.Input active className="h-12" />
                  </div>
                  <div className="flex flex-col items-start gap-2 w-full">
                    <Skeleton.Input active className="!w-5/12 h-6" />
                    <Skeleton.Input active className="h-12" />
                  </div>
                </div>

                <div className="flex flex-col items-start gap-2 w-full">
                  <Skeleton.Input active className="!w-5/12 h-6" />
                  <Skeleton.Input active className="h-32" />
                </div>

                {/* button */}
                <Skeleton.Input active className="!w-full h-12 xs:!w-60" />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* recommendation section */}
      <RecommendationSection
        items={[
          {
            title: "Mahsulotni qidirish",
            path: "products/product/find-by-id",
            image: {
              src: findProductImg,
              alt: "find product by id image",
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
            title: "Mahsulotlar",
            path: "products",
            image: {
              src: productsImg,
              alt: "products image",
            },
          },
        ]}
      />
    </>
  );
};

export default EditProduct;
