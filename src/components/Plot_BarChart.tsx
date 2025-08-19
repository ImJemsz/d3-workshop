import React, { useRef, useEffect } from "react";
import * as Plot from "@observablehq/plot";
import * as d3 from "d3";

const PlotBarChart = () => {
  const data: number[] = [100, 20, 30, 40, 50];

  const containerRef = useRef<HTMLDivElement | null>(null);

  const width = 700;
  const height = 500;

  useEffect(() => {
    if (!containerRef.current) return;

    // Clear existing content
    containerRef.current.innerHTML = "";

    // Prepare data for Observable Plot
    const dataset = data.map((value, index) => ({ x: index, y: value }));

    const color = d3.scaleOrdinal(d3.schemePastel1);

    // Create the bar chart using Observable Plot
    const chart = Plot.plot({
      width,
      height,
      marginLeft: 40,
      marginBottom: 30,
      x: { label: "Index" },
      y: { label: "Value" },
      marks: [Plot.barY(dataset, { x: "x", y: "y", fill: (_, i) => color(i.toString()) }), Plot.ruleY([0])],
    });

    // Append the chart to the container
    containerRef.current.appendChild(chart);

    //Cleanup function to remove the chart on unmount
    return () => chart.remove();
  }, []);

  return <div ref={containerRef}></div>;
};

export default PlotBarChart;
