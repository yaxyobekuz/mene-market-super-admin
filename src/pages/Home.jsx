import React, { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
  const [users, setusers] = useState([]);
  const [storedToken, setstoredToken] = useState("");
  const [token, settoken] = useState("");
  const [isCopied, setisCopied] = useState(false);
  const [loader, setloader] = useState(false);
  const [error, seterror] = useState(false);

  // get users
  const getUsers = () => {
    if (token.length > 0) {
      setloader(true);
      axios
        .get("https://menemarcket.azurewebsites.net/api/User", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          localStorage.setItem("mene-market-token", token);
          seterror(false);
          setusers(response.data);
        })
        .catch(() => {
          seterror(true);
          setusers([]);
        })
        .finally(() => setloader(false));
    }
  };

  // delete user
  const deleteUser = (user) => {
    // console.log(user);
    if (token.length > 0) {
      axios
        .delete(
          `https://menemarcket.azurewebsites.net/api/User?id=${user.userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then(() => {
          getUsers();
        })
        .catch((error) => {
          console.log(error);
          window.scrollTo(0, 0);
          seterror(true);
        });
    }
  };

  // stored token
  useEffect(() => {
    const getToken = localStorage.getItem("mene-market-token");
    if (getToken) {
      setstoredToken(getToken);
      settoken(getToken);
    } else {
      setstoredToken(false);
    }
  }, []);

  // remove is copied
  useEffect(() => {
    setTimeout(() => {
      setisCopied(false);
    }, 5000);
  }, [isCopied]);

  return (
    <>
      <div className="py-24 text-lg font-medium text-gray-600">
        <div className="container">
          <h1 className="text-5xl font-bold text-gray-700 mb-10">
            Mene market users
          </h1>

          {/* get token */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              getUsers();
            }}
            className="flex flex-col space-y-4 p-5 rounded-lg border-2 border-gray-300 max-w-max mb-10"
          >
            <label className="flex flex-col space-y-3">
              <span className="flex justify-between">
                <span className="text-xl font-semibold">Token</span>
                <button
                  type="button"
                  disabled={isCopied}
                  className="disabled:opacity-70"
                  onClick={() => {
                    setisCopied(true);
                    navigator.clipboard.writeText(token);
                  }}
                >
                  {isCopied ? "Copied!" : "Copy"}
                </button>
              </span>

              <input
                defaultValue={storedToken ? storedToken : ""}
                type="text"
                className={`
                ${!loader && error && " effect-shake"}
                ${
                  error
                    ? "border-red-500 focus:border-red-500"
                    : "border-gray-300 focus:border-green-500"
                } w-96 border-2 rounded focus:outline-none p-3`}
                placeholder="Bearer ${token}"
                onChange={(e) => settoken(e.target.value)}
              />
            </label>
            <button className="w-96 bg-green-500 text-white border-2 border-green-500 rounded focus:outline-none focus:border-green-500 p-3">
              Get users
            </button>
          </form>

          {/* users list */}
          <section className="space-y-10">
            <h2 className="text-4xl font-bold text-gray-700">Existing users</h2>

            {/* users */}
            {!loader ? (
              <ul className="grid grid-cols-3 gap-5">
                {users.length > 0 ? (
                  users.map((user, index) => {
                    return (
                      <li
                        key={index}
                        className="flex flex-col border-2 border-gray-300 rounded-xl p-5 space-y-3"
                      >
                        <h3 className="text-xl font-bold line-clamp-1">
                          {user.firstName} {user.lastName}
                        </h3>
                        <p className="line-clamp-1">Id: {user.userId}</p>
                        <p className="line-clamp-1">Email: {user.email}</p>
                        <p className="grow">Password: {user.password}</p>
                        <button
                          onClick={() => {
                            deleteUser(user);
                          }}
                          className="w-full rounded bg-red-500 text-white text-center p-3"
                        >
                          Delete user
                        </button>
                      </li>
                    );
                  })
                ) : (
                  <span>No users</span>
                )}
              </ul>
            ) : (
              <ul className="grid grid-cols-3 gap-5">
                <li className="flex flex-col border-2 border-gray-100 rounded-xl p-5 space-y-3">
                  <h3 className="w-10/12 h-7 bg-gray-200/70 rounded"></h3>
                  <p className="w-full h-7 bg-gray-200/70 rounded"></p>
                  <p className="w-full h-7 bg-gray-200/70 rounded"></p>
                  <p className="w-full h-7 bg-gray-200/70 rounded"></p>
                  <p className="w-full h-12 bg-gray-200/70 rounded"></p>
                </li>
                <li className="flex flex-col border-2 border-gray-100 rounded-xl p-5 space-y-3">
                  <h3 className="w-10/12 h-7 bg-gray-200/70 rounded"></h3>
                  <p className="w-full h-7 bg-gray-200/70 rounded"></p>
                  <p className="w-full h-7 bg-gray-200/70 rounded"></p>
                  <p className="w-full h-7 bg-gray-200/70 rounded"></p>
                  <p className="w-full h-12 bg-gray-200/70 rounded"></p>
                </li>
                <li className="flex flex-col border-2 border-gray-100 rounded-xl p-5 space-y-3">
                  <h3 className="w-10/12 h-7 bg-gray-200/70 rounded"></h3>
                  <p className="w-full h-7 bg-gray-200/70 rounded"></p>
                  <p className="w-full h-7 bg-gray-200/70 rounded"></p>
                  <p className="w-full h-7 bg-gray-200/70 rounded"></p>
                  <p className="w-full h-12 bg-gray-200/70 rounded"></p>
                </li>
                <li className="flex flex-col border-2 border-gray-100 rounded-xl p-5 space-y-3">
                  <h3 className="w-10/12 h-7 bg-gray-200/70 rounded"></h3>
                  <p className="w-full h-7 bg-gray-200/70 rounded"></p>
                  <p className="w-full h-7 bg-gray-200/70 rounded"></p>
                  <p className="w-full h-7 bg-gray-200/70 rounded"></p>
                  <p className="w-full h-12 bg-gray-200/70 rounded"></p>
                </li>
                <li className="flex flex-col border-2 border-gray-100 rounded-xl p-5 space-y-3">
                  <h3 className="w-10/12 h-7 bg-gray-200/70 rounded"></h3>
                  <p className="w-full h-7 bg-gray-200/70 rounded"></p>
                  <p className="w-full h-7 bg-gray-200/70 rounded"></p>
                  <p className="w-full h-7 bg-gray-200/70 rounded"></p>
                  <p className="w-full h-12 bg-gray-200/70 rounded"></p>
                </li>
                <li className="flex flex-col border-2 border-gray-100 rounded-xl p-5 space-y-3">
                  <h3 className="w-10/12 h-7 bg-gray-200/70 rounded"></h3>
                  <p className="w-full h-7 bg-gray-200/70 rounded"></p>
                  <p className="w-full h-7 bg-gray-200/70 rounded"></p>
                  <p className="w-full h-7 bg-gray-200/70 rounded"></p>
                  <p className="w-full h-12 bg-gray-200/70 rounded"></p>
                </li>
              </ul>
            )}
          </section>
        </div>
      </div>
    </>
  );
};

export default Home;
