import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { feature } from "topojson-client";

export default function ThailandMap() {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const gRef = useRef<SVGGElement | null>(null);
  const [features, setFeatures] = useState<any[]>([]);

  // Mock population data สำหรับ 77 จังหวัด
  const populationData: Record<number, number> = Object.fromEntries(
    Array.from({ length: 77 }, (_, i) => [i + 1, Math.floor(Math.random() * 500000)])
  );

  // โหลดไฟล์ topojson
  useEffect(() => {
    async function loadData() {
      const res = await fetch("/thailand-provinces.topojson");
      const topo = await res.json();

      const geojson = feature(topo, topo.objects.provinces);

      setFeatures(geojson.features);
    }
    loadData();
  }, []);

  useEffect(() => {
    if (!features.length || !svgRef.current) return;

    const svg = d3.select(svgRef.current);
    const g = d3.select(gRef.current);

    const projection = d3.geoMercator().fitSize([750, 750], {
      type: "FeatureCollection",
      features,
    });

    const path = d3.geoPath().projection(projection);

    const maxPop = d3.max(Object.values(populationData)) || 1;
    const colorScale = d3.scaleSequential(d3.interpolateReds).domain([0, maxPop]);

    // วาดจังหวัดลงใน <g>
    g.selectAll("path")
      .data(features)
      .join("path")
      .attr("d", path as any)
      .attr("fill", (d: any) => {
        const pop = populationData[d.properties.ID_1] || 0;
        return colorScale(pop);
      })
      .attr("stroke", "#333");

    // ฟังก์ชัน zoom
    const zoom = d3
      .zoom<SVGSVGElement, unknown>()
      .scaleExtent([1, 8])
      .on("zoom", (event) => {
        g.attr("transform", event.transform.toString());
      });

    svg.call(zoom as any);
  }, [features]);

  return (
    <svg ref={svgRef} width={800} height={1000} className="border-1">
      <g ref={gRef} className="flex justify-center"></g>
    </svg>
  );
}
