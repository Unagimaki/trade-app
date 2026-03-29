import { useAppDispatch, useAppSelector } from "@/app/store";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { selectTables } from "@/entities/table/model/selectors";
import { createTable } from "@/entities/table/model/slice";
import { useRouter } from "@/shared/hooks/use-router";

export function TablesListWidget() {
  const dispatch = useAppDispatch();
  const { navigate } = useRouter();
  const tables = useAppSelector(selectTables);

  const handleCreateTable = () => {
    dispatch(createTable());
  };

  const handleOpenTable = (tableId: string) => {
    navigate(`/trades/${tableId}`);
  };

  return (
    <Card className="rounded-2xl">
      <CardHeader>
        <CardTitle>Таблицы</CardTitle>
        <CardDescription>
          Создавайте отдельные таблицы для статистики, наблюдений и рабочих шаблонов.
        </CardDescription>
        <CardAction>
          <Button onClick={handleCreateTable}>Создать таблицу</Button>
        </CardAction>
      </CardHeader>

      <CardContent className="space-y-3">
        {tables.length === 0 ? (
          <div className="rounded-xl border border-dashed border-[#475569] bg-[#0f172a]/60 px-4 py-10 text-center">
            <div className="text-base font-medium text-[#f8fafc]">Пока нет ни одной таблицы</div>
            <p className="mt-2 text-sm text-slate-400">
              Начните с шаблона и откройте первую таблицу для заполнения.
            </p>
            <Button className="mt-4" onClick={handleCreateTable}>
              Создать первую таблицу
            </Button>
          </div>
        ) : (
          tables.map((table) => (
            <button
              key={table.id}
              type="button"
              className="w-full rounded-xl border border-[#475569] bg-[#0f172a]/70 px-4 py-4 text-left transition-colors hover:border-[#3b82f6] hover:bg-[#111c31]"
              onClick={() => handleOpenTable(table.id)}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <div className="text-base font-semibold text-[#f8fafc]">{table.name}</div>
                  <p className="mt-1 text-sm text-slate-400">
                    {table.columns.length} cols • {table.trades.length} rows
                  </p>
                </div>

                <span className="shrink-0 text-xs uppercase tracking-[0.2em] text-[#60a5fa]">
                  Open
                </span>
              </div>
            </button>
          ))
        )}
      </CardContent>
    </Card>
  );
}
