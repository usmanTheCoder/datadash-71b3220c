'use client';

import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchData, selectData } from '@/store/slices/dataSlice';
import LineChart from './DataVisualization/LineChart';
import BarChart from './DataVisualization/BarChart';
import PieChart from './DataVisualization/PieChart';
import ScatterPlot from './DataVisualization/ScatterPlot';
import { FaChartLine, FaChartBar, FaChartPie, FaScatterPlot } from 'react-icons/fa';
import Spinner from './ui/Spinner';

const DataVisualization = () => {
  const dispatch = useDispatch();
  const { data, isLoading, error } = useSelector(selectData);
  const [selectedChart, setSelectedChart] = useState('line');

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  const handleChartChange = (chart) => {
    setSelectedChart(chart);
  };

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex flex-col h-full">
      <div className="bg-gray-100 py-4 px-6 rounded-md shadow-md">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Data Visualization</h2>
          <div className="flex items-center space-x-4">
            <button
              className={`p-2 rounded-md hover:bg-gray-200 transition-colors duration-200 ${
                selectedChart === 'line' ? 'bg-gray-200' : ''
              }`}
              onClick={() => handleChartChange('line')}
            >
              <FaChartLine className="text-lg" />
            </button>
            <button
              className={`p-2 rounded-md hover:bg-gray-200 transition-colors duration-200 ${
                selectedChart === 'bar' ? 'bg-gray-200' : ''
              }`}
              onClick={() => handleChartChange('bar')}
            >
              <FaChartBar className="text-lg" />
            </button>
            <button
              className={`p-2 rounded-md hover:bg-gray-200 transition-colors duration-200 ${
                selectedChart === 'pie' ? 'bg-gray-200' : ''
              }`}
              onClick={() => handleChartChange('pie')}
            >
              <FaChartPie className="text-lg" />
            </button>
            <button
              className={`p-2 rounded-md hover:bg-gray-200 transition-colors duration-200 ${
                selectedChart === 'scatter' ? 'bg-gray-200' : ''
              }`}
              onClick={() => handleChartChange('scatter')}
            >
              <FaScatterPlot className="text-lg" />
            </button>
          </div>
        </div>
      </div>
      <div className="flex-grow mt-4">
        {selectedChart === 'line' && <LineChart data={data} />}
        {selectedChart === 'bar' && <BarChart data={data} />}
        {selectedChart === 'pie' && <PieChart data={data} />}
        {selectedChart === 'scatter' && <ScatterPlot data={data} />}
      </div>
    </div>
  );
};

export default DataVisualization;