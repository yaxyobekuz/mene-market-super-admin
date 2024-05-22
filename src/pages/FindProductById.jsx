import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

// components
import Search from "../components/Search";
import Product from "../components/Product";
import ConfirmModal from "../components/ConfirmModal";
import ProductSkeletonLoader from "../components/ProductSkeletonLoader";
import RecommendationSection from "../components/RecommendationSection";

// data
import { imageBaseUrl } from "../data/data";

// helpers
import { guidRegex } from "../helpers/regexes";
import { errorMessage, getElement } from "../helpers/helpers";

// toast
import { toast } from "react-toastify";

// axios
import axiosInstance from "../axios/axiosInstance";

// images
import reviewsImg from "../assets/images/reviews.svg";
import productsImg from "../assets/images/products.svg";
import productAddImg from "../assets/images/product-add.svg";

const FindProductById = () => {
  const navigate = useNavigate();
  const { productId } = useParams();
  const [loader, setLoader] = useState(false);
  const [loader2, setLoader2] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [productData, setProductData] = useState(null);

  // (get product)
  const getProductData = (id) => {
    // check id
    if (guidRegex.test(id)) {
      setLoader(true);

      axiosInstance
        .get("/Product/ById?id=" + id)
        .then((res) => {
          if (res.status === 200) {
            setProductData(res.data);
          } else {
            toast.error("Ushbu mahsulot ma'lumotlari mavjud emas!");
            productData && setProductData(null);
          }
        })
        .catch(() => {
          productData && setProductData(null);
          errorMessage.offline("Ma'lumotlarni yuklab bo'lmadi!");
        })
        .finally(() => setLoader(false));
    } else {
      toast.error("Muqobil id kiritilmadi!");
    }
  };

  useEffect(() => {
    if (productId) {
      getProductData(productId);
    }
  }, []);
  const onSubmit = (event) => {
    event.preventDefault();

    if (!loader) {
      // format id
      const value = getElement(event, ".js-search-input").value;
      const formattedId = value
        .trim()
        .split("")
        .filter((i) => i !== "/")
        .join("");

      navigate("/products/product/find-by-id/" + formattedId);

      // get product
      getProductData(formattedId);
    }
  };

  // delete product
  const deleteProduct = () => {
    if (!loader2) {
      setLoader2(true);

      axiosInstance
        .delete("/Product?id=" + productData.productId)
        .then(() => {
          setOpenModal(false);
          setProductData(null);
          toast.success("Mahsulot muvafaqiyatli o'chirildi!");
        })
        .catch(() => toast.error("Nimadir xato ketdi!"))
        .finally(() => setLoader2(false));
    }
  };

  return (
    <>
      {/* page main content */}
      <div className="container pb-12 space-y-7">
        <h1>Mahsulotni qidirsh</h1>

        {/* search */}
        <div className="w-full">
          {/* search input wrapper */}
          <Search action={onSubmit} defaultValue={productId} />
        </div>

        {/* product */}
        <div className="max-w-72">
          {!loader ? (
            productData && (
              <Product
                product={productData}
                action={() => {
                  setProductData(productData);
                  setOpenModal(true);
                }}
              />
            )
          ) : (
            <ProductSkeletonLoader />
          )}
        </div>
      </div>

      {/* recommendation section */}
      <RecommendationSection
        items={[
          {
            title: "Yangi mahsulot qo'shish",
            path: "products/product/add",
            image: {
              src: productAddImg,
              alt: "add new product image",
            },
          },
          {
            title: "Mahsulotlarni boshqarish",
            path: "products",
            image: {
              src: productsImg,
              alt: "products image",
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

export default FindProductById;
