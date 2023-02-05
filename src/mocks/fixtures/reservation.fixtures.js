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
  instances: ['i-111', 'i-222'],
};
