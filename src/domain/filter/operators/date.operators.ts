import type { OperatorFn } from './operator.types';

export const dateOperators = {
  between: (a, b) => {
    if (!b) return false;
    const { from, to } = b as { from: string; to: string };

    const value = new Date(String(a)).getTime();
    return value >= new Date(from).getTime() && value <= new Date(to).getTime();
  },
} satisfies Record<string, OperatorFn>;
