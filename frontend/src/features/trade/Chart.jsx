import { useEffect, useRef, useState } from "react";
import { createChart, CandlestickSeries, LineSeries, BarSeries } from "lightweight-charts";
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
  const [chartType, setChartType] = useState("candlestick");
  const [latestPrice, setLatestPrice] = useState(0);

  const { data } = useQuery({
    queryKey: ["candles", symbol],
    queryFn: () => fetchCandles(symbol),
    refetchInterval: 2000,
  });

  // Initialize chart
  useEffect(() => {
    const chart = createChart(chartContainer.current, {
      height: 400,
      width: chartContainer.current.clientWidth,
      layout: { background: { color: "#0f1116" }, textColor: "#d1d4dc" },
      grid: { vertLines: { color: "#1f2937" }, horzLines: { color: "#1f2937" } },
      timeScale: { timeVisible: true },
    });
    chartRef.current = chart;
    return () => chart.remove();
  }, []);

  // Change chart type
  useEffect(() => {
    if (!chartRef.current) return;
    if (seriesRef.current) chartRef.current.removeSeries(seriesRef.current);

    if (chartType === "candlestick") seriesRef.current = chartRef.current.addSeries(CandlestickSeries);
    if (chartType === "line") seriesRef.current = chartRef.current.addSeries(LineSeries, { color: "#2962FF", lineWidth: 2 });
    if (chartType === "bar") seriesRef.current = chartRef.current.addSeries(BarSeries);
  }, [chartType]);

  // Update chart data and latest price
  useEffect(() => {
    if (!data || !seriesRef.current) return;

    const formattedData = chartType === "line"
      ? data.map(c => ({ time: Math.floor(c[0] / 1000), value: parseFloat(c[4]) }))
      : data.map(c => ({
          time: Math.floor(c[0] / 1000),
          open: parseFloat(c[1]),
          high: parseFloat(c[2]),
          low: parseFloat(c[3]),
          close: parseFloat(c[4]),
        }));

    seriesRef.current.setData(formattedData);

    // update latest price
    setLatestPrice(parseFloat(data[data.length - 1][4]));
  }, [data, chartType]);

  return (
    <div className="flex flex-col gap-4">
      {/* Chart selector */}
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

      {/* Chart container */}
      <div
        ref={chartContainer}
        className="w-full h-[400px] rounded-lg overflow-hidden border border-gray-800"
      />

      {/* Trade Panel */}
      <div className="mt-4">
        <TradePanel symbol={symbol} price={latestPrice} />
      </div>
    </div>
  );
}
