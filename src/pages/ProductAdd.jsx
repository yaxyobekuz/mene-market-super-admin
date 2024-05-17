import React, { useEffect, useRef, useState } from "react";

// axios
import axios from "../axios/axios";

// redux
import { useSelector, useDispatch } from "react-redux";
import { addProductToProductsData } from "../store/productsDataSlice";

// antd
import "../css/antd.css";
import { Select } from "antd";

// helpers
import {
  getElement,
  removeDotsFromNumber,
  checkTheInputsValueLength,
} from "../helpers/helpers";

// toast (notification)
import { toast } from "react-toastify";

// components
import Loader from "../components/Loader";
import RecommendationSection from "../components/RecommendationSection";

// images
import image from "../assets/images/image.png";
import plusImg from "../assets/images/plus.svg";
import deleteImg from "../assets/images/delete.svg";
import reviewsImg from "../assets/images/reviews.svg";
import productsImg from "../assets/images/products.svg";
import arrowDownImg from "../assets/images/down-arrow.svg";
import findProductImg from "../assets/images/find-product.svg";

const ProductAdd = () => {
  const dispatch = useDispatch();
  const dropdownRef = useRef(null);
  const isOnline = navigator.onLine;
  const [loader, setLoader] = useState(false);
  const newProductTypeDropdownRef = useRef(null);
  const addNewProductTypeInputsWrapperRef = useRef(null);
  const [selectedImages, setSelectedImages] = useState([]);
  const [productType, setProductType] = useState("other");
  const [newProductTypes, setNewProductTypes] = useState([]);
  const { authData } = useSelector((store) => store.authData);
  const [openSelectedImages, setOpenSelectedImages] = useState(false);
  const [openNewProductTypes, setOpenNewProductTypes] = useState(false);

  // select images
  const handleImageChange = (event) => {
    setSelectedImages(Array.from(event.target.files));
  };

  // add new image(s)
  const handleImageAdd = (event) => {
    const images = Array.from(event.target.files);

    if (selectedImages.length > 0) {
      const filteredImages = images.filter((image) => {
        return selectedImages.every((selectedImage) => {
          return selectedImage.name !== image.name;
        });
      });

      // add new image(s)
      if (filteredImages.length > 0) {
        setSelectedImages([...selectedImages, ...Array.from(filteredImages)]);
      } else {
        if (images.length > 1) {
          toast.info("Ushbu rasmlar allaqachon yuklangan!");
        } else {
          toast.info("Ushbu rasm allaqachon yuklangan!");
        }
      }
    } else {
      setSelectedImages(images);
    }

    // remove images
    event.target.value = "";
  };

  // delete image
  const handleImageDelete = (event) => {
    const filteredImages = selectedImages.filter((image) => {
      return image.name !== event.name || image.size !== event.size;
    });

    setSelectedImages(filteredImages);
  };

  // format the number input value
  const formatTheValue = (e) => {
    const value = e.target.value;

    const numbers = value.trim().match(/\d/g);

    if (numbers) {
      e.target.value = numbers.join("").replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    } else {
      e.target.value = numbers;
    }
  };

  // add new product type
  const handleNewProductTypeAdd = () => {
    // inputs
    const elNewProductTypeInput =
      addNewProductTypeInputsWrapperRef.current.querySelector(
        ".js-new-product-type-input"
      );
    const elNewProductTypeCountInput =
      addNewProductTypeInputsWrapperRef.current.querySelector(
        ".js-new-product-type-count-input"
      );
    const inputs = [elNewProductTypeCountInput, elNewProductTypeInput];

    // add new product type
    if (checkTheInputsValueLength(inputs)) {
      setNewProductTypes([
        ...newProductTypes,
        {
          name: elNewProductTypeInput.value.trim(),
          count: removeDotsFromNumber(elNewProductTypeCountInput.value),
        },
      ]);

      elNewProductTypeInput.value = "";
      elNewProductTypeCountInput.value = "1";
    } else {
      toast.error("Ma'lumotlar to'ldirilmagan!");
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
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenSelectedImages(false);
      }

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
  }, [dropdownRef, newProductTypeDropdownRef]);

  // add product
  const addProduct = async (event) => {
    event.preventDefault();

    // images to base 64
    const imageData = await Promise.all(
      selectedImages.map(async (image) => {
        const reader = new FileReader();

        return new Promise((resolve, reject) => {
          reader.onload = (event) => {
            resolve(event.target.result.split(",")[1]);
          };

          reader.onerror = reject;

          reader.readAsDataURL(image);
        });
      })
    );

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

    // form elements arr
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
      if (imageData.length > 0) {
        setLoader(true);

        // form data
        const formData = {
          product: {
            comments: [],
            numberSold: 0,
            productTypes: [
              {
                count: removeDotsFromNumber(elProductTCountInput.value),
                name: elProductTypeNameInput.value,
                productId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
              },
              ...newProductTypes,
            ],
            isArchived: false,
            imageMetadatas: [],
            productType: productType,
            name: elProductNameInput.value,
            description: elProductDescriptionTextarea.value,
            price: removeDotsFromNumber(elProductPriceInput.value),
            scidPrice: removeDotsFromNumber(elProductAkciyaPriceInput.value),
            advertisingPrice: removeDotsFromNumber(
              elProductAdsPriceInput.value
            ),
          },
          bytes: imageData,
        };

        // add product
        axios
          .post("/Product", formData, {
            headers: {
              Authorization: "Bearer " + authData.data.token,
            },
          })
          .then((res) => {
            if (res.status === 200) {
              dispatch(addProductToProductsData(res.data));

              // reset form elements value
              setSelectedImages([]);
              setNewProductTypes([]);
              elProductNameInput.value = "";
              elProductPriceInput.value = "";
              elProductAdsPriceInput.value = "";
              elProductAkciyaPriceInput.value = "";
              elProductDescriptionTextarea.value = "";
              elProductTypeNameInput.value = "Hech narsa";

              // notification
              toast.success("Mahsulot muvafaqiyatli qo'shildi!");
            } else {
              toast.error("Nimadir xato ketdi!");
            }
          })
          .catch(() => {
            // notification
            toast.error(
              !isOnline
                ? "Internet aloqasi mavjud emas!"
                : "Nimadir xato ketdi!"
            );
          })
          .finally(() => setLoader(false));
      } else {
        toast.error("Hech qanday rasm tanlanmadi!");
      }
    }
  };

  return (
    <>
      {/* page main section */}
      <div className="pb-12">
        <div className="container">
          <h1 className="mb-7">Yangi mahsulot qo'shish</h1>

          {/* content */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* add image */}
            <div className="flex flex-col gap-3">
              <label className="flex flex-col items-center justify-center gap-3 h-full bg-brand-dark-800/5 border-2 border-brand-dark-800 rounded-xl p-5 transition-colors hover:bg-brand-dark-800/10 xs:p-6">
                <img
                  width={208}
                  height={208}
                  src={image}
                  alt="image"
                  className="size-36 xs:size-40 sm:size-44 md:size-52"
                />
                {/* body */}
                <div className="max-w-96 space-y-2 text-center">
                  <h3 className="font-bold text-xl sm:text-2xl">
                    Mahsulot uchun rasm qo'shish
                  </h3>
                  <p>
                    Mahsulotni qo'shish uchun kamida 1 dona rasm yuklashingiz
                    kerak!
                  </p>
                </div>

                {/* btn */}
                <div
                  role="button"
                  className={`${
                    loader ? "cursor-default" : "cursor-pointer"
                  } main-btn w-full text-center px-14 rounded-lg xs:w-auto xs:rounded-xl`}
                >
                  Rasm yuklash
                </div>

                {/* input  */}
                <input
                  type="file"
                  disabled={loader}
                  multiple
                  name="image"
                  accept="image/jpeg, image/png"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>

              {/* selected images label & dropdown */}
              <div ref={dropdownRef} className="relative w-full">
                <button
                  onClick={() => {
                    if (!loader) {
                      setOpenSelectedImages(!openSelectedImages);
                    }
                  }}
                  className={`${
                    loader ? "cursor-default" : "cursor-pointer"
                  } flex items-center justify-between gap-5 w-full bg-brand-dark-800/5 pl-3.5 pr-3 py-2.5 border-2 border-brand-dark-800 rounded-xl`}
                >
                  <span>
                    Yuklangan rasmlar soni: {selectedImages.length} ta
                  </span>
                  <img
                    width={24}
                    height={24}
                    src={arrowDownImg}
                    alt="arrow down icon"
                    className="size-6"
                  />
                </button>

                {/* selected images */}
                {openSelectedImages && (
                  <div className="absolute top-[calc(100%+4px)] left-0 z-10 max-w-full w-full max-h-96 overflow-y-auto hidden-scroll bg-brand-creamy-400 border-2 border-brand-dark-800 rounded-xl shadow-xl">
                    <div className="h-full pt-4 pb-2 space-y-4">
                      <div>
                        {selectedImages.length > 0 ? (
                          <ol>
                            {selectedImages.map((image, index) => {
                              return (
                                <li
                                  key={index}
                                  className="flex items-center gap-4 px-4 py-2 even:bg-brand-dark-800/5"
                                >
                                  <span
                                    className={`${
                                      selectedImages.length < 10
                                        ? "w-3"
                                        : selectedImages.length < 100
                                        ? "w-5"
                                        : "w-8"
                                    } inline-block shrink-0 font-semibold `}
                                  >
                                    {index + 1}.
                                  </span>
                                  <h3 className="line-clamp-1 font-semibold w-full">
                                    {image.name}
                                  </h3>

                                  <button
                                    onClick={() => handleImageDelete(image)}
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
                              );
                            })}
                          </ol>
                        ) : (
                          <div className="px-4 opacity-70">
                            Hali hech qanday rasm yuklanmadi!
                          </div>
                        )}
                      </div>

                      {/* divider */}
                      <div className="px-4">
                        <div className="w-full h-0.5 bg-brand-dark-800/10 rounded-full"></div>
                      </div>

                      {/* add new image */}
                      <label className="flex items-center gap-4 px-4 py-2 cursor-pointer transition-colors duration-300 hover:bg-brand-dark-800/5">
                        <span
                          className={`${
                            selectedImages.length < 10
                              ? "w-3"
                              : selectedImages.length < 100
                              ? "w-5"
                              : "w-8"
                          } inline-block shrink-0 font-semibold `}
                        >
                          {selectedImages.length + 1}.
                        </span>

                        <b className="w-full">Yangi rasm qo'shish</b>

                        <div className="shrink-0 border-2 border-brand-dark-800 p-1.5 rounded-xl">
                          <img
                            width={24}
                            height={24}
                            src={plusImg}
                            alt="plus icon image"
                            className="size-6"
                          />
                        </div>

                        {/* input */}
                        <input
                          type="file"
                          multiple
                          name="image"
                          accept="image/jpeg, image/png"
                          onChange={handleImageAdd}
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* add product */}
            <form onSubmit={addProduct} className="space-y-3">
              {/* product name */}
              <label className="flex flex-col items-start gap-2">
                <span>Mahsulot nomi</span>
                <input
                  disabled={loader}
                  placeholder="Mahsulot nomi"
                  name="product name"
                  type="text"
                  className="js-product-name-input w-full bg-brand-dark-800/5 rounded-xl py-2.5 px-3.5 border-brand-dark-800"
                />
              </label>

              {/* new product type */}
              <div className="flex flex-col items-start gap-2">
                <div>Yangi mahsulot turini qo'shish</div>

                {/* content  */}
                <div
                  ref={newProductTypeDropdownRef}
                  className="relative w-full"
                >
                  {/* name */}
                  <button
                    id="add-new-product-type-button"
                    type="button"
                    onClick={() => {
                      if (!loader) {
                        setOpenNewProductTypes(!openNewProductTypes);
                      }
                    }}
                    className={`${
                      loader ? "cursor-default" : "cursor-pointer"
                    } flex items-center justify-between gap-5 w-full bg-brand-dark-800/5 pl-3.5 pr-3 py-2.5 border-2 border-brand-dark-800 rounded-xl`}
                  >
                    <span>
                      Yangi mahsulot turlari soni: {newProductTypes.length} ta
                    </span>

                    <img
                      width={24}
                      height={24}
                      src={arrowDownImg}
                      alt="arrow down icon"
                      className="size-6"
                    />
                  </button>

                  {/* dropdown */}
                  {openNewProductTypes && (
                    <div className="absolute top-[calc(100%+4px)] left-0 z-10 max-w-full w-full max-h-96 overflow-y-auto hidden-scroll bg-brand-creamy-400 border-2 border-brand-dark-800 rounded-xl shadow-xl">
                      {/* dropdown content */}
                      <div className="h-full pt-4 pb-2 space-y-4">
                        {/* list wrapper */}
                        <div>
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
                            <div className="px-4 opacity-70">
                              Hali hech qanday mahsulot turi qo'shilmadi!
                            </div>
                          )}
                        </div>

                        {/* divider */}
                        <div className="px-4">
                          <div className="w-full h-0.5 bg-brand-dark-800/10 rounded-full"></div>
                        </div>

                        {/* add new product type */}
                        <div className="space-y-4 px-4 py-2">
                          {/* top */}
                          <div className="flex items-center gap-4">
                            <span
                              className={`${
                                newProductTypes.length < 10
                                  ? "w-3"
                                  : newProductTypes.length < 100
                                  ? "w-5"
                                  : "w-8"
                              } inline-block shrink-0 font-semibold `}
                            >
                              {newProductTypes.length + 1}.
                            </span>

                            <b className="w-full">
                              Yangi mahsulot turini qo'shish
                            </b>

                            {/* submit btn */}
                            <button
                              type="button"
                              onClick={handleNewProductTypeAdd}
                              className="hidden shrink-0 main-btn py-2.5 xs:inline-block"
                            >
                              Qo'shish
                            </button>
                          </div>

                          {/* inputs wrapper */}
                          <div
                            ref={addNewProductTypeInputsWrapperRef}
                            className="flex flex-col gap-3 xs:gap-4 sm:gap-5 xs:flex-row"
                          >
                            <label className="flex flex-col items-start gap-2 w-full">
                              <span>Mahsulot turi</span>
                              <input
                                type="text"
                                name="name"
                                placeholder="Mahsulot turi"
                                className="js-new-product-type-input w-full bg-brand-dark-800/5 rounded-xl py-2.5 px-3.5 border-brand-dark-800"
                              />
                            </label>

                            <label className="flex flex-col items-start gap-2 w-full">
                              <span>Mahsulot soni</span>
                              {/* product count */}
                              <input
                                type="text"
                                defaultValue={1}
                                placeholder="Mahsulot soni"
                                onChange={formatTheValue}
                                name="count"
                                className="js-new-product-type-count-input w-full bg-brand-dark-800/5 rounded-xl py-2.5 px-3.5 border-brand-dark-800"
                              />
                            </label>

                            {/* submit btn */}
                            <button
                              type="button"
                              onClick={handleNewProductTypeAdd}
                              className="inline-block shrink-0 main-btn py-2.5 xs:hidden"
                            >
                              Qo'shish
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* product type name & product type */}
              <div className="flex flex-col gap-3 xs:gap-4 sm:gap-5 xs:flex-row">
                <label className="flex flex-col items-start gap-2 w-full">
                  <span>Mahsulot turining nomi</span>
                  <input
                    disabled={loader}
                    placeholder="Mahsulot turining nomi"
                    defaultValue="Hech narsa"
                    name="product type name"
                    type="text"
                    className="js-product-type-name-input w-full bg-brand-dark-800/5 rounded-xl py-2.5 px-3.5 border-brand-dark-800"
                  />
                </label>

                <label className="flex flex-col items-start gap-2 w-full">
                  <span>Mahsulot turi</span>
                  <Select
                    defaultValue="Boshqa"
                    disabled={loader}
                    onChange={(value) => setProductType(value)}
                    options={[
                      { value: "other", label: "Boshqa" },
                      { value: "car", label: "Mashina" },
                      { value: "telephone", label: "Telefon" },
                      { value: "computer", label: "Kompyuter" },
                      { value: "parfumery", label: "Parfumeriya" },
                      { value: "health", label: "Salomatlik" },
                      { value: "toy", label: "O'yinchoq" },
                      { value: "flower", label: "Gul" },
                      { value: "furniture", label: "Mebel" },
                    ]}
                  />
                </label>
              </div>

              {/* product price */}
              <div className="flex flex-col gap-3 xs:gap-4 sm:gap-5 xs:flex-row">
                <label className="flex flex-col items-start gap-2 w-full">
                  <span>Mahsulot narxi</span>
                  <input
                    disabled={loader}
                    onChange={formatTheValue}
                    min={0}
                    step={20000}
                    placeholder="Mahsulot narxi"
                    name="product price"
                    type="text"
                    className="js-product-price-input w-full bg-brand-dark-800/5 rounded-xl py-2.5 px-3.5 border-brand-dark-800"
                  />
                </label>

                <label className="flex flex-col items-start gap-2 w-full">
                  <span>Mahsulot aksiya narxi</span>
                  <input
                    disabled={loader}
                    onChange={formatTheValue}
                    placeholder="Mahsulot aksiya narxi"
                    name="product sale price"
                    type="text"
                    className="js-product-akciya-price-input w-full bg-brand-dark-800/5 rounded-xl py-2.5 px-3.5 border-brand-dark-800"
                  />
                </label>
              </div>

              {/* product counts */}
              <div className="flex flex-col gap-3 xs:gap-4 sm:gap-5 xs:flex-row">
                <label className="flex flex-col items-start gap-2 w-full">
                  <span>Mahsulot reklama narxi</span>
                  <input
                    disabled={loader}
                    onChange={formatTheValue}
                    placeholder="Mahsulot reklama narxi"
                    name="product ads price"
                    type="text"
                    className="js-product-ads-price-input w-full bg-brand-dark-800/5 rounded-xl py-2.5 px-3.5 border-brand-dark-800"
                  />
                </label>

                <label className="flex flex-col items-start gap-2 w-full">
                  <span>Mahsulot soni</span>
                  <input
                    disabled={loader}
                    defaultValue={1}
                    onChange={formatTheValue}
                    placeholder="Mahsulot soni"
                    name="product count"
                    type="text"
                    className="js-product-count-input w-full bg-brand-dark-800/5 rounded-xl py-2.5 px-3.5 border-brand-dark-800"
                  />
                </label>
              </div>

              {/* product description */}
              <label className="flex flex-col items-start gap-2">
                <span>Mahsulot tavsifi</span>
                <textarea
                  disabled={loader}
                  placeholder="Mahsulot tavsifi"
                  name="description"
                  className="js-product-description-textarea w-full min-h-44 max-h-72 resize-y hidden-scroll bg-brand-dark-800/5 rounded-xl py-2.5 px-3.5 border-brand-dark-800"
                ></textarea>
              </label>

              <button
                disabled={loader}
                className="main-btn flex justify-center w-full px-20 disabled:cursor-not-allowed xs:w-auto"
              >
                {loader ? <Loader size={24} /> : <span>Qo'shish</span>}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* recommendation section */}
      <RecommendationSection
        items={[
          {
            title: "Mahsulotni qidirish",
            path: "product/find-by-id",
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

export default ProductAdd;
