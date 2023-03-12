import React from 'react';
import SourcesSelect from '.';
import userEvent from '@testing-library/user-event';
import { sourcesList } from '../../mocks/fixtures/sources.fixtures';
import { render, screen } from '../../mocks/utils';

const mockContext = require('../Common/WizardContext/initialState');

describe('SourcesSelect', () => {
  test('preselect aws source', async () => {
    render(<SourcesSelect imageSourceID={1} setValidation={jest.fn()} />);
    // wizard context mock is `{chosenSource: 1}`
    const selectDropdown = await screen.findByText('Source 1');
    await userEvent.click(selectDropdown);
  });

  test('preselects the chosen source', async () => {
    jest.mock('../Common/WizardContext/initialState', () => ({
      __esModule: true,
      default: { ...mockContext, provider: 'gcp' },
    }));
    render(<SourcesSelect setValidation={jest.fn()} />);
    const selectDropdown = await screen.findByText('Source 1');
    await userEvent.click(selectDropdown);

    const items = await screen.findAllByLabelText('Source account');
    expect(items).toHaveLength(sourcesList.length);
  });
});
