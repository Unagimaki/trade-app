import styles from "../TradeTableEditor.module.scss";

type TradeTableHeaderCellProps = {
  label: string;
  columnKey: string;
  isSelected: boolean;
  isEditing: boolean;
  editingValue: string;
  onSelect: (columnKey: string) => void;
  onStartRename: (columnKey: string, label: string) => void;
  onChangeEditingValue: (value: string) => void;
  onFinishRename: () => void;
  onCancelRename: () => void;
  onRemove: (columnKey: string) => void;
};

export function TradeTableHeaderCell({
  label,
  columnKey,
  isSelected,
  isEditing,
  editingValue,
  onSelect,
  onStartRename,
  onChangeEditingValue,
  onFinishRename,
  onCancelRename,
  onRemove,
}: TradeTableHeaderCellProps) {
  return (
    <th className={`${styles.headerCell} ${isSelected ? styles.headerCellSelected : ""}`}>
      <div
        role="button"
        tabIndex={0}
        className={styles.headerCellContent}
        onClick={() => onSelect(columnKey)}
        onDoubleClick={() => onStartRename(columnKey, label)}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            onSelect(columnKey);
          }
        }}
      >
        <div className={styles.headerCellLabelWrap}>
          {isEditing ? (
            <input
              autoFocus
              type="text"
              value={editingValue}
              className={styles.headerCellInput}
              onClick={(event) => event.stopPropagation()}
              onChange={(event) => onChangeEditingValue(event.target.value)}
              onBlur={onFinishRename}
              onKeyDown={(event) => {
                event.stopPropagation();
                if (event.key === "Enter") {
                  onFinishRename();
                }
                if (event.key === "Escape") {
                  onCancelRename();
                }
              }}
            />
          ) : (
            <span className={styles.headerCellLabel}>{label}</span>
          )}
        </div>

        <button
          type="button"
          className={styles.headerCellRemove}
          onClick={(event) => {
            event.stopPropagation();
            onRemove(columnKey);
          }}
          aria-label={`Удалить колонку ${label}`}
        >
          ×
        </button>
      </div>
    </th>
  );
}
