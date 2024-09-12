'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TooltipProps {
  children: React.ReactNode;
  content: React.ReactNode;
  placement?: 'top' | 'bottom' | 'left' | 'right';
  delay?: number;
}

const Tooltip: React.FC<TooltipProps> = ({
  children,
  content,
  placement = 'top',
  delay = 200,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const showTooltip = () => setIsVisible(true);
    const hideTooltip = () => setIsVisible(false);

    const targetElement = targetRef.current;
    if (targetElement) {
      targetElement.addEventListener('mouseenter', showTooltip);
      targetElement.addEventListener('mouseleave', hideTooltip);
    }

    return () => {
      if (targetElement) {
        targetElement.removeEventListener('mouseenter', showTooltip);
        targetElement.removeEventListener('mouseleave', hideTooltip);
      }
    };
  }, []);

  const getTooltipPosition = () => {
    const targetRect = targetRef.current?.getBoundingClientRect();
    const tooltipRect = tooltipRef.current?.getBoundingClientRect();

    if (!targetRect || !tooltipRect) {
      return {};
    }

    const targetCenter = {
      x: targetRect.left + targetRect.width / 2,
      y: targetRect.top + targetRect.height / 2,
    };

    const tooltipWidth = tooltipRect.width;
    const tooltipHeight = tooltipRect.height;

    let left = 0;
    let top = 0;

    switch (placement) {
      case 'top':
        left = targetCenter.x - tooltipWidth / 2;
        top = targetCenter.y - tooltipHeight - 8;
        break;
      case 'bottom':
        left = targetCenter.x - tooltipWidth / 2;
        top = targetCenter.y + 8;
        break;
      case 'left':
        left = targetCenter.x - tooltipWidth - 8;
        top = targetCenter.y - tooltipHeight / 2;
        break;
      case 'right':
        left = targetCenter.x + 8;
        top = targetCenter.y - tooltipHeight / 2;
        break;
    }

    return { left, top };
  };

  return (
    <div className="relative inline-block" ref={targetRef}>
      {children}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            className="absolute z-50 bg-gray-800 text-white text-sm p-2 rounded shadow-lg"
            ref={tooltipRef}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            style={getTooltipPosition()}
          >
            {content}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Tooltip;