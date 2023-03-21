import { Layout } from 'src/common/global/Layout';
import React, { useContext } from 'react';
import { TransactionFeed } from './components/TransactionFeed/TransactionFeed';
import { ApiTokenInput } from './components/ApiTokenInput';
import { SelectAccount } from './components/SelectAccount';
import { RoundupContext, RoundupContextProvider } from './RoundupContext';

/**
 * Context wrapper to allow us to use context
 * within RoundupWeeklySummary
 */
function ContextWrapper({ children }) {
  return <RoundupContextProvider>{children}</RoundupContextProvider>;
}

/**
 * Renders the page layout and key components
 * for the weekly summary and round up feature
 */
function RoundupWeeklySummary() {
  const { apiToken } = useContext(RoundupContext);

  return (
    <Layout>
      <ApiTokenInput />
      {apiToken && (
        <>
          <SelectAccount />
          <TransactionFeed />
        </>
      )}
    </Layout>
  );
}

export function RoundupWeeklySummaryPage() {
  return (
    <ContextWrapper>
      <RoundupWeeklySummary />
    </ContextWrapper>
  );
}
