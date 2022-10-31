/* eslint-disable react/prop-types */

import React from 'react';
import { render } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { WizardProvider } from '../Components/Common/WizardContext';

const AllProviders = ({ children }) => {
  const queryClient = new QueryClient();

  return (
    <WizardProvider>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WizardProvider>
  );
};

const customRender = (ui, options) => render(ui, { wrapper: AllProviders, ...options });

export * from '@testing-library/react';

export { customRender as render };
