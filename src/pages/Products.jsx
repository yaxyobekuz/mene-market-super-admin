import React, { useEffect, useRef, useState } from "react";
import { Link, NavLink, useParams } from "react-router-dom";

// axios
import axios from "../axios/axios";

// redux
import { useSelector, useDispatch } from "react-redux";
import {
  filterProductsData,
  setProductsData,
} from "../store/productsDataSlice";

// data
import { imageBaseUrl, productTypesData } from "../data/data";

// toast
import { toast } from "react-toastify";

// components
import Product from "../components/Product";
import NoData from "../components/NoData";
import ConfirmModal from "../components/ConfirmModal";
import ProductSkeletonLoader from "../components/ProductSkeletonLoader";
import RecommendationSection from "../components/RecommendationSection";

// images
import searchImg from "../assets/images/search.svg";
import reloadImg from "../assets/images/reload.svg";
import userImg from "../assets/images/edit-user.svg";
import reviewsImg from "../assets/images/reviews.svg";
import requestsImg from "../assets/images/requests.svg";
import productAddImg from "../assets/images/product-add.svg";
import findProductImg from "../assets/images/find-product.svg";
const Products = () => {
  const dispatch = useDispatch();
  const isOnline = navigator.onLine;
  const { productType } = useParams();
  const searchInputRef = useRef(null);
  const [loader, setLoader] = useState(false);
  const [loader2, setLoader2] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [productData, setProductData] = useState([]);
  const { authData } = useSelector((store) => store.authData);
  const { productsData } = useSelector((store) => store.productsData);
  const [products, setProducts] = useState([]);

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

  // set products data
  useEffect(() => {
    if (!productType) {
      setProducts(productsData);
    } else {
      const filteredProductsByType = productsData.filter((product) => {
        return product.productType === productType;
      });

      setProducts(filteredProductsByType);
    }
  }, [productsData, productType]);

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

          {/* nav product types*/}
          <nav className="overflow-x-auto hidden-scroll p-1 mb-4 bg-brand-dark-800/5 rounded-2xl md:mb-7 xs:p-1.5">
            <ul className="flex justify-between gap-2 w-full sm:gap-5">
              {productTypesData.map((type, index) => {
                return (
                  <li key={type.id}>
                    <NavLink
                      to={index === 0 ? "/products" : `/products/${type.path}`}
                      className="inline-block min-w-max p-2.5 rounded-xl text-sm transition-colors duration-300 hover:bg-brand-dark-800 hover:text-brand-creamy-400 xs:text-base sm:px-3 sm:py-2.5"
                      end
                    >
                      {type.name}
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
                products.map((product) => {
                  return (
                    <Product
                      key={product.productId}
                      product={product}
                      action={() => {
                        setProductData(product);
                        setOpenModal(true);
                      }}
                    />
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

          {!loader && products.length === 0 && <NoData />}
        </div>
      </div>

      {/* recommendation section */}
      <RecommendationSection
        items={[
          {
            title: "Izohlarni boshqarish",
            path: "reviews",
            image: {
              src: reviewsImg,
              alt: "reviews image",
            },
          },
          {
            title: "Murojaatlar",
            path: "appeals",
            image: {
              src: requestsImg,
              alt: "appeals image",
            },
          },
          {
            title: "Foydalanuvchilar",
            path: "users",
            image: {
              src: userImg,
              alt: "users image",
            },
          },
        ]}
      />

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
            productData.imageMetadatas &&
            imageBaseUrl + productData.imageMetadatas[0].mediumImageFilePath
          }
        />
      )}
    </>
  );
};

export default Products;
