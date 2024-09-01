// // "use client";

// // import React, { useRef, useEffect, useState } from "react";
// // import {
// //   Card,
// //   CardContent,
// //   CardDescription,
// //   CardHeader,
// //   CardTitle,
// // } from "@/components/ui/card";
// // import * as d3 from "d3";

// // const data = [
// //   { name: "Harsh Acceleration", value: 615, color: "hsl(9, 79%, 66%)" },
// //   { name: "Harsh Braking", value: 610, color: "hsl(177, 69%, 56%)" },
// //   { name: "Speeding", value: 450, color: "hsl(177, 70%, 34%)" },
// //   { name: "Night Drive", value: 500, color: "hsl(0, 0%, 80%)" },
// // ];

// // const total = data.reduce((sum, entry) => sum + entry.value, 0);

// // export default function Component() {
// //   const svgRef = useRef<SVGSVGElement>(null);
// //   const [hoveredSegment, setHoveredSegment] = useState<number | null>(null);

// //   useEffect(() => {
// //     if (!svgRef.current) return;

// //     const svg = d3.select(svgRef.current);
// //     const width = 400;
// //     const height = 400;
// //     const radius = Math.min(width, height) / 2;

// //     svg.attr("width", width).attr("height", height);

// //     const g = svg
// //       .append("g")
// //       .attr("transform", `translate(${width / 2},${height / 2})`);

// //     const pie = d3.pie<any>().value((d: any) => d.value);
// //     const arc = d3
// //       .arc<any>()
// //       .innerRadius(radius * 0.5)
// //       .outerRadius(radius * 0.8);
// //     const outerArc = d3
// //       .arc<any>()
// //       .innerRadius(radius * 0.9)
// //       .outerRadius(radius * 0.9);
// //     const labelArc = d3
// //       .arc<any>()
// //       .innerRadius(radius * 0.65)
// //       .outerRadius(radius * 0.65);

// //     const arcs = g
// //       .selectAll(".arc")
// //       .data(pie(data))
// //       .enter()
// //       .append("g")
// //       .attr("class", "arc");

// //     arcs
// //       .append("path")
// //       .attr("d", arc)
// //       .attr("fill", (d: any) => d.data.color)
// //       .attr("stroke", "hsl(var(--background))")
// //       .attr("stroke-width", 2)
// //       .transition()
// //       .duration(1000)
// //       .attrTween("d", function (d: any) {
// //         const i = d3.interpolate(d.startAngle, d.endAngle);
// //         return function (t) {
// //           d.endAngle = i(t);
// //           return arc(d);
// //         };
// //       })
// //       .ease(d3.easeBounceOut);

// //     const valueLabels = arcs
// //       .append("g")
// //       .attr("class", "value-label")
// //       .attr("transform", (d: any) => `translate(${labelArc.centroid(d)})`);

// //     valueLabels
// //       .append("circle")
// //       .attr("r", 28)
// //       .attr("fill", "hsl(var(--background))")
// //       .attr("stroke", (d: any) => d.data.color)
// //       .attr("stroke-width", 2)
// //       .style("opacity", 0)
// //       .transition()
// //       .duration(1000)
// //       .style("opacity", 1)
// //       .ease(d3.easeElastic);

// //     valueLabels
// //       .append("text")
// //       .attr("dy", ".35em")
// //       .attr("text-anchor", "middle")
// //       .attr("fill", "hsl(var(--foreground))")
// //       .attr("font-size", "18px")
// //       .attr("font-weight", "bold")
// //       .text((d: any) => d.data.value)
// //       .style("opacity", 0)
// //       .transition()
// //       .duration(1000)
// //       .style("opacity", 1)
// //       .ease(d3.easeElastic);

// //     const nameLabels = arcs
// //       .append("text")
// //       .attr("class", "name-label")
// //       .attr("transform", (d: any) => {
// //         const pos = outerArc.centroid(d);
// //         const midAngle = d.startAngle + (d.endAngle - d.startAngle) / 2;
// //         pos[0] = radius * (midAngle < Math.PI ? 1.05 : -1.05);
// //         return `translate(${pos})`;
// //       })
// //       .attr("dy", ".35em")
// //       .attr("text-anchor", (d: any) => {
// //         const midAngle = d.startAngle + (d.endAngle - d.startAngle) / 2;
// //         return midAngle < Math.PI ? "start" : "end";
// //       })
// //       .attr("fill", "hsl(var(--foreground))")
// //       .attr("font-size", "16px")
// //       .attr("font-weight", "medium")
// //       .text((d: any) => d.data.name)
// //       .style("opacity", 0)
// //       .transition()
// //       .duration(1000)
// //       .style("opacity", 1)
// //       .ease(d3.easeElastic);

// //     g.append("text")
// //       .attr("text-anchor", "middle")
// //       .attr("dy", "-0.5em")
// //       .attr("font-size", "28px")
// //       .attr("font-weight", "bold")
// //       .attr("fill", "hsl(var(--foreground))")
// //       .text(total)
// //       .style("opacity", 0)
// //       .transition()
// //       .duration(1000)
// //       .style("opacity", 1)
// //       .ease(d3.easeElastic);

// //     g.append("text")
// //       .attr("text-anchor", "middle")
// //       .attr("dy", "1.5em")
// //       .attr("font-size", "16px")
// //       .attr("fill", "hsl(var(--muted-foreground))")
// //       .text("Total")
// //       .style("opacity", 0)
// //       .transition()
// //       .duration(1000)
// //       .style("opacity", 1)
// //       .ease(d3.easeElastic);

// //     // Add hover effects
// //     arcs
// //       .on("mouseenter", function (event, d: any) {
// //         d3.select(this)
// //           .select("path")
// //           .transition()
// //           .duration(200)
// //           .attr(
// //             "d",
// //             d3
// //               .arc<any>()
// //               .innerRadius(radius * 0.5)
// //               .outerRadius(radius * 0.85)
// //           );

// //         d3.select(this)
// //           .select(".value-label")
// //           .transition()
// //           .duration(200)
// //           .attr("transform", (d: any) => {
// //             const centroid = labelArc.centroid(d);
// //             const x = centroid[0] * 1.1;
// //             const y = centroid[1] * 1.1;
// //             return `translate(${x},${y})`;
// //           });

// //         d3.select(this)
// //           .select(".name-label")
// //           .transition()
// //           .duration(200)
// //           .attr("font-size", "18px")
// //           .attr("font-weight", "bold");

// //         setHoveredSegment(d.index);
// //       })
// //       .on("mouseleave", function (event, d: any) {
// //         d3.select(this)
// //           .select("path")
// //           .transition()
// //           .duration(200)
// //           .attr("d", arc);

// //         d3.select(this)
// //           .select(".value-label")
// //           .transition()
// //           .duration(200)
// //           .attr("transform", (d: any) => `translate(${labelArc.centroid(d)})`);

// //         d3.select(this)
// //           .select(".name-label")
// //           .transition()
// //           .duration(200)
// //           .attr("font-size", "16px")
// //           .attr("font-weight", "medium");

// //         setHoveredSegment(null);
// //       });
// //   }, []);

// //   return (
// //     <Card className="w-full max-w-2xl bg-[#eaf0fe]">
// //       <CardHeader>
// //         <CardTitle className="text-2xl font-bold">Driving Metrics</CardTitle>
// //         <CardDescription>Summary of driving behavior</CardDescription>
// //       </CardHeader>
// //       <CardContent>
// //         <div className="relative">
// //           <svg ref={svgRef}></svg>
// //           {hoveredSegment !== null && (
// //             <div className="absolute top-0 left-0 bg-background/80 p-2 rounded shadow">
// //               <p className="font-bold">{data[hoveredSegment].name}</p>
// //               <p>Value: {data[hoveredSegment].value}</p>
// //               <p>
// //                 Percentage:{" "}
// //                 {((data[hoveredSegment].value / total) * 100).toFixed(2)}%
// //               </p>
// //             </div>
// //           )}
// //         </div>
// //       </CardContent>
// //     </Card>
// //   );
// // }
// // "use client"

// // import React, { useRef, useEffect, useState } from 'react'
// // import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// // import * as d3 from 'd3'

// // const data = [
// //   { name: 'Harsh Acceleration', value: 615, color: 'hsl(358, 94%, 76%)' },
// //   { name: 'Harsh Braking', value: 610, color: 'hsl(174, 72%, 56%)' },
// //   { name: 'Speeding', value: 45, color: 'hsl(174, 72%, 46%)' },
// //   { name: 'Night Drive', value: 50, color: 'hsl(0, 0%, 80%)' },
// // ]

// // const total = data.reduce((sum, entry) => sum + entry.value, 0)

// // export default function Component() {
// //   const svgRef = useRef<SVGSVGElement>(null)
// //   const [hoveredSegment, setHoveredSegment] = useState<number | null>(null)

// //   useEffect(() => {
// //     if (!svgRef.current) return

// //     const svg = d3.select(svgRef.current)
// //     const width = 400
// //     const height = 400
// //     const radius = Math.min(width, height) / 2

// //     svg.attr('width', width).attr('height', height)

// //     const g = svg.append('g').attr('transform', `translate(${width / 2},${height / 2})`)

// //     const pie = d3.pie<any>().value((d: any) => d.value)
// //     const arc = d3.arc<any>().innerRadius(radius * 0.5).outerRadius(radius * 0.7)
// //     const labelArc = d3.arc<any>().innerRadius(radius * 0.85).outerRadius(radius * 0.85)

// //     const arcs = g.selectAll('.arc')
// //       .data(pie(data))
// //       .enter().append('g')
// //       .attr('class', 'arc')

// //     arcs.append('path')
// //       .attr('d', arc)
// //       .attr('fill', (d: any) => d.data.color)
// //       .attr('stroke', 'hsl(var(--background))')
// //       .attr('stroke-width', 2)
// //       .transition()
// //       .duration(1000)
// //       .attrTween('d', function(d: any) {
// //         const i = d3.interpolate(d.startAngle, d.endAngle)
// //         return function(t) {
// //           d.endAngle = i(t)
// //           return arc(d)
// //         }
// //       })
// //       .ease(d3.easeBounceOut)

// //     const labelGroups = arcs.append('g')
// //       .attr('class', 'label-group')
// //       .attr('transform', (d: any) => `translate(${labelArc.centroid(d)})`)

// //     labelGroups.append('circle')
// //       .attr('r', 32)
// //       .attr('fill', 'hsl(var(--background))')
// //       .attr('stroke', (d: any) => d.data.color)
// //       .attr('stroke-width', 2)
// //       .style('opacity', 0)
// //       .transition()
// //       .duration(1000)
// //       .style('opacity', 1)
// //       .ease(d3.easeElastic)

// //     labelGroups.append('text')
// //       .attr('dy', '-0.5em')
// //       .attr('text-anchor', 'middle')
// //       .attr('fill', 'hsl(var(--foreground))')
// //       .attr('font-size', '14px')
// //       .attr('font-weight', 'bold')
// //       .text((d: any) => d.data.value)
// //       .style('opacity', 0)
// //       .transition()
// //       .duration(1000)
// //       .style('opacity', 1)
// //       .ease(d3.easeElastic)

// //     labelGroups.append('text')
// //       .attr('dy', '1em')
// //       .attr('text-anchor', 'middle')
// //       .attr('fill', 'hsl(var(--muted-foreground))')
// //       .attr('font-size', '12px')
// //       .text((d: any) => d.data.name)
// //       .style('opacity', 0)
// //       .transition()
// //       .duration(1000)
// //       .style('opacity', 1)
// //       .ease(d3.easeElastic)

// //     g.append('text')
// //       .attr('text-anchor', 'middle')
// //       .attr('dy', '-0.5em')
// //       .attr('font-size', '28px')
// //       .attr('font-weight', 'bold')
// //       .attr('fill', 'hsl(var(--foreground))')
// //       .text(total)
// //       .style('opacity', 0)
// //       .transition()
// //       .duration(1000)
// //       .style('opacity', 1)
// //       .ease(d3.easeElastic)

// //     g.append('text')
// //       .attr('text-anchor', 'middle')
// //       .attr('dy', '1.5em')
// //       .attr('font-size', '16px')
// //       .attr('fill', 'hsl(var(--muted-foreground))')
// //       .text('Total')
// //       .style('opacity', 0)
// //       .transition()
// //       .duration(1000)
// //       .style('opacity', 1)
// //       .ease(d3.easeElastic)

// //     // Add hover effects
// //     arcs.on('mouseenter', function(event, d: any) {
// //       d3.select(this).select('path').transition()
// //         .duration(200)
// //         .attr('d', d3.arc<any>().innerRadius(radius * 0.5).outerRadius(radius * 0.75))

// //       d3.select(this).select('.label-group').transition()
// //         .duration(200)
// //         .attr('transform', (d: any) => {
// //           const centroid = labelArc.centroid(d)
// //           const x = centroid[0] * 1.1
// //           const y = centroid[1] * 1.1
// //           return `translate(${x},${y})`
// //         })

// //       setHoveredSegment(d.index)
// //     })
// //     .on('mouseleave', function(event, d: any) {
// //       d3.select(this).select('path').transition()
// //         .duration(200)
// //         .attr('d', arc)

// //       d3.select(this).select('.label-group').transition()
// //         .duration(200)
// //         .attr('transform', (d: any) => `translate(${labelArc.centroid(d)})`)

// //       setHoveredSegment(null)
// //     })

// //   }, [])

// //   return (
// //     <Card className="w-full max-w-2xl">
// //       <CardHeader>
// //         <CardTitle className="text-2xl font-bold">Driving Metrics</CardTitle>
// //         <CardDescription>Summary of driving behavior</CardDescription>
// //       </CardHeader>
// //       <CardContent>
// //         <div className="relative">
// //           <svg ref={svgRef}></svg>
// //           {hoveredSegment !== null && (
// //             <div className="absolute top-4 left-4 bg-background/95 p-3 rounded-lg shadow-lg border border-border">
// //               <p className="font-bold text-lg">{data[hoveredSegment].name}</p>
// //               <p className="text-muted-foreground">Value: <span className="font-medium text-foreground">{data[hoveredSegment].value}</span></p>
// //               <p className="text-muted-foreground">Percentage: <span className="font-medium text-foreground">{((data[hoveredSegment].value / total) * 100).toFixed(2)}%</span></p>
// //             </div>
// //           )}
// //         </div>
// //       </CardContent>
// //     </Card>
// //   )
// // }

// "use client";

// import React, { useRef, useEffect, useState } from "react";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import * as d3 from "d3";

// const data = [
//   { name: "Harsh Acceleration", value: 615, color: "hsl(358, 94%, 76%)" },
//   { name: "Harsh Braking", value: 610, color: "hsl(174, 72%, 56%)" },
//   { name: "Speeding", value: 45, color: "hsl(174, 72%, 46%)" },
//   { name: "Night Drive", value: 50, color: "hsl(0, 0%, 80%)" },
// ];

// const total = data.reduce((sum, entry) => sum + entry.value, 0);

// export default function Component() {
//   const svgRef = useRef<SVGSVGElement>(null);
//   const [hoveredSegment, setHoveredSegment] = useState<number | null>(null);

//   useEffect(() => {
//     if (!svgRef.current) return;

//     const svg = d3.select(svgRef.current);
//     const width = 400;
//     const height = 400;
//     const radius = Math.min(width, height) / 2;

//     svg.attr("width", width).attr("height", height);

//     const g = svg
//       .append("g")
//       .attr("transform", `translate(${width / 2},${height / 2})`);

//     const pie = d3.pie<any>().value((d: any) => d.value);
//     const arc = d3
//       .arc<any>()
//       .innerRadius(radius * 0.6)
//       .outerRadius(radius * 0.8);
//     const labelArc = d3
//       .arc<any>()
//       .innerRadius(radius * 1)
//       .outerRadius(radius * 0.5);
//     const outerArc = d3
//       .arc<any>()
//       .innerRadius(radius * 0.9)
//       .outerRadius(radius * 0.9);

//     const arcs = g
//       .selectAll(".arc")
//       .data(pie(data))
//       .enter()
//       .append("g")
//       .attr("class", "arc");

//     arcs
//       .append("path")
//       .attr("d", arc)
//       .attr("fill", (d: any) => d.data.color)
//       .attr("stroke", "hsl(var(--background))")
//       .attr("stroke-width", 2)
//       .transition()
//       .duration(1000)
//       .attrTween("d", function (d: any) {
//         const i = d3.interpolate(d.startAngle, d.endAngle);
//         return function (t) {
//           d.endAngle = i(t);
//           return arc(d);
//         };
//       })
//       .ease(d3.easeBounceOut);

//     const valueLabels = arcs
//       .append("g")
//       .attr("class", "value-label")
//       .attr("transform", (d: any) => `translate(${labelArc.centroid(d)})`);

//     valueLabels
//       .append("circle")
//       .attr("r", 28)
//       .attr("fill", "hsl(var(--background))")
//       .attr("stroke", (d: any) => d.data.color)
//       .attr("stroke-width", 2);

//     valueLabels
//       .append("text")
//       .attr("dy", ".35em")
//       .attr("text-anchor", "middle")
//       .attr("fill", "hsl(var(--foreground))")
//       .attr("font-size", "18px")
//       .attr("font-weight", "bold")
//       .text((d: any) => d.data.value);

//     const nameLabels = arcs
//       .append("text")
//       .attr("class", "name-label")
//       .attr("transform", (d: any) => {
//         const pos = outerArc.centroid(d);
//         const midAngle = d.startAngle + (d.endAngle - d.startAngle) / 2;
//         pos[0] = radius * (midAngle < Math.PI ? 1.1 : -1.1);
//         return `translate(${pos})`;
//       })
//       .attr("dy", ".35em")
//       .attr("text-anchor", (d: any) => {
//         const midAngle = d.startAngle + (d.endAngle - d.startAngle) / 2;
//         return midAngle < Math.PI ? "start" : "end";
//       })
//       .attr("fill", "hsl(var(--foreground))")
//       .attr("font-size", "14px")
//       .text((d: any) => d.data.name);

//     g.append("text")
//       .attr("text-anchor", "middle")
//       .attr("dy", "-0.2em")
//       .attr("font-size", "40px")
//       .attr("font-weight", "bold")
//       .attr("fill", "hsl(var(--foreground))")
//       .text(total);

//     g.append("text")
//       .attr("text-anchor", "middle")
//       .attr("dy", "1.8em")
//       .attr("font-size", "28px")
//       .attr("fill", "hsl(var(--muted-foreground))")
//       .text("Total");

//     // Add hover effects
//     arcs
//       .on("mouseenter", function (event, d: any) {
//         d3.select(this)
//           .select("path")
//           .transition()
//           .duration(200)
//           .attr(
//             "d",
//             d3
//               .arc<any>()
//               .innerRadius(radius * 0.6)
//               .outerRadius(radius * 0.85)
//           );

//         d3.select(this)
//           .select(".value-label")
//           .transition()
//           .duration(200)
//           .attr("transform", (d: any) => {
//             const centroid = labelArc.centroid(d);
//             const x = centroid[0] * 1.1;
//             const y = centroid[1] * 1.1;
//             return `translate(${x},${y})`;
//           });

//         setHoveredSegment(d.index);
//       })
//       .on("mouseleave", function (event, d: any) {
//         d3.select(this)
//           .select("path")
//           .transition()
//           .duration(200)
//           .attr("d", arc);

//         d3.select(this)
//           .select(".value-label")
//           .transition()
//           .duration(200)
//           .attr("transform", (d: any) => `translate(${labelArc.centroid(d)})`);

//         setHoveredSegment(null);
//       });

//     // Clear any existing paths before redrawing
//     return () => {
//       svg.selectAll("*").remove();
//     };
//   }, []);

//   return (
//     <Card className="w-full max-w-2xl">
//       <CardHeader>
//         <CardTitle className="text-2xl font-bold">Driving Metrics</CardTitle>
//         <CardDescription>Summary of driving behavior</CardDescription>
//       </CardHeader>
//       <CardContent>
//         <div className="relative">
//           <svg ref={svgRef}></svg>
//           {hoveredSegment !== null && (
//             <div className="absolute top-4 left-4 bg-background/95 p-3 rounded-lg shadow-lg border border-border">
//               <p className="font-bold text-lg">{data[hoveredSegment].name}</p>
//               <p className="text-muted-foreground">
//                 Value:{" "}
//                 <span className="font-medium text-foreground">
//                   {data[hoveredSegment].value}
//                 </span>
//               </p>
//               <p className="text-muted-foreground">
//                 Percentage:{" "}
//                 <span className="font-medium text-foreground">
//                   {((data[hoveredSegment].value / total) * 100).toFixed(2)}%
//                 </span>
//               </p>
//             </div>
//           )}
//         </div>
//       </CardContent>
//     </Card>
//   );
// }
// import DonutChart from "@/components/donut-chart";

// const data = [
//   { name: "Harsh Acceleration", value: 615, color: "hsl(358, 94%, 76%)" },
//   { name: "Harsh Braking", value: 610, color: "hsl(174, 72%, 56%)" },
//   { name: "Speeding", value: 45, color: "hsl(174, 72%, 46%)" },
//   { name: "Night Drive", value: 50, color: "hsl(0, 0%, 80%)" },
// ];

// export default function Page() {
//   return <DonutChart data={data} />;
// }
import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import DonutChart from '@/components/donut-chart';



export default function DrivingMetricsCard() {
  return (
    <Card className="w-full max-w-2xl">
      <CardHeader >
        <CardTitle className="text-2xl font-bold">Driving Metrics</CardTitle>
        <CardDescription className='bg-gradient-to-r from-indigo-500'>Summary of driving behavior</CardDescription>
      </CardHeader>
      <CardContent className='p-4'>
        <DonutChart data={drivingData} />
      </CardContent>
    </Card>
  )
}