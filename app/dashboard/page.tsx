'use client';

import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store';
import { fetchDataAsync, selectData } from '@/store/slices/dataSlice';
import Layout from '@/components/Layout';
import DataVisualization from '@/components/DataVisualization';
import { FaChartBar, FaChartLine, FaChartPie, FaChartScatter } from 'react-icons/fa';
import Spinner from '@/components/ui/Spinner';
import Dropdown from '@/components/ui/Dropdown';
import Button from '@/components/ui/Button';
import useScroll from '@/hooks/useScroll';

const DashboardPage = () => {
  const dispatch = useAppDispatch();
  const { data, isLoading, error } = useAppSelector(selectData);
  const { scrollY } = useScroll();

  useEffect(() => {
    dispatch(fetchDataAsync());
  }, [dispatch]);

  const visualizationTypes = [
    { label: 'Line Chart', value: 'lineChart', icon: <FaChartLine /> },
    { label: 'Bar Chart', value: 'barChart', icon: <FaChartBar /> },
    { label: 'Pie Chart', value: 'pieChart', icon: <FaChartPie /> },
    { label: 'Scatter Plot', value: 'scatterPlot', icon: <FaChartScatter /> },
  ];

  const [selectedVisualization, setSelectedVisualization] = React.useState<string>('lineChart');

  const handleVisualizationChange = (value: string) => {
    setSelectedVisualization(value);
  };

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-screen py-12">
        <h1 className="text-4xl font-bold mb-8">Data Visualization Dashboard</h1>

        {isLoading ? (
          <Spinner />
        ) : error ? (
          <div className="text-red-500">{error}</div>
        ) : (
          <div className="flex flex-col items-center">
            <div className="mb-8">
              <Dropdown
                options={visualizationTypes}
                value={selectedVisualization}
                onChange={handleVisualizationChange}
              />
            </div>
            <DataVisualization
              type={selectedVisualization}
              data={data}
              className={`w-full max-w-4xl transition-transform duration-500 ${
                scrollY > 100 ? 'translate-y-24' : ''
              }`}
            />
          </div>
        )}

        <div className="mt-8">
          <Button>Export Data</Button>
        </div>
      </div>
    </Layout>
  );
};

export default DashboardPage;