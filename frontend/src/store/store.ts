import { configureStore } from '@reduxjs/toolkit';

export type UserState = {
  token: string | null;
};

const initialState: UserState = {
  token: null,
};


const userReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case 'SET_TOKEN':
      return {
        ...state,
        token: action.payload,
      };
    // case 'CLEAR_TOKEN':
    //   return {
    //     ...state,
    //     token: null,
    //   };
    default:
      return state;
  }
};

const store = configureStore({
    reducer: {
        user: userReducer,
    }
});

export default store;

export type UserActionTypes = {
    type: 'SET_TOKEN';
    payload: string;
  };
  
export const setToken = (token: string): UserActionTypes => ({
  type: 'SET_TOKEN',
  payload: token,
});

