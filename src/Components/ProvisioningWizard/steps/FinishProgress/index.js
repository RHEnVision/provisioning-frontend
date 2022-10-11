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
import {
  CogsIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
} from '@patternfly/react-icons';
import { useWizardContext } from '../../../Common/WizardContext';
import { useMutation, useQuery } from 'react-query';
import {
  createAWSReservation,
  createNewPublicKey,
  fetchAWSReservation,
} from '../../../../API';
import './styles.scss';

const pf_success_color_100 = '#3E8635';
const pf_danger_color_100 = '#C9190B';
const RESERVATION_POLLING_INTERVAL = 500;

const steps = [
  { description: 'Uploading SSH public key', progress: 0 },
  { description: 'Creating AWS reservation', progress: 20 },
  {
    description: 'Waiting for AWS',
    progress: 40,
  },
  { description: 'Launch is completed', progress: 100 },
];

const FinishStep = ({ onClose, imageID }) => {
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
    },
  ] = useWizardContext();
  const [reservationID, setReservationID] = React.useState();
  const [activeStep, setActiveStep] = React.useState(uploadedKey ? 0 : 1);
  const stepUp = () =>
    setActiveStep((prevStep) =>
      prevStep < steps.length - 1 ? prevStep + 1 : prevStep
    );

  const { data: polledReservation } = useQuery(
    ['reservation', reservationID],
    () => fetchAWSReservation(reservationID),
    {
      enabled: !!reservationID,
      refetchInterval: RESERVATION_POLLING_INTERVAL,
      refetchIntervalInBackground: true,
    }
  );

  const { mutate: createAWSDeployment, error: awsReservationError } =
    useMutation(createAWSReservation, {
      onSuccess: (data) => {
        stepUp();
        setReservationID(data?.data?.reservation_id);
      },
    });

  const { mutate: createPublicKey, error: pubkeyError } = useMutation(
    createNewPublicKey,
    {
      onSuccess: (resp) => {
        createAWSDeployment({
          source_id: chosenSource,
          instance_type: chosenInstanceType,
          amount: chosenNumOfInstances,
          image_id: imageID,
          region: chosenRegion,
          pubkey_id: resp?.data?.id,
        });
        stepUp();
      },
    }
  );

  React.useEffect(() => {
    if (polledReservation?.success) {
      stepUp();
      setReservationID(undefined);
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
        image_id: imageID,
        region: chosenRegion,
        pubkey_id: chosenSshKeyId,
      });
    }
  }, []);

  const activeProgress = steps[activeStep].progress;
  const isJobError = polledReservation?.success === false;
  const isError = !!awsReservationError || !!pubkeyError || isJobError;

  let title;
  let iconProps;
  if (isError) {
    title = 'Launching of system(s) had failed';
    iconProps = { color: pf_danger_color_100, icon: ExclamationCircleIcon };
  } else if (activeProgress === 100) {
    title = 'Launching of system(s) had successeded';
    iconProps = { color: pf_success_color_100, icon: CheckCircleIcon };
  } else {
    title = 'Launching your systems';
    iconProps = { icon: CogsIcon };
  }

  return (
    <WizardContextConsumer>
      {({ goToStepById }) => (
        <EmptyState variant="large">
          <EmptyStateIcon {...iconProps} />
          <Title headingLevel="h4" size="lg">
            {title}
          </Title>
          <EmptyStateBody>
            <Progress
              style={{ width: '500px' }}
              variant={isError && 'danger'}
              value={activeProgress}
              measureLocation="outside"
            />
          </EmptyStateBody>
          <EmptyStateBody>
            <span>
              {isError
                ? `An error has occurred while ${steps[
                    activeStep
                  ].description.toLowerCase()}`
                : steps[activeStep].description}
              .
              <br />
              {polledReservation?.status}
              <span className="status-error">
                {awsReservationError?.response?.data?.msg}
                {pubkeyError?.response?.data?.msg}
                {polledReservation?.error}
              </span>
            </span>
          </EmptyStateBody>
          {isError && (
            <Button onClick={() => goToStepById(1)} variant="primary">
              Edit
            </Button>
          )}
          <EmptyStateSecondaryActions>
            <Button
              variant="link"
              isDisabled={!isError && activeStep < 2}
              onClick={onClose}
            >
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
  onClose: PropTypes.func.isRequired,
};

export default FinishStep;
