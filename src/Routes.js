import React, { lazy, Suspense } from 'react';
import { Bullseye, Spinner } from '@patternfly/react-core';
import { Route, Routes as RouterRoutes } from 'react-router-dom';

const SamplePage = lazy(() => import('./Routes/SamplePage/SamplePage'));

export const Routes = () => (
  <Suspense
    fallback={
      <Bullseye>
        <Spinner />
      </Bullseye>
    }
  >
    <RouterRoutes>
      <Route path="sample/*" component={SamplePage} />
    </RouterRoutes>
  </Suspense>
);
