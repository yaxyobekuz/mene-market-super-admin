import React from "react";

// antd
import "../css/antd.css";
import { Skeleton } from "antd";

const ProductSkeletonLoader = () => {
  return (
    <li className="flex flex-col gap-2.5">
      {/* image */}
      <Skeleton.Image active className="!w-full !aspect-square !rounded-xl" />
      {/* content header */}
      <div className="flex items-center justify-between">
        <Skeleton.Input active className="!w-16 !h-6 !min-w-0" />
        <Skeleton.Input active className="!w-16 !h-6 !min-w-0" />
      </div>

      {/* main content */}
      <div className="flex flex-col grow gap-2">
        {/* title */}
        <div className="flex flex-col gap-1">
          <Skeleton.Input active className="!w-full !h-[26px]" />
          <Skeleton.Input active className="!w-1/2 !h-[26px]" />
        </div>

        {/* mid 1 */}
        <div className="flex items-end gap-1">
          <Skeleton.Input active className="shrink-0 !w-12 !h-5 !min-w-0" />
          <Skeleton.Input active className="!w-full !h-2 !min-w-0" />
          <Skeleton.Input active className="shrink-0 !w-20 !h-5 !min-w-0" />
        </div>

        {/* 2 */}
        <div className="flex items-end gap-1">
          <Skeleton.Input active className="shrink-0 !w-16 !h-5 !min-w-0" />
          <Skeleton.Input active className="!w-full !h-2 !min-w-0" />
          <Skeleton.Input active className="shrink-0 !w-16 !h-5 !min-w-0" />
        </div>

        {/* 3 */}
        <div className="flex items-end gap-1">
          <Skeleton.Input active className="shrink-0 !w-28 !h-5 !min-w-0" />
          <Skeleton.Input active className="!w-full !h-2 !min-w-0" />
          <Skeleton.Input active className="shrink-0 !w-10 !h-5 !min-w-0" />
        </div>

        {/* 4 */}
        <div className="flex items-end gap-1">
          <Skeleton.Input active className="shrink-0 !w-16 !h-5 !min-w-0" />
          <Skeleton.Input active className="!w-full !h-2 !min-w-0" />
          <Skeleton.Input active className="shrink-0 !w-14 !h-5 !min-w-0" />
        </div>

        {/* 5 */}
        <div className="flex items-end gap-1">
          <Skeleton.Input active className="shrink-0 !w-20 !h-5 !min-w-0" />
          <Skeleton.Input active className="!w-full !h-2 !min-w-0" />
          <Skeleton.Input active className="shrink-0 !w-24 !h-5 !min-w-0" />
        </div>

        {/* price */}
        <Skeleton.Input active className="!w-2/3 !h-6" />

        {/* buttons */}
        <div className="flex gap-3">
          <Skeleton.Input active className="!w-full !h-12 !min-w-0" />
          <Skeleton.Input active className="shrink-0 !w-12 !h-12 !min-w-0" />
        </div>
      </div>
    </li>
  );
};

export default ProductSkeletonLoader;
