/* eslint-disable react/prop-types */

import React from 'react';
import { render } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WizardProvider } from '../Components/Common/WizardContext';

const AllProviders = ({ children, provider, ...contextValues }) => {
  const queryClient = new QueryClient({
    logger: {
      log: console.log,
      warn: console.warn,
      // ✅ no more errors on the console
      error: () => {},
    },
  });

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
