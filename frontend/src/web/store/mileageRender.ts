import { createSlice } from "@reduxjs/toolkit";

const mileageRenderSlice = createSlice({
  name: "mileageRender",
  initialState: false,
  reducers: {
    toggleMileageRender: (state) => !state,
  },
});

export const { toggleMileageRender } = mileageRenderSlice.actions;

export default mileageRenderSlice.reducer;
