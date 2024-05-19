import { createSlice } from "@reduxjs/toolkit";

const initialStateValues = {
  newsData: {},
};

export const newsDataSlice = createSlice({
  name: "newsData",
  initialState: initialStateValues,
  reducers: {
    setNewsData: (state, action) => {
      state.newsData[action.payload.dataIndex] = action.payload.data;
    },

    deleteNewsData: (state, action) => {
      state.newsData[action.payload.dataIndex] = state.newsData[
        action.payload.dataIndex
      ].filter((news) => news.id !== action.payload.id);
    },
  },
});

export const { setNewsData, deleteNewsData } = newsDataSlice.actions;

export default newsDataSlice.reducer;
