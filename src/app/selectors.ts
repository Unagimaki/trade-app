// src/app/selectors.ts
import { type RootState } from "@/app/store";

export const selectPreviewImg = (s: RootState) => {
  const id = s.ui.previewTradeId;
  if (!id) return null;
  const items =
    (s as any).trades?.items ??
    (s as any).trade?.items ??
    [];
  return items.find((t: any) => t.id === id)?.img ?? null;
};
