'use client';

import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { useAppSelector } from '@/store';
import { selectDataByCategory } from '@/store/slices/dataSlice';

interface BarChartProps {
  category: string;
  title: string;
}

const BarChart: React.FC<BarChartProps> = ({ category, title }) => {
  const chartRef = useRef<SVGSVGElement | null>(null);
  const data = useAppSelector((state) => selectDataByCategory(state, category));

  useEffect(() => {
    if (chartRef.current && data.length > 0) {
      const margin = { top: 20, right: 20, bottom: 30, left: 40 };
      const width = chartRef.current.clientWidth - margin.left - margin.right;
      const height = 400 - margin.top - margin.bottom;

      const x = d3.scaleBand().range([0, width]).padding(0.1);
      const y = d3.scaleLinear().range([height, 0]);

      const svg = d3
        .select(chartRef.current)
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`);

      x.domain(data.map((d) => d.label));
      y.domain([0, d3.max(data, (d) => d.value) as number]);

      svg
        .append('g')
        .attr('transform', `translate(0, ${height})`)
        .call(d3.axisBottom(x))
        .selectAll('text')
        .attr('transform', 'rotate(-45)')
        .style('text-anchor', 'end');

      svg.append('g').call(d3.axisLeft(y));

      svg
        .selectAll('.bar')
        .data(data)
        .enter()
        .append('rect')
        .attr('class', 'bar')
        .attr('x', (d) => x(d.label) as number)
        .attr('width', x.bandwidth())
        .attr('y', (d) => y(d.value))
        .attr('height', (d) => height - y(d.value))
        .style('fill', '#4b5563');

      svg
        .append('text')
        .attr('x', width / 2)
        .attr('y', 0 - margin.top / 2)
        .attr('text-anchor', 'middle')
        .style('font-size', '16px')
        .style('font-weight', 'bold')
        .text(title);
    }
  }, [data, title]);

  return <svg ref={chartRef} className="bg-white shadow-md rounded-lg"></svg>;
};

export default BarChart;