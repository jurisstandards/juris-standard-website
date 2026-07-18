"use client";

import React, { useMemo } from "react";
import { geoMercator, geoPath } from "d3-geo";
// We use a simplified world map feature collection to keep it lightweight.
// For Next.js, importing from a module might need to be resolved or we can just fetch.
// Since world-atlas is installed, let's use it.
import { feature } from "topojson-client";
import worldAtlas from "world-atlas/countries-110m.json";

interface Node {
  id: string;
  name: string;
  coordinates: [number, number]; // [longitude, latitude]
}

const NODES: Node[] = [
  { id: "ny", name: "New York", coordinates: [-74.006, 40.7128] },
  { id: "ldn", name: "London", coordinates: [-0.1276, 51.5074] },
  { id: "dxb", name: "Dubai", coordinates: [55.2708, 25.2048] },
  { id: "mum", name: "Mumbai", coordinates: [72.8777, 19.076] },
  { id: "sin", name: "Singapore", coordinates: [103.8198, 1.3521] },
];

const CONNECTIONS = [
  { source: "ny", target: "ldn" },
  { source: "ldn", target: "dxb" },
  { source: "dxb", target: "mum" },
  { source: "mum", target: "sin" },
  { source: "ny", target: "dxb" },
  { source: "ldn", target: "sin" },
];

export function GlowingWorldMap() {
  const width = 800;
  const height = 500;

  // Setup D3 Projection
  const projection = useMemo(() => {
    return geoMercator()
      .scale(160)
      .translate([width / 2, height / 1.7]); // adjust center
  }, [width, height]);

  // Generate SVG path string from GeoJSON
  const pathGenerator = useMemo(() => geoPath().projection(projection), [projection]);

  // Get country features from TopoJSON
  const countries = useMemo(() => {
    // Topojson-client feature extraction
    // Need to cast to any due to typings mismatch between world-atlas JSON and topojson-client
    return (feature(worldAtlas as any, (worldAtlas as any).objects.countries) as any).features;
  }, []);

  return (
    <div className="relative w-full h-full flex items-center justify-center pointer-events-none">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full h-auto max-w-[900px] drop-shadow-[0_0_20px_rgba(212,175,55,0.15)]"
        style={{ overflow: "visible" }}
      >
        <defs>
          <radialGradient id="glow" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
            <stop offset="0%" stopColor="#D4AF37" stopOpacity={1} />
            <stop offset="100%" stopColor="#D4AF37" stopOpacity={0} />
          </radialGradient>
        </defs>

        {/* Map Paths */}
        <g strokeWidth={0.8} stroke="rgba(212, 175, 55, 0.35)" fill="transparent">
          {countries.map((geo: any, i: number) => (
            <path key={i} d={pathGenerator(geo) || undefined} />
          ))}
        </g>

        {/* Connections (Great Arcs) */}
        <g strokeWidth={1} stroke="rgba(212, 175, 55, 0.4)" fill="none" strokeDasharray="4 2">
          {CONNECTIONS.map((conn, i) => {
            const source = NODES.find((n) => n.id === conn.source);
            const target = NODES.find((n) => n.id === conn.target);
            if (!source || !target) return null;

            // Generate great circle arc path
            const route = {
              type: "LineString",
              coordinates: [source.coordinates, target.coordinates],
            };
            
            return (
              <path key={i} d={pathGenerator(route as any) || undefined} className="animate-pulse" />
            );
          })}
        </g>

        {/* Nodes */}
        {NODES.map((node) => {
          const [cx, cy] = projection(node.coordinates) || [0, 0];
          return (
            <g key={node.id} transform={`translate(${cx}, ${cy})`}>
              <circle r={8} fill="url(#glow)" className="animate-ping opacity-70" />
              <circle r={4} fill="#FFF" className="shadow-lg" />
              <circle r={10} fill="none" stroke="rgba(212,175,55,0.8)" strokeWidth={1.5} />
              
              <text
                y={-16}
                textAnchor="middle"
                className="text-[12px] uppercase tracking-widest font-sans font-semibold fill-gold-300 drop-shadow-md"
              >
                {node.name}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
