'use client';

import { useEffect, useState } from 'react';

interface UseScrollOptions {
  root?: null | Element;
  rootMargin?: string;
  threshold?: number | number[];
}

export const useScroll = (options?: UseScrollOptions) => {
  const [isVisible, setIsVisible] = useState(false);
  const [observedElement, setObservedElement] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(entry.isIntersecting);
        });
      },
      {
        root: options?.root || null,
        rootMargin: options?.rootMargin || '0px',
        threshold: options?.threshold || 0.1,
      }
    );

    if (observedElement) {
      observer.observe(observedElement);
    }

    return () => {
      if (observedElement) {
        observer.unobserve(observedElement);
      }
    };
  }, [observedElement, options?.root, options?.rootMargin, options?.threshold]);

  const handleObservedElement = (element: HTMLElement | null) => {
    setObservedElement(element);
  };

  return { isVisible, handleObservedElement };
};