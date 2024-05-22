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
        <nav className="main-nav">
          <ul className="main-nav-links-wrapper">
            <li>
              <NavLink to="/" className="main-nav-link">
                Bosh sahifa
              </NavLink>
            </li>
            <li>
              <NavLink to="/products" className="main-nav-link">
                Mahsulotlar
              </NavLink>
            </li>
            <li>
              <NavLink to="/reviews" className="main-nav-link">
                Izohlar
              </NavLink>
            </li>
            <li>
              <NavLink to="/users" className="main-nav-link">
                Foydalanuvchilar
              </NavLink>
            </li>
            <li>
              <NavLink to="/product-requests" className="main-nav-link">
                So'rovlar
              </NavLink>
            </li>
            <li>
              <NavLink to="/donation-box" className="main-nav-link">
                Hayriya qutisi
              </NavLink>
            </li>
            <li>
              <NavLink to="/appeals" className="main-nav-link">
                Murojaatlar
              </NavLink>
            </li>
            <li>
              <NavLink to="/payments" className="main-nav-link">
                To'lovlar
              </NavLink>
            </li>
            <li>
              <NavLink to="/contests" className="main-nav-link">
                Konkurslar
              </NavLink>
            </li>
            <li>
              <NavLink to="/news" className="main-nav-link">
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
