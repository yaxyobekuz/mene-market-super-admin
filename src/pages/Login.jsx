import React, { useEffect, useState } from "react";

// components
import Loader from "../components/Loader";

// axios
import axiosInstance from "../axios/axiosInstance";

// redux
import { useDispatch } from "react-redux";
import { changeLogin } from "../store/loginSlice";
import { setUserData } from "../store/userDataSlice";

// helpers
import { emailRegex, passwordRegex } from "../helpers/regexes";
import { errorMessage, getElement, successMessage } from "../helpers/helpers";

// images
import eye from "../assets/images/eye.svg";
import rabbitImg from "../assets/images/rabbit.png";
import eyeSlash from "../assets/images/eye-slash.svg";

const Login = () => {
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(true);
  const [loader2, setLoader2] = useState(false);
  const authData = JSON.parse(localStorage.getItem("auth"));
  const [isPasswordInput, setIsPasswordInput] = useState(true);

  const validateInput = (pattern, input) => {
    if (pattern.test(input.value.trim())) {
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
    if (authData) {
      axiosInstance
        .get("/User/Profile")
        .then((res) => {
          if (
            authData.email === res.data.email &&
            authData.password === res.data.password
          ) {
            dispatch(changeLogin(true));
            // dispatch(setUserData(res.data));
          }
        })
        .finally(() => setLoader(false));
    } else {
      setLoader(false);
    }
  }, []);

  // handle login
  const handleLogin = (e) => {
    e.preventDefault();

    // form elements
    const elEmailInput = getElement(e, ".js-email-input");
    const elPasswordInput = getElement(e, ".js-password-input");

    // check form elements value
    const emailInput = validateInput(emailRegex, elEmailInput);
    const passwordInput = validateInput(passwordRegex, elPasswordInput);

    if (emailInput && passwordInput && !loader2) {
      setLoader2(true);

      // form data
      const formData = {
        email: elEmailInput.value.trim(),
        password: elPasswordInput.value.trim(),
      };

      axiosInstance
        .post("/Accaunt/Login", formData)
        .then((res) => {
          // set auth data to local storage
          localStorage.setItem(
            "auth",
            JSON.stringify({
              ...res.data,
              ...formData,
            })
          );

          // change login
          dispatch(changeLogin(true));

          // notification
          successMessage("Akkauntga muvaffaqiyatli kirildi!");
        })
        .catch((err) => {
          if (err.code === "ECONNABORTED") {
            errorMessage("So'rov vaqti tugdi!");
          } else {
            errorMessage.offline("E-pochta yoki parol noto'g'ri!");
          }
        })
        .finally(() => setLoader2(false));
    }
  };

  return (
    <div className="flex items-center justify-center w-full min-h-screen">
      {!loader ? (
        <div className="flex flex-col items-center gap-4 bg-white rounded-2xl p-6 shadow-black/10 shadow-2xl">
          {/* login form image wrapper */}
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

          {/* page title */}
          <h1 className="w-full !text-2xl !font-semibold">Kirish</h1>

          {/* divider */}
          <hr className="w-full border-brand-dark-800/20" />

          {/* login form */}
          <form onSubmit={handleLogin} className="space-y-4">
            {/* email */}
            <label className="flex flex-col gap-2 w-72">
              <span>E-pochta</span>
              <input
                type="email"
                name="email"
                disabled={loader2}
                placeholder="E-pochta"
                className="js-email-input bg-brand-dark-800/5 rounded-xl py-2.5 px-3.5"
              />
            </label>

            {/* password */}
            <label className="flex flex-col gap-2 w-72">
              <span>Parol</span>
              <div className="flex items-center relative w-full">
                <input
                  name="password"
                  disabled={loader2}
                  placeholder="Parol"
                  type={isPasswordInput ? "password" : "text"}
                  className="js-password-input w-full bg-brand-dark-800/5 rounded-xl py-2.5 px-3.5"
                />

                {/* set toggle password btn */}
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

            {/* submit button */}
            <button
              disabled={loader2}
              className="el-submit-btn flex justify-center w-full bg-brand-dark-800 rounded-xl py-3 px-3.5 text-brand-creamy-400 disabled:cursor-not-allowed"
            >
              {loader2 ? <Loader size={24} /> : "Kirish"}
            </button>
          </form>
        </div>
      ) : (
        <Loader size={32} />
      )}
    </div>
  );
};

export default Login;
