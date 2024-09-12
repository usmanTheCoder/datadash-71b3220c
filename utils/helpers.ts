import { format, parseISO } from 'date-fns';

export const formatDate = (dateString: string, formatString: string) => {
  const date = parseISO(dateString);
  return format(date, formatString);
};

export const truncateString = (str: string, length: number) => {
  if (str.length <= length) return str;
  return `${str.slice(0, length)}...`;
};

export const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const slugify = (str: string) => {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
};

export const generateRandomString = (length: number) => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

export const debounce = <F extends (...args: any[]) => any>(func: F, wait: number) => {
  let timeout: ReturnType<typeof setTimeout> | null = null;

  const debounced = (...args: Parameters<F>) => {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
      func(...args);
    }, wait);
  };

  return debounced as (...args: Parameters<F>) => ReturnType<F>;
};

export const throttle = <F extends (...args: any[]) => any>(func: F, limit: number) => {
  let inThrottle: boolean;

  return (...args: Parameters<F>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

export const formatNumber = (num: number, options?: Intl.NumberFormatOptions) => {
  const formatter = new Intl.NumberFormat('en-US', options);
  return formatter.format(num);
};

export const formatCurrency = (amount: number, currency: string, options?: Intl.NumberFormatOptions) => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    ...options,
  });
  return formatter.format(amount);
};

export const formatPercentage = (value: number, options?: Intl.NumberFormatOptions) => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'percent',
    ...options,
  });
  return formatter.format(value);
};