import { z } from 'zod';

export const loginSchema = z.object({
  email: z
    .string()
    .email('Invalid email address')
    .trim()
    .min(1, 'Email is required'),
  password: z
    .string()
    .trim()
    .min(8, 'Password must be at least 8 characters long'),
});

export const registerSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, 'Name must be at least 2 characters long'),
    email: z
      .string()
      .email('Invalid email address')
      .trim()
      .min(1, 'Email is required'),
    password: z
      .string()
      .trim()
      .min(8, 'Password must be at least 8 characters long'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

export const datasetSchema = z.object({
  name: z.string().trim().min(1, 'Name is required'),
  description: z.string().trim().min(1, 'Description is required'),
  source: z
    .string()
    .url('Invalid URL')
    .trim()
    .min(1, 'Source URL is required'),
});

export const visualizationSchema = z.object({
  type: z.enum(['line', 'bar', 'pie', 'scatter']),
  title: z.string().trim().min(1, 'Title is required'),
  xAxis: z.string().trim().min(1, 'X-axis label is required'),
  yAxis: z.string().trim().min(1, 'Y-axis label is required'),
  datasetId: z.string().uuid('Invalid dataset ID'),
});