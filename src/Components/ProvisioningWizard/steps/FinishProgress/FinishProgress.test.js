import React from 'react';
import FinishProgress from '.';
import { provisioningUrl } from '../../../../API/helpers';
import { errorReservation, reservation } from '../../../../mocks/fixtures/reservation.fixtures';
import { render, screen } from '../../../../mocks/utils';
import * as constants from './constants';

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
    const errorMessage = await screen.findByText(errorReservation.error, { exact: false });
    expect(errorMessage).toBeDefined();
  });

  test('show session timed out correctly', async () => {
    const { server, rest } = window.msw;
    server.use(
      rest.get(provisioningUrl(`reservations/:id`), (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(reservation));
      })
    );
    // eslint-disable-next-line
    constants.POLLING_BACKOFF_INTERVAL = [false];
    mountProgressBar();
    const timeoutMessage = await screen.findByText('Session timed out', { exact: false });
    expect(timeoutMessage).toBeDefined();
  });
});

const mountProgressBar = () => {
  const setLaunchSuccessFunction = jest.fn();
  const imageID = 'image-id';
  render(<FinishProgress imageID={imageID} setLaunchSuccess={setLaunchSuccessFunction} />);
};