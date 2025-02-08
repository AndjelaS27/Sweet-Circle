import { createSlice } from "@reduxjs/toolkit";

const createBoxSlice = createSlice({
    name: 'createBox',
    initialState: {
        totalCount: 0,
        activeBox: '3',
        countList: [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ]
    },
    reducers: {
        setTotalCount: (state, action) => {
            state.totalCount = action.payload;
        },
        setActiveBox: (state, action) => {
            state.activeBox = action.payload;
        },
        setCountList: (state, action) => {
            state.countList = action.payload;
        }
    }
})

export const { setTotalCount, setActiveBox, setCountList } = createBoxSlice.actions;
export const createBoxReducer = createBoxSlice.reducer;