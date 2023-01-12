import React from 'react';
import PropTypes from 'prop-types';
import {
  EmptyState,
  EmptyStateIcon,
  EmptyStateBody,
  EmptyStateSecondaryActions,
  Title,
  Progress,
  Button,
  WizardContextConsumer,
} from '@patternfly/react-core';
import { CogsIcon, CheckCircleIcon, ExclamationCircleIcon } from '@patternfly/react-icons';
import { useWizardContext } from '../../../Common/WizardContext';
import { useMutation, useQuery } from 'react-query';
import { createAWSReservation, createNewPublicKey, fetchAWSReservation } from '../../../../API';
import './styles.scss';
import useInterval from '../../../Common/Hooks/useInterval';
import { AWS_STEPS, PF_DANGER_100, PF_SUCCESS_100, POLLING_BACKOFF_INTERVAL } from './constants';

const FinishStep = ({ imageID, setLaunchSuccess }) => {
  const [
    { chosenSource, chosenInstanceType, chosenNumOfInstances, chosenRegion, sshPublicName, sshPublicKey, chosenSshKeyId, uploadedKey, chosenImageID },
  ] = useWizardContext();
  const [reservationID, setReservationID] = React.useState();
  const [activeStep, setActiveStep] = React.useState(uploadedKey ? 0 : 1);
  const { nextInterval, currentInterval } = useInterval(POLLING_BACKOFF_INTERVAL);

  const stepUp = () => setActiveStep((prevStep) => (prevStep < AWS_STEPS.length - 1 ? prevStep + 1 : prevStep));

  const { mutate: createPublicKey, error: pubkeyError } = useMutation(createNewPublicKey, {
    onSuccess: (resp) => {
      createAWSDeployment({
        source_id: chosenSource,
        instance_type: chosenInstanceType,
        amount: chosenNumOfInstances,
        image_id: chosenImageID || imageID,
        region: chosenRegion,
        pubkey_id: resp?.data?.id,
      });
      stepUp();
    },
  });

  const { mutate: createAWSDeployment, error: awsReservationError } = useMutation(createAWSReservation, {
    onSuccess: (res) => {
      stepUp();
      setReservationID(res?.data?.reservation_id);
    },
  });

  const { data: polledReservation } = useQuery(['reservation', reservationID], () => fetchAWSReservation(reservationID), {
    enabled: !!reservationID && activeStep < AWS_STEPS.length - 1 && !awsReservationError && !pubkeyError,
    refetchInterval: (data) => {
      if (data?.success || !!data?.error) return false;
      return currentInterval;
    },
    onSuccess: (data) => {
      !data?.success && nextInterval();
    },
    refetchIntervalInBackground: true,
  });

  React.useEffect(() => {
    if (polledReservation?.success) {
      stepUp();
      setLaunchSuccess();
    }
  }, [polledReservation?.success]);

  React.useEffect(() => {
    if (uploadedKey) {
      createPublicKey({ name: sshPublicName, body: sshPublicKey });
    } else {
      createAWSDeployment({
        source_id: chosenSource,
        instance_type: chosenInstanceType,
        amount: chosenNumOfInstances,
        image_id: chosenImageID || imageID,
        region: chosenRegion,
        pubkey_id: chosenSshKeyId,
      });
    }
  }, []);

  const activeProgress = AWS_STEPS[activeStep].progress;
  const activeDescription = AWS_STEPS[activeStep].description;
  const isJobError = polledReservation?.success === false;
  const isSessionTimeout = currentInterval === false;
  const isError = !!awsReservationError || !!pubkeyError || isJobError || isSessionTimeout;

  let title;
  let iconProps;
  if (isError) {
    title = 'Launching system(s): Failure';
    iconProps = { color: PF_DANGER_100, icon: ExclamationCircleIcon };
  } else if (activeProgress === 100) {
    title = 'Launching system(s): Success';
    iconProps = { color: PF_SUCCESS_100, icon: CheckCircleIcon };
  } else {
    title = 'Launching your system(s)';
    iconProps = { icon: CogsIcon };
  }

  return (
    <WizardContextConsumer>
      {({ goToStepById, onClose }) => (
        <EmptyState variant="large">
          <EmptyStateIcon {...iconProps} />
          <Title headingLevel="h4" size="lg" ouiaId="launch-status">
            {title}
          </Title>
          <EmptyStateBody>
            <Progress
              style={{ width: '500px' }}
              variant={isError && 'danger'}
              value={activeProgress}
              measureLocation="outside"
              id="launch-progress"
              aria-label="provisioning progress"
            />
          </EmptyStateBody>
          <EmptyStateBody>
            <span>
              {isError ? `An error has occurred while ${activeDescription[0].toLowerCase() + activeDescription.substring(1)}` : activeDescription}
              .
              <br />
              {polledReservation?.status}
              <span className="status-error">
                {isSessionTimeout && 'Session timed out, the reservation took too long to fulfill'}
                <br />
                {awsReservationError?.response?.data?.msg}
                <br />
                {pubkeyError?.response?.data?.msg}
                {polledReservation?.error}
              </span>
              {reservationID && <input type="hidden" readOnly name="reservation_id" value={reservationID} />}
            </span>
          </EmptyStateBody>
          {isError && (
            <Button onClick={() => goToStepById(1)} variant="primary">
              Edit
            </Button>
          )}
          <EmptyStateSecondaryActions>
            <Button variant="link" isDisabled={!isError && activeStep < 2} onClick={onClose}>
              Close
            </Button>
          </EmptyStateSecondaryActions>
        </EmptyState>
      )}
    </WizardContextConsumer>
  );
};

FinishStep.propTypes = {
  imageID: PropTypes.string.isRequired,
  setLaunchSuccess: PropTypes.func.isRequired,
};

export default FinishStep;
