import React from 'react';
import { formatCurrency } from '../format-currency';
import { AddToSavingsGoal } from './AddToSavingsGoal';

function getTransactionRoundupRemainder(
  transaction: TransactionFeedItem
): number {
  return Number(
    (transaction.amount.minorUnits / 100).toString().split('.')[1] ?? 0
  );
}

function getRoundupTotalMinorUnitsFromTransactionFeed(
  transactionFeedItems: TransactionFeedItem[]
) {
  return transactionFeedItems
    .map(transaction => getTransactionRoundupRemainder(transaction))
    .reduce((minorUnits, acc) => minorUnits + acc, 0);
}

/**
 * Renders a list of transactions for a given account
 */
export function RoundupsTotal({
  feedItems,
}: {
  feedItems: TransactionFeedItem[];
}) {
  const roundUpTotalMinorUnits =
    getRoundupTotalMinorUnitsFromTransactionFeed(feedItems);

  return (
    <>
      <div>
        Roundups Total:
        {formatCurrency(roundUpTotalMinorUnits / 100)}
      </div>
      <AddToSavingsGoal minorUnitsToAdd={roundUpTotalMinorUnits} />
    </>
  );
}
