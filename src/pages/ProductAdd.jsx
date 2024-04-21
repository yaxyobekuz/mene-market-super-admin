import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

// axios
import axios from "../axios/axios";

// redux
import { useSelector, useDispatch } from "react-redux";
import { addProductToProductsData } from "../store/productsDataSlice";

// antd
import { Select } from "antd";
import "../css/antd.css";

// toast (notification)
import { toast } from "react-toastify";

// loader (component)
import Loader from "../components/Loader";

// images
import image from "../assets/images/image.png";
import plusImg from "../assets/images/plus.svg";
import deleteImg from "../assets/images/delete.svg";
import reviewsImg from "../assets/images/reviews.svg";
import productsImg from "../assets/images/products.svg";
import arrowDownImg from "../assets/images/down-arrow.svg";
import findProductImg from "../assets/images/find-product.svg";
import topRightArrowImg from "../assets/images/top-right-arrow.svg";

const ProductAdd = () => {
  const dispatch = useDispatch();
  const dropdownRef = useRef(null);
  const [loader, setLoader] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  const [productType, setPproductType] = useState("other");
  const { authData } = useSelector((store) => store.authData);
  const [openSelectedImages, setOpenSelectedImages] = useState(false);
  const [disableFormElements, setDisableFormElements] = useState(false);

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

  // set product type
  const handleChange = (value) => {
    setPproductType(value);
  };

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

  // close images dropdown
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenSelectedImages(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  // add product
  const handleSubmit = async (event) => {
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
    const elProductNameInput = event.target.querySelector(
      ".js-product-name-input"
    );
    const elProductDescriptionTextarea = event.target.querySelector(
      ".js-product-description-textarea"
    );
    const elProductPriceInput = event.target.querySelector(
      ".js-product-price-input"
    );
    const elProductAkciyaPriceInput = event.target.querySelector(
      ".js-product-akciya-price-input"
    );
    const elProductAdsPriceInput = event.target.querySelector(
      ".js-product-ads-price-input"
    );
    const elProductCountInput = event.target.querySelector(
      ".js-product-count-input"
    );
    const elProductOwnerInput = event.target.querySelector(
      ".js-product-owner-input"
    );

    // form elemnts arr
    const formElements = [
      elProductDescriptionTextarea,
      elProductCountInput,
      elProductAdsPriceInput,
      elProductPriceInput,
      elProductOwnerInput,
      elProductNameInput,
    ];

    // checked form elemnts value arr
    const checkValidFormElementValue = formElements.map((element) => {
      if (element.value.length > 0) {
        element.classList.remove("!border-red-500");
        return true;
      } else {
        element.classList.add("!border-red-500");
        element.focus();
        return false;
      }
    });

    // checked form elements value
    const isValidFormElements = checkValidFormElementValue.every(
      (element) => element
    );

    // add product
    if (!loader && isValidFormElements) {
      if (imageData.length > 0) {
        // set loader
        setLoader(true);

        // form data
        const formData = () => {
          const priceToNumber = (value) => {
            return Number(value.split(".").join(""));
          };

          return {
            product: {
              brand: elProductNameInput.value,
              description: elProductDescriptionTextarea.value,

              // price
              price: priceToNumber(elProductPriceInput.value),
              scidPrice: priceToNumber(elProductAkciyaPriceInput.value),
              advertisingPrice: priceToNumber(elProductAdsPriceInput.value),

              // other
              productOwner: elProductOwnerInput.value,
              productType: productType,
              isArchived: false,
              isLiked: false,
              images: [],
              numberSold: 0,
              numberStars: 0,
              comments: [],
              productAttributes: [],
              // :elProductCountInput.value,
            },
            imageFilePaths: [],
            bytes: imageData,
          };
        };

        // disable form elements
        setDisableFormElements(true);

        // add product
        axios
          .post("/Product", formData(), {
            headers: {
              Authorization: "Bearer " + authData.data.token,
              "Content-Type": "application/json; charset=utf-8",
            },
          })
          .then((res) => {
            dispatch(addProductToProductsData(res.data));

            // notification
            toast.success("Mahsulot muvafaqiyatli qo'shildi!");

            // reset form elements value
            elProductNameInput.value = "";
            elProductPriceInput.value = "";
            elProductCountInput.value = "1";
            elProductAdsPriceInput.value = "";
            elProductOwnerInput.value = "Mene Market";
            elProductDescriptionTextarea.value = "";
            elProductAkciyaPriceInput.value = "";
            setSelectedImages([]);

            // undisable form elements
            setDisableFormElements(false);
          })
          .catch(() => {
            const isOnline = navigator.onLine;

            // error notification
            if (isOnline) {
              toast.error("Nimadir xato ketdi!");
            } else {
              toast.error("Internet aloqasi mavjud emas!");
            }
          })
          .finally(() => setLoader(false));
      } else {
        toast.error("Iltimos bironbir rasm yuklang!");
      }
    } else {
      toast.error("Xatolik!");
    }
  };

  return (
    <>
      {/* page body (main content) */}
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
                    disableFormElements ? "cursor-default" : "cursor-pointer"
                  } main-btn w-full text-center px-14 rounded-lg xs:w-auto xs:rounded-xl`}
                >
                  Rasm yuklash
                </div>

                {/* input  */}
                <input
                  type="file"
                  disabled={disableFormElements}
                  multiple
                  name="image"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>

              {/* selected images label & dropdown */}
              <div ref={dropdownRef} className="relative w-full">
                <button
                  onClick={() => {
                    if (!disableFormElements) {
                      setOpenSelectedImages(!openSelectedImages);
                    }
                  }}
                  className={`${
                    disableFormElements ? "cursor-default" : "cursor-pointer"
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
                          accept="image/*"
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
            <form onSubmit={handleSubmit} className="space-y-3">
              {/* product name */}
              <label className="flex flex-col items-start gap-2">
                <span>Mahsulot nomi</span>
                <input
                  disabled={disableFormElements}
                  placeholder="Mahsulot nomi"
                  name="product name"
                  type="text"
                  className="js-product-name-input w-full bg-brand-dark-800/5 rounded-xl py-2.5 px-3.5 border-brand-dark-800"
                />
              </label>

              {/* product type & product owner */}
              <div className="flex flex-col gap-3 xs:gap-4 sm:gap-5 xs:flex-row">
                <label className="flex flex-col items-start gap-2 w-full">
                  <span>Mahsulot turi</span>
                  <Select
                    defaultValue="Boshqa"
                    disabled={disableFormElements}
                    onChange={handleChange}
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

                <label className="flex flex-col items-start gap-2 w-full">
                  <span>Mahsulot egasi</span>
                  <input
                    disabled={disableFormElements}
                    defaultValue="Mene Market"
                    placeholder="Mahsulot egasi"
                    name="product owner"
                    type="text"
                    className="js-product-owner-input w-full bg-brand-dark-800/5 rounded-xl py-2.5 px-3.5 border-brand-dark-800"
                  />
                </label>
              </div>

              {/* product price */}
              <div className="flex flex-col gap-3 xs:gap-4 sm:gap-5 xs:flex-row">
                <label className="flex flex-col items-start gap-2 w-full">
                  <span>Mahsulot narxi</span>
                  <input
                    disabled={disableFormElements}
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
                    disabled={disableFormElements}
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
                    disabled={disableFormElements}
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
                    disabled={disableFormElements}
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
                  disabled={disableFormElements}
                  placeholder="Mahsulot tavsifi"
                  name="description"
                  className="js-product-description-textarea w-full min-h-32 bg-brand-dark-800/5 rounded-xl py-2.5 px-3.5 border-brand-dark-800 resize-none hidden-scroll"
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
      <section className="py-12">
        <div className="container">
          <h2 className="mb-7">Ushbu sahifaga oid</h2>
          <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <li>
              <Link
                to="/product/find-by-id"
                className="flex flex-col items-center justify-center gap-3 relative border-2 border-brand-dark-800 rounded-2xl py-10 px-6 group"
              >
                <img
                  width={192}
                  height={192}
                  src={findProductImg}
                  alt="go to find product by id page"
                  className="w-[146px] h-28 sm:w-[167px] sm:h-32 md:w-48 md:h-[147px]"
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
                  Mahsulotni qidirish
                </h3>
              </Link>
            </li>
            <li>
              <Link
                to="/reviews"
                className="flex flex-col items-center justify-center gap-3 relative border-2 border-brand-dark-800 rounded-2xl py-10 px-6 group"
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
                to="/product/products"
                className="flex flex-col items-center justify-center gap-3 relative border-2 border-brand-dark-800 rounded-2xl py-10 px-6 group"
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

export default ProductAdd;
