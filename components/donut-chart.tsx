'use client'

import React, { useRef, useEffect, useState } from "react"
import * as d3 from "d3"

interface DataItem {
  name: string
  value: number
  color: string
}

interface DonutChartProps {
  data: DataItem[]
}

const DonutChart: React.FC<DonutChartProps> = ({ data }) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const [hoveredSegment, setHoveredSegment] = useState<number | null>(null)

  const total = data.reduce((sum, entry) => sum + entry.value, 0)

  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      if (entries[0]) {
        const { width, height } = entries[0].contentRect
        setDimensions({ width, height })
      }
    })

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current)
    }

    return () => {
      if (containerRef.current) {
        resizeObserver.unobserve(containerRef.current)
      }
    }
  }, [])

  useEffect(() => {
    if (!svgRef.current || dimensions.width === 0 || dimensions.height === 0) return

    const svg = d3.select(svgRef.current)
    const radius = Math.min(dimensions.width, dimensions.height) / 2 * 0.9

    svg.attr("width", dimensions.width).attr("height", dimensions.height)

    const g = svg
      .append("g")
      .attr("transform", `translate(${dimensions.width / 2},${dimensions.height / 2})`)

    const pie = d3.pie<DataItem>().value((d) => d.value)
    const arc = d3
      .arc<d3.PieArcDatum<DataItem>>()
      .innerRadius(radius * 0.6)
      .outerRadius(radius * 0.8)
    const labelArc = d3
      .arc<d3.PieArcDatum<DataItem>>()
      .innerRadius(radius * 1.2)
      .outerRadius(radius * 0.5)
    const outerArc = d3
      .arc<d3.PieArcDatum<DataItem>>()
      .innerRadius(radius * 0.85)
      .outerRadius(radius * 0.85)

    const arcs = g
      .selectAll(".arc")
      .data(pie(data))
      .enter()
      .append("g")
      .attr("class", "arc")

    arcs
      .append("path")
      .attr("d", arc)
      .attr("fill", (d) => d.data.color)
      .attr("stroke", "white")
      .attr("stroke-width", 2)
      .transition()
      .duration(1000)
      .attrTween("d", function (d) {
        const i = d3.interpolate(d.startAngle + 0.1, d.endAngle)
        return function (t) {
          d.endAngle = i(t)
          return arc(d)
        }
      })
      .ease(d3.easeBounceOut)

    const valueLabelSize = Math.max(12, Math.min(18, radius / 10))
    const valueCircleSize = valueLabelSize * 1.5

    const valueLabels = arcs
      .append("g")
      .attr("class", "value-label")
      .attr("transform", (d) => `translate(${labelArc.centroid(d)})`)

    valueLabels
      .append("circle")
      .attr("r", valueCircleSize)
      .attr("fill", "white")
      .attr("stroke", (d) => d.data.color)
      .attr("stroke-width", 2)

    valueLabels
      .append("text")
      .attr("dy", ".35em")
      .attr("text-anchor", "middle")
      .attr("fill", "black")
      .attr("font-size", `${valueLabelSize}px`)
      .attr("font-weight", "bold")
      .text((d) => d.data.value)

    const nameLabelSize = Math.max(10, Math.min(14, radius / 15))

    const nameLabels = arcs
      .append("text")
      .attr("class", "name-label")
      .attr("transform", (d) => {
        const pos = outerArc.centroid(d)
        const midAngle = d.startAngle + (d.endAngle - d.startAngle) / 2
        pos[0] = radius * (midAngle < Math.PI ? 1 : -1)
        return `translate(${pos})`
      })
      .attr("dy", ".35em")
      .attr("text-anchor", (d) => {
        const midAngle = d.startAngle + (d.endAngle - d.startAngle) / 2
        return midAngle < Math.PI ? "start" : "end"
      })
      .attr("fill", "black")
      .attr("font-size", `${nameLabelSize}px`)

    nameLabels.each(function(d) {
      const text = d3.select(this);
      const words = d.data.name.split(/\s+/);
      if (words.length > 1) {
        text.text('');
        text.append('tspan')
          .attr('x', 0)
          .attr('dy', '-0.7em')
          .text(words[0]);
        text.append('tspan')
          .attr('x', 0)
          .attr('dy', '1.2em')
          .text(words.slice(1).join(' '));
      } else {
        text.text(d.data.name);
      }
    });

    // arcs
    //   .append("polyline")
    //   .attr("stroke", "black")
    //   .attr("fill", "none")
    //   .attr("stroke-width", 1)
    //   .attr("points", (d) => {
    //     const pos = outerArc.centroid(d)
    //     const midAngle = d.startAngle + (d.endAngle - d.startAngle) / 2
    //     pos[0] = radius * (midAngle < Math.PI ? 1 : -1)
    //     return [arc.centroid(d), outerArc.centroid(d), pos]
    //   })

    const centerLabelSize = Math.max(24, Math.min(48, radius / 5))
    const subLabelSize = Math.max(14, Math.min(28, radius / 10))

    g.append("text")
      .attr("text-anchor", "middle")
      .attr("dy", "-0.1em")
      .attr("font-size", `${centerLabelSize}px`)
      .attr("font-weight", "bold")
      .attr("fill", "black")
      .text(total)

    g.append("text")
      .attr("text-anchor", "middle")
      .attr("dy", "1.2em")
      .attr("font-size", `${subLabelSize}px`)
      .attr("fill", "gray")
      .text("Total")

    arcs
      .on("mouseenter", function (event, d) {
        d3.select(this)
          .select("path")
          .transition()
          .duration(200)
          .attr(
            "d",
            d3
              .arc<d3.PieArcDatum<DataItem>>()
              .innerRadius(radius * 0.6)
              .outerRadius(radius * 0.85)
          )

        d3.select(this)
          .select(".value-label")
          .transition()
          .duration(200)
          .attr("transform", (d) => {
            const centroid = labelArc.centroid(d)
            const x = centroid[0] * 1.1
            const y = centroid[1] * 1.1
            return `translate(${x},${y})`
          })

        d3.select(this)
          .select(".name-label")
          .transition()
          .duration(200)
          .attr("font-size", `${nameLabelSize * 1.2}px`)
          .attr("font-weight", "bold")

        setHoveredSegment(d.index)
      })
      .on("mouseleave", function (event, d) {
        d3.select(this)
          .select("path")
          .transition()
          .duration(200)
          .attr("d", arc)

        d3.select(this)
          .select(".value-label")
          .transition()
          .duration(200)
          .attr("transform", (d) => `translate(${labelArc.centroid(d)})`)

        d3.select(this)
          .select(".name-label")
          .transition()
          .duration(200)
          .attr("font-size", `${nameLabelSize}px`)
          .attr("font-weight", "normal")

        setHoveredSegment(null)
      })

    return () => {
      svg.selectAll("*").remove()
    }
  }, [data, dimensions, total])

  return (
    <div ref={containerRef} className="w-full relative">
      <svg ref={svgRef}></svg>
      {hoveredSegment !== null && (
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 bg-white p-2 rounded-md shadow-md border border-gray-200 text-xs" style={{ width: '120px' }}>
          <p className="font-bold text-sm mb-1 truncate" style={{ color: data[hoveredSegment].color }}>{data[hoveredSegment].name}</p>
          <p className="text-gray-600">
            Value: <span className="font-medium text-black">{data[hoveredSegment].value}</span>
          </p>
          <p className="text-gray-600">
            %: <span className="font-medium text-black">{((data[hoveredSegment].value / total) * 100).toFixed(1)}%</span>
          </p>
        </div>
      )}
    </div>
  )
}

export default DonutChart