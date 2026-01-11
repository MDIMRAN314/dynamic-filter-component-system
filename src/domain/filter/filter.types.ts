export type FieldType =
  | 'text'
  | 'number'
  | 'currency'
  | 'date'
  | 'boolean'
  | 'singleSelect'
  | 'multiSelect';

export type FilterValue =
  | string
  | number
  | boolean
  | string[]
  | number[]
  | [string | number, string | number]
  | null;

export type Operator =
  | 'equals'
  | 'contains'
  | 'startsWith'
  | 'endsWith'
  | 'notContains'
  | 'greaterThan'
  | 'lessThan'
  | 'gte'
  | 'lte'
  | 'between'
  | 'before'
  | 'after'
  | 'is'
  | 'isNot'
  | 'in'
  | 'notIn'
  | 'lastNDays'
  | 'regex';

export interface FilterCondition {
  id: string;
  field: string;
  fieldType: FieldType;
  operator: Operator;
  value: any; // string | number | boolean | array | [Date, Date]
}

export const operatorMap: Record<FieldType, Operator[]> = {
  text: ['equals', 'contains', 'startsWith', 'endsWith', 'notContains'],
  number: ['equals', 'greaterThan', 'lessThan', 'gte', 'lte'],
  currency: ['between'],
  date: ['between', 'before', 'after'],
  boolean: ['is'],
  singleSelect: ['is', 'isNot'],
  multiSelect: ['in', 'notIn'],
};
