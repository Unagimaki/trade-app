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
    },   
})

export const { addTrade, removeTrade, clearAll, setTradeImage, setTradeDirection } = tradesListSlice.actions;
export default tradesListSlice.reducer;