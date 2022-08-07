import PropTypes from 'prop-types';
import React from 'react';

import { WizardProvider } from '../Common/WizardContext';
import APIProvider from '../Common/Query';
import defaultSteps from './steps';
import Wizard from './Wizard';

const ProvisioningWizard = ({ isOpen, onClose, image, ...props }) => {
  const [stepIdReached, setStepIdReached] = React.useState(1);
  const steps = defaultSteps({ stepIdReached, image });

  const onNext = ({ id, name }, { prevId, prevName }) => {
    console.debug(
      `current id: ${id}, current name: ${name}, previous id: ${prevId}, previous name: ${prevName}`
    );
    setStepIdReached((prevID) => (prevID < id ? id : prevID));
  };

  return (
    <WizardProvider>
      <APIProvider>
        <Wizard
          {...props}
          steps={steps}
          isOpen={isOpen}
          onClose={onClose}
          onNext={onNext}
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
