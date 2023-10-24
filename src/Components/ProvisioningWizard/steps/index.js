import PropTypes from 'prop-types';
import React, { Suspense } from 'react';
import { Bullseye, Spinner } from '@patternfly/react-core';
import { humanizeProvider } from '../../Common/helpers';

const SourceMissing = React.lazy(() => import('./SourceMissing'));
const AccountCustomizations = React.lazy(() => import('./AccountCustomizations'));
const ReviewDetails = React.lazy(() => import('./ReviewDetails'));
const PublicKeys = React.lazy(() => import('./Pubkeys'));
const FinishStep = React.lazy(() => import('./ReservationProgress'));

const stringIds = {
  1: 'account',
  4: 'sshkey',
  5: 'review',
};

export const stepIdToString = (id) => stringIds[id];
const Loader = ({ children }) => (
  <Suspense
    fallback={
      <Bullseye>
        <Spinner isSVG size="lg" />
      </Bullseye>
    }
  >
    {children}
  </Suspense>
);

Loader.propTypes = {
  children: PropTypes.node.isRequired,
};

const missingSource = ({ image, isLoading, sourcesError }) => [
  {
    name: 'Define source',
    id: 1,
    component: (
      <Loader>
        <SourceMissing image={image} isLoading={isLoading} error={sourcesError} />
      </Loader>
    ),
    isFinishedStep: true,
  },
];

const wizardSteps = ({ stepIdReached, image, stepValidation, setStepValidation, setLaunchSuccess }) => [
  {
    name: 'Account and customization',
    steps: [
      {
        name: humanizeProvider(image.provider),
        id: 1,
        enableNext: stepValidation.awsStep,
        component: (
          <Loader>
            <AccountCustomizations image={image} setStepValidated={(validated) => setStepValidation((prev) => ({ ...prev, awsStep: validated }))} />
          </Loader>
        ),
        canJumpTo: stepIdReached >= 1,
      },
    ],
  },
  {
    name: 'SSH key authentication',
    id: 4,
    component: (
      <Loader>
        <PublicKeys setStepValidated={(validated) => setStepValidation((prev) => ({ ...prev, sshStep: validated }))} />
      </Loader>
    ),
    canJumpTo: stepIdReached >= 4,
    enableNext: stepValidation.sshStep,
  },
  {
    name: 'Review details',
    id: 5,
    component: (
      <Loader>
        <ReviewDetails image={image} />
      </Loader>
    ),
    canJumpTo: stepIdReached >= 5,
    nextButtonText: 'Launch',
  },
  {
    name: 'Finish Progress',
    id: 6,
    component: (
      <Loader>
        <FinishStep setLaunchSuccess={() => setLaunchSuccess(true)} imageID={image.id} />
      </Loader>
    ),
    isFinishedStep: true,
  },
];

const steps = (props) => (props.availableSources.length > 0 ? wizardSteps(props) : missingSource(props));

export default steps;
