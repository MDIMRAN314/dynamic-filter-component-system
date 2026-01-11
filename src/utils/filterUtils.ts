import { operatorInputCount } from '@/domain/filter/filter.config';
import type { Employee } from '@/domain/employee/employee.types';
import type {
  FieldType,
  FilterCondition,
  Operator,
} from '@/domain/filter/filter.types';

// Helper: get nested value from object by path string
export const getValueByPath = (obj: any, path: string): any => {
  return path.split('.').reduce((acc, key) => acc?.[key], obj);
};

// --- TEXT FILTER ---
export const applyTextFilter = (
  value: string,
  operator: Operator,
  filterValue: string,
): boolean => {
  if (!value || !filterValue) return false;
  const v = value.toLowerCase();
  const f = filterValue.toLowerCase();
  console.log('v,f', v, f);
  switch (operator) {
    case 'equals':
      return v === f;
    case 'contains':
      return v.includes(f);
    case 'startsWith':
      return v.startsWith(f);
    case 'endsWith':
      return v.endsWith(f);
    case 'notContains':
      return !v.includes(f);
    case 'regex':
      try {
        return new RegExp(filterValue, 'i').test(value);
      } catch {
        return true;
      }
    default:
      return true;
  }
};

// --- NUMBER / CURRENCY FILTER ---
export const applyNumberFilter = (
  value: number,
  operator: Operator,
  filterValue: number | [number | '', number | ''],
): boolean => {
  if (typeof value !== 'number' || Number.isNaN(value)) return false;

  if (operator === 'between') {
    if (!Array.isArray(filterValue)) return true;

    const [min, max] = filterValue;

    if (min !== '' && value < Number(min)) return false;
    if (max !== '' && value > Number(max)) return false;

    return true;
  }

  if (Array.isArray(filterValue)) return true;

  switch (operator) {
    case 'equals':
      return value === filterValue;
    case 'greaterThan':
      return value > filterValue;
    case 'lessThan':
      return value < filterValue;
    case 'gte':
      return value >= filterValue;
    case 'lte':
      return value <= filterValue;
    default:
      return false;
  }
};

export const applyDateFilter = (
  value: string,
  operator: Operator,
  filterValue: string | [string, string],
): boolean => {
  if (!value) return false;

  const itemTime = new Date(value).getTime();

  if (operator === 'between') {
    if (!Array.isArray(filterValue)) return true;
    const [from, to] = filterValue;

    const fromTime = from ? new Date(from).getTime() : -Infinity;
    const toTime = to ? new Date(to).getTime() : Infinity;

    return itemTime >= fromTime && itemTime <= toTime;
  }

  if (Array.isArray(filterValue) || !filterValue) return true;

  const filterTime = new Date(filterValue).getTime();

  if (operator === 'before') return itemTime < filterTime;
  if (operator === 'after') return itemTime > filterTime;
  if (operator === 'lastNDays') {
    const today = new Date();
    const fromDate = new Date(today);
    fromDate.setDate(today.getDate() - Number(filterValue));
    return itemTime >= fromDate.getTime();
  }

  return true;
};

// --- BOOLEAN FILTER ---
export const applyBooleanFilter = (
  value: boolean,
  operator: Operator,
  filterValue: boolean,
): boolean => {
  if (operator === 'is') return value === filterValue;
  return true;
};

// --- SINGLE SELECT FILTER ---
export const applySingleSelectFilter = (
  value: string,
  operator: Operator,
  filterValue: string,
): boolean => {
  switch (operator) {
    case 'is':
      return value === filterValue;
    case 'isNot':
      return value !== filterValue;
    default:
      return true;
  }
};

// --- MULTI SELECT FILTER ---
export const applyMultiSelectFilter = (
  value: string[],
  operator: Operator,
  filterValue: string[],
): boolean => {
  if (!Array.isArray(value) || !Array.isArray(filterValue)) return true;

  switch (operator) {
    case 'in':
      return filterValue.some((fv) => value.includes(fv));
    case 'notIn':
      return !filterValue.some((fv) => value.includes(fv));
    default:
      return true;
  }
};

// --- MASTER FUNCTION ---
export const applyFilter = (
  item: Employee,
  fieldType: FieldType,
  path: string,
  operator: Operator,
  filterValue: any,
): boolean => {
  const value = getValueByPath(item, path);
  if (value === undefined || value === null) return false;

  switch (fieldType) {
    case 'text':
      return applyTextFilter(value as string, operator, filterValue as string);
    case 'number':
    case 'currency':
      return applyNumberFilter(value as number, operator, filterValue);
    case 'date':
      return applyDateFilter(value as string, operator, filterValue);
    case 'boolean':
      return applyBooleanFilter(
        value as boolean,
        operator,
        filterValue as boolean,
      );
    case 'singleSelect':
      return applySingleSelectFilter(
        value as string,
        operator,
        filterValue as string,
      );
    case 'multiSelect':
      return applyMultiSelectFilter(
        value as string[],
        operator,
        filterValue as string[],
      );
    default:
      return true;
  }
};

export const filterData = (data: Employee[], filters: FilterCondition[]) => {
  if (!filters.length) return data;

  return data.filter((item) =>
    filters.every((f) =>
      applyFilter(item, f.fieldType, f.field, f.operator, f.value),
    ),
  );
};

export function getDefaultValue(type: FieldType, operator: Operator) {
  const inputs = operatorInputCount[operator];

  if (inputs === 2) return ['', ''];
  if (inputs === 1) {
    switch (type) {
      case 'multiSelect':
        return [];
      case 'boolean':
        return false;
      case 'number':
      case 'currency':
      case 'date':
        return '';
      default:
        return '';
    }
  }

  // inputs === 0
  if (type === 'boolean') return false;
  return '';
}
