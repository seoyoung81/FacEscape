import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface userInfoState {
    value: string,
};

const initialState: userInfoState = {
    value: "",
};

const userInfoSlice = createSlice({
    name: 'userNickName',
    initialState,
    reducers: {
        setUserNickName: (state, action: PayloadAction<string>) => {
            state.value = action.payload;
        }
    }
})

export const { setUserNickName } = userInfoSlice.actions;
export default userInfoSlice.reducer;
