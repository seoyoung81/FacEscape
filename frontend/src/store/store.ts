import { configureStore } from '@reduxjs/toolkit';
import categoryReducer from './categorySlice';
import searchReducer from './searchSlice';


export type UserState = {
  token: string | null;
};

export type UserActionTypes = {
    type: 'SET_TOKEN';
    payload: string;
  };
  
export const setToken = (token: string): UserActionTypes => ({
  type: 'SET_TOKEN',
  payload: token,
});

const initialState: UserState = {
  token: null,
};

// 회원관리
const userReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case 'SET_TOKEN':
      return {
        ...state,
        token: action.payload,
      };
    default:
      return state;
  }
};

const store = configureStore({
    reducer: {
      // user 회원관리
        user: userReducer,
      // category 상점관리
        setItemType: categoryReducer,
      // keyword 상점관리
        setKeyword: searchReducer,
    },
});

// RootState 타입 정의
export type RootState = ReturnType<typeof store.getState>;

export default store;

