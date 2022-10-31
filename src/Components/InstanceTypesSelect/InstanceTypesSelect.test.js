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

  describe('search', () => {
    test('filter items', async () => {
      const dropdown = await mountSelectAndClick();
      fireEvent.change(dropdown, { target: { value: 'm5' } });
      const items = await screen.findAllByLabelText('Instance Type item');
      expect(items).toHaveLength(1);
    });
    test('handles weird input', async () => {
      const dropdown = await mountSelectAndClick();
      fireEvent.change(dropdown, { target: { value: '```' } });
      const items = await screen.queryAllByLabelText('Instance Type item');
      expect(items).toHaveLength(0);
    });
  });
});

const mountSelectAndClick = async () => {
  render(<InstanceTypesSelect setValidation={jest.fn()} />);
  const selectDropdown = await screen.findByPlaceholderText('Select instance type');
  fireEvent.click(selectDropdown);
  return selectDropdown;
};
