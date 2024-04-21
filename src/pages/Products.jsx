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
import deleteIcon from "../assets/images/delete.svg";
import errorImage from "../assets/images/error-image.png";
const Products = () => {
  const { productType } = useParams();
  const { productsData } = useSelector((store) => store.productsData);
  const { authData } = useSelector((store) => store.authData);
  const [openModal, setOpenModal] = useState(false);
  const [loader, setLoader] = useState(false);
  const [productData, setProductData] = useState([]);
  const dispatch = useDispatch();

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

  const calculateDiscount = (price, scidPrice) => {
    const result = Math.floor((scidPrice * 100) / price - 100);
    if (result > 0) {
      return "+" + result.toString();
    } else {
      return result.toString();
    }
  };

  return (
    <div className="py-12">
      <div className="container">
        <ul className="grid grid-cols-1 gap-5 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {productsData.map((product) => {
            return (
              <li key={product.productId} className="flex flex-col gap-3">
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

                {/* content */}
                <div className="flex flex-col grow gap-2">
                  <h3 className="text-lg">
                    Lorem ipsum dolor sit amet consectetur.
                  </h3>

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
                    {/* {product.scidPrice.toString().charAt(1)} */}
                    {product.scidPrice && product.scidPrice !== 0 ? (
                      <p
                        className={`${
                          product.scidPrice.toString().charAt(0) > 0
                            ? "text-red-500 bg-red-100"
                            : ""
                        } rounded-full text-sm leading-4 py-1.5 px-2`}
                      >
                        {calculateDiscount(product.price, product.scidPrice)}%
                      </p>
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
