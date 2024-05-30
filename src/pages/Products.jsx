import React, { useEffect, useState } from "react";
import { Link, NavLink, useParams } from "react-router-dom";

// axios
import axiosInstance from "../axios/axiosInstance";

// redux
import { useSelector, useDispatch } from "react-redux";
import {
  filterProductsData,
  setProductsData,
} from "../store/productsDataSlice";

// data
import { imageBaseUrl, productTypesData } from "../data/data";

// helpers
import { errorMessage, getElement, successMessage } from "../helpers/helpers";

// components
import Search from "../components/Search";
import NoData from "../components/NoData";
import Product from "../components/Product";
import ConfirmModal from "../components/ConfirmModal";
import ProductSkeletonLoader from "../components/ProductSkeletonLoader";
import RecommendationSection from "../components/RecommendationSection";

// images
import reloadImg from "../assets/images/reload.svg";
import userImg from "../assets/images/edit-user.svg";
import reviewsImg from "../assets/images/reviews.svg";
import requestsImg from "../assets/images/requests.svg";
import productAddImg from "../assets/images/product-add.svg";
import findProductImg from "../assets/images/find-product.svg";
import topRightArrowImg from "../assets/images/top-right-arrow.svg";

const Products = () => {
  const dispatch = useDispatch();
  const { productType } = useParams();
  const [query, setQuery] = useState("");
  const [loader, setLoader] = useState(true);
  const [products, setProducts] = useState([]);
  const [loader2, setLoader2] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [productData, setProductData] = useState([]);
  const [currentPageProducts, setCurrentPageProducts] = useState([]);
  const { productsData } = useSelector((store) => store.productsData);

  // get products data
  const getProductsData = () => {
    setLoader(true);

    // fetch products data
    axiosInstance
      .get("/Product?userRoleString=2")
      .then((res) => {
        dispatch(setProductsData(res.data.allProducts));
      })
      .catch(() => errorMessage.offline("Ma'lumotlarni yuklab bo'lmadi"))
      .finally(() => setLoader(false));
  };
  useEffect(() => {
    if (productsData.length === 0) {
      getProductsData();
    } else {
      setTimeout(() => {
        setLoader(false);
      }, 1500);
    }
  }, []);

  // filter products by query
  const filterProductsByQuery = (q, products) => {
    if (q && q.length > 0) {
      const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(q.toLowerCase())
      );
      return filteredProducts;
    } else {
      return products;
    }
  };

  // set products data with product type
  useEffect(() => {
    if (!productType) {
      setCurrentPageProducts(productsData);
      setProducts(filterProductsByQuery(query, productsData));
    } else {
      const filteredProductsByType = productsData.filter(
        (product) => product.productType === productType
      );

      setProducts(filterProductsByQuery(query, filteredProductsByType));
      setCurrentPageProducts(filteredProductsByType);
    }
  }, [productsData, productType]);

  // form submit
  const handleSubmit = (event) => {
    event.preventDefault();
    const input = getElement(event, ".js-search-input");
    const value = input.value.trim().toLowerCase();
    setQuery(value);
    setProducts(filterProductsByQuery(value, currentPageProducts));
  };

  // clear search input value
  const clearValue = () => {
    setProducts(currentPageProducts);
    setQuery("");
  };

  // delete product
  const deleteProduct = () => {
    if (!loader) {
      setLoader2(true);

      // delete product
      axiosInstance
        .delete("/Product?id=" + productData.productId)
        .then(() => {
          dispatch(filterProductsData(productData.productId));
          successMessage("Mahsulot muvafaqiyatli o'chirildi!");
          setOpenModal(false);
        })
        .catch(() => errorMessage.offline("Mahsulotni o'chirib bo'lmadi!"))
        .finally(() => setLoader2(false));
    }
  };

  return (
    <>
      {/* page main content */}
      <div className="container pb-12">
        {/* top */}
        <div className="mb-7 space-y-5 sm:space-y-7">
          <h1>Mahsulotlar</h1>

          {/* product add and product find by id link */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <Link
              to="/products/product/add"
              className="flex flex-col items-center gap-3 relative border-2 border-brand-dark-800 bg-brand-dark-800/5 rounded-2xl py-10 px-5 group"
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

              {/* top right arrow image */}
              <img
                width={32}
                height={32}
                src={topRightArrowImg}
                alt="top right arrow image"
                className="absolute top-10 right-10 size-7 opacity-0 transition-all group-hover:opacity-100 group-hover:top-6 group-hover:right-6 xs:size-8"
              />
            </Link>

            <Link
              to="/products/product/find-by-id"
              className="flex flex-col items-center gap-3 relative border-2 border-brand-dark-800 bg-brand-dark-800/5 rounded-2xl py-10 px-5 group"
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

              {/* top right arrow image */}
              <img
                width={32}
                height={32}
                src={topRightArrowImg}
                alt="top right arrow image"
                className="absolute top-10 right-10 size-7 opacity-0 transition-all group-hover:opacity-100 group-hover:top-6 group-hover:right-6 xs:size-8"
              />
            </Link>
          </div>

          {/* nav (product types) */}
          <nav className="main-nav">
            <ul className="main-nav-links-wrapper">
              <li>
                <NavLink end to="/products" className="main-nav-link">
                  Barchasi
                </NavLink>
              </li>

              {productTypesData.map((item, index) => {
                return (
                  <li key={index}>
                    <NavLink
                      className="main-nav-link"
                      to={`/products/${item.value}`}
                    >
                      {item.label}
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* search wrapper */}
          <div className="flex flex-col-reverse gap-6 sm:gap-7 md:flex-row">
            {/* reload btn */}
            <button
              onClick={() => !loader && getProductsData()}
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
              <Search
                action={clearValue}
                onSubmit={handleSubmit}
                placeholder="Mahsulotlarni qidirish"
              />
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

          {!loader && products.length === 0 && (
            <NoData
              title="Mahsulotlar topilmadi!"
              description="Ushbu sahifada hech qanday mahsulot topilmadi."
            />
          )}
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
