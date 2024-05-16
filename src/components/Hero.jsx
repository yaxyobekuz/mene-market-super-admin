import React from "react";

// Swiper
import "swiper/css";
import "../css/swiper.css";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Keyboard, Navigation, Pagination } from "swiper/modules";

// images
import newsImg from "../assets/images/news.svg";
import userImg from "../assets/images/user.svg";
import usersImg from "../assets/images/edit-user.svg";
import reviewsImg from "../assets/images/reviews.svg";
import productsImg from "../assets/images/products.svg";
import requestsImg from "../assets/images/requests.svg";
import competitionImg from "../assets/images/competition.svg";
import transactionsImg from "../assets/images/transactions.svg";
import { Link } from "react-router-dom";
const Hero = () => {
  const swiperSlides = [
    {
      id: 0,
      title: "Mahsulotlar",
      link: "product",
      image: {
        src: productsImg,
        alt: "products",
      },
    },
    {
      id: 1,
      title: "Izohlar",
      link: "reviews",
      image: {
        src: reviewsImg,
        alt: "reviews",
      },
    },
    {
      id: 2,
      title: "Foydalanuvchilar",
      link: "users",
      image: {
        src: usersImg,
        alt: "users",
      },
    },
    {
      id: 3,
      title: "So'rovlar",
      link: "requests",
      image: {
        src: "",
        alt: "requests",
      },
    },
    {
      id: 4,
      title: "Hayriya qutisi",
      link: "donation-box",
      image: {
        src: "",
        alt: "donation box",
      },
    },
    {
      id: 5,
      title: "Murojaatlar",
      link: "appeals",
      image: {
        src: requestsImg,
        alt: "requests",
      },
    },
    {
      id: 6,
      title: "To'lovlar",
      link: "payments",
      image: {
        src: transactionsImg,
        alt: "payments",
      },
    },
    {
      id: 7,
      title: "Konkurslar",
      link: "contests",
      image: {
        src: competitionImg,
        alt: "contests",
      },
    },
    {
      id: 8,
      title: "Yangiliklar",
      link: "news",
      image: {
        src: newsImg,
        alt: "news",
      },
    },
    {
      id: 9,
      title: "Profil",
      link: "profile",
      image: {
        src: userImg,
        alt: "user profile",
      },
    },
  ];

  return (
    <div className="pb-12">
      <div className="container">
        <Swiper
          loop
          keyboard
          navigation
          spaceBetween={24}
          slidesPerView={1}
          breakpoints={{
            768: {
              slidesPerView: 2,
              spaceBetween: 24,
            },
          }}
          centeredSlides={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: true,
          }}
          modules={[Pagination, Navigation, Autoplay, Keyboard]}
          className="homepage-hero-swiper rounded-xl h-72 lg:h-96 sm:rounded-2xl"
        >
          {swiperSlides.map((slide) => {
            return (
              <SwiperSlide key={slide.id} className="w-full h-full">
                <Link
                  to={"/" + slide.link}
                  className="swiper-slide-bg-animation flex items-center justify-center flex-col gap-4 w-full h-full bg-brand-dark-800/5 p-5 rounded-2xl xs:gap-6"
                >
                  <img
                    width={144}
                    height={144}
                    src={slide.image.src}
                    alt={slide.image.alt + "image"}
                    className="size-28 xs:size-32 sm:size-36"
                  />
                  <h3 className="text-xl sm:text-2xl">{slide.title}</h3>
                </Link>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
};

export default Hero;
