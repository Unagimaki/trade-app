import type { RootState } from "@/app/store";

export const selectTables = (state: RootState) => state.tables.tables;

export const selectTableById = (state: RootState, tableId: string) =>
  state.tables.tables.find((table) => table.id === tableId) ?? null;
