import type React from 'react';

import {
  TextField,
  MenuItem,
  Select,
  FormControl,
  Checkbox,
  FormControlLabel,
  Switch,
  Box,
  IconButton,
} from '@mui/material';
import { Trash2 } from 'lucide-react';

import type { FieldConfig } from '@/domain/filter/filter.config';
import type { FilterCondition, Operator } from '@/domain/filter/filter.types';
import { getDefaultValue } from '@/utils/filterUtils';

interface FilterRowProps {
  condition: FilterCondition;
  fields: FieldConfig[];
  onUpdate: (id: string, updated: Partial<FilterCondition>) => void;
  onRemove: (id: string) => void;
}

const isBetweenOperator = (op: Operator) => op === 'between';

export const FilterRow: React.FC<FilterRowProps> = ({
  condition,
  fields,
  onUpdate,
  onRemove,
}) => {
  const fieldConfig = fields.find((f) => f.path === condition.field);

  if (!fieldConfig) return null;

  /* ----------------------------- handlers ----------------------------- */

  const handleFieldChange = (fieldPath: string) => {
    const nextField = fields.find((f) => f.path === fieldPath);
    if (!nextField) return;

    const operator = nextField.operators[0];

    onUpdate(condition.id, {
      field: nextField.path,
      fieldType: nextField.type,
      operator,
      value: getDefaultValue(nextField.type, operator),
    });
  };

  const handleOperatorChange = (operator: Operator) => {
    onUpdate(condition.id, {
      operator,
      value: getDefaultValue(fieldConfig.type, operator),
    });
  };

  const handleValueChange = (value: any) => {
    onUpdate(condition.id, { value });
  };

  const renderBetweenInput = (type: 'number' | 'date') => {
    const [from, to] = (condition.value as [any, any]) ?? ['', ''];

    return (
      <Box sx={{ display: 'flex', gap: 1, width: '100%' }}>
        <TextField
          type={type}
          size="small"
          fullWidth
          value={from}
          onChange={(e) => {
            handleValueChange([e.target.value, to]);
          }}
        />
        <TextField
          type={type}
          size="small"
          fullWidth
          value={to}
          onChange={(e) => {
            handleValueChange([from, e.target.value]);
          }}
        />
      </Box>
    );
  };

  const renderValueInput = () => {
    const { type, options } = fieldConfig;

    // BOOLEAN → only toggle, no confusion
    if (type === 'boolean') {
      return (
        <FormControlLabel
          control={
            <Switch
              size="small"
              checked={Boolean(condition.value)}
              onChange={(e) => {
                handleValueChange(e.target.checked);
              }}
            />
          }
          label="Active"
        />
      );
    }

    // BETWEEN operator
    if (isBetweenOperator(condition.operator)) {
      if (['number', 'currency'].includes(type)) {
        return renderBetweenInput('number');
      }

      if (type === 'date') {
        return renderBetweenInput('date');
      }
    }

    // TEXT
    if (type === 'text') {
      return (
        <TextField
          size="small"
          fullWidth
          value={condition.value ?? ''}
          onChange={(e) => {
            handleValueChange(e.target.value);
          }}
        />
      );
    }

    // NUMBER / CURRENCY
    if (['number', 'currency'].includes(type)) {
      return (
        <TextField
          type="number"
          size="small"
          fullWidth
          value={condition.value ?? ''}
          onChange={(e) => {
            handleValueChange(Number(e.target.value));
          }}
        />
      );
    }

    // DATE
    if (type === 'date') {
      return (
        <TextField
          type="date"
          size="small"
          fullWidth
          value={condition.value ?? ''}
          onChange={(e) => {
            handleValueChange(e.target.value);
          }}
        />
      );
    }

    // SINGLE SELECT
    if (type === 'singleSelect') {
      return (
        <FormControl fullWidth size="small">
          <Select
            value={condition.value ?? ''}
            onChange={(e) => {
              handleValueChange(e.target.value);
            }}
          >
            {options?.map((opt) => (
              <MenuItem key={opt} value={opt}>
                {opt}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      );
    }

    // MULTI SELECT (always ARRAY)
    if (type === 'multiSelect') {
      const value: string[] = Array.isArray(condition.value)
        ? condition.value
        : [];

      return (
        <FormControl fullWidth size="small">
          <Select
            multiple
            value={value}
            onChange={(e) => {
              handleValueChange(e.target.value as string[]);
            }}
            renderValue={(selected) => selected.join(', ')}
          >
            {options?.map((opt) => (
              <MenuItem key={opt} value={opt}>
                <Checkbox checked={value.includes(opt)} />
                {opt}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      );
    }

    return null;
  };

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: '2fr 1.5fr 3fr auto',
        gap: 1,
        alignItems: 'center',
        mb: 1,
      }}
    >
      {/* Field */}
      <FormControl size="small">
        <Select
          value={condition.field}
          onChange={(e) => {
            handleFieldChange(e.target.value);
          }}
        >
          {fields.map((f) => (
            <MenuItem key={f.path} value={f.path}>
              {f.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Operator (hide for boolean) */}
      {fieldConfig.type !== 'boolean' && (
        <FormControl size="small">
          <Select
            value={condition.operator}
            onChange={(e) => {
              handleOperatorChange(e.target.value as Operator);
            }}
          >
            {fieldConfig.operators.map((op) => (
              <MenuItem key={op} value={op}>
                {op}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}

      {/* Value */}
      {renderValueInput()}

      {/* Delete */}
      <IconButton
        onClick={() => {
          onRemove(condition.id);
        }}
      >
        <Trash2 size={18} />
      </IconButton>
    </Box>
  );
};
