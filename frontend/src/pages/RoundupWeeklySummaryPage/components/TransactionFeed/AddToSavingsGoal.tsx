import React, { useContext } from 'react';
import { Container } from 'src/common/global/Container';
import { useCreateAndTransferToSavingsGoal } from '../../api/use-create-and-transfer-to-savings-goal';
import { RoundupContext } from '../../RoundupContext';
import { formatCurrency } from '../format-currency';

/**
 * Displays a button that, when clicked, creates a
 * savings goal in GBP and adds minorUnitsToAdd to it
 */
export function AddToSavingsGoal({
  minorUnitsToAdd,
}: {
  minorUnitsToAdd: number;
}) {
  const { apiToken, account } = useContext(RoundupContext);
  const { status, error, createAndTransferToSavingsGoal } =
    useCreateAndTransferToSavingsGoal(apiToken);

  const loading = status === 'loading';

  function onAddToSavingsGoal() {
    createAndTransferToSavingsGoal({
      targetAmountInMinorUnits: minorUnitsToAdd,
      accountUid: account.accountUid,
    });
  }

  if (minorUnitsToAdd === 0) {
    return <div>There is nothing to round-up for this week</div>;
  }

  return (
    <Container>
      {status === 'failed' && <div>Error during round-up: {error}</div>}
      <button onClick={onAddToSavingsGoal} disabled={loading}>
        {loading ? 'Adding' : 'Add'} {formatCurrency(minorUnitsToAdd / 100)} to
        Savings Goal
      </button>
    </Container>
  );
}
