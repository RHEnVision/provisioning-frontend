import React from 'react';
import FinishProgress from '.';
import { provisioningUrl } from '../../../../API/helpers';
import { errorReservation } from '../../../../mocks/fixtures/reservation.fixtures';
import { render, screen } from '../../../../mocks/utils';

describe('FinishProgress', () => {
  test('progress ends successfully', async () => {
    mountProgressBar();
    const progressCompleted = await screen.findByText(/Launch is completed/i);
    expect(progressCompleted).toBeDefined();
  });

  test('progress ends with a failure', async () => {
    const { server, rest } = window.msw;
    server.use(
      rest.get(provisioningUrl(`reservations/:id`), (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(errorReservation));
      })
    );
    mountProgressBar();
    const errorMessage = await screen.findByText(errorReservation.error);
    expect(errorMessage).toBeDefined();
  });
});

const mountProgressBar = () => {
  const setLaunchSuccessFunction = jest.fn();
  const imageID = 'image-id';
  render(<FinishProgress imageID={imageID} setLaunchSuccess={setLaunchSuccessFunction} />);
};
