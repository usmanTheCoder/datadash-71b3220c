'use client';

import { FC, ButtonHTMLAttributes, ReactNode } from 'react';
import { cva, VariantProps } from 'class-variance-authority';
import { FaSpinner } from 'react-icons/fa';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2',
  {
    variants: {
      variant: {
        primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
        secondary: 'bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500',
        danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
        success: 'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500',
        outline: 'bg-transparent text-gray-600 hover:bg-gray-100 focus:ring-gray-500',
      },
      size: {
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-4 py-2 text-base',
        lg: 'px-5 py-2.5 text-lg',
      },
      isLoading: {
        true: 'cursor-wait',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  icon?: ReactNode;
  isLoading?: boolean;
}

const Button: FC<ButtonProps> = ({
  children,
  icon,
  isLoading = false,
  variant,
  size,
  className,
  ...props
}) => {
  return (
    <button
      {...props}
      className={`${buttonVariants({ variant, size, isLoading, className })} ${
        isLoading ? 'cursor-wait' : ''
      }`}
      disabled={isLoading}
    >
      {isLoading && <FaSpinner className="mr-2 animate-spin" />}
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </button>
  );
};

export default Button;