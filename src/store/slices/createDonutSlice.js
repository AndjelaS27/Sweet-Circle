import { createSlice } from "@reduxjs/toolkit";

const createDonutSlice = createSlice({
    name: 'createDonut',
    initialState: {
        activeFilling: 'Chocolate',
        activeGlaze: 'Strawberry',
        activeSprinkles: 'Caramel',
        donutNumber: 0
    },
    reducers: {
        setFilling: (state, action) => {
            state.activeFilling = action.payload;
        },
        setGlaze: (state, action) => {
            state.activeGlaze = action.payload;
        },
        setSprinkles: (state, action) => {
            state.activeSprinkles = action.payload;
        },
        setNumber: (state, action) => {
            state.donutNumber = action.payload;
        }
    }
})

export const { setFilling, setGlaze, setSprinkles, setNumber } = createDonutSlice.actions;
export const createDonutReducer = createDonutSlice.reducer;