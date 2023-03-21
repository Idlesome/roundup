import { RoundupWeeklySummaryPage } from './pages/RoundupWeeklySummaryPage/RoundupWeeklySummaryPage';
import React from 'react';
import { ErrorBoundary } from './common/global/ErrorBoundary';
import { FallbackComponent } from './common/global/FallbackComponent';
import './App.css';

const App = () => {
  return (
    <ErrorBoundary FallbackComponent={FallbackComponent}>
      <RoundupWeeklySummaryPage />
    </ErrorBoundary>
  );
};

export { App };
