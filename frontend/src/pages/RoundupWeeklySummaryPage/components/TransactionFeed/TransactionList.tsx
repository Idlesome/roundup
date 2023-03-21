import format from 'date-fns/format';
import React, { Fragment } from 'react';
import styled from 'styled-components';
import { formatCurrency } from '../format-currency';

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  font-variant-numeric: normal;
`;

type Props = {
  feedItems: TransactionFeedItem[];
};

/**
 * Renders a list of transactions with formatted date
 */
export function TransactionList({ feedItems }: Props) {
  if (feedItems.length === 0) {
    return <div>No transactions found for time range.</div>;
  }

  return (
    <Grid>
      {feedItems.map(transaction => (
        <Fragment key={transaction.feedItemUid}>
          <div>
            {format(new Date(transaction.transactionTime), 'dd.MM.yyyy HH:mm')}
          </div>
          <div>{formatCurrency(transaction.amount.minorUnits / 100)}</div>
        </Fragment>
      ))}
    </Grid>
  );
}
