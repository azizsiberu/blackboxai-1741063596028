import { format, parseISO } from 'date-fns';

// Date formatting
export const formatDate = (date) => {
  if (!date) return '';
  const parsedDate = typeof date === 'string' ? parseISO(date) : date;
  return format(parsedDate, 'MMM dd, yyyy');
};

export const formatDateTime = (date) => {
  if (!date) return '';
  const parsedDate = typeof date === 'string' ? parseISO(date) : date;
  return format(parsedDate, 'MMM dd, yyyy HH:mm');
};

// Input validation
export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const validatePassword = (password) => {
  return password.length >= 6;
};

// Leave types and their colors
export const LEAVE_TYPES = {
  VACATION: 'vacation',
  SICK: 'sick',
  PERSONAL: 'personal',
  OTHER: 'other'
};

export const LEAVE_STATUS = {
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected'
};

export const STATUS_COLORS = {
  [LEAVE_STATUS.PENDING]: '#ffa726',
  [LEAVE_STATUS.APPROVED]: '#66bb6a',
  [LEAVE_STATUS.REJECTED]: '#ef5350'
};

// Employee roles
export const ROLES = {
  ADMIN: 'admin',
  HR: 'hr',
  EMPLOYEE: 'employee'
};

// Error messages
export const ERROR_MESSAGES = {
  INVALID_EMAIL: 'Please enter a valid email address',
  INVALID_PASSWORD: 'Password must be at least 6 characters long',
  REQUIRED_FIELD: 'This field is required',
  INVALID_DATE: 'Please enter a valid date',
  SERVER_ERROR: 'Something went wrong. Please try again later',
  UNAUTHORIZED: 'You are not authorized to perform this action',
  SESSION_EXPIRED: 'Your session has expired. Please login again'
};

// Local storage keys
export const STORAGE_KEYS = {
  USER: 'user',
  AUTH_TOKEN: 'auth_token',
  THEME: 'theme_preference'
};

// API response handler
export const handleApiResponse = (response) => {
  if (response.success) {
    return response.data;
  }
  throw new Error(response.message || ERROR_MESSAGES.SERVER_ERROR);
};

// File size formatter
export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

// Generate random ID
export const generateId = () => {
  return Math.random().toString(36).substr(2, 9);
};

// Check if user has required role
export const hasRole = (userRole, requiredRole) => {
  if (userRole === ROLES.ADMIN) return true;
  if (userRole === ROLES.HR && requiredRole !== ROLES.ADMIN) return true;
  return userRole === requiredRole;
};

// Format currency
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount);
};

// Calculate leave duration (excluding weekends)
export const calculateLeaveDuration = (startDate, endDate) => {
  let count = 0;
  const start = new Date(startDate);
  const end = new Date(endDate);
  
  while (start <= end) {
    const dayOfWeek = start.getDay();
    if (dayOfWeek !== 0 && dayOfWeek !== 6) {
      count++;
    }
    start.setDate(start.getDate() + 1);
  }
  
  return count;
};

// Check if date is weekend
export const isWeekend = (date) => {
  const day = new Date(date).getDay();
  return day === 0 || day === 6;
};

// Format time (24h to 12h)
export const formatTime = (time) => {
  if (!time) return '';
  return format(parseISO(`2000-01-01T${time}`), 'hh:mm a');
};
