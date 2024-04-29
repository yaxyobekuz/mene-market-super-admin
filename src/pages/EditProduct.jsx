import React, { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";

// axios
import axios from "../axios/axios";

// redux
import { useSelector, useDispatch } from "react-redux";
import {
  addProductToProductsData,
  editProductDataToProductsData,
} from "../store/productsDataSlice";

// antd
import "../css/antd.css";
import { Select } from "antd";
import { Skeleton } from "antd";

// toast (notification)
import { toast } from "react-toastify";

// loader (component)
import Loader from "../components/Loader";

// swiper
import "swiper/css";
import "../css/swiper.css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

// images
import image from "../assets/images/image.png";
import plusImg from "../assets/images/plus.svg";
import deleteImg from "../assets/images/delete.svg";
import resetIcon from "../assets/images/reset.svg";
import deleteIcon from "../assets/images/delete.svg";
import reviewsImg from "../assets/images/reviews.svg";
import productsImg from "../assets/images/products.svg";
import arrowDownImg from "../assets/images/down-arrow.svg";
import findProductImg from "../assets/images/find-product.svg";
import topRightArrowImg from "../assets/images/top-right-arrow.svg";

const EditProduct = () => {
  const dispatch = useDispatch();
  const dropdownRef = useRef(null);
  const { productId } = useParams();
  const isOnline = navigator.onLine;
  const [error, setError] = useState(false);
  const [loader, setLoader] = useState(true);
  const [loader2, setLoader2] = useState(false);
  const [deletableImages, setDeletableImages] = useState([]);
  const newProductTypeDropdownRef = useRef(null);
  const [productData, setproductData] = useState(null);
  const addNewProductTypeInputsWrapperRef = useRef(null);
  const [selectedImages, setSelectedImages] = useState([]);
  const [productType, setPproductType] = useState("other");
  const [newProductTypes, setNewProductTypes] = useState([]);
  const { authData } = useSelector((store) => store.authData);
  const { productsData } = useSelector((store) => store.productsData);
  const [openSelectedImages, setOpenSelectedImages] = useState(false);
  const [disableFormElements, setDisableFormElements] = useState(false);
  const [openNewProductTypes, setOpenNewProductTypes] = useState(false);

  // get product data
  const getProductData = () => {
    setLoader(true);
    if (isOnline) {
      axios
        .get("/Product/ById?id=" + productId, {
          headers: {
            Authorization: "Bearer " + authData.data.token,
          },
        })
        .then((res) => {
          if (res.status === 200) {
            setproductData(res.data);
          } else {
            setError(true);
          }
        })
        .catch((err) => {
          setError(true);
          toast.error("Ma'lumotlarni yuklab bo'lmadi!");
        })
        .finally(() => setLoader(false));
    } else {
      setLoader(false);
      toast.error("Internet aloqasi mavjud emas!");
    }
  };

  // set product data
  useEffect(() => {
    if (productsData.length > 0) {
      const findProductData = productsData.find(
        (product) => product.productId === productId
      );

      // set product data
      if (findProductData) {
        setproductData(findProductData);
        setTimeout(() => setLoader(false), 1000);
      } else {
        getProductData();
      }
    } else {
      getProductData();
    }
  }, []);

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

  // add new product type
  const handleNewProductTypeAdd = () => {
    // form elements
    const elNewProductTypeInput =
      addNewProductTypeInputsWrapperRef.current.querySelector(
        ".js-new-product-type-input"
      );
    const elNewProductTypeCountInput =
      addNewProductTypeInputsWrapperRef.current.querySelector(
        ".js-new-product-type-count-input"
      );

    // form elements arr
    const formElements = [elNewProductTypeCountInput, elNewProductTypeInput];

    // checked form elements value arr
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

    const priceToNumber = (value) => {
      return Number(value.split(".").join(""));
    };

    // add new product type
    if (isValidFormElements) {
      if (newProductTypes.length > 0) {
        const filteredProductTypes = newProductTypes.find((type) => {
          return type.name === elNewProductTypeInput.value.trim();
        });

        // add new product type
        if (!filteredProductTypes) {
          setNewProductTypes([
            ...newProductTypes,
            {
              id: newProductTypes.length,
              name: elNewProductTypeInput.value.trim(),
              count: priceToNumber(elNewProductTypeCountInput.value),
            },
          ]);

          // reset the form elements value to default values
          elNewProductTypeInput.value = "";
          elNewProductTypeCountInput.value = "1";
        } else {
          toast.info("Ushbu mahsulot turi qo'shib bo'lingan!");
          elNewProductTypeInput.classList.add("!border-red-500");
          elNewProductTypeInput.focus();
        }
      } else {
        setNewProductTypes([
          {
            id: 0,
            name: elNewProductTypeInput.value.trim(),
            count: priceToNumber(elNewProductTypeCountInput.value),
          },
        ]);

        // reset the form elements value to default values
        elNewProductTypeInput.value = "";
        elNewProductTypeCountInput.value = "1";
      }
    } else {
      toast.info("Ma'lumotlar to'ldirilmagan!");
    }
  };

  // delete new product type
  const handleNewProductTypeDelete = (event) => {
    const filteredNewProductTypes = newProductTypes.filter((type) => {
      return type.name !== event.name;
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

  // edit product
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

    // form elements arr
    const formElements = [
      elProductDescriptionTextarea,
      elProductCountInput,
      elProductAdsPriceInput,
      elProductPriceInput,
      elProductOwnerInput,
      elProductNameInput,
    ];

    // checked form elements value arr
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

    // edit product
    if (!loader2 && isValidFormElements) {
      if (
        deletableImages.length !== productData.images.length ||
        imageData.length > 0
      ) {
        // set loader
        setLoader2(true);

        // form data
        const formData = () => {
          const priceToNumber = (value) => {
            return Number(value.split(".").join(""));
          };

          return {
            product: {
              productId: productId,
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
              images: productData.images,
              numberSold: productData.numberSold,
              numberStars: 0,
              comments: productData.comments,
              productAttributes: productData.productAttributes,
              // :elProductCountInput.value,
            },
            imageFilePaths: deletableImages,
            bytes: imageData,
          };
        };

        // disable form elements
        setDisableFormElements(true);

        // edit product
        axios
          .put("/Product", formData(), {
            headers: {
              Authorization: "Bearer " + authData.data.token,
              "Content-Type": "application/json; charset=utf-8",
            },
          })
          .then((res) => {
            if (productsData.length > 0) {
              const productIndex = productsData.findIndex((product, index) => {
                return product.productId === res.data.productId;
              });

              
              dispatch(
                editProductDataToProductsData({
                  index: productIndex,
                  productData: res.data,
                })
              );
            }

            setLoader(true);
            setproductData(res.data);

            // notification
            toast.success("Mahsulot muvafaqiyatli o'zgartirildi!");

            // reset values
            setDeletableImages([]);
            setSelectedImages([]);

            // remove loader
            setTimeout(() => {
              setLoader(false);
              // undisable form elements
              setDisableFormElements(false);
            }, 1000);
          })
          .catch(() => {
            setDisableFormElements(false);

            // error notification
            if (isOnline) {
              toast.error("Nimadir xato ketdi!");
            } else {
              toast.error("Internet aloqasi mavjud emas!");
            }
          })
          .finally(() => setLoader2(false));
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
          <h1 className="mb-7">Mahsulotni tahrirlash</h1>

          {/* content */}

          {!error ? (
            !loader ? (
              <div>
                {/* images */}
                <div className="mb-6">
                  <Swiper
                    className="edit-product-page-swiper h-auto"
                    slidesPerView={1}
                    spaceBetween={16}
                    breakpoints={{
                      425: {
                        slidesPerView: 2,
                        spaceBetween: 16,
                      },
                      768: {
                        slidesPerView: 3,
                        spaceBetween: 20,
                      },
                      1024: {
                        slidesPerView: 4,
                        spaceBetween: 24,
                      },
                    }}
                    autoplay={{
                      delay: 3500,
                      pauseOnMouseEnter: true,
                    }}
                    pagination={{
                      clickable: true,
                    }}
                    navigation={true}
                    loop={true}
                    modules={[Pagination, Autoplay, Navigation, Pagination]}
                  >
                    {productData &&
                      productData.images.map((image, index) => {
                        return (
                          <SwiperSlide key={index} className="relative">
                            {/* image */}
                            <img
                              src={
                                "https://menemarket-cdcc7e43d37f.herokuapp.com/" +
                                image
                              }
                              alt=""
                              className="w-full h-auto aspect-square object-cover bg-brand-dark-800/5 rounded-xl select-none"
                            />

                            {/* delete button */}
                            <button
                              onClick={(e) => {
                                const deleteIcon =
                                  e.currentTarget.querySelector(
                                    ".js-delete-icon"
                                  );
                                const resetIcon =
                                  e.currentTarget.querySelector(
                                    ".js-reset-icon"
                                  );

                                deleteIcon.classList.toggle("hidden");
                                resetIcon.classList.toggle("hidden");

                                const findImage = deletableImages.find(
                                  (item) => item === image
                                );

                                if (findImage) {
                                  setDeletableImages(
                                    deletableImages.filter(
                                      (item) => item !== image
                                    )
                                  );
                                } else {
                                  setDeletableImages([
                                    ...deletableImages,
                                    image,
                                  ]);
                                }
                              }}
                              className="absolute top-5 right-5 shrink-0 bg-brand-dark-800 p-2 rounded-xl"
                            >
                              <img
                                width={24}
                                height={24}
                                src={deleteIcon}
                                alt="delete icon"
                                className="js-delete-icon"
                              />

                              <img
                                width={24}
                                height={24}
                                src={resetIcon}
                                alt="reset icon"
                                className="js-reset-icon hidden"
                              />
                            </button>
                          </SwiperSlide>
                        );
                      })}
                  </Swiper>
                </div>

                {/* main content */}
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
                          Mahsulotni qo'shish uchun kamida 1 dona rasm
                          yuklashingiz kerak!
                        </p>
                      </div>

                      {/* btn */}
                      <div
                        role="button"
                        className={`${
                          disableFormElements
                            ? "cursor-default"
                            : "cursor-pointer"
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
                          disableFormElements
                            ? "cursor-default"
                            : "cursor-pointer"
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
                                          onClick={() =>
                                            handleImageDelete(image)
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
                        defaultValue={productData.brand}
                        name="product name"
                        type="text"
                        className="js-product-name-input w-full bg-brand-dark-800/5 rounded-xl py-2.5 px-3.5 border-brand-dark-800"
                      />
                    </label>

                    {/* add new product type */}
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
                            if (!disableFormElements) {
                              setOpenNewProductTypes(!openNewProductTypes);
                            }
                          }}
                          className={`${
                            disableFormElements
                              ? "cursor-default"
                              : "cursor-pointer"
                          } flex items-center justify-between gap-5 w-full bg-brand-dark-800/5 pl-3.5 pr-3 py-2.5 border-2 border-brand-dark-800 rounded-xl`}
                        >
                          <span>
                            Yangi mahsulot turlari soni:{" "}
                            {newProductTypes.length} ta
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
                                    {newProductTypes.map((type, index) => {
                                      return (
                                        <li
                                          key={index}
                                          className="flex items-center gap-4 px-4 py-2 even:bg-brand-dark-800/5"
                                        >
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
                                          <h3 className="line-clamp-1 font-semibold w-full">
                                            {type.name}
                                          </h3>

                                          <button
                                            type="button"
                                            onClick={() =>
                                              handleNewProductTypeDelete(type)
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
                                      );
                                    })}
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

                    {/* product type & product owner */}
                    <div className="flex flex-col gap-3 xs:gap-4 sm:gap-5 xs:flex-row">
                      <label className="flex flex-col items-start gap-2 w-full">
                        <span>Mahsulot turi</span>
                        <Select
                          defaultValue={productData.productType}
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
                          defaultValue={productData.productOwner}
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
                          defaultValue={productData.price
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
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
                          defaultValue={productData.scidPrice
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
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
                          defaultValue={productData.advertisingPrice
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
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
                          defaultValue={"1".replace(
                            /\B(?=(\d{3})+(?!\d))/g,
                            "."
                          )}
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
                        defaultValue={productData.description}
                        placeholder="Mahsulot tavsifi"
                        name="description"
                        className="js-product-description-textarea w-full min-h-32 bg-brand-dark-800/5 rounded-xl py-2.5 px-3.5 border-brand-dark-800 resize-none hidden-scroll"
                      ></textarea>
                    </label>

                    <button
                      disabled={loader2}
                      className="main-btn flex justify-center w-full px-20 disabled:cursor-not-allowed xs:w-auto"
                    >
                      {loader2 ? (
                        <Loader size={24} />
                      ) : (
                        <span>O'zgartirish</span>
                      )}
                    </button>
                  </form>
                </div>
              </div>
            ) : (
              // Skeleton loader
              <div>
                {/* images */}
                <div className="mb-8">
                  {/* images */}
                  <div className="edit-product-page-image-skeleton-loader-wrapper grid grid-cols-1 gap-4 mb-2 xs:grid-cols-2 md:grid-cols-3 md:gap-5 lg:grid-cols-4 lg:gap-6">
                    <Skeleton.Image
                      active
                      className="aspect-square !rounded-xl"
                    />
                    <Skeleton.Image
                      active
                      className="!hidden aspect-square !rounded-xl xs:!flex"
                    />
                    <Skeleton.Image
                      active
                      className="!hidden aspect-square !rounded-xl md:!flex"
                    />
                    <Skeleton.Image
                      active
                      className="!hidden aspect-square !rounded-xl lg:!flex"
                    />
                  </div>

                  {/* pagination */}
                  <div className="w-48 mx-auto">
                    <Skeleton.Input active className="w-full h-4 !rounded-md" />
                  </div>
                </div>

                {/* main content */}
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                  {/* child 1 (image) */}
                  <div className="flex flex-col gap-3">
                    <Skeleton.Image
                      active
                      className="w-full h-[344px] xs:h-[368px] sm:h-[388px] md:h-[420px] lg:h-full"
                    />
                    <Skeleton.Input active className="w-full h-12" />
                  </div>

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
              </div>
            )
          ) : (
            <div className="">
              <h2 className="">Xatolik!</h2>
              <div className="space-y-4">
                <p className="text-lg">Ma'lumotlarni yuklab bo'lmadi.</p>

                {/* details */}
                <div className="space-y-2">
                  <b className="text-lg font-medium">
                    Bu nimadan bo'lishi mumkin? <br /> Xatolik quyidagilardan
                    biri sababli bo'lishi mumkin:
                  </b>

                  {/* list */}
                  <ul className="pl-5 list-disc">
                    <li>Internet aloqasi sifati past yoki mavjud emas</li>
                    <li>Ushbu mahsulot allaqchon yo'q qilingan</li>
                    <li>Sahifa havolasi noto'g'ri kiritilgan</li>
                  </ul>
                </div>

                {/* buttons */}
                <div className="flex gap-4 flex-col sm:flex-row">
                  <button onClick={() => getProductData()} className="main-btn">
                    Ma'lumotlarni qayta yuklash
                  </button>
                  <Link
                    to={-1}
                    className="border-2 border-brand-dark-800 py-3 px-5 rounded-xl text-center"
                  >
                    Oldingi sahifaga qaytish
                  </Link>
                </div>
              </div>
            </div>
          )}
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
                to="/product"
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

export default EditProduct;
