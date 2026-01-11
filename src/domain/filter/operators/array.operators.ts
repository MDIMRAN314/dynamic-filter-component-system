import type { OperatorFn } from './operator.types';

export const arrayOperators = {
  in: (a, b) =>
    Array.isArray(a) && Array.isArray(b) && b.some((v) => a.includes(v)),

  notIn: (a, b) =>
    Array.isArray(a) && Array.isArray(b) && !b.some((v) => a.includes(v)),
} satisfies Record<string, OperatorFn>;
