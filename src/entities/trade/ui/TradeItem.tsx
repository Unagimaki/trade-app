import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Trade } from "@/entities/trade/model/types";
import { useAppDispatch } from "@/app/store";
import { removeTrade, setTradeImage } from "@/entities/trade/model/slice";
import { setPreviewTradeId } from "@/app/uiSlice";
import { useRef } from "react";
import { Camera } from "lucide-react";

function formatDate(iso: string) {
  try {
    const d = new Date(iso);
    return d.toLocaleString();
  } catch {
    return iso;
  }
}

function computePnl(t: Trade) {
  if (t.type === "win") return t.rr * t.risk;
  if (t.type === "loss") return -t.risk;
  return 0;
}

function formatMoney(n: number) {
  return (Math.round(n * 100) / 100).toFixed(2);
}

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

export default function TradeItem({ trade, index }: { trade: Trade; index: number }) {
  const dispatch = useAppDispatch();
  const pnl = computePnl(trade);
  const pnlClass =
    pnl > 0 ? "text-green-600" : pnl < 0 ? "text-red-600" : "text-muted-foreground";
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handlePickImage = () => inputRef.current?.click();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;

    if (!f.type.startsWith("image/")) {
      alert("Выберите изображение.");
      e.target.value = "";
      return;
    }
    if (f.size > 5 * 1024 * 1024) {
      alert("Слишком большой файл (>5MB).");
      e.target.value = "";
      return;
    }

    try {
      const base64 = await fileToBase64(f);
      dispatch(setTradeImage({ id: trade.id, img: base64 }));
    } catch (err) {
      console.error(err);
      alert("Не удалось прочитать файл.");
    } finally {
      e.target.value = "";
    }
  };

  const handleRemoveImage = () => {
    dispatch(setTradeImage({ id: trade.id, img: null }));
  };

  return (
    <Card className="neo-card rounded-2xl">
      <CardHeader className="flex-row items-center justify-between space-y-0">
        <CardTitle className="text-base">Сделка {index}</CardTitle>
        <div className="flex items-center gap-2">
          <div className="text-xs text-muted-foreground">{formatDate(trade.date)}</div>
          <Button variant="neo" size="sm" onClick={() => dispatch(removeTrade(trade.id))}>
            Удалить
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-2 md:grid-cols-5 text-sm">
          <div>
            <span className="opacity-60">Тип:</span>{" "}
            <b
              className={
                trade.type === "win"
                  ? "text-green-600"
                  : trade.type === "loss"
                  ? "text-red-600"
                  : ""
              }
            >
              {trade.type}
            </b>
          </div>
          <div>
            <span className="opacity-60">Направление:</span>{" "}
            <b>{trade.direction ? trade.direction.toUpperCase() : "—"}</b>
          </div>
          <div>
            <span className="opacity-60">RR:</span> <b>{trade.rr}</b>
          </div>
          <div>
            <span className="opacity-60">Риск, ₽:</span>{" "}
            <b>{formatMoney(trade.risk)}</b>
          </div>
          <div>
            <span className="opacity-60">PnL, ₽:</span>{" "}
            <b className={pnlClass}>{formatMoney(pnl)}</b>
          </div>
        </div>

        {/* Блок: Скриншот */}
        <div className="mt-3 flex items-center gap-2 text-sm">
          <span className="text-muted-foreground select-none flex items-center gap-1">
            {trade.img ? <span aria-hidden="true">📷</span> : null}
            <span>Скриншот</span>
          </span>

          <Button
            size="sm"
            variant="outline"
            className="h-7 w-7 p-0"
            onClick={handlePickImage}
            title="Добавить скриншот"
          >
            +
          </Button>

          {trade.img && (
            <Button
              size="sm"
              variant="outline"
              className="h-7 w-7 p-0"
              onMouseEnter={() => dispatch(setPreviewTradeId(trade.id))}
              onMouseLeave={() => dispatch(setPreviewTradeId(null))}
              title="Показать скриншот"
            >
              👁
            </Button>
          )}

          {trade.img ? (
            <Button
              size="sm"
              variant="destructive"
              className="h-7 w-7 p-0"
              onClick={handleRemoveImage}
              title="Удалить скриншот"
            >
              ×
            </Button>
          ) : null}

          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>
      </CardContent>
    </Card>
  );
}