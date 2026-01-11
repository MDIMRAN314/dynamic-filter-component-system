import { getValueByPath } from '@/utils/filterUtils';

import type { FilterCondition } from './filter.types';
import { operatorRegistry } from './operators/operator.registry';

export function evaluateCondition<T extends object>(
  row: T,
  condition: FilterCondition,
): boolean {
  const value = getValueByPath(row, condition.field);
  const handler = operatorRegistry[condition.operator];

  if (!handler) return true;
  return handler(value, condition.value);
}
