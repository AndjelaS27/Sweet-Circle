import { configureStore } from "@reduxjs/toolkit";
import { donutReducer } from './slices/donutSlice';
import { languageReducer } from "./slices/languageSlice";
import { createDonutReducer } from "./slices/createDonutSlice";
import { createBoxReducer} from './slices/createBoxSlice';
import { cartReducer } from "./slices/cartSlice";

const store = configureStore({
    reducer: {
        donut: donutReducer,
        language: languageReducer,
        createDonut: createDonutReducer,
        createBox: createBoxReducer,
        cart: cartReducer
    }
})

export { store };