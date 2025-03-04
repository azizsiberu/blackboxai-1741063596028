// Date formatting
export const formatDate = (date) => {
  if (!date) return '';
  const d = new Date(date);
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

export const formatDateTime = (date) => {
  if (!date) return '';
  const d = new Date(date);
  return d.toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

// Time formatting
export const formatTime = (date) => {
  if (!date) return '';
  const d = new Date(date);
  return d.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  });
};

// Calculate duration between two dates in days
export const calculateDuration = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffTime = Math.abs(end - start);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays + 1; // Include both start and end dates
};

// Generate unique ID
export const generateId = () => {
  return Math.random().toString(36).substr(2, 9);
};

// Format file size
export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

// Validate email format
export const isValidEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

// Format phone number
export const formatPhoneNumber = (phoneNumber) => {
  const cleaned = ('' + phoneNumber).replace(/\D/g, '');
  const match = cleaned.match(/^(\d{1})(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return '+' + match[1] + ' (' + match[2] + ') ' + match[3] + '-' + match[4];
  }
  return phoneNumber;
};

// Calculate attendance status
export const getAttendanceStatus = (checkIn, checkOut) => {
  if (!checkIn && !checkOut) return 'Absent';
  if (checkIn && !checkOut) return 'Present';
  return 'Complete';
};

// Calculate leave balance
export const calculateLeaveBalance = (totalLeaves, usedLeaves) => {
  return Math.max(0, totalLeaves - usedLeaves);
};

// Format currency
export const formatCurrency = (amount, currency = 'USD') => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency
  }).format(amount);
};

// Get initials from name
export const getInitials = (name) => {
  if (!name) return '';
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase();
};

// Get random color for avatar
export const getRandomColor = () => {
  const colors = [
    '#1abc9c', '#2ecc71', '#3498db', '#9b59b6', '#34495e',
    '#16a085', '#27ae60', '#2980b9', '#8e44ad', '#2c3e50',
    '#f1c40f', '#e67e22', '#e74c3c', '#95a5a6', '#f39c12',
    '#d35400', '#c0392b', '#bdc3c7', '#7f8c8d'
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

// Format file name
export const formatFileName = (fileName, maxLength = 20) => {
  if (fileName.length <= maxLength) return fileName;
  const extension = fileName.split('.').pop();
  const name = fileName.substring(0, fileName.lastIndexOf('.'));
  return `${name.substring(0, maxLength - extension.length - 3)}...${extension}`;
};

// Calculate age from date of birth
export const calculateAge = (dob) => {
  const birthDate = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  
  return age;
};

// Format address
export const formatAddress = (address) => {
  const parts = [];
  if (address.street) parts.push(address.street);
  if (address.city) parts.push(address.city);
  if (address.state) parts.push(address.state);
  if (address.zipCode) parts.push(address.zipCode);
  if (address.country) parts.push(address.country);
  
  return parts.join(', ');
};

// Calculate experience in years and months
export const calculateExperience = (joinDate) => {
  const join = new Date(joinDate);
  const today = new Date();
  
  let years = today.getFullYear() - join.getFullYear();
  let months = today.getMonth() - join.getMonth();
  
  if (months < 0) {
    years--;
    months += 12;
  }
  
  return {
    years,
    months
  };
};

// Format experience
export const formatExperience = (experience) => {
  const { years, months } = experience;
  const yearText = years === 1 ? 'year' : 'years';
  const monthText = months === 1 ? 'month' : 'months';
  
  if (years === 0) return `${months} ${monthText}`;
  if (months === 0) return `${years} ${yearText}`;
  return `${years} ${yearText}, ${months} ${monthText}`;
};
