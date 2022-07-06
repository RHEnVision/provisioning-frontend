/* eslint-disable react/prop-types */

import React from 'react';
import { render } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { GlobalStateProvider } from '../Components/Common/GlobalState';

const AllProviders = ({ children }) => {
  const queryClient = new QueryClient();

  return (
    <GlobalStateProvider>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </GlobalStateProvider>
  );
};

const customRender = (ui, options) =>
  render(ui, { wrapper: AllProviders, ...options });

export * from '@testing-library/react';

export { customRender as render };
