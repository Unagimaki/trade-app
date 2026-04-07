import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";

type TradeTableToolbarProps = {
  title: string;
  columnsCount: number;
  rowsCount: number;
  onBack: () => void;
  onAddColumn: () => void;
  onAddRow: () => void;
  onImport: (file: File) => void;
  onExport: () => void;
  onRenameTable: (name: string) => void;
};

export function TradeTableToolbar({
  title,
  columnsCount,
  rowsCount,
  onBack,
  onAddColumn,
  onAddRow,
  onImport,
  onExport,
  onRenameTable,
}: TradeTableToolbarProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [titleDraft, setTitleDraft] = useState(title);

  useEffect(() => {
    if (!isEditingTitle) {
      setTitleDraft(title);
    }
  }, [isEditingTitle, title]);

  const handlePickFile = () => {
    fileInputRef.current?.click();
  };

  const finishRenaming = () => {
    const nextTitle = titleDraft.trim();
    if (nextTitle) {
      onRenameTable(nextTitle);
    } else {
      setTitleDraft(title);
    }
    setIsEditingTitle(false);
  };

  const cancelRenaming = () => {
    setTitleDraft(title);
    setIsEditingTitle(false);
  };

  return (
    <div className="flex items-center justify-between gap-4">
      <div className="min-w-0">
        {isEditingTitle ? (
          <input
            autoFocus
            type="text"
            value={titleDraft}
            className="w-full rounded-md border border-[#3b82f6] bg-[#0b1120] px-3 py-2 text-2xl font-semibold text-[#f8fafc] outline-none"
            onChange={(event) => setTitleDraft(event.target.value)}
            onBlur={finishRenaming}
            onKeyDown={(event) => {
              if (event.key === "Enter") finishRenaming();
              if (event.key === "Escape") cancelRenaming();
            }}
          />
        ) : (
          <h1
            className="truncate text-2xl font-semibold text-[#f8fafc]"
            onDoubleClick={() => setIsEditingTitle(true)}
            title="Двойной клик для переименования"
          >
            {title}
          </h1>
        )}
        <p className="mt-1 text-sm text-slate-400">
          {columnsCount} cols • {rowsCount} rows
        </p>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="outline" onClick={onBack}>
          К списку
        </Button>
        <Button variant="outline" onClick={handlePickFile}>
          Импорт Excel
        </Button>
        <Button variant="outline" onClick={onExport}>
          Экспорт Excel
        </Button>
        <Button variant="outline" onClick={onAddColumn}>
          Добавить колонку
        </Button>
        <Button onClick={onAddRow}>Добавить строку</Button>
        <input
          ref={fileInputRef}
          type="file"
          accept=".xlsx,.xls,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
          className="hidden"
          onChange={(event) => {
            const file = event.target.files?.[0];
            if (!file) return;
            onImport(file);
            event.target.value = "";
          }}
        />
      </div>
    </div>
  );
}
