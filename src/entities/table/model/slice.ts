import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { generateId } from "@/shared/lib/generateId";
import type { Table, TableCellValue, TableColumn, TableRow, TableState } from "./types";

const defaultColumns: TableColumn[] = [
  { key: "type", label: "Type", role: "tradeType" },
  { key: "direction", label: "Direction", role: "direction" },
  { key: "rr", label: "RR", kind: "number", role: "rr" },
  { key: "risk", label: "Risk", kind: "number", role: "risk" },
  { key: "date", label: "Date", role: "date" },
];

const initialState: TableState = {
  tables: [],
};

function createEmptyRow(table: Table): TableRow {
  return {
    id: generateId(),
    values: Object.fromEntries(table.columns.map((column) => [column.key, null])),
  };
}

function getTable(state: TableState, tableId: string) {
  return state.tables.find((table) => table.id === tableId);
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
        rows: [],
        view: {
          wrapText: false,
        },
      });
    },
    addTable: (state, action: PayloadAction<Omit<Table, "id">>) => {
      state.tables.unshift({ ...action.payload, id: generateId() });
    },
    removeTable: (state, action: PayloadAction<string>) => {
      state.tables = state.tables.filter((table) => table.id !== action.payload);
    },
    renameTable: (state, action: PayloadAction<{ id: string; name: string }>) => {
      const table = state.tables.find((item) => item.id === action.payload.id);
      if (table) table.name = action.payload.name;
    },
    toggleTableWrapText: (state, action: PayloadAction<{ tableId: string }>) => {
      const table = getTable(state, action.payload.tableId);
      if (!table) return;

      table.view.wrapText = !table.view.wrapText;
    },
    importTableData: (
      state,
      action: PayloadAction<{ tableId: string; columns: TableColumn[]; rows: TableRow[] }>
    ) => {
      const table = getTable(state, action.payload.tableId);
      if (!table) return;

      table.columns = action.payload.columns;
      table.rows = action.payload.rows;
    },
    addTableRow: (state, action: PayloadAction<{ tableId: string }>) => {
      const table = getTable(state, action.payload.tableId);
      if (!table) return;

      table.rows.push(createEmptyRow(table));
    },
    removeTableRow: (state, action: PayloadAction<{ tableId: string; rowId: string }>) => {
      const table = getTable(state, action.payload.tableId);
      if (!table) return;
      table.rows = table.rows.filter((row) => row.id !== action.payload.rowId);
    },
    updateTableCell: (
      state,
      action: PayloadAction<{ tableId: string; rowId: string; field: string; value: TableCellValue }>
    ) => {
      const table = getTable(state, action.payload.tableId);
      if (!table) return;

      const row = table.rows.find((item) => item.id === action.payload.rowId);
      if (!row) return;

      row.values[action.payload.field] = action.payload.value;
    },
    addTableColumn: (
      state,
      action: PayloadAction<{
        tableId: string;
        key: string;
        label?: string;
        kind?: TableColumn["kind"];
        role?: TableColumn["role"];
      }>
    ) => {
      const table = getTable(state, action.payload.tableId);
      if (!table) return;

      const key = action.payload.key.trim();
      if (!key || table.columns.some((column) => column.key === key)) return;

      table.columns.push({
        key,
        label: action.payload.label?.trim() || key,
        kind: action.payload.kind,
        role: action.payload.role ?? "custom",
      });

      table.rows.forEach((row) => {
        row.values[key] = null;
      });
    },
    renameTableColumn: (
      state,
      action: PayloadAction<{ tableId: string; columnKey: string; label: string }>
    ) => {
      const table = getTable(state, action.payload.tableId);
      if (!table) return;

      const column = table.columns.find((item) => item.key === action.payload.columnKey);
      const nextLabel = action.payload.label.trim();
      if (!column || !nextLabel) return;

      column.label = nextLabel;
    },
    removeTableColumn: (state, action: PayloadAction<{ tableId: string; columnKey: string }>) => {
      const table = getTable(state, action.payload.tableId);
      if (!table) return;

      table.columns = table.columns.filter((column) => column.key !== action.payload.columnKey);
      table.rows.forEach((row) => {
        delete row.values[action.payload.columnKey];
      });
    },
  },
});

export const {
  createTable,
  addTable,
  removeTable,
  renameTable,
  toggleTableWrapText,
  importTableData,
  addTableRow,
  removeTableRow,
  updateTableCell,
  addTableColumn,
  renameTableColumn,
  removeTableColumn,
} = tablesListSlice.actions;
export default tablesListSlice.reducer;
