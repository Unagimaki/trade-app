import React from "react";

export function useRenderLogger(name: string, deps: any[]) {
  const count = React.useRef(0);
  count.current++;
  console.log(`🔁 Render ${name}: ${count.current}`, deps);
}
