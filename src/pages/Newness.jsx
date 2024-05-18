import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";

// antd
import "../css/antd.css";
import { Skeleton } from "antd";

// images
import timeImg from "../assets/images/time.svg";
import dateImg from "../assets/images/date.svg";
import newsAddImg from "../assets/images/news-add.svg";
import reviewsImg from "../assets/images/reviews.svg";
import productsImg from "../assets/images/products.svg";
import topRightArrowImg from "../assets/images/top-right-arrow.svg";
const Newness = () => {
  const { newnessId } = useParams();
  useEffect(() => {
    document.title = "Mene Market - " + newnessId;
  }, []);
  return (
    <div className="pb-12">
      <div className="container">
        <div className="flex items-start flex-col gap-7 lg:flex-row">
          {/* newness */}

          <div className="space-y-4">
            {/* loader */}
            {
              // <div className="flex flex-col gap-4">
              //   <div className="flex items-center justify-between !min-w-0">
              //     <Skeleton.Input
              //       active
              //       className="!w-44 !h-6 xs:!w-52 xs:!h-7"
              //     />
              //     <Skeleton.Input
              //       active
              //       className="!w-20 !h-10 !rounded-xl sm:!w-[103px] sm:!h-12 "
              //     />
              //   </div>
              //   {/* image */}
              //   <Skeleton.Image
              //     active
              //     className="!min-w-0 !w-full !h-auto !aspect-video !rounded-xl sm:!rounded-2xl"
              //   />
              //   {/* title */}
              //   <div className="flex flex-col gap-1.5">
              //     <Skeleton.Input
              //       active
              //       className="!w-2/3 !h-6 sm:!h-7 lg:!h-8"
              //     />
              //     <Skeleton.Input
              //       active
              //       className="!w-full !h-6 sm:!h-7 lg:!h-8"
              //     />
              //     <Skeleton.Input
              //       active
              //       className="!w-full !h-6 sm:!h-7 lg:!h-8"
              //     />
              //   </div>
              //   {/* description */}
              //   <div className="flex flex-col gap-1.5">
              //     <Skeleton.Input active className="!w-full !h-5 sm:!h-6" />
              //     <Skeleton.Input active className="!w-full !h-5 sm:!h-6" />
              //     <Skeleton.Input active className="!w-full !h-5 sm:!h-6" />
              //     <Skeleton.Input active className="!w-2/3 !h-6" />
              //   </div>
              //   <Skeleton.Input active className="!w-full !h-5 sm:!h-6" />
              // </div>
            }

            {/* header */}
            <div className="flex items-center justify-between gap-5">
              {/* date, time */}
              <div className="flex gap-5">
                {/* date */}
                <div className="flex items-center gap-1.5 xs:gap-2">
                  <img
                    width={20}
                    height={20}
                    src={dateImg}
                    alt="date icon"
                    className="size-4 xs:size-5 sm:size-6"
                  />

                  <span className="text-sm xs:text-base sm:text-lg">
                    08.12.2024
                  </span>
                </div>

                {/* time */}
                <div className="flex items-center gap-1.5 xs:gap-2">
                  <img
                    width={20}
                    height={20}
                    src={timeImg}
                    alt="time icon"
                    className="size-4 xs:size-5 sm:size-6"
                  />

                  <span className="text-sm xs:text-base sm:text-lg">11:59</span>
                </div>
              </div>

              {/* delete button */}
              <button className="main-btn  py-2.5 px-3.5 text-sm sm:py-3 sm:px-5 sm:text-base">
                O'chirish
              </button>
            </div>

            {/* main content */}
            <div className="space-y-4 sm:space-y-5">
              <img
                width={384}
                height={216}
                src="https://images.unsplash.com/photo-1495020689067-958852a7765e?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bmV3c3xlbnwwfHwwfHx8MA%3D%3D"
                alt="news image"
                className="w-full h-auto aspect-video object-cover rounded-xl sm:rounded-2xl"
              />

              <h1 className="text-lg xs:text-xl sm:text-2xl lg:text-3xl">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa,
                recusandae repudiandae. Veritatis ipsa voluptates minus,
                consectetur animi quos debitis itaque.
              </h1>

              <p className="text-base sm:text-lg">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et
                perferendis explicabo veritatis fugiat maxime sed. Fugit modi
                debitis, consequuntur fugiat laboriosam perferendis quibusdam
                molestias tempora, unde veniam quaerat cum, impedit aspernatur
                rem odit dolorem corporis minus. Illum culpa, magni quam saepe
                rem sint, quos odio, maxime enim reiciendis ad itaque?
              </p>

              <p className="text-base sm:text-lg">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et
                perferendis explicabo veritatis fugiat maxime sed. Fugit modi
                debitis, consequuntur fugiat laboriosam perferendis quibusdam
                molestias tempora, unde veniam quaerat cum, impedit aspernatur
                rem odit dolorem corporis minus. Illum culpa, magni quam saepe
                rem sint, quos odio, maxime enim reiciendis ad itaque?
              </p>
            </div>
          </div>

          {/* recomendation section */}
          <section className="w-full lg:min-w-80">
            <h2 className="mb-7">Ushbu sahifaga oid</h2>

            <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-1">
              <li>
                <Link
                  to="/news/add"
                  className="flex flex-col items-center justify-center gap-3 relative h-full border-2 border-brand-dark-800 rounded-2xl py-10 px-6 group"
                >
                  <img
                    width={192}
                    height={192}
                    src={newsAddImg}
                    alt="go to find product by id page"
                    className="size-28 md:size-32"
                  />
                  {/* arrow */}
                  <img
                    width={36}
                    height={36}
                    src={topRightArrowImg}
                    className="absolute top-10 right-10 size-7 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:top-5 group-hover:right-5"
                    alt="top right arrow"
                  />
                  <h3 className="text-center text-lg xs:text-xl">
                    Yangilik qo'shish
                  </h3>
                </Link>
              </li>

              <li>
                <Link
                  to="/reviews"
                  className="flex flex-col items-center justify-center gap-3 relative h-full border-2 border-brand-dark-800 rounded-2xl py-10 px-6 group"
                >
                  <img
                    width={192}
                    height={192}
                    src={reviewsImg}
                    alt="go to reviews page"
                    className="size-28 md:size-32"
                  />
                  {/* arrow */}
                  <img
                    width={36}
                    height={36}
                    src={topRightArrowImg}
                    className="absolute top-10 right-10 size-7 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:top-5 group-hover:right-5"
                    alt="top right arrow"
                  />
                  <h3 className="text-center text-lg xs:text-xl">
                    Izohlarni boshqarish
                  </h3>
                </Link>
              </li>

              <li className="col-span-1 sm:col-span-2 lg:col-span-1">
                <Link
                  to="/products"
                  className="flex flex-col items-center justify-center gap-3 relative h-full border-2 border-brand-dark-800 rounded-2xl py-10 px-6 group"
                >
                  <img
                    width={192}
                    height={192}
                    src={productsImg}
                    alt="go to products page image"
                    className="size-28 md:size-32"
                  />
                  {/* arrow */}
                  <img
                    width={36}
                    height={36}
                    src={topRightArrowImg}
                    className="absolute top-10 right-10 size-7 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:top-5 group-hover:right-5"
                    alt="top right arrow"
                  />
                  <h3 className="text-center text-lg xs:text-xl">
                    Mahsulotlarni boshqarish
                  </h3>
                </Link>
              </li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Newness;
