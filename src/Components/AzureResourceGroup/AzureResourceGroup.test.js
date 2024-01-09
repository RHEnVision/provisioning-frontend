import React from 'react';
import { server } from '../../mocks/server';
import { http, HttpResponse } from 'msw';
import userEvent from '@testing-library/user-event';
import { render, screen } from '../../mocks/utils';
import { provisioningUrl } from '../../API/helpers';
import { azureSourceUploadInfo } from '../../mocks/fixtures/sources.fixtures';
import AzureResourceGroup from '.';

describe('AzureResourceGroup', () => {
  test('set the image resource group as placeholder to inform user', async () => {
    const rgSelect = await mountSelectAndOpen('Image RG');
    expect(rgSelect).toHaveAttribute('placeholder', 'Image RG (default - image resource group)');
  });

  test('populate resource group select', async () => {
    await mountSelectAndOpen();
    const items = await screen.findAllByLabelText(/^Resource group/);
    expect(items).toHaveLength(azureSourceUploadInfo.azure.resource_groups.length);
  });

  test('handles error', async () => {
    server.use(
      http.get(provisioningUrl('sources/:sourceID/upload_info'), () => {
        return new HttpResponse(null, { status: 500 });
      })
    );

    render(<AzureResourceGroup />, {
      contextValues: { chosenSource: '66' },
    });

    expect(await screen.findByText('Can not fetch resource groups')).toBeInTheDocument();
  });
});

const mountSelectAndOpen = async (imageResourceGroup = null) => {
  render(<AzureResourceGroup imageResourceGroup={imageResourceGroup} />, {
    contextValues: { chosenSource: '66' },
  });
  const selectDropdown = await screen.findByLabelText('Select resource group');
  await userEvent.click(selectDropdown);
  return selectDropdown;
};
