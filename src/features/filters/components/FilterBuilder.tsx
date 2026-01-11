import React from 'react';
import {
  Box,
  Grid,
  IconButton,
  MenuItem,
  Select,
  TextField,
  Switch,
  Typography,
} from '@mui/material';
import { Trash2 } from 'lucide-react';

import { useFilter } from './FilterProvider';
import { FILTER_FIELDS } from '@/domain/filter/filter.config';
import type { FilterCondition, Operator } from '@/domain/filter/filter.types';
import { getDefaultValue } from '@/utils/filterUtils';
import { DatePicker } from '@mui/x-date-pickers';

const FilterBuilder: React.FC = () => {
  const { state, dispatch } = useFilter();
  const filters = state.conditions;

  const getFieldConfig = (path: string) =>
    FILTER_FIELDS.find((f) => f.path === path)!;

  const addFilter = () => {
    const field = FILTER_FIELDS[0];

    dispatch({
      type: 'ADD_FILTER',
      payload: {
        id: crypto.randomUUID(),
        field: field.path,
        fieldType: field.type,
        operator: field.operators[0],
        value: getDefaultValue(field.type, field.operators[0]),
      },
    });
  };

  const updateFilter = (id: string, patch: Partial<FilterCondition>) => {
    dispatch({
      type: 'UPDATE_FILTER',
      payload: { id, condition: patch },
    });
  };

  const removeFilter = (id: string) => {
    dispatch({
      type: 'REMOVE_FILTER',
      payload: id,
    });
  };

  const clearAll = () => {
    dispatch({ type: 'CLEAR_FILTERS' });
  };

  return (
    <Box sx={{ p: 2, border: '1px solid #ddd', borderRadius: 1, mb: 2 }}>
      <Typography variant="h6" gutterBottom>
        Filters
      </Typography>

      {filters.map((filter) => {
        const fieldConfig = getFieldConfig(filter.field);
        const today = new Date().toISOString().split('T')[0];
        const isBetween = filter.operator === 'between';
        const rangeValue =
          isBetween && Array.isArray(filter.value) ? filter.value : ['', ''];
        const [from, to] = rangeValue;

        return (
          <Grid
            key={filter.id}
            container
            spacing={2}
            alignItems="center"
            sx={{ mb: 2 }}
          >
            {/* FIELD */}
            <Grid size={3}>
              <Select
                fullWidth
                value={filter.field}
                onChange={(e) => {
                  const config = getFieldConfig(e.target.value);
                  updateFilter(filter.id, {
                    field: e.target.value,
                    fieldType: config.type,
                    operator: config.operators[0],
                    value: getDefaultValue(config.type, config.operators[0]),
                  });
                }}
              >
                {FILTER_FIELDS.map((f) => (
                  <MenuItem key={f.path} value={f.path}>
                    {f.label}
                  </MenuItem>
                ))}
              </Select>
            </Grid>

            {/* OPERATOR */}
            <Grid size={3}>
              <Select
                fullWidth
                value={filter.operator}
                onChange={(e) => {
                  const op = e.target.value as Operator;
                  updateFilter(filter.id, {
                    operator: op,
                    value: getDefaultValue(fieldConfig.type, op),
                  });
                }}
              >
                {fieldConfig.operators.map((op) => (
                  <MenuItem key={op} value={op}>
                    {op}
                  </MenuItem>
                ))}
              </Select>
            </Grid>

            {/* VALUE */}
            <Grid size={4}>
              {filter.operator === 'between' &&
                ['number', 'currency'].includes(fieldConfig.type) && (
                  <Grid container spacing={1}>
                    <Grid size={6}>
                      <TextField
                        label="From"
                        type="number"
                        fullWidth
                        error={from && to && Number(from) > Number(to)}
                        helperText="Min ≤ Max"
                        value={filter.value?.[0] ?? ''}
                        onChange={(e) =>
                          updateFilter(filter.id, {
                            value: [e.target.value, to],
                          })
                        }
                      />
                    </Grid>
                    <Grid size={6}>
                      <TextField
                        label="To"
                        type="number"
                        fullWidth
                        value={to}
                        error={
                          (from && to && Number(from) > Number(to)) ||
                          (to && Number(to) > Number(today))
                        }
                        helperText="Min ≤ Max"
                        onChange={(e) =>
                          updateFilter(filter.id, {
                            value: [from, e.target.value],
                          })
                        }
                      />
                    </Grid>
                  </Grid>
                )}

              {/* SINGLE NUMBER INPUT */}
              {['number', 'currency'].includes(fieldConfig.type) &&
                filter.operator !== 'between' && (
                  <TextField
                    type="number"
                    fullWidth
                    value={filter.value ?? ''}
                    onChange={(e) =>
                      updateFilter(filter.id, {
                        value:
                          e.target.value === '' ? '' : Number(e.target.value),
                      })
                    }
                  />
                )}
              {filter.operator === 'between' && fieldConfig.type === 'date' && (
                <Grid container spacing={1}>
                  <Grid size={6}>
                    <DatePicker
                      label="From"
                      value={from ? new Date(from) : null}
                      onChange={(d) =>
                        updateFilter(filter.id, {
                          value: [d?.toISOString() ?? '', to],
                        })
                      }
                      slotProps={{ textField: { fullWidth: true } }}
                    />
                  </Grid>
                  <Grid size={6}>
                    <DatePicker
                      label="To"
                      maxDate={new Date()}
                      value={to ? new Date(to) : null}
                      onChange={(d) =>
                        updateFilter(filter.id, {
                          value: [from, d?.toISOString() ?? ''],
                        })
                      }
                      slotProps={{ textField: { fullWidth: true } }}
                    />
                  </Grid>
                </Grid>
              )}

              {/* TEXT */}
              {fieldConfig.type === 'text' && filter.operator !== 'between' && (
                <TextField
                  fullWidth
                  value={filter.value ?? ''}
                  onChange={(e) =>
                    updateFilter(filter.id, { value: e.target.value })
                  }
                />
              )}

              {/* BOOLEAN */}
              {fieldConfig.type === 'boolean' && (
                <Switch
                  checked={Boolean(filter?.value)}
                  onChange={(e) =>
                    updateFilter(filter.id, { value: e.target.checked })
                  }
                />
              )}

              {/* SELECTS */}
              {['singleSelect', 'multiSelect'].includes(fieldConfig.type) && (
                <Select
                  fullWidth
                  multiple={fieldConfig.type === 'multiSelect'}
                  value={
                    filter.value ??
                    (fieldConfig.type === 'multiSelect' ? [] : '')
                  }
                  onChange={(e) =>
                    updateFilter(filter.id, { value: e.target.value })
                  }
                >
                  {fieldConfig.options?.map((opt) => (
                    <MenuItem key={opt} value={opt}>
                      {opt}
                    </MenuItem>
                  ))}
                </Select>
              )}

              {/* DATE BEFORE / AFTER */}
              {fieldConfig.type === 'date' &&
                ['before', 'after'].includes(filter.operator) && (
                  <DatePicker
                    label={filter.operator === 'before' ? 'Before' : 'After'}
                    maxDate={new Date()}
                    value={filter.value ? new Date(filter.value) : null}
                    onChange={(d) =>
                      updateFilter(filter.id, {
                        value: d ? d.toISOString() : '',
                      })
                    }
                    slotProps={{ textField: { fullWidth: true } }}
                  />
                )}

              {filter.operator === 'lastNDays' &&
                fieldConfig.type === 'date' && (
                  <Select
                    fullWidth
                    value={filter.value}
                    onChange={(e) =>
                      updateFilter(filter.id, { value: Number(e.target.value) })
                    }
                  >
                    <MenuItem value={7}>Last 7 days</MenuItem>
                    <MenuItem value={30}>Last 30 days</MenuItem>
                    <MenuItem value={90}>Last 90 days</MenuItem>
                  </Select>
                )}
            </Grid>

            {/* REMOVE */}
            <Grid size={2}>
              <IconButton onClick={() => removeFilter(filter.id)}>
                <Trash2 size={18} />
              </IconButton>
            </Grid>
          </Grid>
        );
      })}

      {/* ACTION BAR */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          mt: 2,
        }}
      >
        <Typography
          variant="button"
          onClick={addFilter}
          sx={{ cursor: 'pointer', color: 'primary.main' }}
        >
          + Add Filter
        </Typography>

        {filters.length > 0 && (
          <Typography
            variant="button"
            onClick={clearAll}
            sx={{ cursor: 'pointer', color: 'error.main' }}
          >
            Clear all
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default FilterBuilder;
