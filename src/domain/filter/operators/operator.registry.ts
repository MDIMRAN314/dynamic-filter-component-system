import type { OperatorFn } from './operator.types';
import { textOperators } from './text.operators';
import { numberOperators } from './number.operators';
import { dateOperators } from './date.operators';
import { arrayOperators } from './array.operators';
import { booleanOperators } from './boolean.operators';

export const operatorRegistry: Record<string, OperatorFn> = {
  ...textOperators,
  ...numberOperators,
  ...dateOperators,
  ...arrayOperators,
  ...booleanOperators,
};
