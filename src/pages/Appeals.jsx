import React from "react";
import { Link } from "react-router-dom";
import { Skeleton } from "antd";

// images
import userImg from "../assets/images/user.jpg";
import deleteImg from "../assets/images/delete.svg";
import arrowRightImg from "../assets/images/arrow-right.svg";
const Appeals = () => {
  const items = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  return (
    <div className="pb-12">
      <div className="container">
        <h1 className="mb-7">Murojaatlar</h1>

        <ul className="space-y-4">
          {items.map((appeal) => {
            return (
              <li
                key={appeal}
                className="flex items-center justify-between gap-5 bg-brand-dark-800/5 pr-4 rounded-xl group xs:rounded-2xl xs:pr-5 md:pr-7"
              >
                {/* profile */}
                <Link
                  to="/appeals/chat/1"
                  className="flex items-center gap-2.5 grow pl-4 py-4 rounded-xl xs:gap-3.5 xs:pl-5"
                >
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
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                      Rerum iure maiores deserunt. Doloribus quae sequi aliquam
                      tempora quod dolorem suscipit.
                    </p>
                  </div>
                </Link>

                {/* delete btn wrapper */}
                <div className="flex items-center gap-5 shrink-0">
                  <button className="main-btn p-2.5">
                    <img
                      width={20}
                      height={20}
                      src={deleteImg}
                      alt="arrow right icon"
                      className="min-w-5 min-h-5"
                    />
                  </button>

                  <img
                    width={20}
                    height={20}
                    src={arrowRightImg}
                    alt="arrow right icon"
                    className="hidden size-5 transition-transform group-hover:translate-x-1 xs:inline-block"
                  />
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

export default Appeals;
