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
  Popover,
  Button,
  WizardContextConsumer,
} from '@patternfly/react-core';
import { CogsIcon, PendingIcon } from '@patternfly/react-icons';
import { useMutation, useQuery } from 'react-query';

import { useWizardContext } from '../../../Common/WizardContext';
import { createNewPublicKey, fetchReservation } from '../../../../API';
import ExpandedInfo from './ExpansionInfo';
import useInterval from '../../../Common/Hooks/useInterval';
import { POLLING_BACKOFF_INTERVAL, SSH_STEP } from './constants';
import { mapCurrentVariant, stepsByProvider } from './helpers';
import useReservationMutation from '../../../Common/Hooks/useMutationReservation';

const ReservationProgress = ({ imageID, setLaunchSuccess, provider }) => {
  const [steps, setSteps] = React.useState([]);
  const [currentError, setCurrentError] = React.useState();
  const [currentStep, setCurrentStep] = React.useState(0);
  const [currentJobStep, setCurrentJobStep] = React.useState(0);
  const [reservationID, setReservationID] = React.useState();

  const [
    { chosenSource, chosenInstanceType, chosenNumOfInstances, chosenRegion, sshPublicName, sshPublicKey, chosenSshKeyId, uploadedKey, chosenImageID },
  ] = useWizardContext();
  const { nextInterval, currentInterval } = useInterval(POLLING_BACKOFF_INTERVAL);
  const [createReservation, reservationError] = useReservationMutation(provider, (res) => {
    stepUp();
    setReservationID(res?.data?.reservation_id);
  });

  React.useEffect(() => {
    if (createReservation) {
      if (uploadedKey) {
        setSteps(SSH_STEP.concat(stepsByProvider(provider)));
        createPublicKey({ name: sshPublicName, body: sshPublicKey });
      } else {
        setSteps(stepsByProvider(provider));
        createReservation({
          source_id: chosenSource,
          instance_type: chosenInstanceType,
          amount: chosenNumOfInstances,
          image_id: chosenImageID || imageID,
          region: chosenRegion,
          pubkey_id: chosenSshKeyId,
        });
      }
    }
  }, [createReservation, setSteps, uploadedKey]);

  const { mutate: createPublicKey, error: pubkeyError } = useMutation(createNewPublicKey, {
    onSuccess: (resp) => {
      stepUp();
      createReservation({
        source_id: chosenSource,
        instance_type: chosenInstanceType,
        amount: chosenNumOfInstances,
        image_id: chosenImageID || imageID,
        region: chosenRegion,
        pubkey_id: resp?.data?.id,
      });
    },
  });

  // polling request
  const { data: polledReservation } = useQuery(['reservation', reservationID], () => fetchReservation(reservationID), {
    enabled: !!reservationID && currentStep < steps.length && !currentError,
    refetchInterval: (data) => {
      if (data?.success || !!data?.error) return false;
      return currentInterval;
    },
    onSuccess: (data) => {
      if (currentJobStep < data.step) {
        setCurrentJobStep((prev) => prev + 1);
        stepUp();
      }
      !data?.success && nextInterval();
      data.success && setLaunchSuccess();
    },
    refetchIntervalInBackground: true,
  });

  // error handling
  React.useEffect(() => {
    if (currentInterval === false) {
      setCurrentError('Session timed out, the reservation took too long to fulfill');
      return;
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
          <EmptyStateIcon icon={CogsIcon} />
          <Title headingLevel="h4" size="lg" ouiaId="launch-status">
            {`Launching system(s)`}
          </Title>
          <EmptyStateBody>
            <ProgressStepper isCenterAligned>
              {steps.map(({ name, description }, step) => {
                const variant = mapCurrentVariant(step, currentStep, currentError);
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
                      currentError && step === currentStep
                        ? (stepRef) => (
                            <Popover
                              aria-label={`${name} error message`}
                              headerContent={<div>Error</div>}
                              bodyContent={<div>{currentError}</div>}
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
          </EmptyStateBody>
          {/* TODO: remove hidden input */}
          {reservationID && <input type="hidden" name="reservation_id" value={reservationID} />}
          <EmptyStateBody>
            {(polledReservation?.error || polledReservation?.success) && (
              <ExpandedInfo
                reservationID={reservationID}
                error={currentError}
                createdAt={polledReservation?.created_at}
                finishedAt={polledReservation?.finished_at}
              />
            )}
          </EmptyStateBody>
          {currentError && (
            <Button onClick={() => goToStepById(1)} variant="primary">
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
  imageID: PropTypes.string.isRequired,
  provider: PropTypes.string.isRequired,
  setLaunchSuccess: PropTypes.func.isRequired,
};

export default ReservationProgress;
