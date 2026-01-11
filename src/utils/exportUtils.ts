import type { Employee } from '@/domain/employee/employee.types';
import type { GridColDef } from '@mui/x-data-grid';

export const exportToJSON = (rows: any[], fileName = 'data.json') => {
  const blob = new Blob([JSON.stringify(rows, null, 2)], {
    type: 'application/json',
  });

  download(blob, fileName);
};

export const exportToCSV = (
  rows: any[],
  columns: GridColDef<Employee>[],
  fileName = 'data.csv',
) => {
  if (!rows.length) return;

  const headers = columns.map((c) => c.field).join(',');

  const csvRows = rows.map((row) =>
    columns
      .map((c) => {
        const value = row[c.field];
        if (Array.isArray(value)) return `"${value.join(', ')}"`;
        if (value === null || value === undefined) return '';
        return `"${String(value).replace(/"/g, '""')}"`;
      })
      .join(','),
  );

  const csv = [headers, ...csvRows].join('\n');

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  download(blob, fileName);
};

const download = (blob: Blob, fileName: string) => {
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = fileName;
  link.click();
};
