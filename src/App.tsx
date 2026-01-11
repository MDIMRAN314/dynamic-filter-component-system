import React from 'react';
import { CssBaseline } from '@mui/material';

import { FilterProvider } from './features/filters/components/FilterProvider';
import { AppProviders } from './app/providers/AppProviders';
import AppContent from './AppContent';

const App: React.FC = () => {
  return (
    <AppProviders>
      <FilterProvider>
        <CssBaseline />
        <AppContent />
      </FilterProvider>
    </AppProviders>
  );
};

export default App;
