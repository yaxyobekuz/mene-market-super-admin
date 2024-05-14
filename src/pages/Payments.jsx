import React from "react";

// antd
import { Skeleton } from "antd";

// images
import userImg from "../assets/images/user.jpg";
import moneyImg from "../assets/images/money.svg";
import statusImg from "../assets/images/status.svg";
import paymentCardImg from "../assets/images/payment-card.svg";
const Payments = () => {
  const items = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  return (
    <div className="pb-12">
      <div className="container">
        <h1 className="mb-7">To'lovlar</h1>

        {/* loader */}
        {
          //   <ul className="grid grid-cols-1 gap-x-5 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          //     {items.map((payment) => {
          //       return (
          //         <li key={payment} className="space-y-5">
          //           {/* content hero */}
          //           <Skeleton.Input active className="!h-[216px] !rounded-xl" />
          //           {/*  */}
          //           <Skeleton.Input active className="!h-6" />
          //           {/* content footer (payment button) */}
          //           <Skeleton.Input active className="!h-12 !rounded-xl" />
          //         </li>
          //       );
          //     })}
          //   </ul>
        }

        {/* list */}
        <ul className="grid grid-cols-1 gap-x-5 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((payment) => {
            return (
              <li key={payment} className="space-y-5">
                {/* content hero */}
                <div className="relative w-full bg-brand-dark-800/5 p-4 py-6 rounded-xl">
                  {/* profile */}
                  <div className="flex gap-4 mb-8">
                    {/* user profile image */}
                    <img
                      width={48}
                      height={48}
                      src={userImg}
                      alt="user image"
                      className="size-12 rounded-full border-2 border-brand-dark-800 object-cover"
                    />

                    {/* user name wrapper */}
                    <div>
                      <h3 className="line-clamp-1">
                        Lorem ipsum dolor sit. lorem
                      </h3>
                      <button>
                        <span className="text-start text-sm line-clamp-1">
                          Lore3m-ips34um-d435olor-sit3376378
                        </span>
                      </button>
                    </div>
                  </div>

                  {/* status */}
                  <p className="flex items-center gap-4 mb-2">
                    <img
                      width={24}
                      height={24}
                      src={statusImg}
                      alt="payment card image"
                      className="size-6"
                    />

                    <span className="line-clamp-1">To'lanmagan</span>
                  </p>

                  {/* payment card */}
                  <button className="flex items-center gap-4 mb-2">
                    <img
                      width={24}
                      height={24}
                      src={paymentCardImg}
                      alt="payment card image"
                      className="size-6"
                    />

                    <span className="line-clamp-1">8600 0000 0000 0000</span>
                  </button>

                  {/* payment */}
                  <button className="flex items-center gap-4">
                    <img
                      width={24}
                      height={24}
                      src={moneyImg}
                      alt="payment card image"
                      className="size-6"
                    />

                    <span className="line-clamp-1">1.250.000 so'm</span>
                  </button>
                </div>

                {/*  */}
                <p>Jami sotilgan mahsulotlar: 8ta</p>

                {/* content footer (payment button) */}
                <button className="main-btn w-full">
                  Holatni o'zgartirish
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Payments;
