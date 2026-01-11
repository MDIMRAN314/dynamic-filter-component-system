import type { FieldType, Operator } from './filter.types';

export interface FieldConfig {
  label: string;
  type: FieldType;
  path: string;
  operators: Operator[];
  options?: string[]; // for select fields
}

export const FILTER_FIELDS: FieldConfig[] = [
  /* ---------- TEXT ---------- */
  {
    label: 'Name',
    type: 'text',
    path: 'name',
    operators: [
      'equals',
      'contains',
      'startsWith',
      'endsWith',
      'notContains',
      'regex',
    ],
  },
  {
    label: 'Email',
    type: 'text',
    path: 'email',
    operators: ['equals', 'contains'],
  },

  /* ---------- SINGLE SELECT ---------- */
  {
    label: 'Department',
    type: 'singleSelect',
    path: 'department',
    operators: ['is', 'isNot'],
    options: ['Engineering', 'HR', 'Marketing', 'Finance'],
  },
  {
    label: 'Role',
    type: 'singleSelect',
    path: 'role',
    operators: ['is', 'isNot'],
    options: ['Junior Developer', 'Senior Developer', 'Manager', 'Team Lead'],
  },

  /* ---------- NUMBERS ---------- */
  {
    label: 'Projects Count',
    type: 'number',
    path: 'projects',
    operators: ['equals', 'greaterThan', 'lessThan', 'gte', 'lte'],
  },
  {
    label: 'Performance Rating',
    type: 'number',
    path: 'performanceRating',
    operators: ['equals', 'greaterThan', 'lessThan', 'gte', 'lte'],
  },

  /* ---------- CURRENCY ---------- */
  {
    label: 'Salary',
    type: 'currency',
    path: 'salary',
    operators: ['between'],
  },

  /* ---------- DATE ---------- */
  {
    label: 'Join Date',
    type: 'date',
    path: 'joinDate',
    operators: ['between', 'before', 'after', 'lastNDays'],
  },
  {
    label: 'Last Review Date',
    type: 'date',
    path: 'lastReview',
    operators: ['between', 'before', 'after', 'lastNDays'],
  },

  /* ---------- BOOLEAN ---------- */
  {
    label: 'Active',
    type: 'boolean',
    path: 'isActive',
    operators: ['is'],
  },

  /* ---------- MULTI SELECT ---------- */
  {
    label: 'Skills',
    type: 'multiSelect',
    path: 'skills',
    operators: ['in', 'notIn'],
    options: ['React', 'TypeScript', 'Node.js', 'GraphQL', 'Redux', 'Docker'],
  },

  /* ---------- NESTED OBJECT ---------- */
  {
    label: 'City',
    type: 'text',
    path: 'address.city',
    operators: ['equals', 'contains'],
  },
  {
    label: 'State',
    type: 'text',
    path: 'address.state',
    operators: ['equals'],
  },
  {
    label: 'Country',
    type: 'text',
    path: 'address.country',
    operators: ['equals'],
  },
];

export const operatorInputCount: Record<Operator, 0 | 1 | 2> = {
  equals: 1,
  contains: 1,
  startsWith: 1,
  endsWith: 1,
  notContains: 1,
  lastNDays: 1,
  regex: 1,

  greaterThan: 1,
  lessThan: 1,
  gte: 1,
  lte: 1,

  between: 2,

  before: 1,
  after: 1,

  is: 0,
  isNot: 0,

  in: 1,
  notIn: 1,
};
