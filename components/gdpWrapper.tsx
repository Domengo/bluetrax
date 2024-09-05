import AreaChart, { DataPoint, ChartConfig } from "./area-chart";
import { useState, useEffect } from "react";

// Wrapper component to process API data
export default function GDPChart({ apiData }: { apiData: any }) {
  const [chartData, setChartData] = useState<DataPoint[]>([]);
  const [chartConfig, setChartConfig] = useState<ChartConfig>({
    xAxis: { key: "date", label: "Year" },
    yAxis: { key: "value", label: "GDP (current US$)" },
    areaKey: "value",
    areaLabel: "GDP",
  });

  useEffect(() => {
    if (apiData && apiData[1] && Array.isArray(apiData[1])) {
      const processedData = apiData[1].map((item: any) => ({
        date: item.date,
        value: item.value,
      })).sort((a, b) => +a.date - +b.date);

      setChartData(processedData);

      // Update config based on API data
      setChartConfig(prevConfig => ({
        ...prevConfig,
        yAxis: {
          ...prevConfig.yAxis,
          formatter: (value: number) => `$${(value / 1e9).toFixed(2)} billion`,
        },
      }));
    }
  }, [apiData]);

  return <AreaChart data={chartData} config={chartConfig} />;
}

