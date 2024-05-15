import React from "react";

// antd
import "../css/antd.css";
import { Skeleton } from "antd";
const ContestItemLoader = () => {
  return (
    <li className="flex flex-col gap-4">
      <Skeleton.Input
        active
        className="!hidden md:!h-[316px] lg:!h-[332px] !rounded-2xl md:!block"
      />

      <Skeleton.Image
        active
        className="!flex !w-full !h-auto aspect-video !rounded-2xl md:!hidden"
      />

      {/* body */}
      <div className="flex flex-col gap-5 md:hidden">
        {/* top */}
        <Skeleton.Input active className="!w-full !h-6 xs:!h-7 !rounded-lg" />

        {/* product */}
        <div className="flex items-start gap-5">
          {/* product imaege */}
          <Skeleton.Input
            active
            className="!size-20 !rounded-lg xs:!size-24 sm:!size-28 shrink-0"
          />

          {/* title and description */}
          <div className="flex flex-col gap-3 w-full">
            {/* title */}
            <div className="flex flex-col gap-2">
              <Skeleton.Input active className="!w-1/2 !h-5 !rounded-lg" />
              <Skeleton.Input active className="!w-full !h-5 !rounded-lg" />
              <Skeleton.Input active className="!w-full !h-5 !rounded-lg" />
            </div>

            {/* description */}
            <div className="flex flex-col gap-2">
              <Skeleton.Input active className="!w-full !h-4 !rounded-lg" />
              <Skeleton.Input active className="!w-full !h-4 !rounded-lg" />
              <Skeleton.Input active className="!w-full !h-4 !rounded-lg" />
            </div>
          </div>
        </div>

        {/* buttons */}
        <div className="flex gap-5">
          <Skeleton.Input
            active
            className="w-full xs:!w-[103px] !h-12 !rounded-lg"
          />
          <Skeleton.Input
            active
            className="!w-[103px] !h-12 !rounded-lg shrink-0"
          />
        </div>
      </div>
    </li>
  );
};

export default ContestItemLoader;
