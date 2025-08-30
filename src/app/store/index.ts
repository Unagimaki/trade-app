import { configureStore } from "@reduxjs/toolkit";
import settingsReducer from "@/entities/settings/model/slice";
import tradesReducer from "@/entities/trade/model/slice";
import uiReducer from "@/app/uiSlice";

import { useDispatch, useSelector, type TypedUseSelectorHook } from "react-redux";


export const store = configureStore({
    reducer: {
        settings: settingsReducer,
        trades: tradesReducer,
        ui: uiReducer
    }
})

// store.subscribe(() => {
//     console.log(`Изменен риск ${store.getState().settings.riskPercent}`);
//     console.log(`Изменен рр ${store.getState().settings.plannedRR}`);
// })

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;