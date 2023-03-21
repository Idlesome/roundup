import React, { useContext } from 'react';
import { Container } from 'src/common/global/Container';
import { RoundupContext } from '../../RoundupContext';
import { WeeklyAccountTransactions } from './WeeklyAccountTransactions';

/**
 * Renders a transaction feed for a given account and
 * a message if the given account is not available
 */
export function TransactionFeed() {
  const { account } = useContext(RoundupContext);

  if (!account) {
    return (
      <Container>
        <div>Please select an account to view transactions</div>
      </Container>
    );
  }

  return <WeeklyAccountTransactions account={account} />;
}
