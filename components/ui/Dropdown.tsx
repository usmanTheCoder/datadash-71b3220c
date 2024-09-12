'use client';

import React, { useState, useRef, useEffect } from 'react';
import { FaChevronDown } from 'react-icons/fa';

interface DropdownItem {
  label: string;
  value: string;
  disabled?: boolean;
}

interface DropdownProps {
  items: DropdownItem[];
  selectedValue: string;
  onSelect: (value: string) => void;
  label?: string;
  className?: string;
}

const Dropdown: React.FC<DropdownProps> = ({
  items,
  selectedValue,
  onSelect,
  label,
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (value: string) => {
    onSelect(value);
    setIsOpen(false);
  };

  return (
    <div
      className={`relative inline-block text-left ${className}`}
      ref={dropdownRef}
    >
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <div>
        <button
          type="button"
          className={`inline-flex w-full justify-between rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100 ${
            isOpen ? 'rounded-b-none' : 'rounded-b-md'
          }`}
          onClick={toggleDropdown}
        >
          <span>
            {items.find((item) => item.value === selectedValue)?.label ||
              'Select an option'}
          </span>
          <FaChevronDown
            className={`${isOpen ? 'rotate-180 transform' : ''} h-5 w-5 text-gray-400`}
          />
        </button>
      </div>

      {isOpen && (
        <div className="absolute left-0 z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
          <ul className="py-1">
            {items.map((item) => (
              <li
                key={item.value}
                className={`text-gray-700 hover:bg-gray-100 hover:text-gray-900 ${
                  item.disabled ? 'cursor-not-allowed opacity-50' : ''
                }`}
                onClick={() => !item.disabled && handleSelect(item.value)}
              >
                <div
                  className={`block px-4 py-2 ${
                    selectedValue === item.value
                      ? 'bg-indigo-600 font-semibold text-white'
                      : ''
                  }`}
                >
                  {item.label}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown;