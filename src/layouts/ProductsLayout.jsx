import React from "react";
import { Link, Outlet } from "react-router-dom";
import { NavLink } from "react-router-dom";

// tab buttons data
import { tabButtons } from "../data/data";

// images
import searchImg from "../assets/images/search.svg";
import findProductImg from "../assets/images/find-product.svg";
import productAddImg from "../assets/images/product-add.svg";
const ProductsLayout = () => {
  return (
    <>
      <div className="mb-10 xs:mb-12">
        <div className="container">
          <h1 className="text-4xl font-bold mb-7">Mahsulotlar</h1>

          {/* product add link */}
          <div className="grid grid-cols-1 gap-5 mb-7 xs:grid-cols-2 xs:gap-6">
            <Link
              to="/product/add"
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
              to="/product/find-by-id"
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

          {/* nav */}
          <nav className="overflow-x-auto hidden-scroll p-1 mb-7 bg-brand-dark-800/5 rounded-2xl xs:p-1.5">
            <ul className="flex justify-between gap-2 w-full sm:gap-5">
              {tabButtons.map((button) => {
                return (
                  <li key={button.id}>
                    <NavLink
                      to={"/product/products" + button.name}
                      className="inline-block min-w-max p-2.5 rounded-xl text-sm transition-colors duration-300 hover:bg-brand-dark-800 hover:text-brand-creamy-400 xs:text-base sm:px-3 sm:py-2.5"
                      end
                    >
                      {button.body}
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* search */}
          <div className="w-full">
            {/* search input wrapper */}
            <form className="flex items-center relative">
              <input
                placeholder="Mahsulotlarni qidirish"
                name="search"
                type="text"
                className="w-full bg-brand-dark-800/5 rounded-2xl py-2.5 pl-9 pr-24 xs:py-3.5 xs:pl-12 xs:pr-28"
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

      {/* pages */}
      <Outlet />
    </>
  );
};

export default ProductsLayout;
