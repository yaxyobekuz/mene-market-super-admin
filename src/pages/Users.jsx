import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";

// axios
import axios from "../axios/axios";

// antd
import "../css/antd.css";
import { Popover, Skeleton } from "antd";

// redux
import { useSelector, useDispatch } from "react-redux";
import {
  deleteUserData,
  editUserData,
  setUsersData,
} from "../store/usersDataSlice";

// toast
import { toast } from "react-toastify";

// components
import Pagination from "../components/Pagination";
import ConfirmModal from "../components/ConfirmModal";

// images
import userImg from "../assets/images/user.jpg";
import adminImg from "../assets/images/admin.svg";
import searchImg from "../assets/images/search.svg";
import deleteIcon from "../assets/images/delete.svg";
import reviewsImg from "../assets/images/reviews.svg";
import archiveImg from "../assets/images/archive.svg";
import requestsImg from "../assets/images/requests.svg";
import dotsImg from "../assets/images/dots-vertical.svg";
import unArchiveImg from "../assets/images/unarchive.svg";
import noUsersDataImg from "../assets/images/no-users-data.svg";
import transactionsImg from "../assets/images/transactions.svg";
import topRightArrowImg from "../assets/images/top-right-arrow.svg";

const Users = () => {
  // helpers
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const isOnline = navigator.onLine;

  // auth data
  const { authData } = useSelector((store) => store.authData);

  // users data
  const [userData, setUserData] = useState({});
  const { usersData } = useSelector((store) => store.usersData);
  const [users, setUsers] = useState([]);

  // loaders
  const [loader, setLoader] = useState(true);
  const [loader2, setLoader2] = useState(false);

  // modal
  const [openDeletUserModal, setOpenDeleteUserModal] = useState(false);
  const [openToggleAdminModal, setOpenToggleAdminModal] = useState(false);
  const [openToggleArchiveUserModal, setOpenToggleArchiveUserModal] =
    useState(false);

  // page index
  const { usersPageIndex } = useParams();
  const [lastPageIndex, setLastPageIndex] = useState(1);

  // get users
  useEffect(() => {
    if (!usersData || usersData.length === 0) {
      const getUsersData = () => {
        if (isOnline) {
          setLoader(true);

          axios
            .get("/User", {
              headers: {
                Authorization: "Bearer " + authData.data.token,
              },
            })
            .then((res) => {
              dispatch(setUsersData(res.data));
            })
            .catch(() => {
              // err notification
              toast.error("Ma'lumotlarni yuklab bo'lmadi");
            })
            .finally(() => setLoader(false));
        } else {
          toast.error("Internet aloqasi mavjud emas!");
        }
      };

      getUsersData();
    } else {
      setLoader(false);
    }
  }, []);

  // set users data with page index
  useEffect(() => {
    if (usersData.length > 0) {
      const usersDataForEachPage = 50;
      const lastIndex = Math.ceil(usersData.length / usersDataForEachPage);
      setLastPageIndex(lastIndex);

      if (Number(usersPageIndex) <= lastIndex && Number(usersPageIndex) > 0) {
        setUsers(
          usersData.slice(
            usersPageIndex * usersDataForEachPage - usersDataForEachPage,
            usersPageIndex * usersDataForEachPage
          )
        );
      } else if (!usersPageIndex) {
        setUsers(usersData.slice(0, usersDataForEachPage));
      } else {
        setUsers([]);
      }
    }
  }, [location, usersData]);

  // delete user
  const deleteUser = () => {
    setLoader2(true);

    axios
      .delete("/User?id=" + userData.userId, {
        headers: {
          Authorization: "Bearer " + authData.data.token,
        },
      })
      .then((res) => {
        dispatch(deleteUserData(res.data.userId));
        setUsers(users.filter((user) => user.userId !== res.data.userId));
        toast.success("Foydalanuvchi muvaffaqiyatli yo'q qilindi!");
        setOpenDeleteUserModal(false);
        if (users.length === 1 && lastPageIndex === Number(usersPageIndex)) {
          navigate("/users/" + (lastPageIndex - 1));
        }
      })
      .catch(() => {
        // err notification
        toast.error("Foydalanuvchini yo'q qilib bo'lmadi");
      })
      .finally(() => setLoader2(false));
  };

  // toggle archive user
  const toggleArchiveUser = () => {
    setLoader2(true);
    const userDataIndex = usersData.findIndex(
      (user) => user.userId === userData.userId
    );

    axios
      .put(
        "/User",
        {
          user: {
            userId: userData.userId,
            firstName: userData.firstName,
            lastName: userData.lastName,
            email: userData.email,
            password: userData.password,
            balance: userData.balance,
            isArchived: userData.isArchived ? false : true,
            role: userData.role,
            image: userData.image,
            offerLinks: userData.offerLinks,
            balanceHistorys: userData.balanceHistorys,
          },
        },
        {
          headers: {
            Authorization: "Bearer " + authData.data.token,
          },
        }
      )
      .then((res) => {
        dispatch(
          editUserData({
            index: userDataIndex,
            userData: res.data,
          })
        );

        // notification
        toast.success(
          `Foydalanuvchi mavaffaqiyatli ${
            userData.isArchived ? "arxivdan chiqarildi" : "arxivlandi"
          }!`
        );
        setOpenToggleArchiveUserModal(false);
      })
      .catch(() => {
        // err notification
        toast.error(
          `Foydalanuvchini ${
            userData.isArchived ? "arxivdan chiqarib" : "arxivlab"
          } bo'lmadi!`
        );
      })
      .finally(() => setLoader2(false));
  };

  // toggle admin user
  const toggleAdminUser = () => {
    setLoader2(true);
    const userDataIndex = usersData.findIndex(
      (user) => user.userId === userData.userId
    );

    axios
      .put(
        "/User",
        {
          user: {
            userId: userData.userId,
            firstName: userData.firstName,
            lastName: userData.lastName,
            email: userData.email,
            password: userData.password,
            balance: userData.balance,
            isArchived: userData.isArchived,
            role: userData.role === 0 ? 1 : 0,
            image: userData.image,
            offerLinks: userData.offerLinks,
            balanceHistorys: userData.balanceHistorys,
          },
        },
        {
          headers: {
            Authorization: "Bearer " + authData.data.token,
          },
        }
      )
      .then((res) => {
        dispatch(
          editUserData({
            index: userDataIndex,
            userData: res.data,
          })
        );

        // notification
        toast.success(
          `Foydalanuvchi mavaffaqiyatli ${
            res.data.role === 0 ? "admin qilindi" : "adminlikdan chiqarildi"
          }!`
        );

        // close modal
        setOpenToggleAdminModal(false);
      })
      .catch(() => {
        // err notification
        toast.error(
          `Foydalanuvchini ${
            userData.role === 0 ? "adminlikdan chiqarib" : "admin qilib"
          } bo'lmadi!`
        );
      })
      .finally(() => setLoader2(false));
  };

  // users list user popover content
  const userPopoverContent = (user) => {
    return (
      <div className="flex flex-col">
        {/* admin user */}
        <button
          onClick={() => {
            setUserData(user);
            setOpenToggleAdminModal(true);
          }}
          className="flex items-center gap-3 px-3 py-2 transition-colors hover:bg-brand-dark-800/5"
        >
          {user.role === 0 ? (
            <>
              <img
                width={24}
                height={24}
                src={adminImg}
                alt="admin icon"
                className="size-6"
              />
              <span>Adminlikdan chiqarish</span>
            </>
          ) : (
            <>
              <img
                width={24}
                height={24}
                src={adminImg}
                alt="admin icon"
                className="size-6"
              />
              <span>Admin etib tayinlash</span>
            </>
          )}
        </button>

        {/* archive user */}
        <button
          onClick={() => {
            setUserData(user);
            setOpenToggleArchiveUserModal(true);
          }}
          className="flex items-center gap-3 px-3 py-2 transition-colors hover:bg-brand-dark-800/5 sm:hidden"
        >
          {user.isArchived ? (
            <>
              <img
                width={24}
                height={24}
                src={unArchiveImg}
                alt="unarchive icon"
                className="size-6"
              />
              Arxivdan chiqarish
            </>
          ) : (
            <>
              <img
                width={24}
                height={24}
                src={archiveImg}
                alt="archive icon"
                className="size-6"
              />
              Arxivlash
            </>
          )}
        </button>
      </div>
    );
  };

  return (
    <>
      {/* main section (users) */}
      <div className="pb-12">
        <div className="container">
          <h1 className="mb-7">Foydalanuvchilar</h1>

          {/* main content */}
          <div className="space-y-7">
            {/* search */}
            <form className="flex items-center relative">
              <input
                placeholder="Foydalanuvchilarni qidirish"
                name="search"
                type="text"
                className="js-input w-full bg-brand-dark-800/5 rounded-2xl py-2.5 pl-9 pr-24 xs:py-3.5 xs:pl-12 xs:pr-28"
              />

              <img
                width={24}
                height={24}
                src={searchImg}
                alt="search icon"
                className="absolute size-5 left-3 xs:left-3.5 xs:size-6"
              />

              {/* submit btn */}
              <button className="absolute text-sm right-1 bg-brand-dark-800 text-brand-creamy-400 py-2.5 px-4 rounded-xl xs:text-base xs:right-1.5">
                Qidirish
              </button>
            </form>

            {/* users (body) */}
            {users ? (
              !loader ? (
                (Number(usersPageIndex) <= lastPageIndex &&
                  Number(usersPageIndex) > 0) ||
                !usersPageIndex ? (
                  // users
                  <div className="space-y-7">
                    <ul className="space-y-3">
                      {users.map((user, index) => {
                        return (
                          <li
                            key={index}
                            className={`${
                              user.role !== 0
                                ? "border-brand-dark-800/10"
                                : "border-brand-dark-800"
                            } flex items-center justify-between gap-5 relative w-full bg-brand-dark-800/5 py-2.5 px-2 rounded-l-xl border-r-2 xs:border-r-4 xs:px-4`}
                          >
                            {/* profile */}
                            <div className="flex items-center gap-3.5 min-w-0 sm:gap-5">
                              {/* image */}
                              <img
                                width={64}
                                height={64}
                                src={
                                  user.image
                                    ? "https://menemarket-cdcc7e43d37f.herokuapp.com/" +
                                      user.image
                                    : userImg
                                }
                                alt="user image"
                                className="size-12 shrink-0 object-cover bg-brand-dark-800/10 rounded-full border-2 border-brand-dark-800 xs:size-14 sm:size-16"
                              />

                              {/* name */}
                              <div className="!min-w-0 sm:space-y-0.5">
                                <h3 className="min-w-0 text-base capitalize line-clamp-1 sm:text-lg">
                                  {user.lastName &&
                                    user.lastName + " " + user.firstName}
                                </h3>

                                {/* role */}
                                <p className="text-sm sm:text-base">
                                  {user.role !== 0
                                    ? "Foydalanuvchi"
                                    : "Administrator"}
                                </p>
                              </div>
                            </div>

                            {/* buttons   */}
                            <div className="flex items-center gap-2 min-w-max xs:gap-4">
                              {/* toggle archive user */}
                              <button
                                onClick={() => {
                                  setUserData(user);
                                  setOpenToggleArchiveUserModal(true);
                                }}
                                className="hidden border-2 border-brand-dark-800 py-2 px-3.5 rounded-xl sm:inline-block"
                              >
                                {user.isArchived
                                  ? "Arxivdan chiqarish"
                                  : "Arxivlash"}
                              </button>

                              {/* delete user */}
                              <button
                                onClick={() => {
                                  setUserData(user);
                                  setOpenDeleteUserModal(true);
                                }}
                                className="flex bg-brand-dark-800 p-2 rounded-xl text-white xs:inline-block xs:p-3 sm:py-2.5 sm:px-4"
                              >
                                <span className="hidden sm:inline">
                                  Yo'q qilish
                                </span>
                                <img
                                  width={24}
                                  height={24}
                                  src={deleteIcon}
                                  alt="delete icon"
                                  className="inline-block size-5 xs:size-6 sm:hidden"
                                />
                              </button>

                              {/* popover */}
                              <Popover
                                trigger="click"
                                content={() => userPopoverContent(user)}
                              >
                                <button className="p-1 rounded-full transition-colors hover:bg-brand-dark-800/10">
                                  <img
                                    width={28}
                                    height={28}
                                    src={dotsImg}
                                    alt="dots icon"
                                    className="size-7"
                                  />
                                </button>
                              </Popover>
                            </div>
                          </li>
                        );
                      })}
                    </ul>

                    {/* pagination */}
                    <Pagination
                      currentIndex={usersPageIndex ? usersPageIndex : 1}
                      lastIndex={lastPageIndex}
                      link={"/users/"}
                    />
                  </div>
                ) : (
                  // error
                  <div className="flex items-center flex-col gap-3 max-w-md text-center mx-auto">
                    <img
                      width={160}
                      height={160}
                      src={noUsersDataImg}
                      alt="no users data image"
                      className="size-40"
                    />

                    {/* title */}
                    <h2 className="">
                      Foydalanuvchilar ma'lumotlari mavjud emas!
                    </h2>

                    {/* description */}
                    <p className="text-lg">
                      Ushbu sahifada hech qanday foydalanuvchi ma'lumotlari
                      mavjud emas.
                    </p>

                    {/* buttons */}
                    <div className="flex gap-2.5">
                      <Link
                        to={-1}
                        className="py-2.5 px-5 rounded-xl border-2 border-brand-dark-800"
                      >
                        Oldingi sahifaga qaytish
                      </Link>
                      <Link to="/users/1" className="main-btn">
                        Birinchi sahifaga qaytish
                      </Link>
                    </div>
                  </div>
                )
              ) : (
                // loader
                <ul className="space-y-3">
                  {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => {
                    return (
                      <Skeleton.Input
                        active
                        key={i}
                        className="!h-[68px] xs:!h-[76px] sm:!h-[84px] !rounded-l-xl !rounded-r-none"
                      ></Skeleton.Input>
                    );
                  })}
                </ul>
              )
            ) : (
              <>Xatolik</>
            )}
          </div>
        </div>
      </div>

      {/* recommendation section */}
      <section className="py-12">
        <div className="container">
          <h2 className="mb-7">Ushbu sahifaga oid</h2>

          {/* list */}
          <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <li>
              <Link
                to="/requests"
                className="flex flex-col items-center justify-center gap-3 relative h-full border-2 border-brand-dark-800 rounded-2xl py-10 px-6 group"
              >
                <img
                  width={147}
                  height={147}
                  src={requestsImg}
                  alt="requests image"
                  className="w-[146px] h-28 sm:w-[167px] sm:h-32 md:size-[147px]"
                />
                {/* arrow */}
                <img
                  width={36}
                  height={36}
                  src={topRightArrowImg}
                  className="absolute top-9 right-9 size-9 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:top-5 group-hover:right-5"
                  alt="top right arrow"
                />
                <h3 className="text-center text-lg xs:text-xl">Murojaatlar</h3>
              </Link>
            </li>
            <li>
              <Link
                to="/reviews"
                className="flex flex-col items-center justify-center gap-3 relative h-full border-2 border-brand-dark-800 rounded-2xl py-10 px-6 group"
              >
                <img
                  width={192}
                  height={192}
                  src={reviewsImg}
                  alt="go to reviews page"
                  className="size-28 sm:size-32 md:size-[147px]"
                />
                {/* arrow */}
                <img
                  width={36}
                  height={36}
                  src={topRightArrowImg}
                  className="absolute top-9 right-9 size-9 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:top-5 group-hover:right-5"
                  alt="top right arrow"
                />
                <h3 className="text-center text-lg xs:text-xl">
                  Izohlarni boshqarish
                </h3>
              </Link>
            </li>
            <li className="col-span-1 sm:col-span-2 lg:col-span-1">
              <Link
                to="/payments"
                className="flex flex-col items-center justify-center gap-3 relative h-full border-2 border-brand-dark-800 rounded-2xl py-10 px-6 group"
              >
                <img
                  width={192}
                  height={192}
                  src={transactionsImg}
                  alt="payments image"
                  className="size-28 sm:size-32 md:size-[147px]"
                />

                {/* arrow */}
                <img
                  width={36}
                  height={36}
                  src={topRightArrowImg}
                  className="absolute top-9 right-9 size-9 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:top-5 group-hover:right-5"
                  alt="top right arrow"
                />
                <h3 className="text-center text-lg xs:text-xl">To'lovlar</h3>
              </Link>
            </li>
          </ul>
        </div>
      </section>

      {/* confirm modal (delete user) */}
      {openDeletUserModal && (
        <ConfirmModal
          loader={loader2}
          action={deleteUser}
          subtitle="Foydalanuvchi ismi:"
          description={userData.firstName}
          closeModal={() => setOpenDeleteUserModal(false)}
          button={{ cancel: "Bekor qilish", confirm: "Yo'q qilish" }}
          title="Haqiqatdan ham ushbu foydalanuvchini yo'q qilmoqchimisiz?"
          imageSrc={
            userData.image
              ? "https://menemarket-cdcc7e43d37f.herokuapp.com/" +
                userData.image
              : userImg
          }
        />
      )}

      {/* confirm modal (toggle archive user) */}
      {openToggleArchiveUserModal && (
        <ConfirmModal
          loader={loader2}
          action={toggleArchiveUser}
          subtitle="Foydalanuvchi ismi:"
          description={userData.firstName}
          closeModal={() => setOpenToggleArchiveUserModal(false)}
          button={{
            cancel: "Bekor qilish",
            confirm: userData.isArchived ? "A..dan chiqarish" : "Arxivlash",
          }}
          title={`Haqiqatdan ham ushbu foydalanuvchini ${
            userData.isArchived
              ? "arxivdan chiqarmoqchimisiz"
              : "arxivlamoqchimisiz"
          }?`}
          imageSrc={
            userData.image
              ? "https://menemarket-cdcc7e43d37f.herokuapp.com/" +
                userData.image
              : userImg
          }
        />
      )}

      {/* confirm modal (toggle admin user) */}
      {openToggleAdminModal && (
        <ConfirmModal
          loader={loader2}
          action={toggleAdminUser}
          subtitle="Foydalanuvchi ismi:"
          description={userData.firstName}
          closeModal={() => setOpenToggleAdminModal(false)}
          button={{
            cancel: "Bekor qilish",
            confirm: userData.role === 0 ? "A..dan chiqarsih" : "Admin qilish",
          }}
          title={`Haqiqatdan ham ushbu foydalanuvchini ${
            userData.role === 0
              ? "adminlikdan chiqarmoqchimisiz"
              : "admin qilmoqchimisiz"
          }?`}
          imageSrc={
            userData.image
              ? "https://menemarket-cdcc7e43d37f.herokuapp.com/" +
                userData.image
              : userImg
          }
        />
      )}
    </>
  );
};

export default Users;
