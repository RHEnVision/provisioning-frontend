import React from 'react';
import { SamplePage } from './SamplePage';
import userEvent from '@testing-library/user-event';
import { render, screen } from '../../mocks/utils';

describe('SamplePage', () => {
  test('wizard is open correctly', async () => {
    render(<SamplePage />);
    const image = await screen.findByLabelText('manual ami');
    await userEvent.type(image, 'ami-123456');
    await userEvent.click(screen.getByText('Open Wizard'));
    await screen.findByText('Account and customizations | Amazon');
  });
});
