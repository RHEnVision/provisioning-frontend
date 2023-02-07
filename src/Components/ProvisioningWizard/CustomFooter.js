import * as React from 'react';
import { Button, ButtonVariant, WizardFooter, WizardContextConsumer } from '@patternfly/react-core';
import styles from '@patternfly/react-styles/css/components/Wizard/wizard';

import { stepIdToString } from './steps';

const CustomFooter = () => (
  <WizardFooter>
    <WizardContextConsumer>
      {({ activeStep, onNext, onBack, onClose }) => {
        const isValid = activeStep.enableNext !== undefined ? activeStep.enableNext : true;

        return (
          <>
            <Button
              id={`wizard-provisioning-${stepIdToString(activeStep.id)}-next-button`}
              variant={ButtonVariant.primary}
              type="submit"
              onClick={onNext}
              isDisabled={!isValid}
            >
              {activeStep.nextButtonText || 'Next'}
            </Button>
            {!activeStep.hideBackButton && (
              <Button
                id={`wizard-provisioning-${stepIdToString(activeStep.id)}-back-button`}
                variant={ButtonVariant.secondary}
                onClick={onBack}
                isDisabled={activeStep.id == 1}
              >
                Back
              </Button>
            )}
            {!activeStep.hideCancelButton && (
              <div className={styles.wizardFooterCancel}>
                <Button variant={ButtonVariant.link} onClick={onClose}>
                  Cancel
                </Button>
              </div>
            )}
          </>
        );
      }}
    </WizardContextConsumer>
  </WizardFooter>
);

export default CustomFooter;
