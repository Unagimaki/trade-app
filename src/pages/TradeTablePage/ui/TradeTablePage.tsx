import * as XLSX from "xlsx";
import ScreenshotPreview from "@/features/view-screen-preview/ui/ScreenshotPreview";
import { useAppDispatch, useAppSelector } from "@/app/store";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  addTableColumn,
  addTableRow,
  importTableData,
  removeTableColumn,
  removeTableRow,
  renameTable,
  renameTableColumn,
  toggleTableWrapText,
  updateTableCell,
} from "@/entities/table/model/slice";
import type { TableCellValue, TableColumn, TableRow } from "@/entities/table/model/types";
import { selectTableById } from "@/entities/table/model/selectors";
import { useRouter } from "@/shared/hooks/use-router";
import { TradeTableControls } from "@/widgets/trade-table-controls";
import { TradeTableEditor } from "@/widgets/trade-table-editor";
import { TradeTableToolbar } from "@/widgets/trade-table-toolbar";
import { useParams } from "react-router-dom";

function parseInputValue(rawValue: string) {
  const trimmed = rawValue.trim();
  if (trimmed === "") return null;

  const numericValue = Number(trimmed);
  if (!Number.isNaN(numericValue) && trimmed === String(numericValue)) {
    return numericValue;
  }

  return rawValue;
}

function toColumnKey(label: string, fallbackIndex: number, usedKeys: Set<string>) {
  const normalized = label
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9а-я]+/gi, "_")
    .replace(/^_+|_+$/g, "") || `column_${fallbackIndex + 1}`;

  let key = normalized;
  let suffix = 2;

  while (usedKeys.has(key)) {
    key = `${normalized}_${suffix}`;
    suffix += 1;
  }

  usedKeys.add(key);
  return key;
}

function inferColumn(label: string, key: string): Pick<TableColumn, "kind" | "role"> {
  const value = `${label} ${key}`.toLowerCase();

  if (value.includes("image") || value.includes("img") || value.includes("скрин")) {
    return { kind: "image", role: "image" };
  }

  if (value === "rr" || value.includes(" rr")) {
    return { kind: "number", role: "rr" };
  }

  if (value.includes("risk") || value.includes("риск")) {
    return { kind: "number", role: "risk" };
  }

  if (value.includes("date") || value.includes("дата")) {
    return { role: "date" };
  }

  return { role: "custom" };
}

function parseImportedWorkbook(fileName: string, data: ArrayBuffer): { columns: TableColumn[]; rows: TableRow[] } {
  const workbook = XLSX.read(data, { type: "array" });
  const firstSheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[firstSheetName];
  const rows = XLSX.utils.sheet_to_json<(string | number | null)[]>(sheet, {
    header: 1,
    defval: "",
    raw: false,
  });

  if (rows.length === 0) {
    return { columns: [], rows: [] };
  }

  const [headerRow, ...dataRows] = rows;
  const usedKeys = new Set<string>();
  const columns = headerRow.map((cell, index) => {
    const label = String(cell || `Column ${index + 1}`);
    const key = toColumnKey(label, index, usedKeys);

    return {
      key,
      label,
      ...inferColumn(label, key),
    } satisfies TableColumn;
  });

  return {
    columns,
    rows: dataRows.map((row, rowIndex) => {
      const values = columns.reduce<Record<string, TableCellValue>>((acc, column, columnIndex) => {
        acc[column.key] = parseInputValue(String(row[columnIndex] ?? ""));
        return acc;
      }, {});

      return {
        id: `${fileName}_${rowIndex}_${Date.now()}`,
        values,
      } satisfies TableRow;
    }),
  };
}

function exportTableToWorkbook(title: string, columns: TableColumn[], rows: TableRow[]) {
  const aoa = [
    columns.map((column) => column.label),
    ...rows.map((row) => columns.map((column) => row.values[column.key] ?? "")),
  ];

  const worksheet = XLSX.utils.aoa_to_sheet(aoa);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Table");
  XLSX.writeFileXLSX(workbook, `${title || "table"}.xlsx`);
}

export const TradeTablePage = () => {
  const { tableId } = useParams();
  const { goBack } = useRouter();
  const dispatch = useAppDispatch();

  const table = useAppSelector((state) =>
    tableId ? selectTableById(state, tableId) : null
  );

  if (!tableId || !table) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-6">
        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle>Таблица не найдена</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-slate-400">
              Проверьте ссылку или вернитесь к списку таблиц.
            </p>
            <Button variant="outline" onClick={goBack}>
              Назад
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleAddRow = () => {
    dispatch(addTableRow({ tableId }));
  };

  const handleImport = async (file: File) => {
    const buffer = await file.arrayBuffer();
    const imported = parseImportedWorkbook(file.name, buffer);
    if (imported.columns.length === 0) return;

    dispatch(importTableData({ tableId, columns: imported.columns, rows: imported.rows }));
  };

  const handleExport = () => {
    exportTableToWorkbook(table.name, table.columns, table.rows);
  };

  const handleRenameTable = (name: string) => {
    dispatch(renameTable({ id: tableId, name }));
  };

  const handleAddColumn = () => {
    const key = prompt("Введите ключ новой колонки");
    if (!key) return;
    dispatch(addTableColumn({ tableId, key }));
  };

  const handleRenameColumn = (columnKey: string, label: string) => {
    dispatch(renameTableColumn({ tableId, columnKey, label }));
  };

  const handleToggleWrapText = () => {
    dispatch(toggleTableWrapText({ tableId }));
  };

  const handleRemoveColumn = (columnKey: string) => {
    dispatch(removeTableColumn({ tableId, columnKey }));
  };

  const handleChangeCell = (rowId: string, field: string, value: string) => {
    dispatch(updateTableCell({ tableId, rowId, field, value: parseInputValue(value) }));
  };

  const handleRemoveRow = (rowId: string) => {
    dispatch(removeTableRow({ tableId, rowId }));
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      <div className="space-y-4">
        <TradeTableToolbar
          title={table.name}
          columnsCount={table.columns.length}
          rowsCount={table.rows.length}
          onBack={goBack}
          onImport={handleImport}
          onExport={handleExport}
          onRenameTable={handleRenameTable}
          onAddColumn={handleAddColumn}
          onAddRow={handleAddRow}
        />

        <TradeTableControls
          wrapText={table.view.wrapText}
          onToggleWrapText={handleToggleWrapText}
        />

        <TradeTableEditor
          tableId={tableId}
          table={table}
          onChangeCell={handleChangeCell}
          onRenameColumn={handleRenameColumn}
          onAddRow={handleAddRow}
          onRemoveRow={handleRemoveRow}
          onRemoveColumn={handleRemoveColumn}
        />

        <ScreenshotPreview />
      </div>
    </div>
  );
};
