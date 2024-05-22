import React, { useState } from "react";

// axios
import axiosInstance from "../axios/axiosInstance";

// helpers
import {
  checkTheInputsValueLength,
  errorMessage,
  getElement,
  successMessage,
} from "../helpers/helpers";

// loader (component)
import Loader from "../components/Loader";
import RecommendationSection from "../components/RecommendationSection";

// images
import image from "../assets/images/image.png";
import newsImg from "../assets/images/news.svg";
import productsImg from "../assets/images/products.svg";
import requestsImg from "../assets/images/requests.svg";

const AddNews = () => {
  const [loader, setLoader] = useState(false);
  const [imageData, setImageData] = useState(null);

  // select news image
  const handleImageSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageData(reader.result.split(",")[1]);
      };
      reader.readAsDataURL(file);
    }
  };

  // add news
  const addNews = (event) => {
    event.preventDefault();

    // form elements
    const elNewsTitle = getElement(event, ".js-news-title-input");
    const elNewsDesc = getElement(event, ".js-news-description-textarea");

    // form elements arr
    const inputs = [elNewsTitle, elNewsDesc];

    // add news
    if (!loader && checkTheInputsValueLength(inputs)) {
      if (imageData) {
        setLoader(true);

        // form data
        const formData = {
          news: {
            name: elNewsTitle.value.trim(),
            description: elNewsDesc.value.trim(),
            imageFilePath: "",
          },
          bytes: imageData,
          allowSaveFile: true,
        };

        // add news
        axiosInstance
          .post("/News", formData)
          .then((res) => {
            if (res.status === 200) {
              // reset values
              setImageData(null);
              inputs.forEach((input) => (input.value = ""));

              // notification
              successMessage("Yangilik muvaffaqiyatli qo'shildi!");
            } else {
              errorMessage("Nimadir xato ketdi!");
            }
          })
          .catch(() => errorMessage.offline("Yangilik qo'shishida xatolik!"))
          .finally(() => setLoader(false));
      } else {
        errorMessage("Hech qanday rasm yuklanmadi!");
      }
    } else {
      errorMessage("Xatolik!");
    }
  };

  return (
    <>
      {/* page main content */}
      <div className="pb-12">
        <div className="container">
          <h1 className="mb-7">Yangilik qo'shish</h1>

          {/* content */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* add image */}
            <label className="flex flex-col items-center justify-center gap-3 h-full bg-brand-dark-800/5 border-2 border-brand-dark-800 rounded-xl p-5 transition-colors hover:bg-brand-dark-800/10 xs:p-6">
              <img
                width={208}
                height={208}
                src={image}
                alt="image"
                className="size-36 xs:size-40 sm:size-44 md:size-52"
              />
              {/* body */}
              <div className="max-w-96 space-y-2 text-center">
                <h3 className="font-bold text-xl sm:text-2xl">
                  Yangilik uchun rasm yuklash
                </h3>
                <p>Yangilikni qo'shish uchun rasm yuklashingiz kerak!</p>
              </div>

              {/* btn */}
              <div
                role="button"
                className={`${
                  loader ? "cursor-default" : "cursor-pointer"
                } main-btn w-full text-center px-14 rounded-lg xs:w-auto xs:rounded-xl`}
              >
                Rasm yuklash
              </div>

              {/* input  */}
              <input
                type="file"
                name="image"
                disabled={loader}
                className="hidden"
                onChange={handleImageSelect}
                accept="image/png, image/jpeg"
              />
            </label>

            {/* add news */}
            <form onSubmit={addNews} className="space-y-3">
              {/* news title */}
              <label className="flex flex-col items-start gap-2">
                <span>Yangilik sarlavhasi</span>
                <input
                  disabled={loader}
                  placeholder="Yangilik sarlavhasi"
                  name="news title"
                  type="text"
                  className="js-news-title-input w-full bg-brand-dark-800/5 rounded-xl py-2.5 px-3.5 border-brand-dark-800"
                />
              </label>

              {/* news description */}
              <label className="flex flex-col items-start gap-2 w-full">
                <span>Yangilik tavsifi</span>
                <textarea
                  disabled={loader}
                  placeholder="Yangilik tavsifi"
                  name="description"
                  className="js-news-description-textarea w-full min-h-96 max-h-[536px] resize-y hidden-scroll bg-brand-dark-800/5 rounded-xl py-2.5 px-3.5 border-brand-dark-800"
                ></textarea>
              </label>

              <button
                disabled={loader}
                className="main-btn flex justify-center w-full px-20 disabled:cursor-not-allowed xs:w-auto"
              >
                {loader ? <Loader size={24} /> : <span>Qo'shish</span>}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* recommendation section */}
      <RecommendationSection
        items={[
          {
            title: "Barcha yangiliklar",
            path: "news",
            image: {
              src: newsImg,
              alt: "news image",
            },
          },
          {
            title: "Mahsulotlarni boshqarish",
            path: "products",
            image: {
              src: productsImg,
              alt: "products image",
            },
          },
          {
            title: "Murojaatlar",
            path: "appeals",
            image: {
              src: requestsImg,
              alt: "appeals image",
            },
          },
        ]}
      />
    </>
  );
};

export default AddNews;
