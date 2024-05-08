import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import productsDataSlice from "./productsDataSlice";
import usersDataSlice from "./usersDataSlice";
import reviewsDataSlice from "./reviewsDataSlice";

export const store = configureStore({
  reducer: {
    authData: authSlice,
    productsData: productsDataSlice,
    usersData: usersDataSlice,
    reviewsData: reviewsDataSlice,
  },
});
