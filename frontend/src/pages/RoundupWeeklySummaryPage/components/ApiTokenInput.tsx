import React, { useContext } from 'react';
import { Container } from 'src/common/global/Container';
import { RoundupContext } from '../RoundupContext';

/**
 * Input for API token to use for authentication with the API.
 *
 * Generally this would not be entered by a user but for the
 * sake of the test and simplicity in testing we'll use this
 * input for setting the API token for requests. This also
 * means no API tokens would get committed
 */
export function ApiTokenInput() {
  const { apiToken, setApiToken } = useContext(RoundupContext);

  return (
    <Container>
      <label htmlFor="api-token">API Token</label>
      <br />
      <input
        id="api-token"
        type="text"
        value={apiToken}
        onChange={e => setApiToken(e.target.value)}
      />
    </Container>
  );
}
