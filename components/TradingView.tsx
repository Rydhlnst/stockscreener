"use client";

import React, { memo } from "react";
import useTradingViewWidget from "@/hooks/useTradingViewWidget";

interface TradingViewWidgetProps {
  title?: string;
  scriptUrl: string;
  config: Record<string, unknown>;
  height?: number;
  className?: string;
}

const TradingViewWidget: React.FC<TradingViewWidgetProps> = ({
  title,
  scriptUrl,
  config,
  height = 600,
  className,
}) => {
  const container = useTradingViewWidget(scriptUrl, config, height);

  return (
    <div className="w-full">

        {title && <h3 className="text-2xl font-semibold mb-5 text-gray-100">{title}</h3>}
        <div className={`tradingview-widget-container ${className ?? ""}`} ref={container} style={{ width: "100%", height: "100%" }}>
            <div className="tradingview-widget-container__widget" style={{height, width: "100%"}}/>
        </div>
    </div>
  );
};

export default memo(TradingViewWidget);
