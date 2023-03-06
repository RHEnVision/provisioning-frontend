import React from 'react';
import ReservationProgress from '.';
import userEvent from '@testing-library/user-event';
import { provisioningUrl } from '../../../../API/helpers';
import { AWSReservation, errorReservation, polledReservation, successfulReservation } from '../../../../mocks/fixtures/reservation.fixtures';
import { render, screen } from '../../../../mocks/utils';
import * as constants from './constants';

describe('Reservation polling', () => {
  test('progress fails during polling', async () => {
    const { server, rest } = window.msw;
    mountProgressBar();

    server.use(
      rest.get(provisioningUrl(`reservations/:id`), (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(errorReservation));
      })
    );
    const transferKeyStep = await screen.findByLabelText(`${constants.AWS_STEPS[1].name} danger`, { exact: false });
    expect(transferKeyStep).toHaveClass('pf-m-danger');
    await userEvent.click(transferKeyStep);
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

    // polling #2
    server.use(
      rest.get(provisioningUrl(`reservations/:id`), (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(successfulReservation));
      })
    );
    const launchInstancesStep = await screen.findByLabelText(`${constants.AWS_STEPS[2].name} success`, { exact: false });
    expect(launchInstancesStep).toHaveClass('pf-m-success');

    // show table
    const instancesIDs = await screen.findAllByLabelText('instance id');
    const instancesDNSs = await screen.findAllByLabelText('instance dns');
    expect(instancesIDs).toHaveLength(AWSReservation.instances.length);
    expect(instancesDNSs).toHaveLength(AWSReservation.instances.length);

    // show reservation id
    clickOnShowMore();
    const launchIDContainer = await screen.findByLabelText('launch id');
    expect(launchIDContainer).toHaveTextContent(successfulReservation.id);
  });
});

const mountProgressBar = () => {
  const setLaunchSuccessFunction = jest.fn();
  const imageID = 'image-id';
  render(<ReservationProgress provider="aws" imageID={imageID} setLaunchSuccess={setLaunchSuccessFunction} />);
};

const clickOnShowMore = async () => {
  const expansionInfo = await screen.findByText('Show additional info');
  await userEvent.click(expansionInfo);
};
