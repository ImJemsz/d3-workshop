import React, { useRef, useEffect } from "react";
import * as d3 from "d3";

interface BarChartProps {
  data: number[];
  width?: number;
  height?: number;
}

const BarChart1: React.FC<BarChartProps> = ({ data, width = 400, height = 200 }) => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove(); // ล้างก่อนวาดใหม่

    const margin = { top: 20, right: 20, bottom: 30, left: 40 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    // scale
    const x = d3
      .scaleBand()
      .domain(data.map((_, i) => i.toString()))
      .range([0, innerWidth])
      .padding(0.1);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data) || 0])
      .range([innerHeight, 0]);

    const g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);

    // แกน X
    g.append("g").attr("transform", `translate(0,${innerHeight})`).call(d3.axisBottom(x));

    // แกน Y
    g.append("g").call(d3.axisLeft(y));

    // bars
    g.selectAll(".bar")
      .data(data)
      .join("rect")
      .attr("class", "bar")
      .attr("x", (_, i) => x(i.toString())!)
      .attr("y", (d) => y(d))
      .attr("width", x.bandwidth())
      .attr("height", (d) => innerHeight - y(d))
      .attr("fill", "steelblue");
  }, [data, width, height]);

  return <svg ref={svgRef} width={width} height={height}></svg>;
};

export default BarChart1;
