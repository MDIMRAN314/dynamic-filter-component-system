import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import type { Employee } from '@/domain/employee/employee.types';
import { sampleEmployees } from './data/sampleEmployeeData';

export const employeeColumns: GridColDef<Employee>[] = [
  {
    field: 'id',
    headerName: 'ID',
    width: 70,
  },

  {
    field: 'name',
    headerName: 'Name',
    width: 160,
    sortable: true,
  },

  {
    field: 'email',
    headerName: 'Email',
    width: 220,
    sortable: true,
  },

  {
    field: 'department',
    headerName: 'Department',
    width: 140,
  },

  {
    field: 'role',
    headerName: 'Role',
    width: 180,
  },

  {
    field: 'salary',
    headerName: 'Salary',
    type: 'number',
    width: 120,
    valueFormatter: (value?: number) =>
      value ? `₹${value.toLocaleString()}` : '',
  },

  {
    field: 'projects',
    headerName: 'Projects',
    type: 'number',
    width: 100,
  },

  {
    field: 'performanceRating',
    headerName: 'Rating',
    type: 'number',
    width: 100,
  },

  {
    field: 'joinDate',
    headerName: 'Join Date',
    type: 'date',
    width: 130,
    valueGetter: (value) => (value ? new Date(value) : null),
  },

  {
    field: 'lastReview',
    headerName: 'Last Review',
    type: 'date',
    width: 130,
    valueGetter: (value) => (value ? new Date(value) : null),
  },

  {
    field: 'isActive',
    headerName: 'Active',
    type: 'boolean',
    width: 90,
  },

  {
    field: 'skills',
    headerName: 'Skills',
    width: 220,
    sortable: false,
    valueGetter: (value: string[]) => value?.join(', '),
  },

  {
    field: 'skillsCount',
    headerName: 'Skills Count',
    type: 'number',
    width: 120,
    valueGetter: (_value, row) => row.skills?.length ?? 0,
  },

  {
    field: 'city',
    headerName: 'City',
    width: 120,
    valueGetter: (_value, row) => row.address?.city,
  },

  {
    field: 'state',
    headerName: 'State',
    width: 90,
    valueGetter: (_value, row) => row.address?.state,
  },

  {
    field: 'country',
    headerName: 'Country',
    width: 110,
    valueGetter: (_value, row) => row.address?.country,
  },

  {
    field: 'fullAddress',
    headerName: 'Address',
    description: 'Computed from nested address object',
    sortable: false,
    width: 240,
    valueGetter: (_value, row) =>
      `${row.address?.city}, ${row.address?.state}, ${row.address?.country}`,
  },
];

const paginationModel = { page: 0, pageSize: 10 };

export default function DataTable() {
  return (
    <Paper sx={{ height: 600, width: '100%', boxShadow: 3 }}>
      <DataGrid
        rows={sampleEmployees}
        columns={employeeColumns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[10, 20]}
        checkboxSelection={false}
        sx={{ border: 0 }}
      />
    </Paper>
  );
}
