/* eslint-disable react/prop-types */

import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5000,
    },
  },
});

const APIProvider = ({ children }) => <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;

export default APIProvider;
