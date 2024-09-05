"use client";

import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

interface DataPoint {
  name: string
  value: number
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
        const xDate = Math.round(x.invert(xPos));
        const bisect = d3.bisector((d: DataPoint) => d.day).left;
        const index = bisect(data, xDate);
        const d = data[index];

        hoverLine.attr("x1", x(d.day)).attr("x2", x(d.day));

        const tooltipX = x(d.day) + margin.left;
        const tooltipY = y(d.kilometers) + margin.top;

        tooltip
          .html(`Day ${d.day}: ${d.kilometers.toFixed(1)} km`)
          .style("left", `${tooltipX + 5}px`)
          .style("top", `${tooltipY - 15}px`);
      });
  }, [data, dimensions]);

  return (
    <div ref={containerRef} className="w-full relative">
      <svg ref={svgRef} className="w-full h-full"></svg>
    </div>
  );
}