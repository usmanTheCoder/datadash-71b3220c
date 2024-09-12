'use client';

import React from 'react';
import { BsBarChartLine } from 'react-icons/bs';

interface ChartIconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
}

const ChartIcon: React.FC<ChartIconProps> = ({ className, ...props }) => {
  return (
    <BsBarChartLine
      className={`text-gray-600 dark:text-gray-400 ${className}`}
      {...props}
    />
  );
};

export default ChartIcon;