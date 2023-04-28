import React from 'react';
import TemplateSelect from '.';
import userEvent from '@testing-library/user-event';
import { render, screen } from '../../mocks/utils';
import { templates } from '../../mocks/fixtures/templates.fixtures';

describe('TemplateSelect', () => {
  test('get all templates options', async () => {
    render(<TemplateSelect />, { provider: 'aws', contextValues: { chosenSource: '1' } });
    const selectDropdown = await screen.findByText('Select templates');
    await userEvent.click(selectDropdown);

    const items = await screen.findAllByLabelText('template option');
    expect(items).toHaveLength(templates.length);
  });
  test('clear chosen template', async () => {
    render(<TemplateSelect />, { provider: 'aws', contextValues: { chosenSource: '1' } });
    const selectDropdown = await screen.findByText('Select templates');
    await userEvent.click(selectDropdown);

    await userEvent.click(await screen.findByText(templates[0].name));
    await userEvent.click(await screen.findByLabelText('clear template selection'));
    const placeholder = await screen.findByText('Select templates');
    expect(placeholder).toBeInTheDocument();
  });
});
