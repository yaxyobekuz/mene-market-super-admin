import React from "react";
import { Link } from "react-router-dom";
import { Skeleton } from "antd";

import "../css/waves.css";

// images
import userImg from "../assets/images/user.jpg";
import visitImg from "../assets/images/visit.svg";
import deleteImg from "../assets/images/delete.svg";
import reloadImg from "../assets/images/reload.svg";
import arrowRightImg from "../assets/images/arrow-right.svg";

const DonationBox = () => {
  const items = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  return (
    <div className="pb-12">
      <div className="container space-y-7">
        <h1>Hayriya qutisi</h1>

        {/* donation */}
        {/* waves wapper */}
        <div className="flex items-center justify-between flex-col gap-5 sm:flex-row">
          {/* waves */}
          <div className="waves flex items-center justify-center size-52 rounded-full border-2 border-brand-dark-800">
            <div className="flex flex-col items-center gap-1.5 text-white">
              <span className="text-xl font-bold">Jami</span>
              <b className="text-2xl">137.010.000</b>
              <span className="text-xl font-bold">so'm</span>
            </div>

            {/* wave */}
            <div className="wave"></div>
            <div className="wave"></div>
            <div className="wave"></div>
          </div>

          {/* restart */}
          <div className="w-full space-y-4 xs:w-auto">
            <button className="flex items-center justify-center gap-2 w-full bg-brand-dark-800/5 rounded-xl px-5 py-4 xs:w-auto">
              <img
                width={24}
                height={24}
                src={reloadImg}
                alt="reload news data icon"
                className="size-6"
              />
              <span>Statistikani asliga qaytarish</span>
            </button>

            <div className="flex items-center justify-center gap-2 bg-brand-dark-800/5 rounded-xl px-5 py-4 xs:justify-normal">
              <img
                width={24}
                height={24}
                src={visitImg}
                alt="visit icon"
                className="size-6"
              />
              <span>Jami 1.234.545 ta tashrif</span>
            </div>
          </div>
        </div>

        {/* donators 🗿 */}
        <ul className="space-y-4">
          {items.map((appeal) => {
            return (
              <li
                key={appeal}
                className="flex items-center justify-between gap-5 bg-brand-dark-800/5 pr-4 rounded-xl group xs:rounded-2xl xs:pr-5 md:pr-7"
              >
                {/* profile */}
                <div className="flex items-center gap-2.5 grow pl-4 py-4 rounded-xl xs:gap-3.5 xs:pl-5">
                  <img
                    width={64}
                    height={64}
                    src={userImg}
                    alt="user image"
                    className="size-12 shrink-0 object-cover bg-brand-dark-800/10 rounded-full border-2 border-brand-dark-800 xs:size-14 sm:size-16"
                  />

                  <div className="space-y-0.5 xs:space-y-1">
                    <h3 className="text-balance line-clamp-1 sm:text-lg">
                      Teshaboy ketmonov
                    </h3>
                    <p className="line-clamp-1 text-sm sm:text-base">
                      5000 so'm
                    </p>
                  </div>
                </div>

                {/* delete btn wrapper */}
                <div className="space-y-2 shrink-0 text-end">
                  <b className="text-sm xs:text-base">Oqim - #186333</b>
                  <p className="text-sm sm:text-base">8633 ta tashrif</p>
                </div>
              </li>
            );
          })}
        </ul>

        {
          // loader
          // <ul className="space-y-4">
          //   {items.map((appeal) => {
          //     return (
          //       <Skeleton.Input
          //         active
          //         className="!w-full !h-20 !rounded-xl xs:!h-[88px] sm:!h-24 xs:!rounded-2xl"
          //       />
          //     );
          //   })}
          // </ul>
        }
      </div>
    </div>
  );
};

export default DonationBox;
