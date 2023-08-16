import { createSlice } from "@reduxjs/toolkit";

const iconRenderSlice = createSlice({
  name: "iconRender",
  initialState: false,
  reducers: {
    toggleIconRender: (state) => !state,
  },
});

export const { toggleIconRender } = iconRenderSlice.actions;

export default iconRenderSlice.reducer;
