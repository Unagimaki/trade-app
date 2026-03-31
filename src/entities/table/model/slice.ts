import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Trade, TradeExtraValue } from "@/entities/trade/model/types";
import { generateId } from "@/shared/lib/generateId";
import type { Table, TableColumn, TableState } from "./types";

const defaultColumns: TableColumn[] = [
  { key: "type", label: "Type" },
  { key: "direction", label: "Direction" },
  { key: "rr", label: "RR", kind: "number" },
  { key: "risk", label: "Risk", kind: "number" },
  { key: "date", label: "Date" },
  { key: "img", label: "Image", kind: "image" },
];

const initialState: TableState = {
  tables: [],
};

const baseTradeFields = new Set(["id", "date", "type", "direction", "rr", "risk", "img", "imgs", "extra"]);

function createEmptyTrade(): Trade {
  return {
    id: generateId(),
    date: new Date().toISOString(),
    type: undefined,
    direction: null,
    rr: undefined,
    risk: undefined,
    img: null,
    imgs: null,
    extra: {},
  };
}

function getTable(state: TableState, tableId: string) {
  return state.tables.find((table) => table.id === tableId);
}

function setTradeValue(trade: Trade, field: string, value: TradeExtraValue) {
  if (baseTradeFields.has(field)) {
    switch (field) {
      case "date":
        trade.date = typeof value === "string" ? value : trade.date;
        return;
      case "type":
        trade.type = value === "win" || value === "loss" || value === "break-even" ? value : undefined;
        return;
      case "direction":
        trade.direction = value === "long" || value === "short" || value === null ? value : null;
        return;
      case "rr":
      case "risk":
        trade[field] = typeof value === "number" ? value : value === null || value === "" ? undefined : Number(value);
        return;
      case "img":
        trade.img = typeof value === "string" || value === null ? value : null;
        return;
      default:
        return;
    }
  }

  trade.extra = trade.extra ?? {};
  trade.extra[field] = value;
}

export const tablesListSlice = createSlice({
  name: "tablesList",
  initialState,
  reducers: {
    createTable: (state) => {
      const nextIndex = state.tables.length + 1;

      state.tables.unshift({
        id: generateId(),
        name: `Таблица ${nextIndex}`,
        columns: [...defaultColumns],
        trades: [],
      });
    },
    addTable: (state, action: PayloadAction<Omit<Table, "id">>) => {
      state.tables.unshift({ ...action.payload, id: generateId() });
    },
    removeTable: (state, action: PayloadAction<string>) => {
      state.tables = state.tables.filter((t) => t.id !== action.payload);
    },
    renameTable: (state, action: PayloadAction<{ id: string; name: string }>) => {
      const table = state.tables.find((t) => t.id === action.payload.id);
      if (table) table.name = action.payload.name;
    },
    addTableRow: (state, action: PayloadAction<{ tableId: string }>) => {
      const table = getTable(state, action.payload.tableId);
      if (!table) return;
      table.trades.unshift(createEmptyTrade());
    },
    removeTableRow: (state, action: PayloadAction<{ tableId: string; tradeId: string }>) => {
      const table = getTable(state, action.payload.tableId);
      if (!table) return;
      table.trades = table.trades.filter((trade) => trade.id !== action.payload.tradeId);
    },
    updateTableCell: (
      state,
      action: PayloadAction<{ tableId: string; tradeId: string; field: string; value: TradeExtraValue }>
    ) => {
      const table = getTable(state, action.payload.tableId);
      if (!table) return;

      const trade = table.trades.find((row) => row.id === action.payload.tradeId);
      if (!trade) return;

      setTradeValue(trade, action.payload.field, action.payload.value);
    },
    addTableColumn: (state, action: PayloadAction<{ tableId: string; key: string; label?: string; kind?: TableColumn["kind"] }>) => {
      const table = getTable(state, action.payload.tableId);
      if (!table) return;

      const key = action.payload.key.trim();
      if (!key || table.columns.some((column) => column.key === key)) return;

      table.columns.push({
        key,
        label: action.payload.label?.trim() || key,
        kind: action.payload.kind,
      });
    },
  },
});

export const {
  createTable,
  addTable,
  removeTable,
  renameTable,
  addTableRow,
  removeTableRow,
  updateTableCell,
  addTableColumn,
} = tablesListSlice.actions;
export default tablesListSlice.reducer;
