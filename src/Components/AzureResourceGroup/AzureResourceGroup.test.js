import React from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen } from '../../mocks/utils';
import { provisioningUrl } from '../../API/helpers';
import { azureSourceUploadInfo } from '../../mocks/fixtures/sources.fixtures';
import AzureResourceGroup from '.';

describe('AzureResourceGroup', () => {
  test('populate resource group select', async () => {
    await mountSelectAndOpen();
    const items = await screen.findAllByLabelText(/^Resource group/);
    expect(items).toHaveLength(azureSourceUploadInfo.azure.resource_groups.length);
  });

  test('handles error', async () => {
    const { server, rest } = window.msw;

    server.use(
      rest.get(provisioningUrl('sources/:sourceID/upload_info'), (req, res, ctx) => {
        return res(ctx.status(500), ctx.json({ msg: 'AWS API error: unable to get AWS upload info' }));
      })
    );

    render(<AzureResourceGroup />, {
      contextValues: { chosenSource: '66' },
    });

    expect(await screen.findByText('Can not fetch resource groups')).toBeInTheDocument();
  });
});

const mountSelectAndOpen = async () => {
  render(<AzureResourceGroup />, {
    contextValues: { chosenSource: '66' },
  });
  const selectDropdown = await screen.findByLabelText('Select resource group');
  await userEvent.click(selectDropdown);
  return selectDropdown;
};
