export type TableCellValue = string | number | null;
export type TableColumnKind = "text" | "number" | "image";
export type TableColumnRole =
  | "tradeType"
  | "direction"
  | "rr"
  | "risk"
  | "date"
  | "image"
  | "custom";

export type TableColumn = {
  key: string;
  label: string;
  kind?: TableColumnKind;
  role?: TableColumnRole;
};

export type TableRow = {
  id: string;
  values: Record<string, TableCellValue>;
};

export type Table = {
  id: string;
  name: string;
  columns: TableColumn[];
  rows: TableRow[];
};

export type TableState = {
  tables: Table[];
};
