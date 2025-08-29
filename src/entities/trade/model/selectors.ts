import type { RootState } from "@/app/store";

export const selectTrades = (s: RootState) => s.trades.items;
