import { useEffect, useRef, useState, type ChangeEvent } from "react";
import { useAppDispatch } from "@/app/store";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Table } from "@/entities/table/model/types";
import { setPreviewImg } from "@/features/view-screen-preview/model/uiSlice";
import { fileToBase64 } from "@/lib/fileToBase64";
import styles from "./TradeTableEditor.module.scss";
import { TradeTableBodyCell } from "./components/TradeTableBodyCell";
import { TradeTableHeaderCell } from "./components/TradeTableHeaderCell";

type TradeTableEditorProps = {
  tableId: string;
  table: Table;
  onChangeCell: (rowId: string, field: string, value: string) => void;
  onRenameColumn: (columnKey: string, label: string) => void;
  onAddRow: () => void;
  onRemoveRow: (rowId: string) => void;
  onRemoveColumn: (columnKey: string) => void;
};

function hasImageValue(value: unknown) {
  return typeof value === "string" && value.startsWith("data:image");
}

export function TradeTableEditor({
  tableId,
  table,
  onChangeCell,
  onRenameColumn,
  onAddRow,
  onRemoveRow,
  onRemoveColumn,
}: TradeTableEditorProps) {
  const dispatch = useAppDispatch();
  const [selectedColumnKey, setSelectedColumnKey] = useState<string | null>(null);
  const [focusedCellKey, setFocusedCellKey] = useState<string | null>(null);
  const [editingColumnKey, setEditingColumnKey] = useState<string | null>(null);
  const [editingColumnLabel, setEditingColumnLabel] = useState("");
  const fileInputRefs = useRef<Record<string, HTMLInputElement | null>>({});

  useEffect(() => {
    if (!selectedColumnKey) return;

    const hasSelectedColumn = table.columns.some((column) => column.key === selectedColumnKey);
    if (!hasSelectedColumn) {
      setSelectedColumnKey(null);
    }
  }, [selectedColumnKey, table.columns]);

  useEffect(() => {
    if (!editingColumnKey) return;

    const editingColumn = table.columns.find((column) => column.key === editingColumnKey);
    if (!editingColumn) {
      setEditingColumnKey(null);
      setEditingColumnLabel("");
    }
  }, [editingColumnKey, table.columns]);

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

  const startColumnRenaming = (columnKey: string, label: string) => {
    setSelectedColumnKey(columnKey);
    setEditingColumnKey(columnKey);
    setEditingColumnLabel(label);
  };

  const finishColumnRenaming = () => {
    if (!editingColumnKey) return;

    onRenameColumn(editingColumnKey, editingColumnLabel);
    setEditingColumnKey(null);
    setEditingColumnLabel("");
  };

  const cancelColumnRenaming = () => {
    setEditingColumnKey(null);
    setEditingColumnLabel("");
  };

  const handlePickImage = (rowId: string, columnKey: string) => {
    fileInputRefs.current[`${rowId}:${columnKey}`]?.click();
  };

  const handleFileChange = async (
    event: ChangeEvent<HTMLInputElement>,
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

  const setFileInputRef = (cellKey: string, node: HTMLInputElement | null) => {
    fileInputRefs.current[cellKey] = node;
  };

  return (
    <Card className={styles.editorCard}>
      <CardHeader>
        <CardTitle>Таблица</CardTitle>
      </CardHeader>
      <CardContent className={styles.editorContent}>
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr className={styles.headerRow}>
                {table.columns.map((column) => (
                  <TradeTableHeaderCell
                    key={column.key}
                    columnKey={column.key}
                    label={column.label}
                    isSelected={selectedColumnKey === column.key}
                    isEditing={editingColumnKey === column.key}
                    editingValue={editingColumnLabel}
                    onSelect={setSelectedColumnKey}
                    onStartRename={startColumnRenaming}
                    onChangeEditingValue={setEditingColumnLabel}
                    onFinishRename={finishColumnRenaming}
                    onCancelRename={cancelColumnRenaming}
                    onRemove={onRemoveColumn}
                  />
                ))}
                <th className={styles.actionsHeaderCell}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {table.rows.map((row) => (
                <tr key={row.id} className={styles.bodyRow}>
                  {table.columns.map((column) => {
                    const cellKey = `${row.id}:${column.key}`;

                    return (
                      <TradeTableBodyCell
                        key={column.key}
                        column={column}
                        rowId={row.id}
                        rawValue={row.values[column.key]}
                        wrapText={table.view.wrapText}
                        isFocused={focusedCellKey === cellKey}
                        onFocus={() => setFocusedCellKey(cellKey)}
                        onBlur={() => {
                          setTimeout(() => {
                            setFocusedCellKey((current) => (current === cellKey ? null : current));
                          }, 100);
                        }}
                        onChange={onChangeCell}
                        onShowPreview={handleShowPreview}
                        onHidePreview={handleHidePreview}
                        onPickImage={handlePickImage}
                        onFileChange={handleFileChange}
                        setFileInputRef={setFileInputRef}
                      />
                    );
                  })}
                  <td className={styles.actionsCell}>
                    <Button variant="destructive" size="sm" onClick={() => onRemoveRow(row.id)}>
                      Удалить
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <button type="button" className={styles.addRowButton} onClick={onAddRow}>
          Добавить строку
        </button>
      </CardContent>
    </Card>
  );
}
