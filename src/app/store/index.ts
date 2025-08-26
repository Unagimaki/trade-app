import { configureStore } from "@reduxjs/toolkit";


export const store = configureStore({
    reducer: {
        settings: settingsReducer,
        trades: tradesReducer,
    }
})