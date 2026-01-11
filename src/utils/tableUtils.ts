export const formatCellValue = (value: any): string => {
  if (value == null) return '';

  // Array → "A, B, C"
  if (Array.isArray(value)) {
    return value.join(', ');
  }

  // Date ISO → readable date
  if (typeof value === 'string' && !isNaN(Date.parse(value))) {
    return new Date(value).toLocaleDateString();
  }

  // Object → key:value pairs
  if (typeof value === 'object') {
    return Object.entries(value)
      .map(([key, val]) => `${key}: ${val}`)
      .join(' | ');
  }

  return String(value);
};
