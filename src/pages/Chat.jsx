import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

// images
import userImg from "../assets/images/user.jpg";
import sendImg from "../assets/images/send.svg";
import arrowRigtImg from "../assets/images/arrow-right.svg";
import arrowRightSolidImg from "../assets/images/arrow-right-solid.svg";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "../axios/axiosInstance";
import { errorMessage, getElement } from "../helpers/helpers";
import Messages from "../components/Messages";
import Loader from "../components/Loader";
import { setUserData } from "../store/userDataSlice";

const Chat = () => {
  const dispatch = useDispatch();
  const { chatId } = useParams();
  const [msg, setMsg] = useState("");
  const [loader, setLoader] = useState(true);
  const [messages, setMessages] = useState([]);
  const [loader2, setLoader2] = useState(false);
  const userData = useSelector((store) => store.userData);
  const [appealNameValue, setAppealNameValue] = useState(null);
  const [openCreateNewAppealModal, setOpenCreateNewAppealModal] =
    useState(false);

  const getAppealMessages = () => {
    setLoader(true);

    axiosInstance
      .get("/Chat/ById?id=" + chatId)
      .then((res) => {
        if (res.status === 200) {
          setMessages(res.data.chatMessages);
        } else errorMessage();
      })
      .catch((err) => {
        console.log("err" + err);
      })
      .finally(() => setLoader(false));
  };

  const getUserData = () => {
    setLoader(true);

    // send a request
    axiosInstance
      .get("/User/Profile")
      .then((res) => {
        if (res.status === 200) {
          // set user data
          dispatch(setUserData(res.data));
        } else errorMessage();
      })
      .catch(() => errorMessage.offline());
  };

  useEffect(() => {
    if (userData.data) {
      getAppealMessages();
    } else {
      getUserData();
    }
  }, [userData]);

  const sendMessage = (e) => {
    e.preventDefault();
    const input = getElement(e, "input");

    if (!loader && !loader2 && msg.length > 0) {
      setLoader2(true);

      const formData = {
        text: msg,
        chatId: chatId,
        userId: userData.data.userId,
        messagedDate: "2024-06-25T03:12:08.770Z",
      };

      axiosInstance
        .post("/Message", formData)
        .then((res) => {
          setMsg("");
          input.value = "";
          setMessages([...messages, res.data]);
        })
        .finally(() => setLoader2(false));
    }
  };

  return (
    <div className="container">
      <div className="flex flex-col gap-5 py-5 h-screen">
        {/* header */}
        <div className="flex items-center justify-between gap-6 bg-brand-dark-800/5 p-3 rounded-xl xs:p-3.5 xs:px-5">
          <Link to="/appeals" className="p-1 shrink-0">
            <img
              width={20}
              height={20}
              src={arrowRigtImg}
              alt="arrow left icon"
              className="size-5 rotate-180"
            />
          </Link>

          {/* user name */}
          <h1 className="text-base line-clamp-1 sm:text-lg">Ismat aka</h1>

          {/* user profile image */}
          <img
            width={44}
            height={44}
            src={userImg}
            alt="user image"
            className="size-9 shrink-0 object-cover bg-brand-dark-800/10 rounded-full border-2 border-brand-dark-800 sm:size-11"
          />
        </div>

        {/* messages */}
        <div className="flex justify-center overflow-auto hidden-scroll grow bg-brand-dark-800/5 p-3.5 rounded-xl xs:p-5">
          {!loader ? (
            <Messages
              messages={messages}
              currentUserId={userData.data.userId}
            />
          ) : (
            <div className="flex items-center justify-center w-full h-full">
              <Loader size={24} />
            </div>
          )}
        </div>

        {/* send message */}
        <form
          onSubmit={sendMessage}
          className="flex items-center relative bg-brand-dark-800/5 rounded-2xl"
        >
          <input
            type="text"
            maxLength={240}
            name="send a message"
            placeholder="Xabar yuborish"
            onChange={(e) => setMsg(e.target.value.trim().slice(0, 240))}
            className="grow bg-transparent pl-6 pr-20 py-5 rounded-xl text-base focus:!outline-0 !border-0 placeholder:transition-opacity focus:placeholder:opacity-50 sm:text-lg sm:py-[22px]"
          />

          {/* submit button */}
          <button
            disabled={loader && loader2}
            className="absolute right-3 main-btn p-3"
          >
            {!loader2 ? (
              <img
                width={24}
                height={24}
                src={sendImg}
                alt="send icon"
                className="size-6"
              />
            ) : (
              <Loader size={24} />
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
