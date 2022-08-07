import PropTypes from 'prop-types';
import { Wizard as Pf4Wizard } from '@patternfly/react-core';
import React from 'react';
import { addNotification } from '@redhat-cloud-services/frontend-components-notifications/redux';
import { useMutation } from 'react-query';

import { useDispatch } from 'react-redux';
import { createAWSReservation } from '../../API';
import { useWizardContext } from '../Common/WizardContext';

const Wizard = ({ steps, onNext, isOpen, onClose, imageID, ...props }) => {
  const [{ chosenSource, chosenInstanceType, chosenNumOfInstances }] =
    useWizardContext();
  const dispatch = useDispatch();
  const { mutate } = useMutation(createAWSReservation, {
    onError: (error) => handleAlert(error),
    onSuccess: () => handleAlert(),
  });

  const handleAlert = (error) => {
    dispatch(
      addNotification({
        variant: error ? 'danger' : 'success',
        title: error
          ? 'an error has been occurred'
          : 'Provisioning has been started',
        description: error
          ? `Provisioning cannot be started due to an error: ${error}`
          : 'a notification will be trigger after a success or failure',
      })
    );
  };

  // TODO: add pubkey_id
  const onComplete = () => {
    mutate({
      source_id: chosenSource,
      instance_type: chosenInstanceType,
      amount: chosenNumOfInstances,
      image_id: imageID,
    });
    onClose();
  };

  return (
    <Pf4Wizard
      {...props}
      title="Provisioning"
      description="Provision RHEL images to cloud"
      steps={steps}
      isOpen={isOpen}
      onClose={onClose}
      onNext={onNext}
      onSave={onComplete}
    />
  );
};

Wizard.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired,
  steps: PropTypes.array.isRequired,
  imageID: PropTypes.number.isRequired,
};

export default Wizard;
