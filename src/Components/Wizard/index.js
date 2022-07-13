import PropTypes from 'prop-types';
import { Wizard } from '@patternfly/react-core';
import React from 'react';
import { addNotification } from '@redhat-cloud-services/frontend-components-notifications/redux';

import { WizardProvider } from '../Common/WizardProvider';
import APIProvider from '../Common/Query';
import defaultSteps from './steps';
import { useDispatch } from 'react-redux';
import { useWizardContext } from '../Common/WizardContext';
import initialWizardContext from '../Common/WizardContext/initialState';

const ProvisioningWizard = ({ isOpen, onClose, ...props }) => {
  const [stepIdReached, setStepIdReached] = React.useState(1);
  const [, setWizardContext] = useWizardContext();
  const steps = defaultSteps({ stepIdReached });
  const dispatch = useDispatch();

  const onNext = ({ id, name }, { prevId, prevName }) => {
    console.debug(
      `current id: ${id}, current name: ${name}, previous id: ${prevId}, previous name: ${prevName}`
    );
    setStepIdReached((prevID) => (prevID < id ? id : prevID));
  };

  const handleFinish = () => {
    setWizardContext(initialWizardContext);
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
          onSave={handleFinish}
        />
      </APIProvider>
    </WizardProvider>
  );
};

ProvisioningWizard.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
};

export default ProvisioningWizard;
