import React from 'react';
import FinishProgress from '.';
import userEvent from '@testing-library/user-event';
import { provisioningUrl } from '../../../../API/helpers';
import { createdAWSReservation, errorReservation, reservation } from '../../../../mocks/fixtures/reservation.fixtures';
import { render, screen } from '../../../../mocks/utils';
import * as constants from './constants';

describe('Reservation polling', () => {
  test('progress ends successfully', async () => {
    mountProgressBar();
    const progressCompleted = await screen.findByText(/Launch is completed/i);
    expect(progressCompleted).toBeDefined();
    const launchID = await screen.findByLabelText('launch id');
    expect(launchID).toHaveTextContent(createdAWSReservation.reservation_id);
  });

  test('show more expansion with reservation id', async () => {
    mountProgressBar();
    const launchID = await screen.findByLabelText('launch id');
    expect(launchID).toHaveTextContent(createdAWSReservation.reservation_id);
  });

  test('progress ends with a failure', async () => {
    const { server, rest } = window.msw;
    server.use(
      rest.get(provisioningUrl(`reservations/:id`), (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(errorReservation));
      })
    );
    mountProgressBar();
    clickOnShowMore();
    const errorMessage = await screen.findByLabelText('launch error');
    expect(errorMessage).toHaveTextContent(errorReservation.error);
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

const clickOnShowMore = async () => {
  const expansionInfo = await screen.findByText('Show more');
  await userEvent.click(expansionInfo);
};
