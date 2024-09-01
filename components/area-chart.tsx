"use client";

import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

export interface DataPoint {
  day: number;
  kilometers: number;
}

export default function AreaChart({ data }: { data: DataPoint[] }) {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    // Clear any existing SVG content
    d3.select(svgRef.current).selectAll("*").remove();

    // Set up dimensions
    const margin = { top: 20, right: 30, bottom: 30, left: 40 };
    const width = 600 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

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
      .domain(d3.extent(data, (d) => d.day) as [number, number])
      .range([0, width]);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.kilometers) as number])
      .range([height, 0]);

    // area generator
    const area = d3
      .area<DataPoint>()
      .x((d) => x(d.day))
      .y0(height)
      .y1((d) => y(d.kilometers))
      .curve(d3.curveBasis);

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

    svg
      .append("path")
      .datum(data)
      .attr("fill", "url(#area-gradient)")
      .attr("d", area);

    svg
      .append("g")
      .attr("transform", `translate(0,${height})`)
      .call(
        d3
          .axisBottom(x)
          .ticks(7)
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
      .style("text-anchor", "end")
      .text("Milage(KM)");
  }, [data]);

  return (
    <div className="area-chart">
      <svg ref={svgRef}></svg>
    </div>
  );
}
