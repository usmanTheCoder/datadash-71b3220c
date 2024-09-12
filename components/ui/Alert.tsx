'use client';

import { useEffect, useState } from 'react';
import { FaTimes } from 'react-icons/fa';

interface AlertProps {
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
  dismissible?: boolean;
}

const Alert: React.FC<AlertProps> = ({
  message,
  type,
  duration = 5000,
  dismissible = true,
}) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout> | null = null;

    if (duration) {
      timeout = setTimeout(() => {
        setIsVisible(false);
      }, duration);
    }

    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [duration]);

  const getAlertClasses = () => {
    const baseClasses = 'px-4 py-3 rounded-md flex items-center';

    switch (type) {
      case 'success':
        return `${baseClasses} bg-green-100 text-green-700`;
      case 'error':
        return `${baseClasses} bg-red-100 text-red-700`;
      case 'warning':
        return `${baseClasses} bg-yellow-100 text-yellow-700`;
      case 'info':
        return `${baseClasses} bg-blue-100 text-blue-700`;
      default:
        return baseClasses;
    }
  };

  const handleDismiss = () => {
    setIsVisible(false);
  };

  return isVisible ? (
    <div className={getAlertClasses()} role="alert">
      <span className="mr-2">{message}</span>
      {dismissible && (
        <button
          type="button"
          className="ml-auto focus:outline-none"
          onClick={handleDismiss}
        >
          <FaTimes />
        </button>
      )}
    </div>
  ) : null;
};

export default Alert;
```

The provided code defines a reusable Alert component in a React application using the Next.js framework and the 'use client' directive. The component displays an alert message with various styles based on the alert type (success, error, warning, or info).

The component takes in the following props:

- `message`: The message to display in the alert.
- `type`: The type of alert (success, error, warning, or info) which determines the styling.
- `duration` (optional): The duration in milliseconds after which the alert should automatically dismiss. If not provided, it defaults to 5000 (5 seconds).
- `dismissible` (optional): A boolean indicating whether the alert should be dismissible by the user. If not provided, it defaults to true.

The component uses the `useState` and `useEffect` hooks to manage its visibility and handle the automatic dismissal after the specified duration. If the `duration` prop is provided, a timeout is set to hide the alert after the specified duration. The `useEffect` cleanup function is used to clear the timeout if the component unmounts before the timeout is triggered.

The component renders a div element with appropriate classes based on the alert type, using Tailwind CSS utility classes. If the `dismissible` prop is true, a close button is rendered using the `FaTimes` icon from the `react-icons/fa` library, which allows the user to manually dismiss the alert.

The `getAlertClasses` function dynamically generates the CSS classes for the alert based on the `type` prop, ensuring the correct styling is applied.

Overall, this component provides a versatile and reusable way to display alerts in the application with various styles and customization options.