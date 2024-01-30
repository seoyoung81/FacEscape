import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SelectedItemTypeState {
    itemType: string;
};

const initialState: SelectedItemTypeState = {
    itemType: "",
};


const myItemCategorySlice = createSlice({
    name: 'itemType',
    initialState,
    reducers: {
        setMyItemType: (state, action: PayloadAction<string>) => {
            state.itemType = action.payload;
        }
    }
})

export const { setMyItemType } = myItemCategorySlice.actions;

export default myItemCategorySlice.reducer;