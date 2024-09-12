'use client';

import { FaUserCircle } from 'react-icons/fa';
import type { IconProps } from './types';

const UserIcon = ({ className, ...props }: IconProps) => {
  return (
    <FaUserCircle
      className={`text-gray-500 transition-colors duration-300 ease-in-out hover:text-gray-800 ${className}`}
      {...props}
    />
  );
};

export default UserIcon;