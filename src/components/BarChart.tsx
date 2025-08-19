import { useEffect, useRef } from "react";
import * as d3 from "d3";

function BarChart() {
  const svgRef = useRef<SVGSVGElement>(null);

  const data: number[] = [100, 20, 30, 40, 50];

  useEffect(() => {
    if (!svgRef.current) return;

    // Initialize D3 with the SVG element
    const svg = d3.select(svgRef.current);

    // Clear any existing content in the SVG
    svg.selectAll("*").remove();

    // Set dimensions and attributes
    const width = 700;
    const height = 500;

    svg.attr("width", width).attr("height", height);

    //Define margin
    const margin = { top: 40, left: 40, right: 40, bottom: 40 };

    const innerWidth = width - (margin.left + margin.right);
    const innerHeight = height - (margin.top + margin.bottom);

    // Create scales
    const xAxis = d3
      .scaleBand()
      .domain(data.map((_, i) => i.toString()))
      .range([0, innerWidth])
      .padding(0.1);

    const yAxis = d3
      .scaleLinear()
      .domain([0, d3.max(data) || 0])
      .range([innerHeight, 0]);

    // Create a group element for the chart
    const g = svg.append("g");

    g.attr("transform", `translate(${margin.left},${margin.top})`);

    //Create <g> for render x axis
    g.append("g").attr("transform", `translate(0,${innerHeight})`).call(d3.axisBottom(xAxis).tickSizeOuter(0));

    //Create <g> for render y axis
    g.append("g").call(d3.axisLeft(yAxis));

    // Define color scale
    const color = d3.scaleOrdinal(d3.schemePastel1);

    // Create bars
    g.selectAll(".bar")
      .data(data)
      .join("rect")
      .attr("class", "bar")

      //จุดตัดแกน (x,y)
      .attr("x", (d, i) => xAxis(i.toString())!)
      .attr("y", (d) => yAxis(d))

      //defined width of bar
      .attr("width", xAxis.bandwidth())

      //defined height of bar
      .attr("height", (d) => innerHeight - yAxis(d))

      .attr("fill", (_, i) => color(i.toString()));
  }, []);

  return <svg ref={svgRef}></svg>;
}

export default BarChart;
