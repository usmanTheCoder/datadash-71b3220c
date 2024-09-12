'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { FaChartLine, FaChartBar, FaChartPie, FaChartScatter } from 'react-icons/fa';

import Layout from '@/components/Layout';
import DataVisualization from '@/components/DataVisualization';
import { fetchData, selectData, selectLoading, selectError } from '@/store/slices/dataSlice';
import { selectUser } from '@/store/slices/authSlice';
import useAuth from '@/hooks/useAuth';

const visualizationComponents = {
  line: <DataVisualization.LineChart />,
  bar: <DataVisualization.BarChart />,
  pie: <DataVisualization.PieChart />,
  scatter: <DataVisualization.ScatterPlot />,
};

const visualizationIcons = {
  line: <FaChartLine />,
  bar: <FaChartBar />,
  pie: <FaChartPie />,
  scatter: <FaChartScatter />,
};

export default function Home() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { user, isLoading: authLoading } = useAuth();
  const data = useSelector(selectData);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    if (!user) {
      router.push('/auth/login');
    } else {
      dispatch(fetchData());
    }
  }, [dispatch, router, user]);

  if (authLoading || loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-screen">
          <Spinner />
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-screen">
          <Alert type="error">{error}</Alert>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Data Visualizations</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {Object.entries(visualizationComponents).map(([key, component]) => (
            <div
              key={key}
              className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center transition-transform duration-300 hover:scale-105"
            >
              <div className="text-5xl mb-4">{visualizationIcons[key as keyof typeof visualizationIcons]}</div>
              <h3 className="text-xl font-semibold mb-2">{key}</h3>
              {component}
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}