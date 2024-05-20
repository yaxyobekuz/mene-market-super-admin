import React from "react";
import { Link } from "react-router-dom";

// data
import { imageBaseUrl, productTypesData } from "../data/data";

// helpers
import { formatNumber } from "../helpers/helpers";

// images
import copyIcon from "../assets/images/copy.svg";
import doneIcon from "../assets/images/done.svg";
import deleteIcon from "../assets/images/delete.svg";
const Product = ({ product, action }) => {
  const calculateTotalCount = (arr) => {
    let totalCount = 0;
    for (let index = 0; index < arr.length; index++) {
      totalCount += arr[index].count;
    }
    return totalCount;
  };

  const formatProductType = (type) => {
    const formattedType = productTypesData.find((item) => item.path === type);
    return formattedType ? formattedType.name : "Noma'lum";
  };
  return (
    <li className="flex flex-col gap-2.5">
      {/* image wrapper */}
      <div className="relative">
        <img
          width={295}
          height={295}
          src={
            product.imageMetadatas &&
            imageBaseUrl + product.imageMetadatas[0].mediumImageFilePath
          }
          alt="product image"
          className="w-full aspect-square bg-brand-dark-800/10 rounded-2xl object-cover object-center"
        />

        {/* badges */}
        <div className="flex items-center gap-2 w-full flex-wrap absolute top-4 inset-x-0 px-4">
          {product.isArchived ? (
            <span className="bg-red-600 py-0.5 px-1.5 rounded-md text-xs font-normal text-white">
              Arxivlangan
            </span>
          ) : (
            <span className="bg-green-600 py-0.5 px-1.5 rounded-md text-xs font-normal text-white">
              Sotuvda
            </span>
          )}
        </div>
      </div>

      {/* copy id btn wrapper */}
      <div className="flex items-center justify-between">
        <p>{formatProductType(product.productType)}</p>

        {/* copy id button */}
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
          {/* done icon */}
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
        <h3 className="text-lg font-semibold line-clamp-3">{product.name}</h3>

        {/* count */}
        <div className="flex items-end gap-1 text-sm">
          <p className="whitespace-nowrap">Sotuvda mavjud</p>
          <div className="grow min-w-4 border-b-2 border-brand-dark-800 border-dotted mb-1.5"></div>
          <p className="whitespace-nowrap truncate">
            {calculateTotalCount(product.productTypes)} ta
          </p>
        </div>

        {/* sold count */}
        <div className="flex items-end gap-1 text-sm">
          <p className="whitespace-nowrap">Sotilgan</p>
          <div className="grow min-w-4 border-b-2 border-brand-dark-800 border-dotted mb-1.5"></div>
          <p className="whitespace-nowrap truncate">
            {formatNumber(product.numberSold)} ta
          </p>
        </div>

        {/* ads price */}
        <div className="flex items-end gap-1 text-sm">
          <p className="whitespace-nowrap">Reklama narxi</p>
          <div className="grow min-w-4 border-b-2 border-brand-dark-800 border-dotted mb-1.5"></div>
          <p className="whitespace-nowrap truncate">
            {formatNumber(product.advertisingPrice)} so'm
          </p>
        </div>

        {/* price wrapper */}
        <div className="flex items-center flex-wrap gap-x-3 gap-y-0">
          <p>{formatNumber(product.price)} so'm</p>

          {/* product scid price */}
          {product.scidPrice && product.scidPrice !== 0 ? (
            <del className="text-brand-dark-800/70">
              {formatNumber(product.scidPrice)} so'm
            </del>
          ) : (
            ""
          )}
        </div>

        {/* buttons wrapper */}
        <div className="flex items-end grow">
          <div className="flex gap-3 w-full">
            <Link
              to={"/products/product/edit/" + product.productId}
              className="flex items-center justify-center gap-1 w-full border-2 border-brand-dark-800  rounded-xl py-2.5"
            >
              {/* <img src="" alt="" /> */}
              <span className="font-semibold text-center">Tahrirlash</span>
            </Link>

            {/* delete product btn */}
            <button
              onClick={action}
              className="flex items-center justify-center w-12 shrink-0 aspect-square bg-brand-dark-800 rounded-xl"
            >
              <img width={32} height={32} src={deleteIcon} alt="delete iconx" />
            </button>
          </div>
        </div>
      </div>
    </li>
  );
};

export default Product;
