import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface nickNameState {
    name: string;
};

const initialState: nickNameState = {
    name: "",
};

const nickNameSlice = createSlice({
    name: 'nickName',
    initialState,
    reducers: {
        setNickName: (state, action: PayloadAction<string>) => {
            state.name = action.payload;
        }
    }
})

export const { setNickName } = nickNameSlice.actions;
export default nickNameSlice.reducer;