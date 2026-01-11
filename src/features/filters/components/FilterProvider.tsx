import React, {
  useReducer,
  createContext,
  useContext,
  type ReactNode,
} from 'react';
import { filterReducer } from '../filter.reducer';
import {
  initialFilterState,
  type FilterAction,
  type FilterState,
} from '../filter.state';

interface FilterContextProps {
  state: FilterState;
  dispatch: React.Dispatch<FilterAction>;
}

const FilterContext = createContext<FilterContextProps | undefined>(undefined);

export const FilterProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(filterReducer, initialFilterState);

  return (
    <FilterContext.Provider value={{ state, dispatch }}>
      {children}
    </FilterContext.Provider>
  );
};

// Custom hook for usage
export const useFilter = (): FilterContextProps => {
  const context = useContext(FilterContext);
  if (!context)
    throw new Error('useFilter must be used within a FilterProvider');
  return context;
};
