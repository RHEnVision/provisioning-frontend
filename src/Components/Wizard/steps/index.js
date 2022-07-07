import React from 'react';

const defaultSteps = ({ stepIdReached }) => [
  {
    name: 'Account and customization',
    steps: [
      {
        name: 'AWS',
        id: 1,
        component: <div> WIP: AWS </div>,
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
    component: <div>WIP SSH</div>,
    canJumpTo: stepIdReached >= 4,
  },
  {
    name: 'Review details',
    id: 5,
    component: <div>review details</div>,
    canJumpTo: stepIdReached >= 5,
    nextButtonText: 'Submit',
  },
];

export default defaultSteps;
