// "use client";

// import React, { useEffect, useRef } from "react";
// import * as d3 from "d3";

// export interface DataPoint {
//   day: number;
//   kilometers: number;
// }

// export default function AreaChart({ data }: { data: DataPoint[] }) {
//   const svgRef = useRef<SVGSVGElement | null>(null);

//   useEffect(() => {
//     if (!svgRef.current || !data.length) return;

//     // Clear any existing SVG content
//     d3.select(svgRef.current).selectAll("*").remove();

//     // Set up dimensions
//     const margin = { top: 20, right: 30, bottom: 30, left: 40 };
//     const width = 600 - margin.left - margin.right;
//     const height = 400 - margin.top - margin.bottom;

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
//         Math.min(...data.map((d) => d.day)),
//         Math.max(...data.map((d) => d.day))
//       ])
//       .range([0, width]);

//     const y = d3
//       .scaleLinear()
//       .domain([0, d3.max(data, (d) => d.kilometers) as number])
//       .range([height, 0]);

//     // Area generator
//     const area = d3
//       .area<DataPoint>()
//       .x((d) => x(d.day))
//       .y0(height)
//       .y1((d) => y(d.kilometers))
//       .curve(d3.curveMonotoneX);

//     // Line generator
//     const line = d3
//       .line<DataPoint>()
//       .x((d) => x(d.day))
//       .y((d) => y(d.kilometers))
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

//     // Add data points with transition
//     svg
//       .selectAll(".data-point")
//       .data(data)
//       .enter()
//       .append("circle")
//       .attr("class", "data-point")
//       .attr("cx", (d) => x(d.day))
//       .attr("cy", (d) => y(d.kilometers))
//       .attr("r", 4)
//       .attr("fill", "rgb(102, 98, 136)")
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
//           .ticks(Math.min(data.length, 10))
//           .tickFormat((d) => `Day ${d}`)
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
//       .select("body")
//       .append("div")
//       .attr("class", "tooltip")
//       .style("opacity", 0)
//       .style("position", "absolute")
//       .style("background-color", "white")
//       .style("border", "1px solid #ddd")
//       .style("padding", "10px")
//       .style("border-radius", "5px");

//     const hoverLine = svg
//       .append("line")
//       .attr("class", "hover-line")
//       .attr("y1", 0)
//       .attr("y2", height)
//       .style("stroke", "#999")
//       .style("stroke-width", "1px")
//       .style("opacity", 0);

//     const hoverCircle = svg
//       .append("circle")
//       .attr("class", "hover-circle")
//       .attr("r", 6)
//       .style("fill", "rgb(102, 98, 136)")
//       .style("stroke", "#fff")
//       .style("stroke-width", "2px")
//       .style("opacity", 0);

//     svg
//       .append("rect")
//       .attr("width", width)
//       .attr("height", height)
//       .style("fill", "none")
//       .style("pointer-events", "all")
//       .on("mouseover", () => {
//         hoverLine.style("opacity", 1);
//         hoverCircle.style("opacity", 1);
//         tooltip.style("opacity", 1);
//       })
//       .on("mouseout", () => {
//         hoverLine.style("opacity", 0);
//         hoverCircle.style("opacity", 0);
//         tooltip.style("opacity", 0);
//       })
//       .on("mousemove", (event) => {
//         const [xPos] = d3.pointer(event);
//         const xDate = Math.round(x.invert(xPos));
//         const bisect = d3.bisector((d: DataPoint) => d.day).left;
//         const index = bisect(data, xDate);
//         const d = data[index];

//         hoverLine.attr("x1", x(d.day)).attr("x2", x(d.day));
//         hoverCircle.attr("cx", x(d.day)).attr("cy", y(d.kilometers));

//         tooltip
//           .html(`Day: ${d.day}<br>Mileage: ${d.kilometers.toFixed(2)} KM`)
//           .style("left", `${event.pageX + 10}px`)
//           .style("top", `${event.pageY - 10}px`);
//       });
//   }, [data]);

//   return (
//     <div className="area-chart">
//       <svg ref={svgRef}></svg>
//     </div>
//   );
// }

"use client";

import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export interface DataPoint {
  day: number;
  kilometers: number;
}

export default function AreaChart({ data }: { data: DataPoint[] }) {
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
    const x = d3
      .scaleLinear()
      .domain([
        Math.min(...data.map((d) => d.day)),
        Math.max(...data.map((d) => d.day))
      ])
      .range([0, width]);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.kilometers) as number])
      .range([height, 0]);

    // Area generator
    const area = d3
      .area<DataPoint>()
      .x((d) => x(d.day))
      .y0(height)
      .y1((d) => y(d.kilometers))
      .curve(d3.curveMonotoneX);

    // Line generator
    const line = d3
      .line<DataPoint>()
      .x((d) => x(d.day))
      .y((d) => y(d.kilometers))
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

    // Add data points with transition
    svg
      .selectAll(".data-point")
      .data(data)
      .enter()
      .append("circle")
      .attr("class", "data-point")
      .attr("cx", (d) => x(d.day))
      .attr("cy", (d) => y(d.kilometers))
      .attr("r", 4)
      .attr("fill", "rgb(102, 98, 136)")
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
          .tickFormat((d) => `Day ${d}`)
      );

    // Y Axis
    svg.append("g").call(d3.axisLeft(y));

    // Y Axis label
    svg
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left)
      .attr("x", 0 - height / 2)
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text("Mileage (KM)");

    // Add hover effect
    const tooltip = d3
      .select(containerRef.current)
      .append("div")
      .attr("class", "tooltip")
      .style("opacity", 0)
      .style("position", "absolute")
      .style("background-color", "white")
      .style("border", "1px solid #ddd")
      .style("padding", "10px")
      .style("border-radius", "5px");

    const hoverLine = svg
      .append("line")
      .attr("class", "hover-line")
      .attr("y1", 0)
      .attr("y2", height)
      .style("stroke", "#999")
      .style("stroke-width", "1px")
      .style("opacity", 0);

    const hoverCircle = svg
      .append("circle")
      .attr("class", "hover-circle")
      .attr("r", 6)
      .style("fill", "rgb(102, 98, 136)")
      .style("stroke", "#fff")
      .style("stroke-width", "2px")
      .style("opacity", 0);

    svg
      .append("rect")
      .attr("width", width)
      .attr("height", height)
      .style("fill", "none")
      .style("pointer-events", "all")
      .on("mouseover", () => {
        hoverLine.style("opacity", 1);
        hoverCircle.style("opacity", 1);
        tooltip.style("opacity", 1);
      })
      .on("mouseout", () => {
        hoverLine.style("opacity", 0);
        hoverCircle.style("opacity", 0);
        tooltip.style("opacity", 0);
      })
      .on("mousemove", (event) => {
        const [xPos] = d3.pointer(event);
        const xDate = Math.round(x.invert(xPos));
        const bisect = d3.bisector((d: DataPoint) => d.day).left;
        const index = bisect(data, xDate);
        const d = data[index];

        hoverLine.attr("x1", x(d.day)).attr("x2", x(d.day));
        hoverCircle.attr("cx", x(d.day)).attr("cy", y(d.kilometers));

        tooltip
          .html(`Day: ${d.day}<br>Mileage: ${d.kilometers.toFixed(2)} KM`)
          .style("left", `${event.offsetX + 10}px`)
          .style("top", `${event.offsetY - 10}px`);
      });
  }, [data, dimensions]);

  return (
    <Card className="w-full h-[400px]">
      <CardHeader>
        <CardTitle>Mileage Over Time</CardTitle>
      </CardHeader>
      <CardContent ref={containerRef} className="relative h-[calc(100%-5rem)]">
        <svg ref={svgRef} className="w-full h-full"></svg>
      </CardContent>
    </Card>
  );
}