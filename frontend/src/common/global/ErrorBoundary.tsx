import React from 'react';
import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary';

/**
 * ErrorBoundary
 *
 * Basic wrapper for react-error-boundary to prevent
 * React from crashing and stopping the render of all
 * components when just one fails.
 *
 * Default FallbackComponent is an empty React component which
 * will essentially hide the failed component.
 *
 * To look into - react-error-boundary comes with hooks for
 *  handling API errors for custom error reporting
 */
function ErrorBoundary({ children, FallbackComponent = () => null }) {
  return (
    <ReactErrorBoundary FallbackComponent={FallbackComponent}>
      {children}
    </ReactErrorBoundary>
  );
}
export { ErrorBoundary };
