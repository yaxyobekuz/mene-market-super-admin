import authSlice from "./authSlice";
import newsDataSlice from "./newsDataSlice";
import usersDataSlice from "./usersDataSlice";
import reviewsDataSlice from "./reviewsDataSlice";
import { configureStore } from "@reduxjs/toolkit";
import productsDataSlice from "./productsDataSlice";

export const store = configureStore({
  reducer: {
    authData: authSlice,
    newsData: newsDataSlice,
    usersData: usersDataSlice,
    reviewsData: reviewsDataSlice,
    productsData: productsDataSlice,
  },
});
