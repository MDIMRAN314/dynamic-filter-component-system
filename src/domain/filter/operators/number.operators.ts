import type { OperatorFn } from './operator.types';

export const numberOperators = {
  greaterThan: (a, b) => Number(a) > Number(b),
  greaterThanOrEqual: (a, b) => Number(a) >= Number(b),
  lessThan: (a, b) => Number(a) < Number(b),
  lessThanOrEqual: (a, b) => Number(a) <= Number(b),
  equals: (a, b) => Number(a) === Number(b),
  between: (a, b) => {
    if (!b) return false;
    const { min, max } = b as { min: number; max: number };
    return Number(a) >= min && Number(a) <= max;
  },
} satisfies Record<string, OperatorFn>;
