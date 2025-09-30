"use client";

import { useEffect, useRef } from "react";

const useTradingViewWidget = (
  scriptUrl: string,
  config: Record<string, unknown>,
  height = 600
) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    if (containerRef.current.dataset.loaded) return;

    // tandai sudah dimuat
    containerRef.current.dataset.loaded = "true";

    // bersihkan isi lama
    containerRef.current.innerHTML = "";

    // buat div untuk chart
    const widgetContainer = document.createElement("div");
    widgetContainer.className = "tradingview-widget-container__widget";
    widgetContainer.style.width = "100%";
    widgetContainer.style.height = `${height}px`;

    // tambahkan ke container
    containerRef.current.appendChild(widgetContainer);

    // buat script tradingview
    const script = document.createElement("script");
    script.src =
      scriptUrl ||
      "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = JSON.stringify(config);

    // tambahkan script ke container
    containerRef.current.appendChild(script);
    containerRef.current.dataset.loaded = "true";

    return () => {
        if(containerRef.current) {
            containerRef.current.innerHTML = "";
            // eslint-disable-next-line react-hooks/exhaustive-deps
            delete containerRef.current.dataset.loaded;
        }
    }
  }, [scriptUrl, config, height]);

  return containerRef;
};

export default useTradingViewWidget;
