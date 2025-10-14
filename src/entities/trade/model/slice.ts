import type { Trade } from "./types";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { generateId } from "@/shared/lib/generateId";

export interface TradesState {
  items: Trade[];
  columns: string[];
}

const defaultColumns = ["type", "direction", "rr", "risk", "date", "img"];

const initialState: TradesState = {
  items: [],
  columns: defaultColumns,
};

export const tradesListSlice = createSlice({
  name: "tradesList",
  initialState,
  reducers: {
    addTrade: (state, action: PayloadAction<Omit<Trade, "id">>) => {
      state.items.unshift({ ...action.payload, id: generateId() });
    },

    removeTrade: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((t) => t.id !== action.payload);
    },

    clearAll: (state) => {
      state.items = [];
    },

    setTradeDirection: (
      state,
      action: PayloadAction<{ id: string; direction: "long" | "short" | null }>
    ) => {
      const { id, direction } = action.payload;
      const trade = state.items.find((t) => t.id === id);
      if (trade) trade.direction = direction;
    },

    setTradeImage: (
      state,
      action: PayloadAction<{ id: string; img: string | null }>
    ) => {
      const trade = state.items.find((t) => t.id === action.payload.id);
      if (trade) trade.img = action.payload.img;
    },

    updateTradeField: (
      state,
      action: PayloadAction<{ id: string; field: keyof Trade; value: any }>
    ) => {
      const { id, field, value } = action.payload;
      const trade = state.items.find((t) => t.id === id);
      if (trade) {
        // @ts-expect-error — динамическое поле
        trade[field] = value;
      }
    },

    addTradeColumn: (state, action: PayloadAction<string>) => {
      const column = action.payload.trim();
      if (!column || state.columns.includes(column)) return;
      state.columns.push(column);
      // ⚠️ Мы НЕ трогаем сделки — это устраняет массовые ререндеры
    },
  },
});

export const {
  addTrade,
  removeTrade,
  clearAll,
  setTradeImage,
  setTradeDirection,
  updateTradeField,
  addTradeColumn,
} = tradesListSlice.actions;

export default tradesListSlice.reducer;
