import React from 'react';
import userEvent from '@testing-library/user-event';
import InstanceTypesSelect from '.';
import { awsInstanceTypeList, AWSPopularType, AWSTypesWithPopularType, azureInstanceTypeList } from '../../mocks/fixtures/instanceTypes.fixtures';
import { render, screen } from '../../mocks/utils';
import initialWizardContext from '../Common/WizardContext/initialState';
import { provisioningUrl } from '../../API/helpers';

describe('InstanceTypesSelect', () => {
  // reset provider to default value - AWS
  afterEach(() => {
    initialWizardContext.provider = 'aws';
  });

  test('populate AWS instance types select', async () => {
    await mountSelectAndClick();
    const items = await screen.findAllByLabelText(/^Instance Type/);
    expect(items).toHaveLength(awsInstanceTypeList.filter((type) => type.architecture === 'x86_64').length); // arm64 is filtered
  });

  test('instances types with popular type', async () => {
    const { server, rest } = window.msw;

    server.use(
      rest.get(provisioningUrl('instance_types/aws'), (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(AWSTypesWithPopularType));
      })
    );
    await mountSelectAndClick();
    await screen.findByLabelText(`popular instance Type ${AWSPopularType.name}`);
  });

  test('populate Azure instance types select', async () => {
    initialWizardContext.provider = 'azure';
    await mountSelectAndClick();
    const items = await screen.findAllByLabelText(/^Instance Type/);
    expect(items).toHaveLength(azureInstanceTypeList.filter((type) => type.architecture === 'x86_64').length); // arm64 is filtered
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
      const alert = await screen.findByTestId('unsupported_type_alert');
      expect(alert).toBeDefined();
    });
  });
});

const mountSelectAndClick = async () => {
  render(<InstanceTypesSelect architecture="x86_64" setValidation={jest.fn()} />);
  const selectDropdown = await screen.findByPlaceholderText('Select instance type');
  await userEvent.click(selectDropdown);
  return selectDropdown;
};
