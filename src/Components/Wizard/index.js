import PropTypes from 'prop-types';
import { Wizard } from '@patternfly/react-core';
import React from 'react';
import { addNotification } from '@redhat-cloud-services/frontend-components-notifications/redux';

import { WizardProvider } from '../Common/WizardContext';
import APIProvider from '../Common/Query';
import defaultSteps from './steps';
import { useDispatch } from 'react-redux';

const ProvisioningWizard = ({ isOpen, onClose, image, ...props }) => {
  const [stepIdReached, setStepIdReached] = React.useState(1);
  const [stepValidation, setStepValidation] = React.useState({
    sshStep: false,
  });

  const steps = defaultSteps({
    stepIdReached,
    image,
    stepValidation,
    setStepValidation,
  });
  const dispatch = useDispatch();

  const onNext = ({ id, name }, { prevId, prevName }) => {
    console.debug(
      `current id: ${id}, current name: ${name}, previous id: ${prevId}, previous name: ${prevName}`
    );
    setStepIdReached((prevID) => (prevID < id ? id : prevID));
  };

  const handleAlert = () => {
    dispatch(
      addNotification({
        variant: 'success',
        title: 'Provisioning has been started',
        description:
          'a notification will be trigger after a success or failure',
      })
    );
    onClose();
  };

  return (
    <WizardProvider>
      <APIProvider>
        <Wizard
          {...props}
          title="Provisioning"
          description="Provision RHEL images to cloud"
          steps={steps}
          isOpen={isOpen}
          onClose={onClose}
          onNext={onNext}
          onSave={handleAlert}
        />
      </APIProvider>
    </WizardProvider>
  );
};

ProvisioningWizard.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func,
  image: PropTypes.shape({
    name: PropTypes.string,
    id: PropTypes.string,
  }).isRequired,
};

export default ProvisioningWizard;
