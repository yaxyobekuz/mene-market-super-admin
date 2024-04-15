import React from "react";

// images
import image from "../assets/images/image.png";

const ProductAdd = () => {
  return (
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
              <p className="">
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
              <span className="">Mahsulot nomi</span>
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
                <span className="">Mahsulot turi</span>
                <input
                  placeholder=""
                  name=""
                  type="text"
                  className="w-full bg-brand-dark-800/5 rounded-xl py-2.5 px-3.5 border-brand-dark-800"
                />
              </label>

              <label className="flex flex-col items-start gap-2 w-full">
                <span className="">Mahsulot egasi</span>
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
                <span className="">Mahsulot asl narxi</span>
                <input
                  placeholder=""
                  name=""
                  type="text"
                  className="w-full bg-brand-dark-800/5 rounded-xl py-2.5 px-3.5 border-brand-dark-800"
                />
              </label>

              <label className="flex flex-col items-start gap-2 w-full">
                <span className="">Mahsulot aksiya narxi</span>
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
  );
};

export default ProductAdd;
