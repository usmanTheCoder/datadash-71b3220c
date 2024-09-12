'use client';

import React from 'react';
import { ImSpinner8 } from 'react-icons/im';

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  color?: string;
  className?: string;
}

const Spinner: React.FC<SpinnerProps> = ({ size = 'md', color = 'text-gray-500', className = '' }) => {
  const sizeMap = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
    xl: 'h-16 w-16',
  };

  return (
    <div className={`animate-spin ${sizeMap[size]} ${color} ${className}`}>
      <ImSpinner8 className="m-auto" />
    </div>
  );
};

export default Spinner;