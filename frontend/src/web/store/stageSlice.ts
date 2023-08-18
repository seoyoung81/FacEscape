import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface stageState {
    stage: number;
};

const initialState: stageState = {
    stage: 1,
}

const stageSlice = createSlice({
    name: 'stage',
    initialState,
    reducers: {
        setStage: (state, action: PayloadAction<number>) => {
            state.stage = action.payload;
        }
    },
})

export const { setStage } = stageSlice.actions;

export default stageSlice.reducer;