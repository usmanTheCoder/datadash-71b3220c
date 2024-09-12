'use client';

import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { IoCloseOutline } from 'react-icons/io5';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, className }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    return () => setMounted(false);
  }, []);

  const handleEscapeKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', handleEscapeKeyDown);
    } else {
      document.body.style.overflow = 'auto';
      document.removeEventListener('keydown', handleEscapeKeyDown);
    }

    return () => {
      document.body.style.overflow = 'auto';
      document.removeEventListener('keydown', handleEscapeKeyDown);
    };
  }, [isOpen]);

  if (!mounted || !isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto">
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity ${
          isOpen ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={onClose}
      />
      <div
        className={`relative z-10 w-full max-w-lg transform overflow-hidden rounded-lg bg-white p-6 text-left shadow-xl transition-all ${className}`}
      >
        <button
          className="absolute top-3 right-3 z-10 rounded-full bg-gray-200 p-2 text-gray-600 hover:bg-gray-300"
          onClick={onClose}
        >
          <IoCloseOutline size={24} />
        </button>
        {children}
      </div>
    </div>,
    document.body
  );
};

export default Modal;
```

This code defines a reusable `Modal` component that renders a modal dialog with a semi-transparent backdrop and a close button. The modal content is rendered as a portal directly in the `document.body` to ensure it is positioned correctly on top of other elements.

The component uses the `useState` and `useEffect` hooks to manage the mounting and unmounting of the modal, as well as handling the `Escape` key press to close the modal. It also uses the `createPortal` function from React to render the modal content outside of the React tree.

The `Modal` component accepts the following props:

- `isOpen`: A boolean value that determines whether the modal should be open or closed.
- `onClose`: A function that is called when the modal should be closed (e.g., when the close button is clicked or the `Escape` key is pressed).
- `children`: The content to be rendered inside the modal.
- `className`: An optional string that specifies additional CSS classes to be applied to the modal container.

The component renders the modal content with an overlay backdrop and a close button. The `transition-opacity` and `transform` classes are used to animate the modal's appearance and disappearance. The modal content is centered both horizontally and vertically on the screen.