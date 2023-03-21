import { useEffect, useState } from 'react';
// @TODO move this to backend as an env var
const API_BASE_URL =
  'https://starling-api-gateway.floatingdown.workers.dev/api/v2';

type TransactionFeedParameters = {
  accountUid: string;
  categoryUid: string;
  minTransactionDate: Date;
  maxTransactionDate: Date;
};

export async function fetchTransactionFeed(
  apiToken: string,
  parameters: TransactionFeedParameters
): Promise<TransactionFeedItem[]> {
  const { accountUid, categoryUid, minTransactionDate, maxTransactionDate } =
    parameters;
  const searchParams = new URLSearchParams([
    ['minTransactionTimestamp', minTransactionDate.toISOString()],
    ['maxTransactionTimestamp', maxTransactionDate.toISOString()],
  ]);
  const queryString = searchParams.toString();
  const response = await fetch(
    `${API_BASE_URL}/feed/account/${accountUid}/category/${categoryUid}/transactions-between?${queryString}`,
    {
      headers: {
        Authorization: `Bearer ${apiToken}`,
      },
    }
  );

  const json: PotentiallyErroneousResponse<{
    feedItems: TransactionFeedItem[];
  }> = await response.json();
  if (json.error) {
    throw new Error(`${json.error} - ${json.error_description}`);
  }

  return json.feedItems;
}

/**
 * Uses transactions between API to list transactions
 *
 * @param apiToken the apiToken to use for authentication with the API
 * @param transactionFeedParameters API parameters required for transactions between
 */
export function useTransactionFeedBetween(
  apiToken: string,
  {
    accountUid,
    categoryUid,
    minTransactionDate,
    maxTransactionDate,
  }: TransactionFeedParameters
) {
  const [feedItems, setFeedItems] = useState<TransactionFeedItem[]>([]);
  const [status, setStatus] = useState<LoadingStatus>('initial');
  const [error, setError] = useState('');

  useEffect(() => {
    (async function loadTransactionFeed() {
      try {
        setStatus('loading');
        setFeedItems(
          await fetchTransactionFeed(apiToken, {
            accountUid,
            categoryUid,
            minTransactionDate,
            maxTransactionDate,
          })
        );
        setStatus('complete');
      } catch (error) {
        // Report the error to console
        // eslint-disable-next-line no-console
        console.error(error);
        setError(error.toString());
        setStatus('failed');
      }
    })();
  }, [
    apiToken,
    accountUid,
    categoryUid,
    minTransactionDate,
    maxTransactionDate,
  ]);

  return {
    status,
    feedItems,
    error,
  };
}
