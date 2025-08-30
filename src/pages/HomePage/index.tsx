import SettingsPanel from "@/features/settings-panel/ui/SettingsPanel";
import ScreenshotPreview from "@/widgets/ScreenshotPreview";
import TradesList from "@/widgets/trade-list/ui/TradeList";

export default function HomePage() {
  return (
    <div className="container mx-auto p-4 space-y-4">
      <SettingsPanel />
      <TradesList />
      <ScreenshotPreview />
    </div>
  );
}
