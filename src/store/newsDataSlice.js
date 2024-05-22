import { createSlice } from "@reduxjs/toolkit";

const initialStateValues = {
  newsData: [],
};

export const newsDataSlice = createSlice({
  name: "newsData",
  initialState: initialStateValues,
  reducers: {
    setNewsData: (state, action) => {
      state.newsData = action.payload;
    },

    deleteNewsData: (state, action) => {
      state.newsData = state.newsData.filter(
        (news) => news.id !== action.payload
      );
    },
  },
});

export const { setNewsData, deleteNewsData } = newsDataSlice.actions;

export default newsDataSlice.reducer;
