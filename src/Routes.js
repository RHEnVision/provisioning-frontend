import React, { Suspense, lazy } from 'react';
import { Route as RouterRoute, Routes as RouterRoutes } from 'react-router-dom';

import { Bullseye, Spinner } from '@patternfly/react-core';

const SamplePage = lazy(() => import(/* webpackChunkName: "SamplePage" */ './Routes/SamplePage/SamplePage'));

/**
 * the Switch component changes routes depending on the path.
 *
 * Route properties:
 *      exact - path must match exactly,
 *      path - https://prod.foo.redhat.com:1337/insights/advisor/rules
 *      component - component to be rendered when a route has been chosen.
 */
export const Routes = () => (
  <Suspense
    fallback={
      <Bullseye>
        <Spinner />
      </Bullseye>
    }
  >
    <RouterRoutes>
      <RouterRoute path="/" element={<SamplePage />} />
      <RouterRoute path="sample" element={<SamplePage />} />
    </RouterRoutes>
  </Suspense>
);
