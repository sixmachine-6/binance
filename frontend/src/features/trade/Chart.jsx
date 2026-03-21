import { useEffect, useRef, useState } from "react";
import {
  createChart,
  CandlestickSeries,
  LineSeries,
  BarSeries,
} from "lightweight-charts";
import { useQuery } from "@tanstack/react-query";

const fetchCandles = async (symbol) => {
  const res = await fetch(
    `https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=1m&limit=200`,
  );
  return res.json();
};

export default function Chart({ symbol }) {
  const chartContainer = useRef(null);
  const chartRef = useRef(null);
  const seriesRef = useRef(null);
  const [chartType, setChartType] = useState("candlestick");
  const { data } = useQuery({
    queryKey: ["candles", symbol],
    queryFn: () => fetchCandles(symbol),
    refetchInterval: 2000,
  });

  useEffect(() => {
    const chart = createChart(chartContainer.current, {
      height: 500,
      width: chartContainer.current.clientWidth,
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
    return () => chart.remove();
  }, []);

  useEffect(() => {
    if (!chartRef.current) return;
    if (seriesRef.current) {
      chartRef.current.removeSeries(seriesRef.current);
    }
    if (chartType === "candlestick") {
      seriesRef.current = chartRef.current.addSeries(CandlestickSeries);
    }
    if (chartType === "line") {
      seriesRef.current = chartRef.current.addSeries(LineSeries, {
        color: "#2962FF",
        lineWidth: 2,
      });
    }
    if (chartType === "bar") {
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
  }, [data, chartType]);
  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-3 px-2">
        <h3 className="text-sm text-gray-400 font-medium">Chart</h3>
        <select
          value={chartType}
          onChange={(e) => setChartType(e.target.value)}
          className="bg-[#1e2329] text-gray-300 text-sm px-3 py-1 rounded-md border border-gray-700 outline-none focus:ring-1 focus:ring-yellow-400"
        >
          <option value="candlestick">Candlestick</option>
          <option value="bar">Bar</option>
          <option value="line">Line</option>
        </select>
      </div>
      <div
        ref={chartContainer}
        className="w-full h-[500px] rounded-lg overflow-hidden border border-gray-800"
      />
    </div>
  );
}
