import React, { useEffect, useRef, useState } from "react";
import { Link, json } from "react-router-dom";

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

const AddNews = () => {
  const dispatch = useDispatch();
  const dropdownRef = useRef(null);
  const [loader, setLoader] = useState(false);
  const newProductTypeDropdownRef = useRef(null);
  const addNewProductTypeInputsWrapperRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [imagesData, setImagesData] = useState("");
  const [productType, setPproductType] = useState("other");
  const [newProductTypes, setNewProductTypes] = useState([]);
  const { authData } = useSelector((store) => store.authData);
  const [openSelectedImages, setOpenSelectedImages] = useState(false);
  const [disableFormElements, setDisableFormElements] = useState(false);
  const [openNewProductTypes, setOpenNewProductTypes] = useState(false);

  // add product
  const handleSubmit = async (event) => {
    event.preventDefault();

    // images to base 64
    const imageData = () => {
      const reader = new FileReader();

      return new Promise((resolve, reject) => {
        reader.onload = (event) => {
          resolve(event.target.result.split(",")[1]);
        };

        reader.onerror = reject;

        if (selectedImages.length > 0) {
          reader.readAsDataURL(selectedImages[0]);
        } else {
          reject("No image selected");
        }
      });
    };

    imageData()
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });

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
          .finally(() => setLoader(false), setDisableFormElements(false));
      } else {
        toast.error("Iltimos bironbir rasm yuklang!");
      }
    } else {
      toast.error("Xatolik!");
    }
  };

  return (  
    <>
      {/* page main content */}
      <div className="pb-12">
        <div className="container">
          <h1 className="mb-7">Yangilik qo'shish</h1>

          {/* content */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* add image */}
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
                  Yangilik uchun rasm qo'shish
                </h3>
                <p>
                  Yangilikni qo'shish uchun kamida 1 dona rasm yuklashingiz
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
                name="image"
                accept="image/*"
                onChange={(event) => {
                  setSelectedImage(event.target.files[0]);
                }}
                className="hidden"
              />
            </label>

            {/* add news */}
            <form onSubmit={handleSubmit} className="space-y-3">
              {/* news title */}
              <label className="flex flex-col items-start gap-2">
                <span>Yangilik sarlavhasi</span>
                <input
                  disabled={disableFormElements}
                  placeholder="Yangilik sarlavhasi"
                  name="news title"
                  type="text"
                  className="js-news-title-input w-full bg-brand-dark-800/5 rounded-xl py-2.5 px-3.5 border-brand-dark-800"
                />
              </label>

              {/* news description */}
              <label className="flex flex-col items-start gap-2 w-full">
                <span>Yangilik tavsifi</span>
                <textarea
                  disabled={disableFormElements}
                  placeholder="Yangilik tavsifi"
                  name="description"
                  className="js-news-description-textarea w-full min-h-40 max-h-72 resize-y hidden-scroll bg-brand-dark-800/5 rounded-xl py-2.5 px-3.5 border-brand-dark-800"
                ></textarea>
              </label>

              {/* news extra description */}
              <label className="flex flex-col items-start gap-2 w-full">
                <span>Yangilik qo'chimcha tavsifi</span>
                <textarea
                  disabled={disableFormElements}
                  placeholder="Yangilik qo'chimcha tavsifi"
                  name="description"
                  className="js-news-extrta-description-textarea w-full min-h-40 max-h-72 resize-y hidden-scroll bg-brand-dark-800/5 rounded-xl py-2.5 px-3.5 border-brand-dark-800"
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
                className="flex flex-col items-center justify-center gap-3 relative h-full border-2 border-brand-dark-800 rounded-2xl py-10 px-6 group"
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
          </ul>
        </div>
      </section>
    </>
  );
};

export default AddNews;
