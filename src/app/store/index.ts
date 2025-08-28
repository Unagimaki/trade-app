import { configureStore } from "@reduxjs/toolkit";
import settingsReducer from "@/entities/settings/model/slice";
import { useDispatch, useSelector, type TypedUseSelectorHook } from "react-redux";


export const store = configureStore({
    reducer: {
        settings: settingsReducer,
        trades: tradesReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;