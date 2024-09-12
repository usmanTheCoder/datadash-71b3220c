'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { trpc } from '@/utils/trpc';
import { LineChart, BarChart, PieChart, ScatterPlot } from '@/components/DataVisualization';
import { Dropdown, Button, Spinner, Alert } from '@/components/ui';
import { FaChartLine, FaChartBar, FaChartPie, FaScatterPlot } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { setVisualizationData, setVisualizationType } from '@/store/slices/dataSlice';
import { useAuth } from '@/hooks/useAuth';

const VisualizationPage = () => {
  const router = useRouter();
  const { user } = useAuth();
  const dispatch = useDispatch();
  const { visualizationData, visualizationType } = useSelector((state) => state.data);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const { data, isLoading: isFetching } = trpc.data.getVisualizationData.useQuery(undefined, {
    enabled: user !== null,
    onSuccess: (data) => {
      dispatch(setVisualizationData(data));
    },
    onError: (err) => {
      setError('Failed to fetch visualization data');
      console.error(err);
    },
  });

  const handleVisualizationTypeChange = (type) => {
    dispatch(setVisualizationType(type));
  };

  const visualizationOptions = [
    { label: 'Line Chart', value: 'line', icon: <FaChartLine /> },
    { label: 'Bar Chart', value: 'bar', icon: <FaChartBar /> },
    { label: 'Pie Chart', value: 'pie', icon: <FaChartPie /> },
    { label: 'Scatter Plot', value: 'scatter', icon: <FaScatterPlot /> },
  ];

  useEffect(() => {
    if (!user) {
      router.push('/auth/login');
    }
  }, [user, router]);

  if (isLoading || isFetching) {
    return <Spinner size="large" />;
  }

  if (error) {
    return <Alert variant="error">{error}</Alert>;
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Data Visualizations</h2>
        <Dropdown
          options={visualizationOptions}
          value={visualizationType}
          onChange={handleVisualizationTypeChange}
          label="Select Visualization Type"
        />
      </div>
      <div className="bg-white rounded-lg shadow-md p-6">
        {visualizationType === 'line' && <LineChart data={visualizationData} />}
        {visualizationType === 'bar' && <BarChart data={visualizationData} />}
        {visualizationType === 'pie' && <PieChart data={visualizationData} />}
        {visualizationType === 'scatter' && <ScatterPlot data={visualizationData} />}
      </div>
      <div className="flex justify-end">
        <Button variant="primary">Export Data</Button>
      </div>
    </div>
  );
};

export default VisualizationPage;