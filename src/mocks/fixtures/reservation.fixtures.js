export const reservation = {
  id: 26,
  provider: 2,
  created_at: '2023-01-11T22:44:30.859166Z',
  steps: 2,
  step_titles: ['Upload public key', 'Launch instance(s)'],
  step: 0,
  status: 'Upload ssh keys(s)',
  error: null,
  finished_at: '2023-01-11T22:44:33.495925Z',
  success: null,
};

export const polledReservation = {
  ...reservation,
  step: 1,
  status: 'Launching instance(s)',
};

export const successfulReservation = {
  ...reservation,
  success: true,
  step: 2,
};

export const errorReservation = {
  ...reservation,
  error: 'Some error',
  success: false,
};

export const createdAWSReservation = {
  reservation_id: 26,
};

export const AWSReservation = {
  instances: [
    { instance_id: 'i-111', detail: { public_ipv4: '1.1.1.1', public_dns: 'fake.dns.com' } },
    { instance_id: 'i-222', detail: { public_ipv4: '2.2.2.2', public_dns: 'fake2.dns.com' } },
  ],
};

export const createdAzureReservation = {
  reservation_id: 66,
};

export const reservationAzure = {
  id: 66,
  provider: 3,
  created_at: '2023-04-11T22:44:30.859166Z',
  steps: 2,
  step_titles: ['Prepare resource group', 'Launch instance(s)'],
  step: 0,
  status: 'Prepare resource group',
  error: null,
  finished_at: '2023-04-11T22:46:33.495925Z',
  success: null,
};

export const successfulAzureReservation = {
  ...reservationAzure,
  success: true,
  step: 2,
};

export const getAzureReservation = {
  instances: [
    {
      instance_id: '/subscriptions/123/resourceGroups/redhat-deployed/providers/Microsoft.Compute/virtualMachines/redhat-vm-321',
      detail: { public_ipv4: '1.1.1.1', public_dns: null },
    },
    {
      instance_id: '/subscriptions/123/resourceGroups/redhat-deployed/providers/Microsoft.Compute/virtualMachines/redhat-vm-322',
      detail: { public_ipv4: '2.2.2.2', public_dns: null },
    },
  ],
};

export const createdGCPReservation = {
  reservation_id: 67,
};

export const successfulGCPReservation = {
  ...reservationGCP,
  success: true,
  step: 1,
};

export const GCPReservation = {
  instances: [
    { instance_id: '3003942005876582747', detail: { public_ipv4: '1.1.1.1' } },
    { instance_id: '3003942005876582748', detail: { public_ipv4: '2.2.2.2' } },
  ],
};

export const reservationGCP = {
  id: 67,
  provider: 4,
  created_at: '2023-06-14T16:03:44.700056Z',
  steps: 1,
  step_titles: ['Launch instance(s)'],
  step: 1,
  status: 'Launched instance(s)',
  error: '',
  finished_at: '2023-06-14T16:04:08.965698Z',
  success: true,
};
