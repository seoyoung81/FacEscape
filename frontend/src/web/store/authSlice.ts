import { createSlice } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; 

export interface IsLogInTypeState {
  isLogIn: boolean;
}

const initialState :IsLogInTypeState = {
  isLogIn: false,
};

const persisConfig = {
  key: 'root',
  storage,
  whitelist: ['isLogIn'],
}

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

export default persistReducer(persisConfig, authSlice.reducer);