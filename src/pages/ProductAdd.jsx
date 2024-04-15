import React from "react";
import { Link } from "react-router-dom";

// images
import image from "../assets/images/image.png";
import findProductImg from "../assets/images/find-product.svg";
import productsImg from "../assets/images/products.svg";
import reviewsImg from "../assets/images/reviews.svg";
import topRightArrowImg from "../assets/images/top-right-arrow.svg";
const ProductAdd = () => {
  return (
    <>
      {/* page body (main content) */}
      <div className="pb-12">
        <div className="container">
          <h1 className="mb-7">Yangi mahsulot qo'shish</h1>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* add image */}
            <label className="flex flex-col items-center justify-center gap-3 bg-brand-dark-800/5 border-2 border-brand-dark-800 border-dashed rounded-2xl p-5 transition-colors hover:bg-brand-dark-800/10 xs:p-6">
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
                  Rasm qo'shish uchun rasmni bu yerga olib keling yoki faylni
                  yuklang
                </p>
              </div>

              {/* btn */}
              <div
                role="button"
                className="main-btn w-full text-center px-14 cursor-pointer rounded-lg xs:w-auto xs:rounded-xl"
              >
                Rasm yuklash
              </div>

              {/* input  */}
              <input
                type="file"
                multiple
                name="image"
                accept="image/*"
                className="hidden"
              />
            </label>

            {/* add info (second child) */}
            <div className="space-y-3">
              {/* product name */}
              <label className="flex flex-col items-start gap-2">
                <span>Mahsulot nomi</span>
                <input
                  placeholder="Mahsulot nomi"
                  name="product name"
                  type="text"
                  className="w-full bg-brand-dark-800/5 rounded-xl py-2.5 px-3.5 border-brand-dark-800"
                />
              </label>

              {/* product type */}
              <div className="flex flex-col gap-3 xs:gap-4 sm:gap-5 xs:flex-row">
                <label className="flex flex-col items-start gap-2 w-full">
                  <span>Mahsulot turi</span>
                  <input
                    placeholder=""
                    name=""
                    type="text"
                    className="w-full bg-brand-dark-800/5 rounded-xl py-2.5 px-3.5 border-brand-dark-800"
                  />
                </label>

                <label className="flex flex-col items-start gap-2 w-full">
                  <span>Mahsulot egasi</span>
                  <input
                    defaultValue="Mene Market"
                    placeholder="Mahsulot egasi"
                    name="product owner"
                    type="text"
                    className="w-full bg-brand-dark-800/5 rounded-xl py-2.5 px-3.5 border-brand-dark-800"
                  />
                </label>
              </div>

              {/* product price */}
              <div className="flex flex-col gap-3 xs:gap-4 sm:gap-5 xs:flex-row">
                <label className="flex flex-col items-start gap-2 w-full">
                  <span>Mahsulot asl narxi</span>
                  <input
                    placeholder=""
                    name=""
                    type="text"
                    className="w-full bg-brand-dark-800/5 rounded-xl py-2.5 px-3.5 border-brand-dark-800"
                  />
                </label>

                <label className="flex flex-col items-start gap-2 w-full">
                  <span>Mahsulot aksiya narxi</span>
                  <input
                    placeholder=""
                    name=""
                    type="text"
                    className="w-full bg-brand-dark-800/5 rounded-xl py-2.5 px-3.5 border-brand-dark-800"
                  />
                </label>
              </div>

              {/* product owner */}
              <div className="flex flex-col gap-3 xs:gap-4 sm:gap-5 xs:flex-row">
                <label className="flex flex-col items-start gap-2 w-full">
                  <span className="">Mahsulot reklama narxi</span>
                  <input
                    placeholder=""
                    name=""
                    type="text"
                    className="w-full bg-brand-dark-800/5 rounded-xl py-2.5 px-3.5 border-brand-dark-800"
                  />
                </label>

                <label className="flex flex-col items-start gap-2 w-full">
                  <span className="">Mahsulot soni</span>
                  <input
                    placeholder=""
                    name=""
                    type="text"
                    className="w-full bg-brand-dark-800/5 rounded-xl py-2.5 px-3.5 border-brand-dark-800"
                  />
                </label>
              </div>

              <label className="flex flex-col items-start gap-2">
                <span className="">Mahsulot tavsifi</span>
                <textarea
                  placeholder="Mahsulot tavsifi"
                  name="description"
                  className="w-full min-h-32 bg-brand-dark-800/5 rounded-xl py-2.5 px-3.5 border-brand-dark-800 resize-none hidden-scroll"
                ></textarea>
              </label>

              <button className="main-btn w-full px-20 xs:w-auto">
                Qo'shish
              </button>
            </div>
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
