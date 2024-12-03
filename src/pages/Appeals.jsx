import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// antd
import { Popover, Skeleton } from "antd";

// axios
import axiosInstance from "../axios/axiosInstance";

// helpers
import { errorMessage, formatDate, formatTime } from "../helpers/helpers";

// images
import eyeImg from "../assets/images/eye.svg";
import deleteImg from "../assets/images/delete.svg";
import dotsImg from "../assets/images/dots-vertical.svg";

const Appeals = () => {
  const [appeals, setAppeals] = useState([]);
  const [loader, setLoader] = useState(false);

  const getAppeals = () => {
    setLoader(true);

    axiosInstance
      .get("/Chat")
      .then((res) => {
        if (res.status === 200) {
          setAppeals(res.data.chats);
        } else errorMessage();
      })
      .catch(() => errorMessage.offline())
      .finally(() => setLoader(false));
  };

  useEffect(() => {
    getAppeals();
  }, []);

  return (
    <div className="pb-12">
      <div className="container">
        <h1 className="mb-7">Murojaatlar</h1>

        {/* appeals list */}
        {!loader ? (
          <ul className="space-y-4">
            {appeals.map((appeal) => {
              return (
                <li key={appeal.chatId} className="flex items-center relative">
                  <Link
                    to={"/appeals/chat/" + appeal.chatId}
                    className="w-full bg-brand-dark-800/5 space-y-1.5 pl-3 pr-24 py-4 rounded-xl transition-colors hover:bg-brand-dark-800/10 xs:pl-4 xs:pr-32 xs:py-4"
                  >
                    {/* name */}
                    <h3 className="line-clamp-1 sm:text-lg">{appeal.name}</h3>

                    {/* time */}
                    <span className="flex items-center gap-2">
                      <span className="text-sm">
                        {formatDate(appeal.createdDate)}
                      </span>
                      <span className="text-sm">-</span>
                      <span className="text-sm">
                        {formatTime(appeal.createdDate)}
                      </span>
                    </span>
                  </Link>

                  {/* item actions */}
                  <div className="flex items-center gap-3 absolute right-3 xs:right-5">
                    <button className="main-btn p-2.5">
                      <img
                        width={20}
                        height={20}
                        src={deleteImg}
                        alt="arrow right icon"
                        className="min-w-5 min-h-5"
                      />
                    </button>

                    {/* user link */}
                    <Popover
                      trigger="click"
                      content={
                        <Link
                          to={"/users/user/" + appeal.userId}
                          className="flex items-center gap-3 px-3 py-2 transition-colors hover:bg-brand-dark-800/5"
                        >
                          <img
                            width={28}
                            height={28}
                            src={eyeImg}
                            alt="dots icon"
                            className="size-7"
                          />

                          <span className="text-brand-dark-800">
                            Foydalanuvchini ko'rish
                          </span>
                        </Link>
                      }
                    >
                      <button className="p-1 rounded-full transition-colors hover:bg-brand-dark-800/10">
                        <img
                          width={28}
                          height={28}
                          src={dotsImg}
                          alt="dots icon"
                          className="size-7"
                        />
                      </button>
                    </Popover>
                  </div>
                </li>
              );
            })}
          </ul>
        ) : (
          <ul className="space-y-4">
            {Array.from({ length: 8 }).map(() => {
              return (
                <Skeleton.Input
                  active
                  className="!w-full !h-20 !rounded-xl xs:!h-[88px] sm:!h-24 xs:!rounded-2xl"
                />
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Appeals;
