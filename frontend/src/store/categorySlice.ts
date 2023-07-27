import { createSlice, PayloadAction, configureStore } from '@reduxjs/toolkit';

interface ItemTypeSate {
    itemType: string;
};

const initialState: ItemTypeSate = {
    itemType: "",
};


const categorySlice = createSlice({
    name: 'itemType',
    initialState,
    reducers: {
        setItemType: (state, action: PayloadAction<string>) => {
            state.itemType = action.payload;
        }
    }
})

export const { setItemType } = categorySlice.actions;

export default categorySlice.reducer;