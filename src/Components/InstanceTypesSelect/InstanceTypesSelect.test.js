import React from 'react';
import userEvent from '@testing-library/user-event';
import InstanceTypesSelect from '.';
import { awsInstanceTypeList, azureInstanceTypeList } from '../../mocks/fixtures/instanceTypes.fixtures';
import { render, screen } from '../../mocks/utils';

describe('InstanceTypesSelect', () => {
  test('populate AWS instance types select', async () => {
    await mountSelectAndClick();
    const items = await screen.findAllByLabelText(/^Instance Type/);
    expect(items).toHaveLength(awsInstanceTypeList.data.filter((type) => type.architecture === 'x86_64').length); // arm64 is filtered
  });

  test('populate Azure instance types select', async () => {
    await mountSelectAndClick('azure');
    const items = await screen.findAllByLabelText(/^Instance Type/);
    expect(items).toHaveLength(azureInstanceTypeList.data.filter((type) => type.architecture === 'x86_64').length); // arm64 is filtered
  });

  describe('search', () => {
    test('filter items', async () => {
      const dropdown = await mountSelectAndClick();
      await userEvent.type(dropdown, 'm5');
      const items = await screen.findAllByLabelText(/^Instance Type/);
      expect(items).toHaveLength(1);
    });
    test('handles weird input', async () => {
      const dropdown = await mountSelectAndClick();
      await userEvent.type(dropdown, '```');
      const items = await screen.queryAllByLabelText(/^Instance Type/);
      expect(items).toHaveLength(0);
    });
    test('filter with a substring', async () => {
      const dropdown = await mountSelectAndClick();
      await userEvent.type(dropdown, 'micro');
      const items = await screen.findAllByLabelText(/^Instance Type/);
      expect(items).toHaveLength(1);
    });
    test('show warning alert for unsupported type', async () => {
      await mountSelectAndClick();
      const unsupportedInstance = await screen.findByText('t1.nano');
      await userEvent.click(unsupportedInstance);
      const selectWrapper = document.querySelector('[data-ouia-component-id=select_instance_type]');
      expect(selectWrapper).toHaveClass('pf-m-warning');
    });
    test('filter case insensitive', async () => {
      const dropdown = await mountSelectAndClick('azure');
      await userEvent.type(dropdown, 'a2_V2');
      const items = await screen.findAllByLabelText(/^Instance Type/);
      expect(items).toHaveLength(1);
    });
    test('filter with a query', async () => {
      const query = 'vcpus > 2 and cores > 2';
      const dropdown = await mountSelectAndClick();
      await userEvent.type(dropdown, query);
      const items = await screen.findAllByLabelText(/^Instance Type/);
      expect(items).toHaveLength(1);
    });
  });
});

const mountSelectAndClick = async (provider = 'aws') => {
  render(<InstanceTypesSelect architecture="x86_64" setValidation={jest.fn()} />, {
    provider,
    contextValues: { chosenSource: '1' },
  });
  const selectDropdown = await screen.findByPlaceholderText('Select instance type');
  await userEvent.click(selectDropdown);
  return selectDropdown;
};
