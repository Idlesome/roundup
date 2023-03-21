import React, { useState } from 'react';

type RoundupContextType = {
  apiToken: string;
  setApiToken: React.Dispatch<React.SetStateAction<string>>;
  account: Account | null;
  setAccount: React.Dispatch<React.SetStateAction<Account | null>>;
};

export const RoundupContext = React.createContext<RoundupContextType | null>({
  apiToken: '',
  setApiToken: () => {},
  account: null,
  setAccount: () => {},
});

export function RoundupContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [apiToken, setApiToken] = useState('');
  const [account, setAccount] = useState<Account | null>(null);

  return (
    <RoundupContext.Provider
      value={{
        apiToken,
        setApiToken,
        account,
        setAccount,
      }}
    >
      {children}
    </RoundupContext.Provider>
  );
}
