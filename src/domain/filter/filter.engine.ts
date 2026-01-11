import type { FilterCondition } from './filter.types';
import { evaluateCondition } from './filter.evaluator';

// TODO:: optimize for large datasets
export function applyFilters<T extends object>(
  data: T[],
  filters: FilterCondition[],
): T[] {
  if (!filters.length) return data;

  const grouped = filters.reduce<Record<string, FilterCondition[]>>(
    (acc, filter) => {
      acc[filter.field] ||= [];
      acc[filter.field].push(filter);
      return acc;
    },
    {},
  );

  return data.filter((row) =>
    Object.values(grouped).every((conditions) =>
      conditions.some((condition) => evaluateCondition(row, condition)),
    ),
  );
}
