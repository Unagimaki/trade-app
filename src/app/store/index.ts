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
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import settingsReducer from "@/entities/settings/model/slice";
import tradesReducer from "@/entities/trade/model/slice";
import uiReducer from "@/app/uiSlice";

import { useDispatch, useSelector, type TypedUseSelectorHook } from "react-redux";

// Конфигурация persist для каждого редюсера
const tradesPersistConfig = {
  key: 'trades',
  storage,
  whitelist: ['items'] // сохраняем только items из trades
};

const settingsPersistConfig = {
  key: 'settings', 
  storage,
  // сохраняем все настройки
};

const uiPersistConfig = {
  key: 'ui',
  storage,
  whitelist: ['theme'] // сохраняем только тему, например
};

// Обертываем редюсеры в persist
const persistedTradesReducer = persistReducer(tradesPersistConfig, tradesReducer);
const persistedSettingsReducer = persistReducer(settingsPersistConfig, settingsReducer);
const persistedUiReducer = persistReducer(uiPersistConfig, uiReducer);

export const store = configureStore({
  reducer: {
    settings: persistedSettingsReducer,
    trades: persistedTradesReducer,
    ui: persistedUiReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;