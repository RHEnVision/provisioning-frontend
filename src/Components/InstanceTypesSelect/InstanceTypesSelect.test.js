import React from 'react';
import userEvent from '@testing-library/user-event';
import InstanceTypesSelect from '.';
import { instanceTypeList } from '../../mocks/fixtures/instanceTypes.fixtures';
import { render, screen } from '../../mocks/utils';

describe('InstanceTypesSelect', () => {
  test('populate instance types select', async () => {
    await mountSelectAndClick();
    const items = await screen.findAllByLabelText('Instance Type item');
    expect(items).toHaveLength(instanceTypeList.filter((type) => type.architecture === 'x86_64').length); // arm64 is filtered
  });

  describe('search', () => {
    test('filter items', async () => {
      const dropdown = await mountSelectAndClick();
      await userEvent.type(dropdown, 'm5');
      const items = await screen.findAllByLabelText('Instance Type item');
      expect(items).toHaveLength(1);
    });
    test('handles weird input', async () => {
      const dropdown = await mountSelectAndClick();
      await userEvent.type(dropdown, '```');
      const items = await screen.queryAllByLabelText('Instance Type item');
      expect(items).toHaveLength(0);
    });
    test('filter with a substring', async () => {
      const dropdown = await mountSelectAndClick();
      await userEvent.type(dropdown, 'micro');
      const items = await screen.findAllByLabelText('Instance Type item');
      expect(items).toHaveLength(1);
    });
  });
});

const mountSelectAndClick = async () => {
  render(<InstanceTypesSelect architecture="x86_64" setValidation={jest.fn()} />);
  const selectDropdown = await screen.findByPlaceholderText('Select instance type');
  await userEvent.click(selectDropdown);
  return selectDropdown;
};
