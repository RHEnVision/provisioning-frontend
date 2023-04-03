import React from 'react';
import TemplateSelect from '.';
import userEvent from '@testing-library/user-event';
import { render, screen } from '../../mocks/utils';
import { templates } from '../../mocks/fixtures/templates.fixtures';

describe('TemplateSelect', () => {
  test('get all templates options', async () => {
    render(<TemplateSelect />);
    const selectDropdown = await screen.findByLabelText('Select templates');
    await userEvent.click(selectDropdown);

    const items = await screen.findAllByLabelText('template option');
    expect(items).toHaveLength(templates.length);
  });
});
