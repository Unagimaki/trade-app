import { useLayoutEffect, useRef, type ChangeEvent } from "react";
import type { TableColumn, TableCellValue } from "@/entities/table/model/types";
import addImgIcon from "../icons/add-img-icon.svg";
import imgIcon from "../icons/img-icon.svg";
import styles from "../TradeTableEditor.module.scss";

function isImageColumn(kind?: string, role?: string) {
  return kind === "image" || role === "image";
}

function hasImageValue(value: unknown) {
  return typeof value === "string" && value.startsWith("data:image");
}

type TradeTableBodyCellProps = {
  column: TableColumn;
  rowId: string;
  rawValue: TableCellValue;
  wrapText: boolean;
  isFocused: boolean;
  onFocus: () => void;
  onBlur: () => void;
  onChange: (rowId: string, field: string, value: string) => void;
  onShowPreview: (rawValue: unknown) => void;
  onHidePreview: () => void;
  onPickImage: (rowId: string, columnKey: string) => void;
  onFileChange: (event: ChangeEvent<HTMLInputElement>, rowId: string, columnKey: string) => void;
  setFileInputRef: (cellKey: string, node: HTMLInputElement | null) => void;
};

export function TradeTableBodyCell({
  column,
  rowId,
  rawValue,
  wrapText,
  isFocused,
  onFocus,
  onBlur,
  onChange,
  onShowPreview,
  onHidePreview,
  onPickImage,
  onFileChange,
  setFileInputRef,
}: TradeTableBodyCellProps) {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const value = rawValue ?? "";
  const cellKey = `${rowId}:${column.key}`;
  const imageColumn = isImageColumn(column.kind, column.role);
  const hasImage = hasImageValue(rawValue);
  const isImageCell = imageColumn;
  const displayValue = hasImage ? "" : String(value);
  const fieldClassName = [
    styles.cellField,
    wrapText ? styles.cellFieldWrap : styles.cellFieldSingleLine,
    isFocused ? styles.cellInputWithActions : "",
  ].join(" ");
  const cellClassName = `${styles.bodyCell} ${hasImage ? styles.bodyCellStatic : ""}`;

  useLayoutEffect(() => {
    if (!wrapText || !textareaRef.current || hasImage || isImageCell) return;

    textareaRef.current.style.height = "0px";
    textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
  }, [displayValue, wrapText, isFocused, hasImage, isImageCell]);

  return (
    <td className={cellClassName}>
      <div className={styles.cellInner}>
        {hasImage ? (
          <div className={styles.cellStaticValue} aria-hidden="true" />
        ) : isImageCell ? (
          <button
            type="button"
            className={styles.imageCellButton}
            onClick={() => onPickImage(rowId, column.key)}
            onFocus={onFocus}
            onBlur={onBlur}
            aria-label={`Загрузить изображение в ${column.label}`}
          >
            <span className={styles.imageCellButtonText}>Добавить изображение</span>
          </button>
        ) : wrapText ? (
          <textarea
            ref={textareaRef}
            rows={1}
            className={fieldClassName}
            value={displayValue}
            onFocus={onFocus}
            onBlur={onBlur}
            onChange={(event) => onChange(rowId, column.key, event.target.value)}
          />
        ) : (
          <input
            type="text"
            className={fieldClassName}
            value={displayValue}
            onFocus={onFocus}
            onBlur={onBlur}
            onChange={(event) => onChange(rowId, column.key, event.target.value)}
          />
        )}

        {hasImage ? (
          <button
            type="button"
            className={`${styles.cellPreviewButton} ${styles.cellPreviewButtonCentered}`}
            onMouseEnter={() => onShowPreview(rawValue)}
            onMouseLeave={onHidePreview}
            aria-label={`Показать изображение из ${column.label}`}
          >
            <img src={imgIcon} alt="" className={styles.cellPreviewIcon} />
          </button>
        ) : null}

        {!isImageCell && !hasImage && isFocused ? (
          <button
            type="button"
            className={styles.cellUploadButton}
            onMouseDown={(event) => event.preventDefault()}
            onClick={() => onPickImage(rowId, column.key)}
            aria-label={`Загрузить изображение в ${column.label}`}
          >
            <img src={addImgIcon} alt="" className={styles.cellUploadIcon} />
          </button>
        ) : null}

        <input
          ref={(node) => {
            setFileInputRef(cellKey, node);
          }}
          type="file"
          accept="image/*"
          className={styles.hiddenInput}
          onChange={(event) => void onFileChange(event, rowId, column.key)}
        />
      </div>
    </td>
  );
}
