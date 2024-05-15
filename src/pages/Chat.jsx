import React, { useEffect } from "react";
import { Link } from "react-router-dom";

// images
import userImg from "../assets/images/user.jpg";
import sendImg from "../assets/images/send.svg";
import arrowRigtImg from "../assets/images/arrow-right.svg";
import arrowRightSolidImg from "../assets/images/arrow-right-solid.svg";
const Chat = () => {
  const items = ["Assalomu alaykum", 1, 2, 3, 4, 5, 6, 7];

  return (
    <div className="container">
      <div className="flex flex-col gap-5 py-5 h-screen">
        {/* header */}
        <div className="flex items-center justify-between gap-6 bg-brand-dark-800/5 p-3 rounded-xl xs:p-3.5 xs:px-5">
          <Link to="/appeals" className="p-1 shrink-0">
            <img
              width={20}
              height={20}
              src={arrowRigtImg}
              alt="arrow left icon"
              className="size-5 rotate-180"
            />
          </Link>

          {/* user name */}
          <h1 className="text-base line-clamp-1 sm:text-lg">Ismat aka</h1>

          {/* user profile image */}
          <img
            width={44}
            height={44}
            src={userImg}
            alt="user image"
            className="size-9 shrink-0 object-cover bg-brand-dark-800/10 rounded-full border-2 border-brand-dark-800 sm:size-11"
          />
        </div>

        {/* messages */}
        <div className="flex justify-center overflow-auto hidden-scroll grow bg-brand-dark-800/5 p-3.5 rounded-xl xs:p-5">
          <div className="w-full space-y-5">
            {/* messages list (date) */}
            {items.map((item) => {
              return (
                <div
                  key={item}
                  className="flex flex-col items-center gap-5 last:pb-5"
                >
                  {/* date */}
                  <div className="flex items-center w-full">
                    {/* line */}
                    <div className="w-full h-0.5 bg-brand-dark-800/10 rounded-full"></div>

                    {/* date */}
                    <div className="shrink-0 bg-brand-dark-800/10 py-1 px-3.5 rounded-full text-sm sm:text-base">
                      23.08.2023
                    </div>

                    {/* line */}
                    <div className="w-full h-0.5 bg-brand-dark-800/10 rounded-full"></div>
                  </div>

                  {/* messages list */}
                  <div className="w-full space-y-4">
                    {items.map((item) => {
                      return (
                        <div
                          key={item}
                          className={`${
                            item % 2 === 0 ? "justify-end" : "justify-start"
                          } flex w-full`}
                        >
                          {/* message */}
                          <div
                            className={`${
                              item % 2 === 0
                                ? "bg-brand-dark-800/5 rounded-ee-none"
                                : "bg-white/50 rounded-es-none"
                            }  flex flex-col items-end max-w-[90%] p-3 rounded-2xl xs:max-w-[80%] xs:p-3.5`}
                          >
                            <span className="text-sm xs:text-base">
                              {item} 😁
                            </span>
                            <span className="text-sm">18:59</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* send message */}
        <form className="flex items-center relative bg-brand-dark-800/5 rounded-2xl">
          <input
            placeholder="Xabar yuborish"
            type="text"
            className="grow bg-transparent pl-6 pr-20 py-5 rounded-xl text-base focus:!outline-0 !border-0 placeholder:transition-opacity focus:placeholder:opacity-50 sm:text-lg sm:py-[22px]"
          />

          {/* submit button */}
          <button className="absolute right-3 main-btn p-3">
            <img
              width={24}
              height={24}
              src={sendImg}
              alt="send icon"
              className="size-6 "
            />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
