import React, { useContext, useState } from 'react';
import { Container } from 'src/common/global/Container';
import { TransactionList } from './TransactionList';
import { RoundupsTotal } from './RoundupsTotal';
import { endOfWeek, startOfWeek, sub } from 'date-fns/esm';
import { SelectWeek } from './SelectWeek';
import { useTransactionFeedBetween } from '../../api/use-transaction-feed-between';
import { RoundupContext } from '../../RoundupContext';

const now = new Date();
const nowMinus1Week = sub(now, { weeks: 1 });

const weeks = [
  {
    name: 'This Week',
    start: startOfWeek(now, { weekStartsOn: 1 }),
    end: endOfWeek(now, { weekStartsOn: 1 }),
  },
  {
    name: 'Last Week',
    start: startOfWeek(nowMinus1Week, { weekStartsOn: 1 }),
    end: endOfWeek(nowMinus1Week, { weekStartsOn: 1 }),
  },
];

/**
 * Renders a weekly list of transactions for a given account
 */
export function WeeklyAccountTransactions({ account }: { account: Account }) {
  const { apiToken } = useContext(RoundupContext);
  const [selectedWeekIndex, setSelectedWeekIndex] = useState(0);
  const selectedWeek = weeks[selectedWeekIndex];

  const { feedItems, status, error } = useTransactionFeedBetween(apiToken, {
    accountUid: account.accountUid,
    // @TODO review if this will work with an account that has
    // more complex categories
    categoryUid: account.defaultCategory,
    minTransactionDate: selectedWeek.start,
    maxTransactionDate: selectedWeek.end,
  });

  return (
    <Container>
      <div>
        <SelectWeek onWeekSelect={setSelectedWeekIndex} weeks={weeks} />
        <h2>Account: {account.name}</h2>
        <div>
          <h3>Transactions For {selectedWeek.name}</h3>
          {status === 'failed' && (
            <div>Error fetching transaction list: {error}</div>
          )}

          {['initial', 'loading'].includes(status) ? (
            <div>Loading</div>
          ) : (
            <>
              <RoundupsTotal feedItems={feedItems} />
              <hr />
              <TransactionList feedItems={feedItems} />
            </>
          )}
        </div>
      </div>
    </Container>
  );
}
