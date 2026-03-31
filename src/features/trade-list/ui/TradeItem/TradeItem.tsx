import React, { useCallback, useRef, useState } from "react";
import { useAppDispatch } from "@/app/store";
import { removeTrade, setTradeDirection, setTradeImage } from "@/entities/trade/model/slice";
import { setPreviewImg } from "@/features/view-screen-preview/model/uiSlice";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Trade } from "@/entities/trade/model/types";
import { fileToBase64 } from "@/lib/fileToBase64";
import { formatDate, formatMoney } from "@/lib/formatters";
import { TradeItemDirectionSelect } from "./TradeItemDirectionSelect";

function computePnl(t: Trade) {
  if (t.type === "win") return (t.rr ?? 0) * (t.risk ?? 0);
  if (t.type === "loss") return -(t.risk ?? 0);
  return 0;
}

const TradeItem = React.memo(({ trade, index }: { trade: Trade; index: number }) => {
  const [isDirectionMenuOpen, setIsDirectionMenuOpen] = useState(false);
  const dispatch = useAppDispatch();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const pnl = computePnl(trade);
  const pnlClass = pnl > 0 ? "text-green-600" : pnl < 0 ? "text-red-600" : "text-muted-foreground";

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
    dispatch(setPreviewImg(trade.img ?? null));
  }, [dispatch, trade.img]);

  const handleHidePreview = useCallback(() => {
    dispatch(setPreviewImg(null));
  }, [dispatch]);

  const handleDirectionSelect = useCallback((direction: "long" | "short" | null) => {
    dispatch(setTradeDirection({ id: trade.id, direction }));
  }, [dispatch, trade.id]);

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
        <div className="grid gap-2 text-sm md:grid-cols-5">
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
                  className="inline-flex items-center gap-1 rounded-md bg-blue-500/20 px-2 py-1 transition-colors hover:bg-blue-500/30"
                  onClick={() => setIsDirectionMenuOpen(true)}
                >
                  <span>{trade.direction.toUpperCase()}</span>
                  {trade.direction === "long" ? (
                    <span className="text-green-400">↑</span>
                  ) : (
                    <span className="text-red-400">↓</span>
                  )}
                </div>
              ) : (
                <Button
                  onClick={() => setIsDirectionMenuOpen(true)}
                  className="trading-button h-7 w-7 p-0"
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
            <span className="opacity-60">RR:</span> <b>{trade.rr ?? "—"}</b>
          </div>
          <div>
            <span className="opacity-60">Риск, ₽:</span>{" "}
            <b>{typeof trade.risk === "number" ? formatMoney(trade.risk) : "—"}</b>
          </div>
          <div>
            <span className="opacity-60">PnL, ₽:</span>{" "}
            <b className={pnlClass}>{formatMoney(pnl)}</b>
          </div>
        </div>

        <div className="mt-3 flex items-center gap-2 text-sm">
          <span className="select-none text-muted-foreground flex items-center gap-1">
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

TradeItem.displayName = "TradeItem";

export default TradeItem;
