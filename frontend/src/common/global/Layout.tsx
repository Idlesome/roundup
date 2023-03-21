import * as React from 'react';
import { Header } from './Header';

/**
 * Re-usable layout for pages
 */
export function Layout({ children }) {
  return (
    <div>
      <Header />

      <main>{children}</main>
    </div>
  );
}
