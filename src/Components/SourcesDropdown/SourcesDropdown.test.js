import React from 'react';
import SourcesDropdown from '.';
import { provisioningUrl } from '../../API/helpers';
import { sourcesList } from '../../mocks/fixtures/sources.fixtures';
import { render, fireEvent, screen } from '../../mocks/utils';

describe('DropdownSources', () => {
  test('populate sources dropdown', async () => {
    mountDropdownAndClick();
    const items = await screen.findAllByLabelText('Source item');
    expect(items).toHaveLength(sourcesList.length);
  });
  test('Loading state', async () => {
    const { server, rest } = window.msw;
    server.use(
      rest.get(provisioningUrl('sources'), (req, res, ctx) => {
        return res(ctx.delay(10000), ctx.status(200));
      })
    );
    mountDropdownAndClick();
    const spinner = await screen.findByLabelText('Loading sources list');
    expect(spinner).toBeDefined();
  });
});

const mountDropdownAndClick = () => {
  render(<SourcesDropdown />);
  fireEvent.click(screen.getByText(/Sources/));
};
