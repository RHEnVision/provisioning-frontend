import React from 'react';
import SourcesSelect from '.';
import userEvent from '@testing-library/user-event';
import { sourcesList } from '../../mocks/fixtures/sources.fixtures';
import { awsImage, gcpImage } from '../../mocks/fixtures/image.fixtures';
import { render, screen } from '../../mocks/utils';

describe('SourcesSelect', () => {
  test('no source preselected when multiple available', async () => {
    render(<SourcesSelect image={{ ...awsImage, sourceIDs: ['1', '2'] }} setValidation={jest.fn()} />);
    const selectDropdown = await screen.findByText('Select account');
    await userEvent.click(selectDropdown);

    const items = await screen.findAllByLabelText('Source account');
    expect(items).toHaveLength(sourcesList.length);
  });

  test('filters and preselect single available source', async () => {
    render(<SourcesSelect image={{ ...awsImage, sourceIDs: ['2'] }} setValidation={jest.fn()} />);
    const selectDropdown = await screen.findByText('Source 2');
    await userEvent.click(selectDropdown);

    const items = await screen.findAllByLabelText('Source account');
    expect(items).toHaveLength(1);
  });

  test('preselect aws source', async () => {
    render(<SourcesSelect image={{ ...awsImage, sourceIDs: ['1', '2'] }} setValidation={jest.fn()} />, { contextValues: { chosenSource: '1' } });
    const selectDropdown = await screen.findByText('Source 1');
    await userEvent.click(selectDropdown);

    const items = await screen.findAllByLabelText('Source account');
    expect(items).toHaveLength(sourcesList.length);
  });

  test('gcp source verifying email', async () => {
    render(<SourcesSelect image={{ ...gcpImage, accountIDs: ['serviceAccount:example@redhat.com'] }} setValidation={jest.fn()} />, {
      provider: 'gcp',
    });
    const selectDropdown = await screen.findByText('GCP Source 1');
    await userEvent.click(selectDropdown);

    const items = await screen.findAllByLabelText('Source account');
    expect(items).toHaveLength(1);
  });
});
