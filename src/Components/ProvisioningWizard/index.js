import PropTypes from 'prop-types';
import { Wizard } from '@patternfly/react-core';
import React from 'react';

import { WizardProvider } from '../Common/WizardContext';
import APIProvider from '../Common/Query';
import defaultSteps from './steps';
import ConfirmModal from '../ConfirmModal';
import './steps/Pubkeys/pubkeys.scss';

const DEFAULT_STEP_VALIDATION = {
  sshStep: false,
  awsStep: false,
};

const ProvisioningWizard = ({ isOpen, onClose, image, ...props }) => {
  const [stepIdReached, setStepIdReached] = React.useState(1);
  const [stepValidation, setStepValidation] = React.useState(DEFAULT_STEP_VALIDATION);
  const [isConfirming, setConfirming] = React.useState(false);

  const onCustomClose = () => {
    setConfirming(false);
    setStepIdReached(1);
    setStepValidation(DEFAULT_STEP_VALIDATION);
    onClose();
  };

  const onWizardClose = () => {
    if (stepIdReached >= 5) {
      setConfirming(true);
    } else {
      onCustomClose();
    }
  };

  const steps = defaultSteps({
    stepIdReached,
    image,
    stepValidation,
    setStepValidation,
  });

  const onNext = ({ id, name }, { prevId, prevName }) => {
    console.debug(`current id: ${id}, current name: ${name}, previous id: ${prevId}, previous name: ${prevName}`);
    setStepIdReached((prevID) => (prevID < id ? id : prevID));
  };

  return isOpen ? (
    <WizardProvider>
      <APIProvider>
        <Wizard
          {...props}
          title="Launch"
          description={`Launch image ${image.name}`}
          steps={steps}
          isOpen
          onClose={onWizardClose}
          onNext={onNext}
          className={'provisioning'}
        />
        <ConfirmModal isOpen={isConfirming} onConfirm={onCustomClose} onCancel={() => setConfirming(false)} />
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
    architecture: PropTypes.string,
  }).isRequired,
};

export default ProvisioningWizard;
