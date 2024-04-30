import React, { useState } from "react";
import { Link } from "react-router-dom";

// components
import Loader from "../components/Loader";

// regex
import { guidRegex } from "../helpers/regexes";

// toast
import { toast } from "react-toastify";

// redux
import { useSelector } from "react-redux";

// axios
import axios from "../axios/axios";

// images
import copyIcon from "../assets/images/copy.svg";
import doneIcon from "../assets/images/done.svg";
import searchImg from "../assets/images/search.svg";
import deleteIcon from "../assets/images/delete.svg";

const FindProductById = () => {
  const isOnline = navigator.onLine;
  const [loader, setLoader] = useState(false);
  const [product, setProduct] = useState(null);
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
          setProduct(res.data);
        } else {
          setLoader(false);
          toast.error("Ma'lumotlarni yuklab bo'lmadi!");
        }
      })
      .catch(() => toast.error("Ma'lumotlarni yuklab bo'lmadi!"))
      .finally(() => setLoader(false));
  };

  // handle submit
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
          setProduct(null);
          // find product by products data
          if (productsData.length > 0) {
            const findProduct = productsData.find((product) => {
              return product.productId === id;
            });

            if (findProduct) {
              setProduct(findProduct);
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

  return (
    <div className="container pb-12">
      <h1 className="mb-7">Mahsulotni qidirsh</h1>

      {/* search */}
      <div className="w-full mb-12">
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
      {product && (
        <li className="w-full list-none xs:w-96">
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
              <p className="whitespace-nowrap">{product.productOwner}</p>
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
                {"0".toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} ta
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
                {product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}{" "}
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
                  <span className="font-semibold text-center">Tahrirlash</span>
                </Link>

                {/* delete product btn */}
                <button
                  onClick={() => {
                    setProduct(product);
                    setOpenModal(true);
                  }}
                  className="flex items-center justify-center w-12 shrink-0 aspect-square bg-brand-dark-800 rounded-xl"
                >
                  <img width={32} height={32} src={deleteIcon} alt="" />
                </button>
              </div>
            </div>
          </div>
        </li>
      )}
    </div>
  );
};

export default FindProductById;
