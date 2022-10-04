import React from 'react';
import SourcesSelect from '.';
import { sourcesList } from '../../mocks/fixtures/sources.fixtures';
import { render, fireEvent, screen } from '../../mocks/utils';

describe('SourcesSelect', () => {
  test('preselects the chosen source', async () => {
    render(<SourcesSelect setValidation={jest.fn()} />);
    // wizard context mock is `{chosenSource: 1}`
    const selectDropdown = await screen.findByText('Source 1');
    fireEvent.click(selectDropdown);
    const items = await screen.findAllByLabelText('Source account');
    expect(items).toHaveLength(sourcesList.length);
  });
});
