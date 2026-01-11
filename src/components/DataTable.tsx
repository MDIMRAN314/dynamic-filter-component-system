import type React from 'react';
import { useMemo } from 'react';

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from '@mui/material';

import type { Employee } from '@/domain/employee/employee.types';
import { getValueByPath } from '@/utils/filterUtils';
import { formatCellValue } from '@/utils/tableUtils';

// Props for DataTable
interface DataTableProps {
  data: Employee[];
}

const DataTable: React.FC<DataTableProps> = ({ data }) => {
  // Helper: get column headers dynamically from Employee keys
  const columns = useMemo(() => {
    if (!data.length) return [];
    const sample = data[0];
    return Object.keys(sample);
  }, [data]);

  return (
    <TableContainer
      component={Paper}
      sx={{ marginTop: 2, maxHeight: 500 }}
      aria-label="data table"
    >
      <Table stickyHeader aria-label="sticky table">
        <TableHead>
          <TableRow>
            {columns.map((col) => (
              <TableCell
                key={col}
                sx={{ fontWeight: 'bold' }}
                width={'auto'}
                height={10}
              >
                {col.toUpperCase()}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.length > 0 ? (
            data.map((row) => (
              <TableRow key={row.id}>
                {columns.map((col) => {
                  const value = getValueByPath(row, col);
                  const displayValue = formatCellValue(value);
                  return <TableCell key={col}>{displayValue}</TableCell>;
                })}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} align="center">
                <Typography variant="body1">No results found</Typography>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DataTable;
