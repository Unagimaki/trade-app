import type { Trade } from "@/entities/trade/model/types";

export type TableColumnKind = "text" | "number" | "image";

export type TableColumn = {
  key: string;
  label: string;
  kind?: TableColumnKind;
};

export type Table = {
  id: string;
  name: string;
  columns: TableColumn[];
  trades: Trade[];
};

export type TableState = {
  tables: Table[];
};
