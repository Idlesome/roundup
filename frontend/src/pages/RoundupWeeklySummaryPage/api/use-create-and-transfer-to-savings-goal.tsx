import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const API_BASE_URL =
  'https://starling-api-gateway.floatingdown.workers.dev/api/v2';

type ConfirmFundsResponse = {
  requestedAmountAvailableToSpend: boolean;
  accountWouldBeInOverdraftIfRequestedAmountSpent: boolean;
};

type ConfirmFundsParameters = {
  apiToken: string;
  accountUid: string;
  targetAmountInMinorUnits: number;
};

export async function confirmFunds({
  apiToken,
  accountUid,
  targetAmountInMinorUnits,
}: ConfirmFundsParameters): Promise<ConfirmFundsResponse> {
  const searchParams = new URLSearchParams([
    ['targetAmountInMinorUnits', String(targetAmountInMinorUnits)],
  ]);
  const queryString = searchParams.toString();
  const response = await fetch(
    `${API_BASE_URL}/accounts/${accountUid}/confirmation-of-funds?${queryString}`,
    {
      headers: {
        Authorization: `Bearer ${apiToken}`,
      },
    }
  );

  const json: PotentiallyErroneousResponse<ConfirmFundsResponse> =
    await response.json();
  if (json.error) {
    throw new Error(`${json.error} - ${json.error_description}`);
  }

  return json;
}

type CreateSavingsGoalParameters = {
  apiToken: string;
  accountUid: string;
};
type CreateSavingsGoalResponse = {
  savingsGoalUid: string;
  success: boolean;
};

export async function createSavingsGoal({
  apiToken,
  accountUid,
}: CreateSavingsGoalParameters): Promise<CreateSavingsGoalResponse> {
  const response = await fetch(
    `${API_BASE_URL}/account/${accountUid}/savings-goals`,
    {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiToken}`,
      },
      body: JSON.stringify({
        name: 'Round-up',
        currency: 'GBP',
      }),
    }
  );

  const json: PotentiallyErroneousResponse<CreateSavingsGoalResponse> =
    await response.json();
  if (json.error) {
    throw new Error(`${json.error} - ${json.error_description}`);
  }

  return json;
}

type TransferFundsToSavingsGoalParameters = {
  apiToken: string;
  accountUid: string;
  savingsGoalUid: string;
  targetAmountInMinorUnits: number;
};
type TransferFundsToSavingsGoalResponse = {
  transferUid: string;
  success: boolean;
};

export async function transferFundsToSavingsGoal({
  apiToken,
  accountUid,
  savingsGoalUid,
  targetAmountInMinorUnits,
}: TransferFundsToSavingsGoalParameters): Promise<TransferFundsToSavingsGoalResponse> {
  const transferUid = uuidv4();
  const response = await fetch(
    `${API_BASE_URL}/account/${accountUid}/savings-goals/${savingsGoalUid}/add-money/${transferUid}`,
    {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiToken}`,
      },
      body: JSON.stringify({
        amount: {
          minorUnits: targetAmountInMinorUnits,
          currency: 'GBP',
        },
      }),
    }
  );

  const json: PotentiallyErroneousResponse<TransferFundsToSavingsGoalResponse> =
    await response.json();
  if (json.error) {
    throw new Error(`${json.error} - ${json.error_description}`);
  }

  return json;
}

/**
 * Uses accounts API to list accounts
 *
 * @param apiToken the apiToken to use for authentication with the API
 */
export function useCreateAndTransferToSavingsGoal(apiToken: string) {
  const [status, setStatus] = useState<LoadingStatus>('initial');
  const [error, setError] = useState('');

  async function createAndTransferToSavingsGoal({
    accountUid,
    targetAmountInMinorUnits,
  }) {
    try {
      setStatus('loading');

      const {
        requestedAmountAvailableToSpend,
        accountWouldBeInOverdraftIfRequestedAmountSpent,
      } = await confirmFunds({
        apiToken,
        accountUid,
        targetAmountInMinorUnits,
      });

      if (
        !requestedAmountAvailableToSpend ||
        accountWouldBeInOverdraftIfRequestedAmountSpent
      ) {
        throw new Error(
          'Unable to transfer to savings goal: insufficient funds in account'
        );
      }

      // @TODO optionally allow transfer to a pre-existing savings goal
      // @TODO in what scenario would success be false but the API returns
      // a successful response (i.e. 2xx)
      const { savingsGoalUid, success } = await createSavingsGoal({
        apiToken,
        accountUid,
      });
      if (!success) {
        throw new Error('Unknown error creating savings goal');
      }

      await transferFundsToSavingsGoal({
        apiToken,
        accountUid,
        savingsGoalUid,
        targetAmountInMinorUnits,
      });
      setStatus('complete');
    } catch (error) {
      // Report the error to console
      // eslint-disable-next-line no-console
      console.error(error);
      setError(error.toString());
      setStatus('failed');
    }
  }

  return {
    status,
    createAndTransferToSavingsGoal,
    error,
  };
}
