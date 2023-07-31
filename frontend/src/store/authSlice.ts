import { createSlice } from '@reduxjs/toolkit';

export interface IsLogInTypeState {
    isLogIn: boolean;
}

const initialState :IsLogInTypeState = {
  isLogIn: false,
};

const authSlice = createSlice({
  name: 'isLogIn',
  initialState,
  reducers: {
    setIsLogIn: (state, action) => {
      state.isLogIn = action.payload;
    },
  },
});

export const { setIsLogIn } = authSlice.actions;

export default authSlice.reducer;
