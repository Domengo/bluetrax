// "use client";

// import React, { useEffect, useRef, useState } from "react";
// import * as d3 from "d3";

// interface DataPoint {
//   name: string
//   value: number
// }

// export default function AreaChart({ data }: { data: DataPoint[] }) {
//   const svgRef = useRef<SVGSVGElement | null>(null);
//   const containerRef = useRef<HTMLDivElement | null>(null);
//   const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

//   useEffect(() => {
//     const resizeObserver = new ResizeObserver((entries) => {
//       if (entries[0]) {
//         const { width, height } = entries[0].contentRect;
//         setDimensions({ width, height });
//       }
//     });

//     if (containerRef.current) {
//       resizeObserver.observe(containerRef.current);
//     }

//     return () => resizeObserver.disconnect();
//   }, []);

//   useEffect(() => {
//     if (!svgRef.current || !data.length || dimensions.width === 0 || dimensions.height === 0) return;

//     // Clear any existing SVG content
//     d3.select(svgRef.current).selectAll("*").remove();

//     // Set up dimensions
//     const margin = { top: 20, right: 20, bottom: 30, left: 40 };
//     const width = dimensions.width - margin.left - margin.right;
//     const height = dimensions.height - margin.top - margin.bottom;

//     // Create SVG
//     const svg = d3
//       .select(svgRef.current)
//       .attr("width", width + margin.left + margin.right)
//       .attr("height", height + margin.top + margin.bottom)
//       .append("g")
//       .attr("transform", `translate(${margin.left},${margin.top})`);

//     // Set up scales
//     const x = d3
//       .scaleLinear()
//       .domain([
//         Math.min(...data.map((d) => d.value)),
//         Math.max(...data.map((d) => d.value))
//       ])
//       .range([0, width]);

//     const y = d3
//       .scaleLinear()
//       .domain([0, d3.max(data, (d) => d.name)])
//       .range([height, 0]);

//     // Area generator
//     const area = d3
//       .area<DataPoint>()
//       .x((d) => x(d.value))
//       .y0(height)
//       .y1((d) => y(d.name))
//       .curve(d3.curveMonotoneX);

//     // Line generator
//     const line = d3
//       .line<DataPoint>()
//       .x((d) => x(d.value))
//       .y((d) => y(d.name))
//       .curve(d3.curveMonotoneX);

//     // Gradient
//     const gradient = svg
//       .append("defs")
//       .append("linearGradient")
//       .attr("id", "area-gradient")
//       .attr("gradientUnits", "userSpaceOnUse")
//       .attr("x1", 0)
//       .attr("y1", 0)
//       .attr("x2", 0)
//       .attr("y2", height);

//     gradient
//       .append("stop")
//       .attr("offset", "0%")
//       .attr("stop-color", "rgb(202, 198, 236)");

//     gradient
//       .append("stop")
//       .attr("offset", "100%")
//       .attr("stop-color", "rgb(234, 239, 253)");

//     // Add area path with transition
//     svg
//       .append("path")
//       .datum(data)
//       .attr("fill", "url(#area-gradient)")
//       .attr("d", area)
//       .attr("opacity", 0)
//       .transition()
//       .duration(1000)
//       .ease(d3.easeQuadOut)
//       .attr("opacity", 0.7);

//     // Add line path with transition
//     svg
//       .append("path")
//       .datum(data)
//       .attr("fill", "none")
//       .attr("stroke", "rgb(102, 98, 136)")
//       .attr("stroke-width", 2)
//       .attr("d", line)
//       .attr("opacity", 0)
//       .transition()
//       .duration(1000)
//       .ease(d3.easeQuadOut)
//       .attr("opacity", 1);

//     // X Axis
//     svg
//       .append("g")
//       .attr("transform", `translate(0,${height})`)
//       .call(
//         d3
//           .axisBottom(x)
//           .ticks(Math.min(data.length, width > 600 ? 10 : 5))
//           .tickFormat((d) => `value ${d}`)
//       );

//     // Y Axis
//     svg.append("g").call(d3.axisLeft(y));

//     // Y Axis label
//     svg
//       .append("text")
//       .attr("transform", "rotate(-90)")
//       .attr("y", 0 - margin.left)
//       .attr("x", 0 - height / 2)
//       .attr("dy", "1em")
//       .style("text-anchor", "middle")
//       .text("Mileage (KM)");

//     // Add hover effect
//     const tooltip = d3
//       .select(containerRef.current)
//       .append("div")
//       .attr("class", "tooltip")
//       .style("opacity", 0)
//       .style("position", "absolute")
//       .style("background-color", "rgba(255, 255, 255, 0.9)")
//       .style("border", "1px solid #ddd")
//       .style("padding", "4px 8px")
//       .style("border-radius", "3px")
//       .style("pointer-events", "none")
//       .style("font-size", "10px")
//       .style("white-space", "nowrap")
//       .style("z-index", "10");

//     const hoverLine = svg
//       .append("line")
//       .attr("class", "hover-line")
//       .attr("y1", 0)
//       .attr("y2", height)
//       .style("stroke", "#999")
//       .style("stroke-width", "1px")
//       .style("opacity", 0);

//     svg
//       .append("rect")
//       .attr("width", width)
//       .attr("height", height)
//       .style("fill", "none")
//       .style("pointer-events", "all")
//       .on("mouseover", () => {
//         hoverLine.style("opacity", 1);
//         tooltip.style("opacity", 1);
//       })
//       .on("mouseout", () => {
//         hoverLine.style("opacity", 0);
//         tooltip.style("opacity", 0);
//       })
//       .on("mousemove", (event) => {
//         const [xPos] = d3.pointer(event);
//         const xDate = Math.round(x.invert(xPos));
//         const bisect = d3.bisector((d: DataPoint) => d.value).left;
//         const index = bisect(data, xDate);
//         const d = data[index];

//         hoverLine.attr("x1", x(d.value)).attr("x2", x(d.value));

//         const tooltipX = x(d.value) + margin.left;
//         const tooltipY = y(d.name) + margin.top;

//         tooltip
//           .html(`value ${d.value}: ${d.name.toFixed(1)} km`)
//           .style("left", `${tooltipX + 5}px`)
//           .style("top", `${tooltipY - 15}px`);
//       });
//   }, [data, dimensions]);

//   return (
//     <div ref={containerRef} className="w-full relative">
//       <svg ref={svgRef} className="w-full h-full"></svg>
//     </div>
//   );
// }

"use client";

import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

export interface DataPoint {
  [key: string]: string | number;
}

export interface AxisConfig {
  key: string;
  label: string;
  formatter?: (value: any) => string;
}

export interface ChartConfig {
  xAxis: AxisConfig;
  yAxis: AxisConfig;
  areaKey: string;
  areaLabel: string;
}

export interface AreaChartProps {
  data: DataPoint[];
  config: ChartConfig;
}

export default function AreaChart({ data, config }: AreaChartProps) {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      if (entries[0]) {
        const { width, height } = entries[0].contentRect;
        setDimensions({ width, height });
      }
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => resizeObserver.disconnect();
  }, []);

  useEffect(() => {
    if (!svgRef.current || !data.length || dimensions.width === 0 || dimensions.height === 0) return;

    // Clear any existing SVG content
    d3.select(svgRef.current).selectAll("*").remove();

    // Set up dimensions
    const margin = { top: 20, right: 20, bottom: 30, left: 40 };
    const width = dimensions.width - margin.left - margin.right;
    const height = dimensions.height - margin.top - margin.bottom;

    // Create SVG
    const svg = d3
      .select(svgRef.current)
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Set up scales
    const x = d3.scaleLinear()
      .domain(d3.extent(data, d => +d[config.xAxis.key]) as [number, number])
      .range([0, width]);

    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => +d[config.yAxis.key]) as number])
      .range([height, 0]);

    // Area generator
    const area = d3
      .area<DataPoint>()
      .x(d => x(+d[config.xAxis.key]))
      .y0(height)
      .y1(d => y(+d[config.yAxis.key]))
      .curve(d3.curveMonotoneX);

    // Line generator
    const line = d3
      .line<DataPoint>()
      .x(d => x(+d[config.xAxis.key]))
      .y(d => y(+d[config.yAxis.key]))
      .curve(d3.curveMonotoneX);

    // Gradient
    const gradient = svg
      .append("defs")
      .append("linearGradient")
      .attr("id", "area-gradient")
      .attr("gradientUnits", "userSpaceOnUse")
      .attr("x1", 0)
      .attr("y1", 0)
      .attr("x2", 0)
      .attr("y2", height);

    gradient
      .append("stop")
      .attr("offset", "0%")
      .attr("stop-color", "rgb(202, 198, 236)");

    gradient
      .append("stop")
      .attr("offset", "100%")
      .attr("stop-color", "rgb(234, 239, 253)");

    // Add area path with transition
    svg
      .append("path")
      .datum(data)
      .attr("fill", "url(#area-gradient)")
      .attr("d", area)
      .attr("opacity", 0)
      .transition()
      .duration(1000)
      .ease(d3.easeQuadOut)
      .attr("opacity", 0.7);

    // Add line path with transition
    svg
      .append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "rgb(102, 98, 136)")
      .attr("stroke-width", 2)
      .attr("d", line)
      .attr("opacity", 0)
      .transition()
      .duration(1000)
      .ease(d3.easeQuadOut)
      .attr("opacity", 1);

    // X Axis
    svg
      .append("g")
      .attr("transform", `translate(0,${height})`)
      .call(
        d3
          .axisBottom(x)
          .ticks(Math.min(data.length, width > 600 ? 10 : 5))
          .tickFormat(config.xAxis.formatter || (d => `${d}`))
      );

    // Y Axis
    svg.append("g").call(d3.axisLeft(y).tickFormat(config.yAxis.formatter || (d => `${d}`)));

    // Y Axis label
    svg
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left)
      .attr("x", 0 - height / 2)
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text(config.yAxis.label);

    // Add hover effect
    const tooltip = d3
      .select(containerRef.current)
      .append("div")
      .attr("class", "tooltip")
      .style("opacity", 0)
      .style("position", "absolute")
      .style("background-color", "rgba(255, 255, 255, 0.9)")
      .style("border", "1px solid #ddd")
      .style("padding", "4px 8px")
      .style("border-radius", "3px")
      .style("pointer-events", "none")
      .style("font-size", "10px")
      .style("white-space", "nowrap")
      .style("z-index", "10");

    const hoverLine = svg
      .append("line")
      .attr("class", "hover-line")
      .attr("y1", 0)
      .attr("y2", height)
      .style("stroke", "#999")
      .style("stroke-width", "1px")
      .style("opacity", 0);

    svg
      .append("rect")
      .attr("width", width)
      .attr("height", height)
      .style("fill", "none")
      .style("pointer-events", "all")
      .on("mouseover", () => {
        hoverLine.style("opacity", 1);
        tooltip.style("opacity", 1);
      })
      .on("mouseout", () => {
        hoverLine.style("opacity", 0);
        tooltip.style("opacity", 0);
      })
      .on("mousemove", (event) => {
        const [xPos] = d3.pointer(event);
        const xValue = x.invert(xPos);
        const bisect = d3.bisector((d: DataPoint) => +d[config.xAxis.key]).left;
        const index = bisect(data, xValue);
        const d = data[index];

        hoverLine.attr("x1", x(+d[config.xAxis.key])).attr("x2", x(+d[config.xAxis.key]));

        const tooltipX = x(+d[config.xAxis.key]) + margin.left;
        const tooltipY = y(+d[config.yAxis.key]) + margin.top;

        tooltip
          .html(`${config.xAxis.key}: ${d[config.xAxis.key]}<br>${config.yAxis.key}: ${d[config.yAxis.key]}`)
          .style("left", `${tooltipX + 5}px`)
          .style("top", `${tooltipY - 15}px`);
      });
  }, [data, config, dimensions]);

  return (
    <div ref={containerRef} className="w-full h-[300px] relative">
      <svg ref={svgRef} className="w-full h-full"></svg>
    </div>
  );
}

// // Example usage
// function ChartExample() {
//   const data = [
//     { month: "Jan", sales: 4000, units: 2400 },
//     { month: "Feb", sales: 3000, units: 1398 },
//     { month: "Mar", sales: 2000, units: 9800 },
//     { month: "Apr", sales: 2780, units: 3908 },
//     { month: "May", sales: 1890, units: 4800 },
//     { month: "Jun", sales: 2390, units: 3800 },
//   ];

//   const config = {
//     xAxis: {
//       key: "month",
//       label: "Month",
//     },
//     yAxis: {
//       key: "sales",
//       label: "Sales",
//       formatter: (d: number) => `$${d}`,
//     },
//     areaKey: "sales",
//     areaLabel: "Sales",
//   };

//   return <FlexibleAreaChart data={data} config={config} />;
// }

// export { ChartExample as Component };