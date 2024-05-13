import React from "react";
import { Link, NavLink } from "react-router-dom";

// images
import logo from "../assets/images/logo.svg";
import user from "../assets/images/user.svg";
const Header = () => {
  return (
    <header className="py-5 mb-4 xs:mb-6 sm:mb-8 md:mb-10">
      <div className="container">
        {/* top */}
        <div className="flex justify-between items-center mb-5">
          <Link to="/">
            <img
              width={88}
              height={46}
              src={logo}
              alt="mene market logo"
              className="w-[72px] h-[38px] sm:w-20 sm:h-[42px] md:w-[88px] md:h-[46p]"
            />
          </Link>

          <Link
            to="/profile"
            className="flex items-center gap-3 bg-brand-dark-800/5 p-3 rounded-2xl transition-colors duration-300 hover:bg-brand-dark-800/10 xs:py-3.5 xs:px-4"
          >
            <span className="font-semibold xs:text-xl">Profil</span>
            <img
              width={32}
              height={24}
              src={user}
              alt="user profile"
              className="w-7 h-[22px] md:w-8 md:h-6"
            />
          </Link>
        </div>

        {/* nav */}
        <nav className="overflow-x-auto hidden-scroll p-1 bg-brand-dark-800/5 rounded-2xl xs:p-1.5">
          <ul className="flex justify-between gap-2 w-full sm:gap-5">
            <li>
              <NavLink
                to="/"
                className="inline-block min-w-max p-2.5 rounded-xl text-sm transition-colors duration-300 hover:bg-brand-dark-800 hover:text-brand-creamy-400 xs:text-base sm:px-3 sm:py-2.5"
              >
                Bosh sahifa
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/product"
                className="inline-block min-w-max p-2.5 rounded-xl text-sm transition-colors duration-300 hover:bg-brand-dark-800 hover:text-brand-creamy-400 xs:text-base sm:px-3 sm:py-2.5"
              >
                Mahsulot
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/reviews"
                className="inline-block min-w-max p-2.5 rounded-xl text-sm transition-colors duration-300 hover:bg-brand-dark-800 hover:text-brand-creamy-400 xs:text-base sm:px-3 sm:py-2.5"
              >
                Izohlar
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/users"
                className="inline-block min-w-max p-2.5 rounded-xl text-sm transition-colors duration-300 hover:bg-brand-dark-800 hover:text-brand-creamy-400 xs:text-base sm:px-3 sm:py-2.5"
              >
                Foydalanuvchilar
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/product-requests"
                className="inline-block min-w-max p-2.5 rounded-xl text-sm transition-colors duration-300 hover:bg-brand-dark-800 hover:text-brand-creamy-400 xs:text-base sm:px-3 sm:py-2.5"
              >
                So'rovlar
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/donation-box"
                className="inline-block min-w-max p-2.5 rounded-xl text-sm transition-colors duration-300 hover:bg-brand-dark-800 hover:text-brand-creamy-400 xs:text-base sm:px-3 sm:py-2.5"
              >
                Hayriya qutisi
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/appeals"
                className="inline-block min-w-max p-2.5 rounded-xl text-sm transition-colors duration-300 hover:bg-brand-dark-800 hover:text-brand-creamy-400 xs:text-base sm:px-3 sm:py-2.5"
              >
                Murojaatlar
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/payments"
                className="inline-block min-w-max p-2.5 rounded-xl text-sm transition-colors duration-300 hover:bg-brand-dark-800 hover:text-brand-creamy-400 xs:text-base sm:px-3 sm:py-2.5"
              >
                To'lovlar
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/competitions"
                className="inline-block min-w-max p-2.5 rounded-xl text-sm transition-colors duration-300 hover:bg-brand-dark-800 hover:text-brand-creamy-400 xs:text-base sm:px-3 sm:py-2.5"
              >
                Konkurslar
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/news"
                className="inline-block min-w-max p-2.5 rounded-xl text-sm transition-colors duration-300 hover:bg-brand-dark-800 hover:text-brand-creamy-400 xs:text-base sm:px-3 sm:py-2.5"
              >
                Yangiliklar
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
