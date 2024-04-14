import React from "react";
import { Link, NavLink } from "react-router-dom";

// images
import logo from "../assets/images/logo.svg";
import user from "../assets/images/user.svg";
const Header = () => {
  return (
    <header className="py-5">
      <div className="container">
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
            className="flex items-center gap-3 bg-brand-dark-800/5 py-2.5 px-3 rounded-xl transition-colors duration-300 hover:bg-brand-dark-800/10 md:py-3 md:px-4 md:rounded-2xl"
          >
            <span className="font-semibold md:text-xl">Profil</span>
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
        <nav className="overflow-x-auto hidden-scroll">
          <ul className="flex justify-between gap-2 w-full sm:gap-5">
            <li>
              <NavLink
                to=""
                className="inline-block min-w-max p-2.5 rounded-xl text-sm transition-colors duration-300 hover:bg-brand-dark-800/5 xs:text-base sm:p-3"
              >
                Bosh sahifa
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/products"
                className="inline-block min-w-max p-2.5 rounded-xl text-sm transition-colors duration-300 hover:bg-brand-dark-800/5 xs:text-base sm:p-3"
              >
                Mahsulotlar
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/reviews"
                className="inline-block min-w-max p-2.5 rounded-xl text-sm transition-colors duration-300 hover:bg-brand-dark-800/5 xs:text-base sm:p-3"
              >
                Izohlar
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/users"
                className="inline-block min-w-max p-2.5 rounded-xl text-sm transition-colors duration-300 hover:bg-brand-dark-800/5 xs:text-base sm:p-3"
              >
                Foydalanuvchilar
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/appeals"
                className="inline-block min-w-max p-2.5 rounded-xl text-sm transition-colors duration-300 hover:bg-brand-dark-800/5 xs:text-base sm:p-3"
              >
                So'rovlar
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/donation-box"
                className="inline-block min-w-max p-2.5 rounded-xl text-sm transition-colors duration-300 hover:bg-brand-dark-800/5 xs:text-base sm:p-3"
              >
                Hayriya qutisi
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/requests"
                className="inline-block min-w-max p-2.5 rounded-xl text-sm transition-colors duration-300 hover:bg-brand-dark-800/5 xs:text-base sm:p-3"
              >
                Murojaatlar
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/payments"
                className="inline-block min-w-max p-2.5 rounded-xl text-sm transition-colors duration-300 hover:bg-brand-dark-800/5 xs:text-base sm:p-3"
              >
                To'lovlar
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/competitions"
                className="inline-block min-w-max p-2.5 rounded-xl text-sm transition-colors duration-300 hover:bg-brand-dark-800/5 xs:text-base sm:p-3"
              >
                Konkurslar
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/news"
                className="inline-block min-w-max p-2.5 rounded-xl text-sm transition-colors duration-300 hover:bg-brand-dark-800/5 xs:text-base sm:p-3"
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
