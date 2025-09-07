import React, { useCallback, useRef, useState } from "react";
import { useAppDispatch } from "@/app/store";
import { removeTrade, setTradeDirection, setTradeImage } from "@/entities/trade/model/slice";
import { setPreviewTradeId } from "@/features/view-screen-preview/model/uiSlice";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Trade } from "@/entities/trade/model/types";
import { fileToBase64 } from "@/lib/fileToBase64";
import { formatDate, formatMoney } from "@/lib/formatters";
import { TradeItemDirectionSelect } from "./TradeItemDirectionSelect";

// Вспомогательные функции можно вынести в отдельный файл
function computePnl(t: Trade) {
  if (t.type === "win") return t.rr * t.risk;
  if (t.type === "loss") return -t.risk;
  return 0;
}

const TradeItem = React.memo(({ trade, index }: { trade: Trade; index: number }) => {
  const [isDirectionMenuOpen, setIsDirectionMenuOpen] = useState(false)
  const dispatch = useAppDispatch();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const pnl = computePnl(trade);
  const pnlClass = pnl > 0 ? "text-green-600" : pnl < 0 ? "text-red-600" : "text-muted-foreground";

  // Мемоизируем обработчики
  const handlePickImage = useCallback(() => inputRef.current?.click(), []);

  const handleFileChange = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
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
  }, [dispatch, trade.id]);

  const handleRemoveImage = useCallback(() => {
    dispatch(setTradeImage({ id: trade.id, img: null }));
  }, [dispatch, trade.id]);

  const handleRemoveTrade = useCallback(() => {
    dispatch(removeTrade(trade.id));
  }, [dispatch, trade.id]);

  const handleShowPreview = useCallback(() => {
    dispatch(setPreviewTradeId(trade.id));
  }, [dispatch, trade.id]);

  const handleHidePreview = useCallback(() => {
    dispatch(setPreviewTradeId(null));
  }, [dispatch]);

  const handleDirectionSelect = useCallback((direction: 'long' | 'short' | null) => {
    dispatch(setTradeDirection({id: trade.id, direction: direction}))
  }, [dispatch])

  return (
    <Card className="neo-card rounded-2xl">
      <CardHeader className="flex-row items-center justify-between space-y-0">
        <CardTitle className="text-base">Сделка {index}</CardTitle>
        <div className="flex items-center gap-2">
          <div className="text-xs text-muted-foreground">{formatDate(trade.date)}</div>
          <Button variant="trading" size="sm" onClick={handleRemoveTrade}>
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
        <div className="relative">
          <span className="opacity-60">Направление:</span>{" "}
          <b>
            {trade.direction ? (
              <div 
                className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-blue-500/20 cursor-pointer hover:bg-blue-500/30 transition-colors"
                onClick={() => setIsDirectionMenuOpen(true)}
              >
                <span>{trade.direction.toUpperCase()}</span>
                {trade.direction === 'long' ? (
                  <span className="text-green-400">↑</span>
                ) : (
                  <span className="text-red-400">↓</span>
                )}
              </div>
            ) : (
              <Button 
                onClick={() => setIsDirectionMenuOpen(true)}
                className="h-7 w-7 p-0 trading-button"
              >
                +
              </Button>
            )}
            
            {isDirectionMenuOpen && (
              <TradeItemDirectionSelect
                onDirectionSelect={handleDirectionSelect}
                onClose={() => setIsDirectionMenuOpen(false)}
              />
            )}
          </b>
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
            <>
              <Button
                size="sm"
                variant="outline"
                className="h-7 w-7 p-0"
                onMouseEnter={handleShowPreview}
                onMouseLeave={handleHidePreview}
                title="Показать скриншот"
              >
                👁
              </Button>
              <Button
                size="sm"
                variant="destructive"
                className="h-7 w-7 p-0"
                onClick={handleRemoveImage}
                title="Удалить скриншот"
              >
                ×
              </Button>
            </>
          )}

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
});

// Зададим отображаемое имя для удобства отладки
TradeItem.displayName = "TradeItem";

export default TradeItem;