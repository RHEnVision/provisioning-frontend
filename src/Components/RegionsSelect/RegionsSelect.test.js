import React from 'react';
import RegionSelect from '.';
import userEvent from '@testing-library/user-event';

import { regionList } from '../../mocks/fixtures/ImageRegions.fixtures';
import { render, screen } from '../../mocks/utils';

describe('RegionSelect', () => {
  test('populate image regions', async () => {
    await mountSelectAndClick();
    const items = await screen.findAllByLabelText('Region item');
    expect(items).toHaveLength(regionList.meta.count);
  });

  test('filter items', async () => {
    const searchedValue = 'eu';
    const dropdown = await mountSelectAndClick();
    await userEvent.type(dropdown, searchedValue);
    const items = await screen.findAllByLabelText('Region item');
    const expectedLength = regionList.data.filter((item) => item.request.region.includes(searchedValue)).length;
    expect(items).toHaveLength(expectedLength);
  });
});

const mountSelectAndClick = async () => {
  render(<RegionSelect composeID={regionList.data[0].id} />);
  const selectDropdown = await screen.findByLabelText('Options menu');
  await userEvent.click(selectDropdown);
  return selectDropdown;
};
