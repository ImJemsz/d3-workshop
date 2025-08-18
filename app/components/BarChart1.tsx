import { useEffect, useRef } from "react";
import * as d3 from "d3";

function BarChart() {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    // Initialize D3 with the SVG element
    const svg = d3.select(svgRef.current);

    // Clear any existing content in the SVG
    svg.selectAll("*").remove();

    // Set the dimensions of the SVG
    const width = 400;
    const height = 200;

    svg.attr("width", width).attr("height", height);

    const margin = { top: 20, right: 20, bottom: 30, left: 40 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;
  }, []);

  return <svg ref={svgRef}></svg>;
}

export default BarChart;
