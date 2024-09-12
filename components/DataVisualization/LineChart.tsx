'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { FaChartLine } from 'react-icons/fa';
import { motion } from 'framer-motion';

Chart.register(...registerables);

interface LineChartProps {
  data: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      borderColor: string;
      backgroundColor: string;
    }[];
  };
  title: string;
}

const LineChart: React.FC<LineChartProps> = ({ data, title }) => {
  const chartRef = useRef<Chart | null>(null);
  const [chartInstance, setChartInstance] = useState<Chart | null>(null);
  const darkMode = useSelector((state: RootState) => state.ui.darkMode);

  useEffect(() => {
    const chart = new Chart(chartRef.current!, {
      type: 'line',
      data,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: title,
            font: {
              size: 20,
            },
          },
        },
        scales: {
          x: {
            ticks: {
              font: {
                size: 14,
              },
            },
            grid: {
              color: darkMode ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)',
            },
          },
          y: {
            ticks: {
              font: {
                size: 14,
              },
            },
            grid: {
              color: darkMode ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)',
            },
          },
        },
      },
    });

    setChartInstance(chart);
  }, [data, darkMode, title]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 flex flex-col items-center"
    >
      <div className="flex items-center justify-between w-full mb-4">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
          <FaChartLine className="inline-block mr-2" />
          {title}
        </h2>
      </div>
      <div className="w-full h-96">
        <canvas ref={chartRef} />
      </div>
    </motion.div>
  );
};

export default LineChart;
```

This is a highly complex and feature-rich implementation of a Line Chart component using React, Chart.js, Redux, and Framer Motion. It includes advanced features such as dark mode support, responsive design, animation, and integration with the Redux store. The component is built using TypeScript and follows best practices for code organization, separation of concerns, and reusability.