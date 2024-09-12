'use client';

import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { FaPieChart } from 'react-icons/fa';

interface PieChartProps {
  data: { label: string; value: number }[];
  width: number;
  height: number;
  colors?: string[];
}

const PieChart: React.FC<PieChartProps> = ({ data, width, height, colors }) => {
  const chartRef = useRef<SVGSVGElement>(null);
  const { theme } = useSelector((state: RootState) => state.ui);

  useEffect(() => {
    if (!chartRef.current) return;

    const svg = d3.select(chartRef.current);
    const radius = Math.min(width, height) / 2 - 40;
    const g = svg.append('g').attr('transform', `translate(${width / 2},${height / 2})`);

    const pie = d3.pie<{ label: string; value: number }>().value((d) => d.value);
    const data = pie(data);
    const arc = d3.arc<d3.PieArcDatum<{ label: string; value: number }>>().innerRadius(0).outerRadius(radius);
    const color = d3.scaleOrdinal(colors || d3.schemeCategory10);

    const arcs = g
      .selectAll('arc')
      .data(data)
      .enter()
      .append('g')
      .attr('class', 'arc');

    arcs
      .append('path')
      .attr('d', arc)
      .style('fill', (d) => color(d.data.label))
      .style('stroke', theme === 'dark' ? '#333' : '#ddd')
      .style('stroke-width', 1);

    arcs
      .append('text')
      .attr('transform', (d) => `translate(${arc.centroid(d)})`)
      .attr('dy', '0.35em')
      .text((d) => `${d.data.label} (${((d.value / Math.PI / 2) * 100).toFixed(2)}%)`);
  }, [data, width, height, colors, theme]);

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="mb-4 flex items-center">
        <FaPieChart className="mr-2 text-xl text-primary" />
        <h3 className="text-lg font-semibold">Pie Chart</h3>
      </div>
      <svg ref={chartRef} width={width} height={height} className="border border-gray-300 dark:border-gray-700" />
    </div>
  );
};

export default PieChart;