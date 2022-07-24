import React from 'react';
import InstanceTypesSelect from '.';
import { instanceTypeList } from '../../mocks/fixtures/instanceTypes.fixtures';
import { render, fireEvent, screen } from '../../mocks/utils';

describe('InstanceTypesSelect', () => {
  test('populate instance types select', async () => {
    await mountSelectAndClick();
    const items = await screen.findAllByLabelText('Instance Type item');
    expect(items).toHaveLength(instanceTypeList.length);
  });
});

const mountSelectAndClick = async () => {
  render(<InstanceTypesSelect />);
  const selectDropdown = await screen.findByText(/Select instance type/);
  fireEvent.click(selectDropdown);
};
