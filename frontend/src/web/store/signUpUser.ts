import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SignUpUserState {
  user: number;
}

const initialState: SignUpUserState = {
  user: 0,
};

const SignUpUserSlice = createSlice({
  name: "todaySignUp",
  initialState,
  reducers: {
    todaySignUpUser: (state, action: PayloadAction<number>) => {
      state.user += action.payload;
    },
  },
});

export const { todaySignUpUser } = SignUpUserSlice.actions;

export default SignUpUserSlice.reducer;
