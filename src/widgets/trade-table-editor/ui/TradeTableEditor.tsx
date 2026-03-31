import { useAppDispatch } from "@/app/store";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { setPreviewImg } from "@/features/view-screen-preview/model/uiSlice";
import type { Table } from "@/entities/table/model/types";
import { fileToBase64 } from "@/lib/fileToBase64";
import { useEffect, useRef, useState } from "react";

type TradeTableEditorProps = {
  tableId: string;
  table: Table;
  onChangeCell: (rowId: string, field: string, value: string) => void;
  onMakeColumnImage: (columnKey: string) => void;
  onRemoveRow: (rowId: string) => void;
  onRemoveColumn: (columnKey: string) => void;
};

function isImageColumn(kind?: string, role?: string) {
  return kind === "image" || role === "image";
}

function hasImageValue(value: unknown) {
  return typeof value === "string" && value.startsWith("data:image");
}

export function TradeTableEditor({
  tableId,
  table,
  onChangeCell,
  onMakeColumnImage,
  onRemoveRow,
  onRemoveColumn,
}: TradeTableEditorProps) {
  const dispatch = useAppDispatch();
  const [selectedColumnKey, setSelectedColumnKey] = useState<string | null>(null);
  const [focusedCellKey, setFocusedCellKey] = useState<string | null>(null);
  const fileInputRefs = useRef<Record<string, HTMLInputElement | null>>({});

  useEffect(() => {
    if (!selectedColumnKey) return;

    const hasSelectedColumn = table.columns.some((column) => column.key === selectedColumnKey);
    if (!hasSelectedColumn) {
      setSelectedColumnKey(null);
    }
  }, [selectedColumnKey, table.columns]);

  useEffect(() => {
    if (!selectedColumnKey) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Delete") return;
      const activeTag = document.activeElement?.tagName;
      if (activeTag === "INPUT" || activeTag === "TEXTAREA") return;

      onRemoveColumn(selectedColumnKey);
      setSelectedColumnKey(null);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onRemoveColumn, selectedColumnKey, tableId]);

  const handlePickImage = (rowId: string, columnKey: string) => {
    onMakeColumnImage(columnKey);
    fileInputRefs.current[`${rowId}:${columnKey}`]?.click();
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
    rowId: string,
    columnKey: string
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const base64 = await fileToBase64(file);
      onChangeCell(rowId, columnKey, base64);
    } finally {
      event.target.value = "";
    }
  };

  const handleShowPreview = (rawValue: unknown) => {
    if (!hasImageValue(rawValue)) return;
    dispatch(setPreviewImg(rawValue as string));
  };

  const handleHidePreview = () => {
    dispatch(setPreviewImg(null));
  };

  return (
    <Card className="rounded-2xl">
      <CardHeader>
        <CardTitle>Таблица</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto rounded-xl border border-[#334155]">
          <table className="w-full min-w-[720px] border-collapse text-sm">
            <thead>
              <tr className="border-b border-[#334155] bg-[#0f172a]">
                {table.columns.map((column) => {
                  const isSelected = selectedColumnKey === column.key;

                  return (
                    <th
                      key={column.key}
                      className={[
                        "border-r border-[#334155] px-3 py-3 text-left font-medium text-slate-300 last:border-r-0",
                        isSelected ? "bg-[#172036]" : "",
                      ].join(" ")}
                    >
                      <div
                        role="button"
                        tabIndex={0}
                        className="flex items-center justify-between gap-2 outline-none"
                        onClick={() => setSelectedColumnKey(column.key)}
                        onKeyDown={(event) => {
                          if (event.key === "Enter" || event.key === " ") {
                            event.preventDefault();
                            setSelectedColumnKey(column.key);
                          }
                        }}
                      >
                        <span>{column.label}</span>
                        <button
                          type="button"
                          className="h-5 w-5 rounded-sm text-slate-500 transition-colors hover:bg-[#24314f] hover:text-white"
                          onClick={(event) => {
                            event.stopPropagation();
                            onRemoveColumn(column.key);
                          }}
                          aria-label={`Удалить колонку ${column.label}`}
                        >
                          ×
                        </button>
                      </div>
                    </th>
                  );
                })}
                <th className="px-3 py-3 text-left font-medium text-slate-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {table.rows.map((row) => (
                <tr key={row.id} className="border-b border-[#1e293b] align-top last:border-b-0">
                  {table.columns.map((column) => {
                    const rawValue = row.values[column.key];
                    const value = rawValue ?? "";
                    const cellKey = `${row.id}:${column.key}`;
                    const imageColumn = isImageColumn(column.kind, column.role);
                    const hasImage = hasImageValue(rawValue);
                    const displayValue = imageColumn
                      ? hasImage
                        ? ""
                        : ""
                      : String(value);

                    return (
                      <td
                        key={column.key}
                        className="border-r border-[#1e293b] px-2 py-2 transition-colors hover:bg-[#172036] last:border-r-0"
                      >
                        <div className="relative">
                          <input
                            type="text"
                            readOnly={imageColumn}
                            className="w-full rounded-md border border-transparent bg-transparent px-2 py-1 outline-none transition-colors hover:bg-[#1b2742] focus:border-[#3b82f6] focus:bg-[#1b2742]"
                            style={focusedCellKey === cellKey ? { paddingRight: "3.5rem" } : undefined}
                            value={displayValue}
                            onFocus={() => setFocusedCellKey(cellKey)}
                            onBlur={() => {
                              setTimeout(() => {
                                setFocusedCellKey((current) => (current === cellKey ? null : current));
                              }, 100);
                            }}
                            onChange={(event) => onChangeCell(row.id, column.key, event.target.value)}
                          />

                          {hasImage ? (
                            <button
                              type="button"
                              className="absolute right-8 top-1/2 -translate-y-1/2 text-slate-400 transition-colors hover:text-white"
                              onMouseEnter={() => handleShowPreview(rawValue)}
                              onMouseLeave={handleHidePreview}
                              aria-label={`Показать изображение из ${column.label}`}
                            >
                              🖼
                            </button>
                          ) : null}

                          {focusedCellKey === cellKey ? (
                            <button
                              type="button"
                              className="absolute right-1 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-md text-slate-400 transition-colors hover:bg-[#24314f] hover:text-white"
                              onMouseDown={(event) => event.preventDefault()}
                              onClick={() => handlePickImage(row.id, column.key)}
                              aria-label={`Загрузить изображение в ${column.label}`}
                            >
                              +
                            </button>
                          ) : null}

                          <input
                            ref={(node) => {
                              fileInputRefs.current[cellKey] = node;
                            }}
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(event) => void handleFileChange(event, row.id, column.key)}
                          />
                        </div>
                      </td>
                    );
                  })}
                  <td className="px-3 py-2">
                    <Button variant="destructive" size="sm" onClick={() => onRemoveRow(row.id)}>
                      Удалить
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}

