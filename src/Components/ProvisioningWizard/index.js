import PropTypes from 'prop-types';
import { Wizard } from '@patternfly/react-core';
import React from 'react';

import { WizardProvider } from '../Common/WizardContext';
import APIProvider from '../Common/Query';
import defaultSteps from './steps';

const DEFAULT_STEP_VALIDATION = {
  sshStep: false,
  awsStep: false,
};

const ProvisioningWizard = ({ isOpen, onClose, image, ...props }) => {
  const [stepIdReached, setStepIdReached] = React.useState(1);
  const [stepValidation, setStepValidation] = React.useState(
    DEFAULT_STEP_VALIDATION
  );

  const onCustomClose = () => {
    setStepIdReached(1);
    setStepValidation(DEFAULT_STEP_VALIDATION);
    onClose();
  };

  const steps = defaultSteps({
    stepIdReached,
    image,
    stepValidation,
    setStepValidation,
    onClose: onCustomClose,
  });

  const onNext = ({ id, name }, { prevId, prevName }) => {
    console.debug(
      `current id: ${id}, current name: ${name}, previous id: ${prevId}, previous name: ${prevName}`
    );
    setStepIdReached((prevID) => (prevID < id ? id : prevID));
  };

  return isOpen ? (
    <WizardProvider>
      <APIProvider>
        <Wizard
          {...props}
          title="Provisioning"
          description="Provision RHEL images to cloud"
          steps={steps}
          isOpen
          onClose={onCustomClose}
          onNext={onNext}
        />
      </APIProvider>
    </WizardProvider>
  ) : null;
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
