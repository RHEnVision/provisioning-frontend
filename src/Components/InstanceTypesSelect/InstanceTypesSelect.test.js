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
  render(<InstanceTypesSelect setValidation={jest.fn()} />);
  const selectDropdown = await screen.findByPlaceholderText(
    'Select instance type'
  );
  fireEvent.click(selectDropdown);
};
