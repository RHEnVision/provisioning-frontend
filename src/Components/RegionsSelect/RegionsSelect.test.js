import React from 'react';
import RegionSelect from '.';
import userEvent from '@testing-library/user-event';
import { server } from '../../mocks/server';
import { http, HttpResponse } from 'msw';
import { clonedImages, failureCloneStatus, parentImage } from '../../mocks/fixtures/image.fixtures';
import { render, screen } from '../../mocks/utils';
import { imageBuilderURL } from '../../API/helpers';

describe('RegionSelect', () => {
  test('populate image regions', async () => {
    const PARENT_IMAGE_COUNT = 1;
    await mountSelectAndClick();
    const items = await screen.findAllByLabelText('Region item');
    expect(items).toHaveLength(clonedImages.meta.count + PARENT_IMAGE_COUNT);
  });

  test('filter out regions with unsuccessful cloned image', async () => {
    server.use(
      http.get(imageBuilderURL(`clones/${clonedImages.data[0].id}`), () => {
        return HttpResponse.json(failureCloneStatus);
      })
    );
    await mountSelectAndClick();
    await screen.findByText(clonedImages.data[1].request.region);
    const filteredRegion = screen.queryByText(clonedImages.data[0].request.region);
    expect(filteredRegion).not.toBeInTheDocument();
  });
});

const mountSelectAndClick = async () => {
  render(<RegionSelect provider="aws" onChange={jest.fn()} composeID={parentImage.id} />);
  const selectDropdown = await screen.findByLabelText('Options menu');
  await userEvent.click(selectDropdown);
  return selectDropdown;
};
