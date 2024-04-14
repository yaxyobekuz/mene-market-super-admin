import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { changeAuthData } from "../store/authSlice";

// axios
import axios from "../axios/axios";

// toastify
import { toast } from "react-toastify";

// images
import loaderImg from "../assets/images/loader.png";
import rabbitImg from "../assets/images/rabbit.png";
import eye from "../assets/images/eye.svg";
import eyeSlash from "../assets/images/eye-slash.svg";

const Login = () => {
  const { authData } = useSelector((store) => store.authData);
  const dispatch = useDispatch();
  const [mainLoader, setMainLoader] = useState(true);
  const [secondaryLoader, setSecondaryLoader] = useState(false);
  const [isPasswordInput, setIsPasswordInput] = useState(true);

  // regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^.{8,}$/;
  const validateInput = (pattern, input) => {
    if (pattern.test(input.value)) {
      input.classList.remove("is-invalid");
      return true;
    } else {
      input.classList.add("is-invalid");
      input.focus();
      return false;
    }
  };

  // auto login
  useEffect(() => {
    if (authData.data) {
      axios
        .get("/User/Profile", {
          headers: {
            Authorization: "Bearer " + authData.data.token,
          },
        })
        .then((res) => {
          if (
            authData.data.email === res.data.email &&
            authData.data.password === res.data.password
          ) {
            dispatch(changeAuthData());
          } else {
            dispatch(changeAuthData({ data: null, isLoggedIn: false }));
          }
        })
        .finally(() => setMainLoader(false));
    } else {
      setMainLoader(false);
    }
  }, []);

  // handle login
  const login = (e) => {
    e.preventDefault();

    // form elements
    const elEmailInput = e.target.querySelector(".el-email-input");
    const elPasswordInput = e.target.querySelector(".el-password-input");
    const elSubmitBtn = e.target.querySelector(".el-submit-btn");

    // check form elements value
    const emailInput = validateInput(emailRegex, elEmailInput);
    const passwordInput = validateInput(passwordRegex, elPasswordInput);

    if (emailInput && passwordInput && !secondaryLoader) {
      setSecondaryLoader(true);

      axios
        .post("/Accaunt/Login", {
          email: elEmailInput.value,
          password: elPasswordInput.value,
        })
        .then((res) => {
          localStorage.setItem(
            "auth",
            JSON.stringify({
              ...res.data,
              email: elEmailInput.value,
              password: elPasswordInput.value,
            })
          );

          dispatch(
            changeAuthData({
              data: {
                ...res.data,
                email: elEmailInput.value,
                password: elPasswordInput.value,
              },
              isLoggedIn: true,
            })
          );

          // notification
          toast.success("Akkauntga muvafaqiyatli kirdingiz!");
        })
        .catch((err) => {
          const isOnline = navigator.onLine;

          // error notification
          if (isOnline) {
            toast.error("E-pochta yoki parol noto'g'ri");
          } else {
            toast.error("Internet aloqasi mavjud emas!");
          }
        })
        .finally(() => setSecondaryLoader(false));
    }
  };

  return (
    <div className="flex items-center justify-center w-full min-h-screen">
      {mainLoader ? (
        <img
          className="rotate-animation size-7 sm:size-8"
          width={32}
          height={32}
          src={loaderImg}
          alt="loader"
        />
      ) : (
        <div className="flex flex-col items-center gap-4 bg-white rounded-2xl p-6 shadow-black/10 shadow-2xl">
          {/* img */}
          <div className="inline-block relative overflow-hidden rounded-full border-2 border-brand-dark-800 mx-auto">
            {/* obstacle */}
            <div
              className={`${
                isPasswordInput ? "h-5/6" : "h-14"
              } absolute top-0 inset-x-0 z-10 bg-brand-creamy-500 border-b-2 border-brand-dark-800  transition-[height]`}
            >
              <div className="flex justify-center relative w-full h-full">
                <button
                  onClick={() => setIsPasswordInput(!isPasswordInput)}
                  className="absolute -bottom-2 w-10 h-4 bg-brand-creamy-600 rounded border-2 border-brand-dark-800"
                ></button>
              </div>
            </div>

            {/* img */}
            <img
              width={192}
              height={192}
              src={rabbitImg}
              alt="rabbit"
              className={`${
                isPasswordInput ? "translate-y-4" : "translate-y-0"
              } z-0 size-48 bg-brand-creamy-500 rounded-full transition-transform`}
            />
          </div>

          {/* title */}
          <h1 className="w-full text-2xl font-semibolb">Kirish</h1>
          <hr className="w-full border-brand-dark-800/20" />

          {/* form elements */}
          <form onSubmit={login} className="space-y-4">
            {/* email */}
            <label className="flex flex-col gap-2 w-72">
              <span>E-pochta</span>
              <input
                disabled={secondaryLoader}
                type="email"
                placeholder="E-pochta"
                name="email"
                className="el-email-input bg-brand-dark-800/5 rounded-xl py-2.5 px-3.5"
              />
            </label>

            {/* password */}
            <label className="flex flex-col gap-2 w-72">
              <span>Parol</span>
              <div className="flex items-center relative w-full">
                <input
                  disabled={secondaryLoader}
                  type={isPasswordInput ? "password" : "text"}
                  placeholder="Parol"
                  name="Password"
                  className="el-password-input w-full bg-brand-dark-800/5 rounded-xl py-2.5 px-3.5"
                />
                {/* toggle password btn */}
                <button
                  onClick={() => setIsPasswordInput(!isPasswordInput)}
                  type="button"
                  className="absolute right-2 p-1"
                >
                  {isPasswordInput ? (
                    <img
                      width={24}
                      height={24}
                      src={eye}
                      alt="eye"
                      className="size-6"
                    />
                  ) : (
                    <img
                      width={24}
                      height={24}
                      src={eyeSlash}
                      alt="eye slash"
                      className="size-6"
                    />
                  )}
                </button>
              </div>
            </label>

            {/* btn */}
            <button
              disabled={secondaryLoader}
              className="el-submit-btn flex justify-center w-full bg-brand-dark-800 rounded-xl py-3 px-3.5 text-brand-creamy-400 disabled:cursor-not-allowed"
            >
              {secondaryLoader ? (
                <img
                  className="rotate-animation size-6"
                  width={24}
                  height={24}
                  src={loaderImg}
                  alt="loader"
                />
              ) : (
                "Kirish"
              )}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Login;
