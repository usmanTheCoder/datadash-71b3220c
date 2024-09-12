'use client';

import { FaSignOutAlt } from 'react-icons/fa';
import { IconProps } from './types';

const LogoutIcon = ({ className, ...props }: IconProps) => {
  return <FaSignOutAlt className={`text-gray-500 ${className}`} {...props} />;
};

export default LogoutIcon;