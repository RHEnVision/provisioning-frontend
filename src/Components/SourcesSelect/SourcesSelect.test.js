import React from 'react';
import SourcesSelect from '.';
import userEvent from '@testing-library/user-event';
import { sourcesList } from '../../mocks/fixtures/sources.fixtures';
import { render, screen } from '../../mocks/utils';

describe('SourcesSelect', () => {
  test('preselects the chosen source', async () => {
    render(<SourcesSelect setValidation={jest.fn()} />);
    // wizard context mock is `{chosenSource: 1}`
    const selectDropdown = await screen.findByText('Source 1');
    await userEvent.click(selectDropdown);

    const items = await screen.findAllByLabelText('Source account');
    expect(items).toHaveLength(sourcesList.length);
  });
});
