import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: 'donut',
    initialState: {
        totalPrice: 0,
        cardHolderName: "",
        cardNumber: "",
        exDate: "",
        code: "",
        selectedCardType: 0
    },
    reducers: {
        setTotalPrice: (state, action) => {
            state.totalPrice = action.payload
        },
        setCardHolderName: (state, action) => {
            state.cardHolderName = action.payload;
        },
        setCardNumber: (state, action) => {
            state.cardNumber = action.payload;
        },
        setExDate: (state, action) => {
            state.exDate = action.payload;
        },
        setCode: (state, action) => {
            state.code = action.payload;
        },
        setCartType: (state, action) => {
            state.selectedCardType = action.payload
        }
    }
})

export const { setTotalPrice, setCardHolderName, setCardNumber, setExDate, setCode, setCartType } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;