import { useMemo, useState, type FC } from 'react';
import {
  Container,
  Typography,
  Select,
  FormControl,
  MenuItem,
  Box,
  Button,
  Tooltip,
} from '@mui/material';

import type { Employee } from './domain/employee/employee.types';
import FilterBuilder from './features/filters/components/FilterBuilder';
import DataTable from './components/DataTable';
import { useFilter } from './features/filters/components/FilterProvider';
import { sampleEmployees } from './data/sampleEmployeeData';
import { filterData } from './utils/filterUtils';
import GridTable, { employeeColumns } from './GridTable';
import { StyledEngineProvider } from '@mui/material/styles';
import { exportToCSV, exportToJSON } from './utils/exportUtils';
import { useDebounce } from './hooks/useDebounce';

const AppContent: FC = () => {
  const { state } = useFilter();
  const debouncedFilters = useDebounce(state.conditions, 300);

  const filteredRows = useMemo(() => {
    return filterData(sampleEmployees, debouncedFilters);
  }, [sampleEmployees, debouncedFilters]);
  const [filterType, setFilterType] = useState('Custom Filter');
  const options = ['Custom Filter', 'MUI Filter'];

  return (
    <Container sx={{ mt: 4 }}>
      <Box
        sx={{
          mb: 2,
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          justifyContent: 'space-between',
        }}
      >
        <Typography variant="h4" gutterBottom>
          Dynamic Filter Component System
        </Typography>
        <Box
          sx={{
            flexGrow: 1,
            display: 'flex',
            gap: 2,
            justifyContent: 'flex-end',
          }}
        >
          <Tooltip
            title={
              !filteredRows.length
                ? 'Filter data to export'
                : 'Export the filtered data in CSV format'
            }
          >
            <span>
              <Button
                variant="outlined"
                disabled={!filteredRows.length}
                onClick={() => exportToCSV(filteredRows, employeeColumns)}
              >
                Export CSV
              </Button>
            </span>
          </Tooltip>
          <Tooltip
            title={
              !filteredRows.length
                ? 'Filter data to export'
                : 'Export the filtered data in JSON format'
            }
          >
            <span>
              <Button
                variant="outlined"
                disabled={!filteredRows.length}
                onClick={() => exportToJSON(filteredRows)}
              >
                Export JSON
              </Button>
            </span>
          </Tooltip>

          <FormControl size="small" sx={{ minWidth: 150 }}>
            <Select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              {options.map((opt) => (
                <MenuItem key={opt} value={opt}>
                  {opt}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Box>
      {filterType === 'MUI Filter' ? (
        <StyledEngineProvider injectFirst>
          <GridTable />
        </StyledEngineProvider>
      ) : (
        <>
          <FilterBuilder />
          <Typography sx={{ mt: 2 }}>
            Total records: {sampleEmployees.length} | Filtered:{' '}
            {filteredRows.length}
          </Typography>
          <DataTable data={filteredRows as Employee[]} />
        </>
      )}
    </Container>
  );
};

export default AppContent;
