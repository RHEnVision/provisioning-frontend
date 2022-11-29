import React from 'react';
import RegionSelect from '.';
import userEvent from '@testing-library/user-event';

import { clonedImages, parentImage } from '../../mocks/fixtures/image.fixtures';
import { render, screen } from '../../mocks/utils';
import { imageBuilderURL } from '../../API/helpers';

describe('RegionSelect', () => {
  test('populate image regions', async () => {
    const PARENT_IMAGE_COUNT = 1;
    await mountSelectAndClick();
    const items = await screen.findAllByLabelText('Region item');
    expect(items).toHaveLength(clonedImages.meta.count + PARENT_IMAGE_COUNT);
  });

  test('no clones images', async () => {
    const PARENT_IMAGE_COUNT = 1;
    const { server, rest } = window.msw;

    server.use(
      rest.get(imageBuilderURL(`composes/${parentImage.id}/clones`), (req, res, ctx) => {
        return res(ctx.status(200), ctx.json({ data: [] }));
      })
    );
    await mountSelectAndClick();
    const items = await screen.findAllByLabelText('Region item');
    expect(items).toHaveLength(PARENT_IMAGE_COUNT);
  });

  test('filter items', async () => {
    const searchedValue = 'eu';
    const dropdown = await mountSelectAndClick();
    await userEvent.type(dropdown, searchedValue);
    const items = await screen.findAllByLabelText('Region item');
    const expectedLength = clonedImages.data.filter((item) => item.request.region.includes(searchedValue)).length;
    expect(items).toHaveLength(expectedLength);
  });
});

const mountSelectAndClick = async () => {
  render(<RegionSelect composeID={parentImage.id} />);
  const selectDropdown = await screen.findByLabelText('Options menu');
  await userEvent.click(selectDropdown);
  return selectDropdown;
};
