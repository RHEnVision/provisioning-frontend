/* eslint-disable react/prop-types */

import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

const ProvisioningQuery = (children) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

export default ProvisioningQuery;
