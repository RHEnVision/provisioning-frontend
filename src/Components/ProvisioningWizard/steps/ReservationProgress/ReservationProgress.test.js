import React from 'react';
import ReservationProgress from '.';
import { server } from '../../../../mocks/server';
import { http, HttpResponse, delay } from 'msw';
import userEvent from '@testing-library/user-event';
import { provisioningUrl } from '../../../../API/helpers';
import {
  AWSReservation,
  getAzureReservation,
  errorReservation,
  polledReservation,
  successfulReservation,
  successfulAzureReservation,
  successfulGCPReservation,
  GCPReservation,
} from '../../../../mocks/fixtures/reservation.fixtures';
import { render, screen, getByRole } from '../../../../mocks/utils';
import * as constants from './constants';

describe('Reservation polling', () => {
  afterEach(() => {
    jest.resetModules();
  });
  test('progress fails during polling', async () => {
    mountProgressBar();

    server.use(
      http.get(provisioningUrl(`reservations/:id`), () => {
        return HttpResponse.json(errorReservation);
      })
    );
    const transferKeyErrorStep = await screen.findByRole('button', { name: constants.AWS_STEPS[1].name });
    await userEvent.click(transferKeyErrorStep);
    await screen.findByText(errorReservation.error);
  });

  describe('progress success flow', () => {
    test('basics works', async () => {
      mountProgressBar();

      const createReservationStep = await screen.findByLabelText(`${constants.AWS_STEPS[0].name}`, { exact: false });
      expect(createReservationStep).toHaveClass('pf-m-info');

      // polling #1
      server.use(
        http.get(provisioningUrl(`reservations/:id`), () => {
          return HttpResponse.json(polledReservation);
        })
      );
      const transferKeyStep = await screen.findByLabelText(`${constants.AWS_STEPS[1].name} success`, { exact: false });
      expect(transferKeyStep).toHaveClass('pf-m-success');

      // polling #2 - reservation launched successfully
      server.use(
        http.get(provisioningUrl(`reservations/:id`), () => {
          return HttpResponse.json(successfulReservation);
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

    test('Azure instance table', async () => {
      mountProgressBar('azure', 'eastus');

      server.use(
        http.get(provisioningUrl(`reservations/:id`), () => {
          return HttpResponse.json(successfulAzureReservation);
        })
      );
      const successText = await screen.findByText('System(s) launched successfully');
      expect(successText).toBeDefined();

      // show table
      const instancesIDs = await screen.findAllByLabelText('instance id');
      const sshCommands = await screen.findAllByLabelText('ssh command');
      expect(instancesIDs).toHaveLength(getAzureReservation.instances.length);

      const instanceLink1 = getByRole(instancesIDs[0], 'link');

      expect(instanceLink1).toHaveTextContent('redhat-vm-321');
      expect(instanceLink1).toHaveAttribute(
        'href',
        `https://portal.azure.com/#@rhdevcloudops.onmicrosoft.com/resource${getAzureReservation.instances[0].instance_id}/overview`
      );
      expect(getByRole(sshCommands[0], 'textbox')).toHaveValue(`ssh azureuser@${getAzureReservation.instances[0].detail.public_ipv4}`);
      expect(instancesIDs[1]).toHaveTextContent('redhat-vm-322');
      expect(getByRole(sshCommands[1], 'textbox')).toHaveValue(`ssh azureuser@${getAzureReservation.instances[1].detail.public_ipv4}`);
    });
  });

  test('GCP instance table', async () => {
    mountProgressBar('gcp', 'us-central1-a');

    server.use(
      http.get(provisioningUrl(`reservations/:id`), () => {
        return HttpResponse.json(successfulGCPReservation);
      })
    );
    const successText = await screen.findByText('System(s) launched successfully');
    expect(successText).toBeDefined();

    // show table
    const instancesIDs = await screen.findAllByLabelText('instance id');
    const sshCommands = await screen.findAllByLabelText('ssh command');
    expect(instancesIDs).toHaveLength(GCPReservation.instances.length);

    const instanceLink1 = getByRole(instancesIDs[0], 'link');

    expect(instanceLink1).toHaveTextContent('3003942005876582747');
    expect(instanceLink1).toHaveAttribute(
      'href',
      `https://console.cloud.google.com/compute/instancesDetail/zones/us-central1-a/instances/3003942005876582747`
    );
    expect(getByRole(sshCommands[0], 'textbox')).toHaveValue(`ssh gcp-user@${GCPReservation.instances[0].detail.public_ipv4}`);
    expect(instancesIDs[1]).toHaveTextContent('3003942005876582748');
    expect(getByRole(sshCommands[1], 'textbox')).toHaveValue(`ssh gcp-user@${GCPReservation.instances[1].detail.public_ipv4}`);
  });

  test('progress timed out', async () => {
    const TIMEOUT_ERROR_MSG =
      'The launch progress is slower than expected, but we are still on it. It is safe to close this window and check your Amazon cloud console later';
    // eslint-disable-next-line
    constants.POLLING_BACKOFF_INTERVAL = [1];
    mountProgressBar();

    server.use(
      http.get(provisioningUrl(`reservations/:id`), async () => {
        await delay(10);
        return HttpResponse.json(polledReservation);
      })
    );
    const stepWithTimeoutWarning = await screen.findByRole('button', { name: constants.AWS_STEPS[2].name });
    await userEvent.click(stepWithTimeoutWarning);
    await screen.findByText(TIMEOUT_ERROR_MSG);
  });
});

const mountProgressBar = (provider = 'aws', region = 'us-east-1') => {
  const setLaunchSuccessFunction = jest.fn();
  const imageID = 'image-id';
  render(<ReservationProgress imageID={imageID} setLaunchSuccess={setLaunchSuccessFunction} />, {
    provider,
    contextValues: { chosenRegion: region },
  });
};
