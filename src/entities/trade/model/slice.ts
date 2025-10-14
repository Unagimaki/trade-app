import type { Trade } from "./types";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { generateId } from "@/shared/lib/generateId";

export interface TradesState {
    items: Trade[];
}

const initialState: TradesState = {
    items: []
}

export const tradesListSlice = createSlice({
    name: "tradesList",
    initialState,
    reducers: {
        addTrade: (state: TradesState, action: PayloadAction<Omit<Trade, "id">>) => {
            state.items.unshift({ ...action.payload, id: generateId() });
        },
        removeTrade: (state, action: PayloadAction<string>) => {
            state.items = state.items.filter(t => t.id !== action.payload);
        },
        clearAll: (state) => {
            state.items = [];
        },
        setTradeDirection: (state, action: PayloadAction<{id: string, direction: 'long' | 'short' | null}>) => {
            const { id, direction } = action.payload;
            const tradeToUpdate = state.items.find(trade => trade.id === id);
            if (tradeToUpdate) tradeToUpdate.direction = direction
        },
        setTradeImage: (state, action: PayloadAction<{ id: string; img: string | null }>) =>{
            const t = state.items.find(x => x.id === action.payload.id);
            if (t) t.img = action.payload.img;
        },
        updateTradeField: (state, action: PayloadAction<{id: string; field: keyof Trade; value: any}>) => {
            const { id, field, value } = action.payload;
            const trade = state.items.find(t => t.id === id);
            if (trade) {
                // @ts-expect-error — т.к. field динамический, TS не сможет проверить тип значения
                trade[field] = value;
            }
        },
        addTradeColumn: (state, action: PayloadAction<string>) => {
            const columnName = action.payload.trim();
            if (!columnName) return;

            // добавляем поле в extra каждой сделки
            state.items.forEach((trade) => {
                if (!trade.extra) trade.extra = {};
                if (!(columnName in trade.extra)) {
                    trade.extra[columnName] = null;
                }
            });
        },
    },   
})

export const { addTrade, removeTrade, clearAll, setTradeImage, setTradeDirection, updateTradeField, addTradeColumn } = tradesListSlice.actions;
export default tradesListSlice.reducer;