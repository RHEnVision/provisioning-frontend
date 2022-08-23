import React from 'react';
import AccountCustomizationsAWS from '../steps/AccountCustomizations/aws';
import ReviewDetails from './ReviewDetails';
import PublicKeys from './Pubkeys';

const defaultSteps = ({
  stepIdReached,
  image: { name },
  stepValidation,
  setStepValidation,
}) => [
  {
    name: 'Account and customization',
    steps: [
      {
        name: 'AWS',
        id: 1,
        component: <AccountCustomizationsAWS />,
        canJumpTo: stepIdReached >= 1,
      },
      {
        name: 'Azure',
        id: 2,
        component: <div> WIP: Azure </div>,
        canJumpTo: stepIdReached >= 2,
      },
      {
        name: 'Google',
        id: 3,
        component: <div> WIP: Google </div>,
        canJumpTo: stepIdReached >= 3,
      },
    ],
  },
  {
    name: 'SSH key authentication',
    id: 4,
    component: (
      <PublicKeys
        setStepValidated={(validated) =>
          setStepValidation((prev) => ({ ...prev, sshStep: validated }))
        }
      />
    ),
    canJumpTo: stepIdReached >= 4,
    enableNext: stepValidation.sshStep,
  },
  {
    name: 'Review details',
    id: 5,
    component: <ReviewDetails imageName={name} />,
    canJumpTo: stepIdReached >= 5,
    nextButtonText: 'Submit',
  },
];

export default defaultSteps;
