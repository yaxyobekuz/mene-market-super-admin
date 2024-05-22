import loginSlice from "./loginSlice";
import newsDataSlice from "./newsDataSlice";
import usersDataSlice from "./usersDataSlice";
import reviewsDataSlice from "./reviewsDataSlice";
import { configureStore } from "@reduxjs/toolkit";
import productsDataSlice from "./productsDataSlice";

export const store = configureStore({
  reducer: {
    isLoggedIn: loginSlice,
    newsData: newsDataSlice,
    usersData: usersDataSlice,
    reviewsData: reviewsDataSlice,
    productsData: productsDataSlice,
  },
});
