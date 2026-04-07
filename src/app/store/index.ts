import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import tablesReducer from "@/entities/table/model/slice";
import uiReducer from "@/features/view-screen-preview/model/uiSlice";
import { useDispatch, useSelector, type TypedUseSelectorHook } from "react-redux";

const uiPersistConfig = {
  key: "ui",
  storage,
};

const tablesPersistConfig = {
  key: "tables",
  storage,
};

const persistedUiReducer = persistReducer(uiPersistConfig, uiReducer);
const persistedTablesReducer = persistReducer(tablesPersistConfig, tablesReducer);

export const store = configureStore({
  reducer: {
    ui: persistedUiReducer,
    tables: persistedTablesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
