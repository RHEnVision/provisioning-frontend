import React from 'react';
import PropTypes from 'prop-types';
import {
  ProgressStepper,
  ProgressStep,
  EmptyState,
  EmptyStateIcon,
  EmptyStateBody,
  EmptyStateSecondaryActions,
  Title,
  Text,
  Popover,
  Button,
  WizardContextConsumer,
} from '@patternfly/react-core';
import { CogsIcon, PendingIcon, CheckCircleIcon } from '@patternfly/react-icons';
import { useMutation, useQuery } from '@tanstack/react-query';

import { useWizardContext } from '../../../Common/WizardContext';
import { createNewPublicKey, createReservation, fetchReservation } from '../../../../API';

import useInterval from '../../../Common/Hooks/useInterval';
import { POLLING_BACKOFF_INTERVAL, PROVIDERS_INSTANCES_SUPPORT, SSH_STEP } from './constants';
import { instanceType, mapCurrentVariant, region, stepsByProvider } from './helpers';
import InstancesTable from '../../../InstancesTable';
import { humanizeProvider } from '../../../Common/helpers';

const ReservationProgress = ({ setLaunchSuccess }) => {
  const [steps, setSteps] = React.useState([]);
  const [currentError, setCurrentError] = React.useState();
  const [currentWarning, setCurrentWarning] = React.useState();
  const [currentStep, setCurrentStep] = React.useState(0);
  const [currentJobStep, setCurrentJobStep] = React.useState(0);
  const [reservationID, setReservationID] = React.useState();

  const [
    {
      chosenSource,
      chosenInstanceType,
      chosenNumOfInstances,
      chosenRegion,
      sshPublicName,
      sshPublicKey,
      chosenSshKeyId,
      uploadedKey,
      chosenImageID,
      provider,
      chosenTemplate,
    },
  ] = useWizardContext();
  const { nextInterval, currentInterval } = useInterval(POLLING_BACKOFF_INTERVAL);

  const { mutate: mutateReservation, error: reservationError } = useMutation(createReservation(provider), {
    onSuccess: (res) => {
      stepUp();
      setReservationID(res?.data?.reservation_id);
    },
  });

  const reservationParams = () => ({
    source_id: chosenSource,
    [instanceType(provider)]: chosenInstanceType,
    amount: chosenNumOfInstances,
    image_id: chosenImageID,
    [region(provider)]: chosenRegion,
    pubkey_id: chosenSshKeyId,
    ...(chosenTemplate && { launch_template_id: chosenTemplate }),
  });

  React.useEffect(() => {
    if (createReservation) {
      if (uploadedKey) {
        setSteps(SSH_STEP.concat(stepsByProvider(provider)));
        createPublicKey({ name: sshPublicName, body: sshPublicKey });
      } else {
        setSteps(stepsByProvider(provider));
        mutateReservation(reservationParams());
      }
    }
  }, [createReservation, setSteps, uploadedKey]);

  const { mutate: createPublicKey, error: pubkeyError } = useMutation(createNewPublicKey, {
    onSuccess: (resp) => {
      stepUp();
      mutateReservation({
        ...reservationParams(),
        pubkey_id: resp?.data?.id,
      });
    },
  });

  // polling request
  const { data: polledReservation } = useQuery(['reservation', reservationID], () => fetchReservation(reservationID), {
    enabled: !!reservationID && !currentError,
    staleTime: 0, // disable cache
    refetchInterval: (data) => {
      if (data?.success || !!data?.error) return false;
      return currentInterval;
    },
    onSuccess: (data) => {
      if (currentJobStep < data.step && !data.error) {
        setCurrentJobStep((prev) => prev + 1);
        stepUp();
      }
      !data?.success && nextInterval();
      data.success && setLaunchSuccess();
    },
    onError: () => {
      setCurrentWarning(
        `The reservation was created but we can't get the launch progress status.
           Check your ${humanizeProvider(provider)} console later. If this issue persists, please contact support.`
      );
    },
    refetchIntervalInBackground: true,
  });

  // errors and warnings handling
  React.useEffect(() => {
    if (currentInterval === false) {
      setCurrentWarning(
        `The launch progress is slower than expected, but we are still on it.
         It is safe to close this window and check your ${humanizeProvider(provider)} console later`
      );
    }
    if (reservationError || pubkeyError || polledReservation?.error) {
      const createReservationErrorMsg = reservationError?.response?.data?.msg;
      const pubkeyErrorMsg = pubkeyError?.response?.data?.msg;

      setCurrentError(createReservationErrorMsg || pubkeyErrorMsg || polledReservation?.error);
    }
  }, [reservationError, pubkeyError, polledReservation?.error, currentInterval]);

  const stepUp = () => setCurrentStep((prevStep) => prevStep + 1);

  return (
    <WizardContextConsumer>
      {({ goToStepById, onClose }) => (
        <EmptyState variant="large">
          <EmptyStateIcon color={(polledReservation?.success && '#3E8635') || null} icon={polledReservation?.success ? CheckCircleIcon : CogsIcon} />
          <Title headingLevel="h4" size="lg" ouiaId="launch-status">
            {polledReservation?.success ? 'System(s) launched successfully' : 'Launching system(s)'}
          </Title>
          {reservationID && (
            <Text component="small" ouiaId="launch-id">
              {`launch ID: ${reservationID}`}
            </Text>
          )}
          <EmptyStateBody>
            {!polledReservation?.success && (
              <ProgressStepper isCenterAligned>
                {steps.map(({ name, description }, step) => {
                  const variant = mapCurrentVariant(step, currentStep, currentError, currentWarning);
                  return (
                    <ProgressStep
                      variant={variant}
                      id={name}
                      key={name}
                      icon={step > currentStep ? <PendingIcon /> : undefined}
                      isCurrent={step === currentStep}
                      description={description}
                      titleId={name}
                      aria-label={`step ${name} ${variant}`}
                      popoverRender={
                        (currentError || currentWarning) && step === currentStep
                          ? (stepRef) => (
                              <Popover
                                aria-label={`${name} error message`}
                                headerContent={currentError ? 'Error' : 'Warning'}
                                bodyContent={currentError || currentWarning}
                                reference={stepRef}
                                position="right"
                              />
                            )
                          : undefined
                      }
                    >
                      {name}
                    </ProgressStep>
                  );
                })}
              </ProgressStepper>
            )}
          </EmptyStateBody>
          {polledReservation?.success && PROVIDERS_INSTANCES_SUPPORT.includes(provider) && (
            <InstancesTable provider={provider} region={chosenRegion} reservationID={reservationID} />
          )}
          {currentError && (
            <Button id="wizard-provisioning-failed-edit-button" onClick={() => goToStepById(1)} variant="primary">
              Edit
            </Button>
          )}
          <EmptyStateSecondaryActions>
            <Button variant="link" isDisabled={!currentError && currentStep < 2} onClick={onClose}>
              Close
            </Button>
          </EmptyStateSecondaryActions>
        </EmptyState>
      )}
    </WizardContextConsumer>
  );
};

ReservationProgress.propTypes = {
  setLaunchSuccess: PropTypes.func.isRequired,
};

export default ReservationProgress;
