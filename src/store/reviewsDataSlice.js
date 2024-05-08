import { createSlice } from "@reduxjs/toolkit";

const initialStateValues = {
  reviewsData: [],
};

export const reviewsDataSlice = createSlice({
  name: "comments",
  initialState: initialStateValues,
  reducers: {
    setReviewsData: (state, action) => {
      state.reviewsData = action.payload;
    },

    deleteReviewData: (state, action) => {
      state.reviewsData = state.reviewsData.filter(
        (review) => review.id !== action.payload
      );
    },
  },
});

export const { setReviewsData, deleteReviewData } = reviewsDataSlice.actions;

export default reviewsDataSlice.reducer;
