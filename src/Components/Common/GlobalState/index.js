import { useState } from 'react';
import { createContainer } from 'react-tracked';
import initialGlobalState from './initialState';

const useSharedState = () => useState(initialGlobalState);

export const { Provider: GlobalStateProvider, useTracked: useGlobalState } =
  createContainer(useSharedState);
