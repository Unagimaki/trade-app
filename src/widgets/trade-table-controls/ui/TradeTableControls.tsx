import { Button } from "@/components/ui/button";

type TradeTableControlsProps = {
  wrapText: boolean;
  onToggleWrapText: () => void;
};

export function TradeTableControls({
  wrapText,
  onToggleWrapText,
}: TradeTableControlsProps) {
  return (
    <div className="flex flex-wrap items-center gap-2 rounded-2xl border border-[#1e293b] bg-[#0f172a]/70 px-4 py-3">
      <span className="text-xs font-medium uppercase tracking-[0.2em] text-slate-400">
        Table controls
      </span>
      <Button variant={wrapText ? "default" : "outline"} onClick={onToggleWrapText}>
        {wrapText ? "Перенос текста: вкл" : "Перенос текста: выкл"}
      </Button>
    </div>
  );
}
