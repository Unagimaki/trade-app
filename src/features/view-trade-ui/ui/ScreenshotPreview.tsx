import { useEffect, useState } from "react";
import { useAppSelector } from "@/app/store";
import { selectPreviewImg } from "@/app/selectors";
import { Card, CardContent } from "@/components/ui/card";

export default function ScreenshotPreview() {
  const img = useAppSelector(selectPreviewImg);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (img) {
      setVisible(false);
      const t = requestAnimationFrame(() => setVisible(true));
      return () => cancelAnimationFrame(t);
    } else {
      setVisible(false);
    }
  }, [img]);

  if (!img) return null;

  return (
    <div className="fixed top-4 right-4 z-50 pointer-events-none">
      <Card
        className={[
          "max-w-[720px] shadow-2xl border",
          "bg-white dark:bg-neutral-900", // непрозрачный фон
          visible ? "opacity-100" : "opacity-0",
          "transition-opacity duration-200 ease-out",
        ].join(" ")}
      >
        <CardContent className="p-2">
          <img
            src={img}
            alt="Скриншот сделки"
            className="max-w-[680px] max-h-[840px] object-contain rounded"
            draggable={false}
          />
        </CardContent>
      </Card>
    </div>
  );
}
