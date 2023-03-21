import React, { useContext, useEffect, useState } from 'react';
import { Container } from 'src/common/global/Container';
import { useListAccounts } from '../api/use-list-accounts';
import { RoundupContext } from '../RoundupContext';

/**
 * Account selection dropdown
 *
 * Lists the users accounts from the API in a dropdown.
 * When the user selects an account, the onSelectAccount
 * handler is called with the value of the selected account
 */
export function SelectAccount() {
  const { apiToken, setAccount } = useContext(RoundupContext);
  const [selectedAccountUid, setSelectedAccountUid] = useState('-1');
  const { status, accounts, error } = useListAccounts(apiToken);

  useEffect(() => {
    let selectedAccount = null;
    if (selectedAccountUid !== '-1' && accounts.length > 0) {
      selectedAccount = accounts.find(
        account => account.accountUid === selectedAccountUid
      );
    }
    setAccount(selectedAccount);
  }, [accounts, selectedAccountUid, setAccount]);

  return (
    <Container>
      {status === 'failed' && <div>Error fetching accounts: {error}</div>}
      {['loading', 'initial'].includes(status) && (
        <div>Loading accounts...</div>
      )}
      <label htmlFor="select-account">Select Account</label>
      <br />
      <select
        id="select-account"
        onChange={e => setSelectedAccountUid(e.target.value)}
      >
        <option value="-1">[No Account Selected]</option>
        {accounts.map(account => (
          <option value={account.accountUid} key={account.accountUid}>
            {account.name} ({account.accountType})
          </option>
        ))}
      </select>
    </Container>
  );
}
