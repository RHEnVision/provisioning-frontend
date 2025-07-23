import PropTypes from 'prop-types';
import React, { Suspense } from 'react';
import { Alert, Bullseye, Spinner } from '@patternfly/react-core';
import { humanizeProvider } from '../../Common/helpers';
import { useFlag } from '@unleash/proxy-client-react';

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
        <Spinner size="lg" />
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

const DecommissioningAlert = () => (
  <Alert variant="info" isInline title="Upcoming decommission of the Image Builder Launch service" className="pf-v6-u-mt-sm pf-v6-u-mb-sm">
    <p>
      As of August 31st, the Image Builder Launch service will be discontinued. It will no longer be possible to launch instances directly from custom
      images using this service. After this date, custom images must be launched by following the cloud provider&apos;s standard procedures.
    </p>
  </Alert>
);

const StepContentWrapper = ({ children }) => {
  const decommissionFlag = useFlag('provisioning.decommissioning');
  return (
    <>
      {decommissionFlag && <DecommissioningAlert />}
      {children}
    </>
  );
};

StepContentWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

const wizardSteps = ({ stepIdReached, image, stepValidation, setStepValidation, setLaunchSuccess }) => [
  {
    name: 'Account and customization',
    steps: [
      {
        name: humanizeProvider(image.provider),
        id: 1,
        enableNext: stepValidation.awsStep,
        component: (
          <StepContentWrapper>
            <Loader>
              <AccountCustomizations image={image} setStepValidated={(validated) => setStepValidation((prev) => ({ ...prev, awsStep: validated }))} />
            </Loader>
          </StepContentWrapper>
        ),
        canJumpTo: stepIdReached >= 1,
      },
    ],
  },
  {
    name: 'SSH key authentication',
    id: 4,
    component: (
      <StepContentWrapper>
        <Loader>
          <PublicKeys setStepValidated={(validated) => setStepValidation((prev) => ({ ...prev, sshStep: validated }))} />
        </Loader>
      </StepContentWrapper>
    ),
    canJumpTo: stepIdReached >= 4,
    enableNext: stepValidation.sshStep,
  },
  {
    name: 'Review details',
    id: 5,
    component: (
      <StepContentWrapper>
        <Loader>
          <ReviewDetails image={image} />
        </Loader>
      </StepContentWrapper>
    ),
    canJumpTo: stepIdReached >= 5,
    nextButtonText: 'Launch',
  },
  {
    name: 'Finish Progress',
    id: 6,
    component: (
      <StepContentWrapper>
        <Loader>
          <FinishStep setLaunchSuccess={() => setLaunchSuccess(true)} imageID={image.id} />
        </Loader>
      </StepContentWrapper>
    ),
    isFinishedStep: true,
  },
];

const steps = (props) => (props.availableSources.length > 0 ? wizardSteps(props) : missingSource(props));

export default steps;
