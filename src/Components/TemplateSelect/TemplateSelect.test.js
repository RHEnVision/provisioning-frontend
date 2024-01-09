import React from 'react';
import TemplateSelect from '.';
import { server } from '../../mocks/server';
import { http, HttpResponse } from 'msw';
import userEvent from '@testing-library/user-event';
import { render, screen } from '../../mocks/utils';
import { templates } from '../../mocks/fixtures/templates.fixtures';
import { provisioningUrl } from '../../API/helpers';

describe('TemplateSelect', () => {
  test('get all templates options', async () => {
    render(<TemplateSelect />, { provider: 'aws', contextValues: { chosenSource: '1' } });
    const selectDropdown = await screen.findByText('Select templates');
    await userEvent.click(selectDropdown);

    const items = await screen.findAllByLabelText('template option');
    expect(items).toHaveLength(templates.data.length);
  });
  test('clear chosen template', async () => {
    render(<TemplateSelect />, { provider: 'aws', contextValues: { chosenSource: '1' } });
    const selectDropdown = await screen.findByText('Select templates');
    await userEvent.click(selectDropdown);

    await userEvent.click(await screen.findByText(templates.data[0].name));
    await userEvent.click(await screen.findByLabelText('clear template selection'));
    const placeholder = await screen.findByText('Select templates');
    expect(placeholder).toBeInTheDocument();
  });

  test('when templates array is empty it should be disabled', async () => {
    const chosenSource = '1';
    server.use(
      http.get(provisioningUrl(`sources/${chosenSource}/launch_templates`), () => {
        return HttpResponse.json({ data: [] });
      })
    );
    render(<TemplateSelect />, { provider: 'aws', contextValues: { chosenSource: chosenSource } });
    const selectDropdown = await screen.findByText('No template found');
    await userEvent.click(selectDropdown);

    const placeholder = await screen.findByText('No template found');
    expect(placeholder).toBeInTheDocument();
  });
});
