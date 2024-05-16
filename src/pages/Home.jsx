import React from "react";

// components
import Hero from "../components/Hero";
import SimpleLineChart from "./SimpleLineChart";

// images
import sellImg from "../assets/images/sell.svg";
import noSellImg from "../assets/images/no-sell.svg";
import appealsImg from "../assets/images/appeals.svg";

const Home = () => {
  const data = [
    {
      id: "So'rovlar",
      data: [
        { x: "dushanba", y: 2 },
        { x: "seshanba", y: 45 },
        { x: "chorshanba", y: 3 },
        { x: "Payshanba", y: 34 },
        { x: "Juma", y: 143 },
        { x: "Shanba", y: 343 },
        { x: "Yakshanba", y: 120 },
      ],
    },
    {
      id: "Sotilgan",
      data: [
        { x: "dushanba", y: 3 },
        { x: "seshanba", y: 15 },
        { x: "chorshanba", y: 90 },
        { x: "Payshanba", y: 4 },
        { x: "Juma", y: 20 },
        { x: "Shanba", y: 100 },
        { x: "Yakshanba", y: 20 },
      ],
    },
    {
      id: "Sotilmagan",
      data: [
        { x: "dushanba", y: 20 },
        { x: "seshanba", y: 30 },
        { x: "chorshanba", y: 53 },
        { x: "Payshanba", y: 30 },
        { x: "Juma", y: 123 },
        { x: "Shanba", y: 103 },
        { x: "Yakshanba", y: 100 },
      ],
    },
  ];

  return (
    <>
      {/* hero */}
      <Hero />

      {/* today's stats */}
      <div className="py-6">
        <div className="container">
          <div className="flex flex-col items-start bg-brand-dark-800/5 p-4 rounded-2xl xs:p-6">
            <h2 className="mb-5">Bugungi statistika</h2>

            {/* section main content */}
            <div className="grid grid-cols-1 gap-5 gap-y-8 w-full bg-brand-dark-800/5 py-24 rounded-2xl sm:grid-cols-2 lg:grid-cols-3">
              {/* 1 */}
              <div className="flex flex-col items-center gap-3.5">
                <img
                  width={128}
                  height={128}
                  src={noSellImg}
                  alt="sell image"
                  className="size-24 xs:size-28 sm:size-32"
                />

                <span className="bg-brand-dark-800/5 px-4 py-2 rounded-full text-center text-sm xs:text-base">
                  1.265ta mahsulot sotib olinmadi
                </span>
              </div>

              {/* 2 */}
              <div className="flex flex-col items-center gap-3.5">
                <img
                  width={128}
                  height={128}
                  src={sellImg}
                  alt="sell image"
                  className="size-24 xs:size-28 sm:size-32"
                />

                <span className="bg-brand-dark-800/5 px-4 py-2 rounded-full text-center text-sm xs:text-base">
                  265ta mahsulot sotib olindi
                </span>
              </div>

              {/* 3 */}
              <div className="flex flex-col items-center gap-3.5 sm:col-span-2 lg:col-span-1">
                <img
                  width={128}
                  height={128}
                  src={appealsImg}
                  alt="sell image"
                  className="size-24 xs:size-28 sm:size-32"
                />

                <span className="bg-brand-dark-800/5 px-4 py-2 rounded-full text-center text-sm xs:text-base">
                  1.293ta mahsulot so'rovi
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* products chart */}
      <div className="py-12">
        <div className="container !px-0 md:!px-5">
          <div className="h-72 bg-brand-dark-800/5 sm:h-96 md:h-[480px] md:rounded-2xl">
            <SimpleLineChart data={data} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
