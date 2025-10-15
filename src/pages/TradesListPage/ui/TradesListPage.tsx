import SettingsPanel from "@/features/settings-panel/ui/SettingsPanel";
import ScreenshotPreview from "@/features/view-screen-preview/ui/ScreenshotPreview";
import { StatsPanel } from "@/widgets/stats-panel";
import { TradesTable } from "@/widgets/trades-table/ui/TradesTable";


export const TradesListPage = () => {
    return(
        <div className="container mx-auto p-4 space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <SettingsPanel />
            <StatsPanel />
          </div>
          <TradesTable />
          <ScreenshotPreview />
        </div>
    )
}