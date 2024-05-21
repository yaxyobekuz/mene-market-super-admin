import React, { useRef, useState } from "react";

// components
import Loader from "../components/Loader";

// images
import crossImg from "../assets/images/cross.svg";
import searchImg from "../assets/images/search.svg";
const Search = ({ action, loader, defaultValue, placeholder }) => {
  const searchInputRef = useRef(null);
  const [value, setValue] = useState("");
  return (
    <form onSubmit={action}>
      <label className="flex items-center gap-2 bg-brand-dark-800/5 p-1 pl-3 rounded-2xl cursor-text border-2 border-transparent focus-within:border-brand-dark-800 xs:gap-2.5 sm:pl-3.5 sm:gap-3.5">
        {/* search icon */}
        <img
          width={24}
          height={24}
          src={searchImg}
          alt="search icon"
          className="hidden size-6 sm:inline-block"
        />

        {/* input */}
        <input
          type="search"
          name="search"
          ref={searchInputRef}
          onChange={(e) => setValue(e.target.value)}
          defaultValue={defaultValue ? defaultValue : ""}
          placeholder={placeholder ? placeholder : "Qidirish"}
          className="js-search-input w-full h-full bg-transparent border-0 !text-sm xs:!text-base"
        />

        {/* cross button */}
        <button
          type="button"
          className={`${value.length > 0 ? "block" : "hidden"}`}
          onClick={() => {
            setValue("");
            searchInputRef.current.focus();
            searchInputRef.current.value = "";
          }}
        >
          <img
            width={24}
            height={24}
            src={crossImg}
            alt="cross icon"
            className="size-5 sm:size-6"
          />
        </button>

        {/* submit btn */}
        <button
          disabled={loader}
          className="main-btn p-2.5 shrink-0 xs:px-3.5 xs:py-2.5"
        >
          {loader ? (
            <Loader size={24} />
          ) : (
            <div>
              <span className="hidden sm:inline">Qidirish</span>

              <svg
                className="inline-block size-6 sm:hidden"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16.6725 16.6412L21 21M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z"
                  stroke="#FEF6EB"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          )}
        </button>
      </label>
    </form>
  );
};

export default Search;
