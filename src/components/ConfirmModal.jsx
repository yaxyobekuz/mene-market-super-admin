import React from "react";

// images
import crossIcon from "../assets/images/cross.svg";
import Loader from "./Loader";
const ConfirmModal = ({
  description,
  title,
  subtitle,
  image,
  button,
  setOpenModal,
  loader,
}) => {
  const closeModal = () => {
    if (!loader) {
      setOpenModal(false);
    }
  };
  console.log(loader);
  return (
    <div className="flex items-center justify-center fixed inset-0 backdrop-filter backdrop-blur bg-brand-dark-800/50">
      <div className="w-[425px] bg-brand-creamy-400 rounded-2xl shadow-xl">
        {/* modal header */}
        <div className="flex justify-end w-full py-3 px-5 bg-brand-creamy-600 rounded-t-2xl">
          <button onClick={closeModal} className="rounded-full">
            <img
              width={28}
              height={28}
              src={crossIcon}
              alt="cross icon"
              className="size-[26px]"
            />
          </button>
        </div>

        {/* modal body */}
        <div className="py-4 px-5">
          {/* title */}
          <h1 className="!text-lg !leading-6 mb-3">
            {title ? (
              <span>{title}</span>
            ) : (
              <span>Haqiqatdan ham ushbu amalni bajarmoqchimisiz?</span>
            )}
          </h1>

          {/* mid content (desciption wrapper) */}
          <div className="flex items-center gap-2 mb-6">
            {image && (
              <img
                width={40}
                height={40}
                src={
                  "https://menemarket-cdcc7e43d37f.herokuapp.com/" + image.src
                }
                alt={image.alt}
                className="size-10 shrink-0 bg-brand-dark-800/20 rounded-md"
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

          {/* modal actions (buttons) */}
          <div className="flex justify-end gap-4 w-full">
            {/* cancel btn */}
            <button
              disabled={loader}
              onClick={() => {
                button.cancel.action && button.cancel.action();
                closeModal();
              }}
              className={`${
                button && button.cancel.theme
                  ? button.cancel.theme.toLowerCase() === "dark"
                    ? "bg-brand-dark-800 text-brand-creamy-400"
                    : "text-brand-dark-800 font-bold"
                  : "text-brand-dark-800 font-bold"
              } border-2 border-brand-dark-800 rounded-lg px-8 py-2`}
            >
              {button.cancel.body && button ? button.cancel.body : "Yo'q"}
            </button>

            {/* confirm btn */}
            <button
              onClick={() => button.confirm.action && button.confirm.action()}
              className={`${
                button && button.confirm.theme
                  ? button.confirm.theme.toLowerCase() === "light"
                    ? "text-brand-dark-800 font-bold"
                    : "bg-brand-dark-800 text-brand-creamy-400"
                  : "bg-brand-dark-800 text-brand-creamy-400"
              } border-2 border-brand-dark-800 rounded-lg px-8 py-2`}
            >
              {loader ? (
                <Loader size={20} />
              ) : button.confirm.body && button ? (
                button.confirm.body
              ) : (
                "Ha"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
