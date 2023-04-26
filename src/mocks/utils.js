/* eslint-disable react/prop-types */

import React from 'react';
import { render } from '@testing-library/react';
import { QueryClient, QueryClientProvider, setLogger } from 'react-query';
import { WizardProvider } from '../Components/Common/WizardContext';

const AllProviders = ({ children, provider, ...contextValues }) => {
  setLogger({
    log: console.log,
    warn: console.warn,
    // ✅ no more errors on the console
    error: () => {},
  });
  const queryClient = new QueryClient();

  return (
    <WizardProvider provider={provider} {...contextValues}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WizardProvider>
  );
};

const customRender = (ui, options = {}) =>
  render(ui, { wrapper: (props) => <AllProviders provider={options.provider || 'aws'} {...props} {...options.contextValues} />, ...options });

export * from '@testing-library/react';

export { customRender as render };
