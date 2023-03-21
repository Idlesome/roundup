import * as React from 'react';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  padding: 1rem;
  background: rgba(0, 0, 0, 0.025);
  border-bottom: 1px solid rgba(0, 0, 0, 0.03);
`;

export function Header() {
  return (
    <HeaderContainer>
      <h1>Roundup</h1>
    </HeaderContainer>
  );
}
