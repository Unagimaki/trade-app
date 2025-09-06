import SettingsPanel from "@/features/settings-panel/ui/SettingsPanel";
import StatsPanel from "@/widgets/stats-panel/ui/StatsPanel";
import ScreenshotPreview from "@/features/view-trade-ui/ui/ScreenshotPreview";
import TradesList from "@/widgets/trade-list/ui/TradeList";

export default function HomePage() {
  return (
    <div className="container mx-auto p-4 space-y-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SettingsPanel />
        <StatsPanel />
      </div>
      <TradesList />
      <ScreenshotPreview />
    </div>
  );
}
