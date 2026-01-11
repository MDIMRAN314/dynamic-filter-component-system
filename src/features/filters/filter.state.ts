import type { FilterCondition } from '@/domain/filter/filter.types';

// State
export interface FilterState {
  conditions: FilterCondition[];
}

// Initial state
export const initialFilterState: FilterState = {
  conditions: [],
};

// Actions
export type FilterAction =
  | { type: 'ADD_FILTER'; payload: FilterCondition }
  | { type: 'REMOVE_FILTER'; payload: string } // by id
  | {
      type: 'UPDATE_FILTER';
      payload: { id: string; condition: Partial<FilterCondition> };
    }
  | { type: 'CLEAR_FILTERS' };
