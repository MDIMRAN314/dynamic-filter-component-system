import type { OperatorFn } from './operator.types';

export const booleanOperators = {
  is: (a, b) => Boolean(a) === Boolean(b),
} satisfies Record<string, OperatorFn>;
