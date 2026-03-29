import ScreenshotPreview from "@/features/view-screen-preview/ui/ScreenshotPreview";
import { TablesListWidget } from "@/widgets/tables-list";


export const TradesListPage = () => {
    return(
        <div className="container mx-auto p-4 space-y-4">
            <TablesListWidget/>
            <ScreenshotPreview />
        </div>
    )
}