import { useState } from 'react';
import { createContainer } from 'react-tracked';
import initialWizardContext from './initialState';

const useSharedState = () => useState(initialWizardContext);

export const { Provider: WizardProvider, useTracked: useWizardContext } =
  createContainer(useSharedState);
