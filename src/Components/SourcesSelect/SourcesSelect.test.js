import React from 'react';
import SourcesSelect from '.';
import { sourcesList } from '../../mocks/fixtures/sources.fixtures';
import { render, fireEvent, screen } from '../../mocks/utils';

describe('SourcesSelect', () => {
  test('populate sources select', async () => {
    mountSelectAndClick();
    const items = await screen.findAllByLabelText('Source item');
    expect(items).toHaveLength(sourcesList.length);
  });
});

const mountSelectAndClick = () => {
  render(<SourcesSelect />);
  fireEvent.click(screen.getByText('Select account'));
};
