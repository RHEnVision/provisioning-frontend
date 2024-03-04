import React from 'react';
import userEvent from '@testing-library/user-event';
import InstanceTypesSelect from '.';
import { awsInstanceTypeList, azureInstanceTypeList } from '../../mocks/fixtures/instanceTypes.fixtures';
import { render, screen } from '../../mocks/utils';

describe('InstanceTypesSelect x86_64', () => {
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
    test('filter with a query greater than', async () => {
      const query = 'vcpus > 2 and cores > 2 and memory > 1024';
      const dropdown = await mountSelectAndClick();
      await userEvent.type(dropdown, query);
      const items = await screen.findAllByLabelText(/^Instance Type/);
      expect(items).toHaveLength(1);
    });
    test('filter with a query less than', async () => {
      const query = 'vcpus < 2 and cores < 2 and memory < 1024';
      const dropdown = await mountSelectAndClick();
      await userEvent.type(dropdown, query);
      const items = await screen.findAllByLabelText(/^Instance Type/);
      expect(items).toHaveLength(1);
    });
    test('filter with a query combination', async () => {
      const query = 'vcpus < 3 and cores > 1 and memory = 1024';
      const dropdown = await mountSelectAndClick();
      await userEvent.type(dropdown, query);
      const input = await screen.findByLabelText('Selected instance type');
      expect(input).toBeInTheDocument();
    });
    test('filter with a query equal', async () => {
      const query = 'vcpus = 2 and cores = 2 and memory = 1024';
      const dropdown = await mountSelectAndClick();
      await userEvent.type(dropdown, query);
      const inputs = await screen.findAllByLabelText('Selected instance type');
      expect(inputs.length).toBe(1);
      expect(inputs[0]).toBeInTheDocument();
    });
  });
});

describe('test architecture mapping for instance selection', () => {
  const X86_64 = 'x86_64';
  const ARM64 = 'arm64';
  const allX86s = ['x86-64', 'x86_64', 'x64'];
  allX86s.forEach((x86) => {
    test(x86, async () => {
      await mountSelectAndClick('aws', x86);
      const items = await screen.findAllByLabelText(/^Instance Type/);
      expect(items).toHaveLength(awsInstanceTypeList.data.filter((type) => type.architecture === X86_64).length);
    });
  });
  const allArch = ['aarch64', 'arm64', 'Arm64', 'arm'];
  allArch.forEach((arm) => {
    test(arm, async () => {
      await mountSelectAndClick('aws', arm);
      const items = await screen.findAllByLabelText(/^Instance Type/);
      expect(items).toHaveLength(awsInstanceTypeList.data.filter((type) => type.architecture === ARM64).length);
    });
  });
});

const mountSelectAndClick = async (provider = 'aws', architecture = 'x86_64') => {
  render(<InstanceTypesSelect architecture={architecture} setValidation={jest.fn()} />, {
    provider,
    contextValues: { chosenSource: '1' },
  });
  const selectDropdown = await screen.findByPlaceholderText('Select instance type');
  await userEvent.click(selectDropdown);
  return selectDropdown;
};
