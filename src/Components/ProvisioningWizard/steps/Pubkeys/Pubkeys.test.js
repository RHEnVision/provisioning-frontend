import React from 'react';
import userEvent from '@testing-library/user-event';
import Pubkeys from '.';

import { render, screen } from '../../../../mocks/utils';

describe('Pubkeys', () => {
  describe('with data', () => {
    test('existing keys open by default and select populated', async () => {
      render(<Pubkeys setStepValidated={jest.fn()} />);
      const existingRadio = screen.getByTestId('existing-pubkey-radio');
      expect(existingRadio).toBeChecked();
      const select = await screen.findByText('Select public key...');
      await userEvent.click(select);
      const items = screen.getAllByLabelText(/^Public key/);
      expect(items).toHaveLength(2);
    });

    test('validate selection and keep key selection', async () => {
      let currentlyValid = null;
      const validatedMock = jest.fn((v) => {
        currentlyValid = v;
      });
      render(<Pubkeys setStepValidated={validatedMock} />);
      const select = await screen.findByText('Select public key...');
      // mark step as invalid by default
      expect(currentlyValid).toEqual(false);

      await userEvent.click(select);
      await userEvent.click(screen.getByLabelText('Public key lzap-ed25519-2021'));
      // mark step as valid after selection
      expect(currentlyValid).toEqual(true);

      await userEvent.click(screen.getByTestId('upload-pubkey-radio'));
      await userEvent.click(screen.getByTestId('existing-pubkey-radio'));

      // step is valid after selection of uploding key and returning
      expect(screen.getByText('lzap-ed25519-2021'));
      expect(currentlyValid).toEqual(true);
    });
  });
});
