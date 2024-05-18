import React from "react";

// redux
import { useDispatch } from "react-redux";
import { changeAuthData } from "../store/authSlice";

const Profile = () => {
  const dispatch = useDispatch();
  const logOut = () => {
    localStorage.removeItem("auth");
    dispatch(changeAuthData({ data: null, isLoggedIn: false }));
  };
  return (
    <div className="pb-12">
      <div className="container">
        <h1 className="mb-7">Profil</h1>
        <button className="main-btn" onClick={logOut}>
          Chiqish
        </button>
      </div>
    </div>
  );
};

export default Profile;
