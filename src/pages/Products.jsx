import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";

// axios
import axios from "../axios/axios";

// redux
import { useSelector, useDispatch } from "react-redux";
import { filterProductsData } from "../store/productsDataSlice";

// toast
import { toast } from "react-toastify";

// components
import ConfirmModal from "../components/ConfirmModal";

// images
import copyIcon from "../assets/images/copy.svg";
import doneIcon from "../assets/images/done.svg";
import deleteIcon from "../assets/images/delete.svg";
import errorImage from "../assets/images/error-image.png";
const Products = () => {
  const { productsData } = useSelector((store) => store.productsData);
  const { authData } = useSelector((store) => store.authData);
  const [openModal, setOpenModal] = useState(false);
  const [loader, setLoader] = useState(false);
  const [productData, setProductData] = useState([]);
  const dispatch = useDispatch();

  // delete product
  const deleteProduct = () => {
    const isOnline = navigator.onLine;

    if (isOnline) {
      setLoader(true);

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
        .finally(() => setLoader(false));
    } else {
      toast.error("Internet aloqasi mavjud emas!");
    }
  };

  return (
    <div className="py-12">
      <div className="container">
        <ul className="grid grid-cols-1 gap-5 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {productsData.map((product, index) => {
            return (
              <li key={product.productId} className="flex flex-col gap-2.5">
                {/* image wrapper */}
                <div className="relative">
                  <img
                    width={295}
                    height={295}
                    src={
                      product.images[0]
                        ? "https://menemarket-cdcc7e43d37f.herokuapp.com/" +
                          product.images[0]
                        : errorImage
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
                  <p className="">{product.productType}</p>
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
                    <p className="">
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
                        to="/"
                        className="flex items-center justify-center gap-1 w-full border-2 border-brand-dark-800  rounded-xl py-2.5"
                      >
                        {/* <img src="" alt="" className="" /> */}
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
                          className=""
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      {/* modal */}
      {openModal && (
        <ConfirmModal
          setOpenModal={setOpenModal}
          title="Haqiqatdan ham ushbu mahsulotni o'chirmoqchimisiz?"
          description={productData.description}
          subtitle="Mahsulot nomi:"
          image={{
            src: productData.images.length > 0 && productData.images[0],
            alt: "product image",
          }}
          loader={loader}
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
    </div>
  );
};

export default Products;
