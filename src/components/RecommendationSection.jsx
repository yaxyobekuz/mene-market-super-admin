import React from "react";
import { Link } from "react-router-dom";

// images
import topRightArrowImg from "../assets/images/top-right-arrow.svg";
const RecommendationSection = ({ items }) => {
  return (
    <section className="py-12">
      <div className="container">
        <h2 className="mb-7">Ushbu sahifaga oid</h2>

        {/* list */}
        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, index) => {
            return (
              <li className="col-span-1 first:sm:col-span-2 first:lg:col-span-1" key={index}>
                <Link
                  to={"/" + item.path}
                  className="flex flex-col items-center justify-center gap-3 relative h-full border-2 border-brand-dark-800 rounded-2xl py-10 px-6 group"
                >
                  <img
                    width={144}
                    height={144}
                    src={item.image.src}
                    alt={item.image.alt}
                    className="size-28 sm:size-32 md:size-36"
                  />

                  {/* title */}
                  <h3 className="text-center text-lg xs:text-xl">
                    {item.title}
                  </h3>

                  {/* arrow */}
                  <img
                    width={32}
                    height={32}
                    src={topRightArrowImg}
                    className="absolute top-10 right-10 size-7 opacity-0 transition-all group-hover:opacity-100 group-hover:top-6 group-hover:right-6 xs:size-8"
                    alt="top right arrow"
                  />
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default RecommendationSection;
