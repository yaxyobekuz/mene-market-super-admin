import React, { useEffect } from "react";

// components
import Loader from "./Loader";
const ConfirmModal = ({
  description,
  title,
  action,
  subtitle,
  imageSrc,
  closeModal,
  loader,
  button,
}) => {
  // close modal with escape key
  useEffect(() => {
    if (!loader) {
      const handleKeyDown = (e) => {
        e.key === "Escape" && closeModal();
      };

      document.addEventListener("keydown", handleKeyDown);

      return () => {
        document.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [closeModal]);

  return (
    <div className="flex items-center justify-center fixed inset-0 z-10 px-3.5">
      {/* modal content */}
      <div className="z-10 w-[425px] bg-brand-creamy-400 rounded-2xl shadow-xl">
        {/* content header */}
        <div className="w-full h-5 bg-brand-creamy-600 rounded-t-2xl xs:h-6 md:h-7"></div>

        {/* content body */}
        <div className="p-3.5 xs:py-4 xs:px-5">
          {/* title */}
          <h1 className="!text-lg !leading-6 mb-3">
            {title ? title : "Haqiqatdan ham ushbu amalni bajarmoqchimisiz?"}
          </h1>

          {/* mid content (desciption wrapper) */}
          <div className="flex items-center gap-2 mb-6">
            {imageSrc && (
              <img
                width={40}
                height={40}
                src={imageSrc}
                className="size-10 shrink-0 bg-brand-dark-800/20 rounded-md object-cover"
              />
            )}

            {/* title & desctiption */}
            <div>
              {subtitle && (
                <h2 className="!text-base !leading-none line-clamp-1">
                  {subtitle}
                </h2>
              )}

              {description && <p className="line-clamp-1">{description}</p>}
            </div>
          </div>

          {/* buttons */}
          <div className="flex justify-end gap-4 w-full">
            {/* cancel btn */}
            <button
              disabled={loader}
              onClick={() => !loader && closeModal()}
              className="flex items-center justify-center w-full xs:w-36 h-11 border-2 border-brand-dark-800 rounded-lg"
            >
              {button ? button.cancel : "Yo'q"}
            </button>

            {/* confirm btn */}
            <button
              onClick={() => !loader && action()}
              disabled={loader}
              className={`${
                loader && "cursor-not-allowed"
              } flex items-center justify-center w-full xs:w-36 h-11 bg-brand-dark-800 rounded-lg text-brand-creamy-400`}
            >
              {loader ? <Loader size={20} /> : button ? button.confirm : "Ha"}
            </button>
          </div>
        </div>
      </div>

      {/* overlay */}
      <div
        onClick={() => !loader && closeModal()}
        className="absolute z-0 w-full h-full backdrop-filter backdrop-blur bg-brand-dark-800/50"
      ></div>
    </div>
  );
};

export default ConfirmModal;
