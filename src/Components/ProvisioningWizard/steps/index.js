import React from 'react';
import AccountCustomizationsAWS from '../steps/AccountCustomizations/aws';
import AccountCustomizationsGCP from '../steps/AccountCustomizations/gcp';
import ReviewDetails from './ReviewDetails';
import PublicKeys from './Pubkeys';
import FinishStep from './FinishProgress';

const defaultSteps = ({ stepIdReached, image: { name, id }, stepValidation, setStepValidation, onClose }) => [
  {
    name: 'Account and customization',
    steps: [
      {
        name: 'AWS',
        id: 1,
        enableNext: stepValidation.awsStep,
        component: <AccountCustomizationsAWS setStepValidated={(validated) => setStepValidation((prev) => ({ ...prev, awsStep: validated }))} />,
        canJumpTo: stepIdReached >= 1,
      },
      {
        name: 'Azure',
        id: 2,
        component: <div> WIP: Azure </div>,
        canJumpTo: false,
        // enableNext: stepValidation.azureStep,
      },
      {
        name: 'Google',
        id: 3,
        component: <AccountCustomizationsGCP setStepValidated={(validated) => setStepValidation((prev) => ({ ...prev, gcpStep: validated }))} />,
        canJumpTo: stepIdReached >= 3,
        enableNext: stepValidation.gcpStep,
      },
    ],
  },
  {
    name: 'SSH key authentication',
    id: 4,
    component: <PublicKeys setStepValidated={(validated) => setStepValidation((prev) => ({ ...prev, sshStep: validated }))} />,
    canJumpTo: stepIdReached >= 4,
    enableNext: stepValidation.sshStep,
  },
  {
    name: 'Review details',
    id: 5,
    component: <ReviewDetails imageName={name} />,
    canJumpTo: stepIdReached >= 5,
    nextButtonText: 'Launch',
  },
  {
    name: 'Finish Progress',
    id: 6,
    component: <FinishStep onClose={onClose} imageID={id} />,
    isFinishedStep: true,
  },
];

export default defaultSteps;
