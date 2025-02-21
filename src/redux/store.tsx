import { configureStore } from "@reduxjs/toolkit";
import cartSlicereducer from "./cart"

export const store = configureStore({
    reducer:{
        cart: cartSlicereducer,
    },
})