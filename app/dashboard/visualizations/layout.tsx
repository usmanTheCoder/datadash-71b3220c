'use client';

import React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { FaChartLine, FaChartBar, FaChartPie, FaChartScatter } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { toggleDataVisualization } from '@/store/slices/dataSlice';
import { RootState } from '@/store';
import Dropdown from '@/components/ui/Dropdown';
import Tooltip from '@/components/ui/Tooltip';
import { useDataFetch } from '@/hooks/useDataFetch';
import DataVisualization from '@/components/DataVisualization';
import { validationSchema } from '@/utils/validation';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

const visualizationOptions = [
  {
    label: 'Line Chart',
    value: 'lineChart',
    icon: <FaChartLine />,
  },
  {
    label: 'Bar Chart',
    value: 'barChart',
    icon: <FaChartBar />,
  },
  {
    label: 'Pie Chart',
    value: 'pieChart',
    icon: <FaChartPie />,
  },
  {
    label: 'Scatter Plot',
    value: 'scatterPlot',
    icon: <FaChartScatter />,
  },
];

const VisualizationsLayout = () => {
  const dispatch = useDispatch();
  const { dataVisualization } = useSelector((state: RootState) => state.data);
  const { data, isLoading, error } = useDataFetch('/api/data');
  const router = useRouter();
  const pathname = usePathname();
  const isVisualizationsPath = pathname?.includes('/visualizations');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const handleVisualizationChange = (value: string) => {
    dispatch(toggleDataVisualization(value));
  };

  const onSubmit = async (formData: any) => {
    try {
      console.log(formData);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-4">Data Visualizations</h1>
      <div className="mb-4">
        <Dropdown
          options={visualizationOptions}
          value={dataVisualization}
          onChange={handleVisualizationChange}
        />
      </div>
      {isVisualizationsPath && (
        <Tooltip content="This is a tooltip">
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center">
            <input
              type="text"
              placeholder="Enter data source"
              {...register('dataSource')}
              className="mb-2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.dataSource && (
              <span className="text-red-500 mb-2">{errors.dataSource.message}</span>
            )}
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Submit
            </button>
          </form>
        </Tooltip>
      )}
      {!isLoading && !error && <DataVisualization data={data} />}
    </div>
  );
};

export default VisualizationsLayout;