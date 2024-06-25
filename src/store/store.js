import loginSlice from "./loginSlice";
import newsDataSlice from "./newsDataSlice";
import userDataSlice from "./userDataSlice";
import usersDataSlice from "./usersDataSlice";
import reviewsDataSlice from "./reviewsDataSlice";
import { configureStore } from "@reduxjs/toolkit";
import productsDataSlice from "./productsDataSlice";

export const store = configureStore({
  reducer: {
    isLoggedIn: loginSlice,
    userData: userDataSlice,
    newsData: newsDataSlice,
    usersData: usersDataSlice,
    reviewsData: reviewsDataSlice,
    productsData: productsDataSlice,
  },
});
