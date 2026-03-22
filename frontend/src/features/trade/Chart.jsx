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
    `https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=1m&limit=200`,
  );
  return res.json();
};

export default function Chart({ symbol }) {
  const chartContainer = useRef(null);
  const chartRef = useRef(null);
  const seriesRef = useRef(null);

  const [chartType, setChartType] = useState("candlestick");
  const [price, setPrice] = useState(0);

  const { data } = useQuery({
    queryKey: ["candles", symbol],
    queryFn: () => fetchCandles(symbol),
    refetchInterval: 2000,
  });

  // Create chart
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

  // Change chart type
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

  // Update data
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

    // set latest price
    const lastCandle = data[data.length - 1];
    if (lastCandle) {
      setPrice(parseFloat(lastCandle[4]));
    }
  }, [data, chartType]);

  return (
    <div className="flex flex-col gap-4">
      {/* Chart selector */}
      <div style={{ marginBottom: "10px" }}>
        <select
          value={chartType}
          onChange={(e) => setChartType(e.target.value)}
        >
          <option value="candlestick">Candlestick</option>
          <option value="bar">Bar Chart</option>
          <option value="line">Line Chart</option>
        </select>
      </div>

      {/* Chart */}
      <div ref={chartContainer} style={{ width: "100%", height: "500px" }} />

      {/* Trade Panel */}
      <TradePanel symbol={symbol} price={price} />
    </div>
  );
}
