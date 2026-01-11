import type { OperatorFn } from './operator.types';

export const textOperators = {
  equals: (a, b) => String(a).toLowerCase() === String(b).toLowerCase(),

  contains: (a, b) => String(a).toLowerCase().includes(String(b).toLowerCase()),

  startsWith: (a, b) =>
    String(a).toLowerCase().startsWith(String(b).toLowerCase()),

  endsWith: (a, b) => String(a).toLowerCase().endsWith(String(b).toLowerCase()),

  notContains: (a, b) =>
    !String(a).toLowerCase().includes(String(b).toLowerCase()),
} satisfies Record<string, OperatorFn>;
