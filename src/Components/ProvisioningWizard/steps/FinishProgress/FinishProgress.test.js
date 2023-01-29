import React from 'react';
import FinishProgress from '.';
import userEvent from '@testing-library/user-event';

import { provisioningUrl } from '../../../../API/helpers';
import { errorReservation, reservation } from '../../../../mocks/fixtures/reservation.fixtures';
import { render, screen } from '../../../../mocks/utils';
import * as constants from './constants';
import { AWSinstances } from '../../../../mocks/fixtures/instances.fixtures';

describe('FinishProgress', () => {
  test('progress ends successfully', async () => {
    mountProgressBar();
    const progressCompleted = await screen.findByText(/Launch is completed/i);
    expect(progressCompleted).toBeDefined();
  });

  test('show instances table', async () => {
    mountProgressBar();
    const showHostsBtn = await screen.findByText(/Show hosts/i);
    await userEvent.click(showHostsBtn);
    const hostID = await screen.findByText(AWSinstances[0].id);
    expect(hostID).toBeDefined();
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
