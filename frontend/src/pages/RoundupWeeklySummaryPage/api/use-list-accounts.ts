import { useEffect, useState } from 'react';
// @TODO move this to backend as an env var
const API_BASE_URL =
  'https://starling-api-gateway.floatingdown.workers.dev/api/v2';

export async function fetchAccounts(apiToken: string): Promise<Account[]> {
  const response = await fetch(`${API_BASE_URL}/accounts`, {
    headers: {
      Authorization: `Bearer ${apiToken}`,
    },
  });

  const json: PotentiallyErroneousResponse<{ accounts: Account[] }> =
    await response.json();
  if (json.error) {
    throw new Error(`${json.error} - ${json.error_description}`);
  }

  return json.accounts;
}

/**
 * Uses accounts API to list accounts
 *
 * @param apiToken the apiToken to use for authentication with the API
 */
export function useListAccounts(apiToken: string) {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [status, setStatus] = useState<LoadingStatus>('initial');
  const [error, setError] = useState('');

  useEffect(() => {
    (async function loadAccounts() {
      try {
        setStatus('loading');
        setAccounts(await fetchAccounts(apiToken));
        setStatus('complete');
      } catch (error) {
        // Report the error to console
        // eslint-disable-next-line no-console
        console.error(error);
        setError(error.toString());
        setStatus('failed');
      }
    })();
  }, [apiToken]);

  return {
    status,
    accounts,
    error,
  };
}
