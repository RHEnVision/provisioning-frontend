import React from 'react';
import ReservationProgress from '.';
import userEvent from '@testing-library/user-event';
import { provisioningUrl } from '../../../../API/helpers';
import { AWSReservation, errorReservation, polledReservation, successfulReservation } from '../../../../mocks/fixtures/reservation.fixtures';
import { render, screen } from '../../../../mocks/utils';
import * as constants from './constants';

describe('Reservation polling', () => {
  afterEach(() => {
    jest.resetModules();
  });
  test('progress fails during polling', async () => {
    const { server, rest } = window.msw;
    mountProgressBar();

    server.use(
      rest.get(provisioningUrl(`reservations/:id`), (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(errorReservation));
      })
    );
    const transferKeyErrorStep = await screen.findByRole('button', { name: constants.AWS_STEPS[1].name });
    await userEvent.click(transferKeyErrorStep);
    await screen.findByText(errorReservation.error);
  });

  test('progress success flow', async () => {
    const { server, rest } = window.msw;
    mountProgressBar();

    const createReservationStep = await screen.findByLabelText(`${constants.AWS_STEPS[0].name}`, { exact: false });
    expect(createReservationStep).toHaveClass('pf-m-success');

    // polling #1
    server.use(
      rest.get(provisioningUrl(`reservations/:id`), (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(polledReservation));
      })
    );
    const transferKeyStep = await screen.findByLabelText(`${constants.AWS_STEPS[1].name} success`, { exact: false });
    expect(transferKeyStep).toHaveClass('pf-m-success');

    // polling #2 - reservation launched successfully
    server.use(
      rest.get(provisioningUrl(`reservations/:id`), (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(successfulReservation));
      })
    );
    const successText = await screen.findByText('System(s) launched successfully');
    expect(successText).toBeDefined();

    // show table
    const instancesIDs = await screen.findAllByLabelText('instance id');
    const instancesDNSs = await screen.findAllByLabelText('instance dns');
    expect(instancesIDs).toHaveLength(AWSReservation.instances.length);
    expect(instancesDNSs).toHaveLength(AWSReservation.instances.length);

    // show reservation id
    const launchIDContainer = await screen.findByText(`launch ID: ${successfulReservation.id}`);
    expect(launchIDContainer).toBeDefined();
  });
  test('progress timed out', async () => {
    const TIMEOUT_ERROR_MSG = 'Session timed out, the reservation took too long to fulfill';
    // eslint-disable-next-line
    constants.POLLING_BACKOFF_INTERVAL = [1];
    const { server, rest } = window.msw;
    mountProgressBar();

    server.use(
      rest.get(provisioningUrl(`reservations/:id`), (req, res, ctx) => {
        return res(ctx.delay(10), ctx.json(polledReservation));
      })
    );
    const stepWithTimeoutError = await screen.findByRole('button', { name: constants.AWS_STEPS[2].name });
    await userEvent.click(stepWithTimeoutError);
    await screen.findByText(TIMEOUT_ERROR_MSG);
  });
});

const mountProgressBar = () => {
  const setLaunchSuccessFunction = jest.fn();
  const imageID = 'image-id';
  render(<ReservationProgress provider="aws" imageID={imageID} setLaunchSuccess={setLaunchSuccessFunction} />);
};
