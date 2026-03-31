import { Button } from "@/components/ui/button";

type TradeTableToolbarProps = {
  title: string;
  columnsCount: number;
  rowsCount: number;
  onBack: () => void;
  onAddColumn: () => void;
  onAddRow: () => void;
};

export function TradeTableToolbar({
  title,
  columnsCount,
  rowsCount,
  onBack,
  onAddColumn,
  onAddRow,
}: TradeTableToolbarProps) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div>
        <h1 className="text-2xl font-semibold text-[#f8fafc]">{title}</h1>
        <p className="mt-1 text-sm text-slate-400">
          {columnsCount} cols • {rowsCount} rows
        </p>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="outline" onClick={onBack}>
          К списку
        </Button>
        <Button variant="outline" onClick={onAddColumn}>
          Добавить колонку
        </Button>
        <Button onClick={onAddRow}>Добавить строку</Button>
      </div>
    </div>
  );
}
