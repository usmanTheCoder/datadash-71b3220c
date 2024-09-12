'use client';

import * as React from 'react';
import { useId } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { useFormContext } from 'react-hook-form';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  showPassword?: boolean;
}

const Input: React.FC<InputProps> = ({
  label,
  error,
  showPassword = false,
  ...props
}) => {
  const id = useId();
  const [showPasswordValue, setShowPasswordValue] = React.useState(false);
  const { register } = useFormContext();

  const togglePasswordVisibility = () => {
    setShowPasswordValue((prevValue) => !prevValue);
  };

  return (
    <div className="relative">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="relative mt-1 rounded-md shadow-sm">
        <input
          {...props}
          {...register(props.name, { required: 'This field is required' })}
          id={id}
          type={showPassword ? (showPasswordValue ? 'text' : 'password') : props.type}
          className={`block w-full rounded-md border-gray-300 pr-10 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${
            error ? 'border-red-500 pr-10' : ''
          }`}
        />
        {showPassword && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="text-gray-400 hover:text-gray-600"
            >
              {showPasswordValue ? (
                <AiOutlineEyeInvisible className="h-5 w-5" />
              ) : (
                <AiOutlineEye className="h-5 w-5" />
              )}
            </button>
          </div>
        )}
      </div>
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default Input;