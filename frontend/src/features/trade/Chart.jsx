import { useEffect, useRef, useState } from "react";
import {
  createChart,
  CandlestickSeries,
  LineSeries,
  BarSeries,
} from "lightweight-charts";
import { useQuery } from "@tanstack/react-query";
import TradePanel from "./TradePanel";

const fetchCandles = async (symbol) => {
  const res = await fetch(
    `https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=1m&limit=200`
  );
  return res.json();
};

export default function Chart({ symbol }) {
  const chartContainer = useRef(null);
  const chartRef = useRef(null);
  const seriesRef = useRef(null);
  const priceRef = useRef(0);

  const [chartType, setChartType] = useState("candlestick");

  const { data } = useQuery({
    queryKey: ["candles", symbol],
    queryFn: () => fetchCandles(symbol),
    refetchInterval: 2000,
  });

  useEffect(() => {
    if (!chartContainer.current) return;

    const chart = createChart(chartContainer.current, {
      autoSize: true,
      layout: {
        background: { color: "#0f1116" },
        textColor: "#d1d4dc",
      },
      grid: {
        vertLines: { color: "#1f2937" },
        horzLines: { color: "#1f2937" },
      },
      timeScale: {
        timeVisible: true,
      },
    });

    chartRef.current = chart;

    const handleResize = () => {
      if (chartContainer.current && chartRef.current) {
        chartRef.current.applyOptions({
          width: chartContainer.current.clientWidth,
        });
      }
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      chart.remove();
    };
  }, []);

  useEffect(() => {
    if (!chartRef.current) return;

    if (seriesRef.current) {
      chartRef.current.removeSeries(seriesRef.current);
      seriesRef.current = null;
    }

    if (chartType === "candlestick") {
      seriesRef.current = chartRef.current.addSeries(CandlestickSeries);
    } else if (chartType === "line") {
      seriesRef.current = chartRef.current.addSeries(LineSeries, {
        color: "#2962FF",
        lineWidth: 2,
      });
    } else if (chartType === "bar") {
      seriesRef.current = chartRef.current.addSeries(BarSeries);
    }
  }, [chartType]);

  useEffect(() => {
    if (!data || !seriesRef.current) return;

    let formattedData;

    if (chartType === "line") {
      formattedData = data.map((c) => ({
        time: Math.floor(c[0] / 1000),
        value: parseFloat(c[4]),
      }));
    } else {
      formattedData = data.map((c) => ({
        time: Math.floor(c[0] / 1000),
        open: parseFloat(c[1]),
        high: parseFloat(c[2]),
        low: parseFloat(c[3]),
        close: parseFloat(c[4]),
      }));
    }

    seriesRef.current.setData(formattedData);

    const lastCandle = data[data.length - 1];
    if (lastCandle) {
      priceRef.current = parseFloat(lastCandle[4]);
    }
  }, [data, chartType]);

  return (
    <div className="flex flex-col flex-1 min-w-0 min-h-0">

      <div className="flex gap-2 px-4 py-2 border-b border-gray-800">
        {["candlestick", "bar", "line"].map((type) => (
          <button
            key={type}
            onClick={() => setChartType(type)}
            className={`px-3 py-1 rounded text-xs font-semibold capitalize transition ${
              chartType === type
                ? "bg-yellow-400 text-black"
                : "bg-[#1c242f] text-gray-400 hover:text-white"
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      <div
        ref={chartContainer}
        className="flex-1 min-w-0 min-h-0"
        style={{ width: "100%", height: "100%" }}
      />

      <TradePanel symbol={symbol} priceRef={priceRef} />
    </div>
  );
}
