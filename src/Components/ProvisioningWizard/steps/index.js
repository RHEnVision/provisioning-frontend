import React from 'react';
import AccountCustomizationsAWS from '../steps/AccountCustomizations/aws';
import ReviewDetails from './ReviewDetails';
import PublicKeys from './Pubkeys';
import FinishStep from './FinishProgress';

const defaultSteps = ({ stepIdReached, image: { name, id, architecture }, stepValidation, setStepValidation, onClose }) => [
  {
    name: 'Account and customization',
    steps: [
      {
        name: 'AWS',
        id: 1,
        enableNext: stepValidation.awsStep,
        component: (
          <AccountCustomizationsAWS
            architecture={architecture}
            setStepValidated={(validated) => setStepValidation((prev) => ({ ...prev, awsStep: validated }))}
          />
        ),
        canJumpTo: stepIdReached >= 1,
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
