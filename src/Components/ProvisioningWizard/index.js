import PropTypes from 'prop-types';
import { Wizard } from '@patternfly/react-core';
import React from 'react';

import APIProvider from '../Common/Query';
import { WizardProvider } from '../Common/WizardContext';
import { useSourcesForImage } from '../Common/Hooks/sources';
import ConfirmModal from '../ConfirmModal';
import CustomFooter from './CustomFooter';
import { imageProps } from './helpers';
import getSteps from './steps';
import './steps/Pubkeys/pubkeys.scss';

const DEFAULT_STEP_VALIDATION = {
  sshStep: false,
  awsStep: false,
};

const ProvisioningWizard = ({ isOpen, onClose, image, ...props }) => {
  const [stepIdReached, setStepIdReached] = React.useState(1);
  const [stepValidation, setStepValidation] = React.useState(DEFAULT_STEP_VALIDATION);
  const [isConfirming, setConfirming] = React.useState(false);
  const [successfulLaunch, setLaunchSuccess] = React.useState();

  const { isLoading, error: sourcesError, sources: availableSources } = useSourcesForImage(image, { refetch: stepIdReached <= 2 });

  const onCustomClose = () => {
    setConfirming(false);
    setStepIdReached(1);
    setStepValidation(DEFAULT_STEP_VALIDATION);
    onClose();
  };

  const onWizardClose = () => {
    if (stepIdReached >= 5 && !successfulLaunch) {
      setConfirming(true);
    } else {
      onCustomClose();
    }
  };

  const steps = getSteps({
    sourcesError,
    isLoading,
    availableSources,
    stepIdReached,
    image,
    stepValidation,
    setStepValidation,
    setLaunchSuccess,
  });

  const onNext = ({ id, name }, { prevId, prevName }) => {
    console.debug(`current id: ${id}, current name: ${name}, previous id: ${prevId}, previous name: ${prevName}`);
    setStepIdReached((prevID) => (prevID < id ? id : prevID));
  };

  return (
    <>
      <Wizard
        {...props}
        title="Launch"
        description={`Launch image ${image.name}`}
        steps={steps}
        isOpen
        onClose={onWizardClose}
        onNext={onNext}
        className={'provisioning'}
        footer={<CustomFooter />}
      />
      <ConfirmModal isOpen={isConfirming} onConfirm={onCustomClose} onCancel={() => setConfirming(false)} />
    </>
  );
};

const ProvisioningWizardWrapper = (props) => (
  <WizardProvider>
    <APIProvider>{props.isOpen && <ProvisioningWizard {...props} />}</APIProvider>
  </WizardProvider>
);

ProvisioningWizard.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func,
  image: imageProps,
};

ProvisioningWizardWrapper.propTypes = ProvisioningWizard.propTypes;

export default ProvisioningWizardWrapper;
