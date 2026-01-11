import type { FilterState, FilterAction } from './filter.state';

export function filterReducer(
  state: FilterState,
  action: FilterAction,
): FilterState {
  switch (action.type) {
    case 'ADD_FILTER':
      return { ...state, conditions: [...state.conditions, action.payload] };
    case 'REMOVE_FILTER':
      return {
        ...state,
        conditions: state.conditions.filter((f) => f.id !== action.payload),
      };
    case 'UPDATE_FILTER':
      return {
        ...state,
        conditions: state.conditions.map((f) =>
          f.id === action.payload.id
            ? { ...f, ...action.payload.condition }
            : f,
        ),
      };
    case 'CLEAR_FILTERS':
      return { ...state, conditions: [] };
    default:
      return state;
  }
}
