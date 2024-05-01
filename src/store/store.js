import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import productsDataSlice from "./productsDataSlice";
import usersDataSlice from "./usersDataSlice";

export const store = configureStore({
  reducer: {
    authData: authSlice,
    productsData: productsDataSlice,
    usersData: usersDataSlice,
  },
});
