import React from 'react';
import userEvent from '@testing-library/user-event';
import Pubkeys from '.';

import { render, screen, waitFor } from '../../../../mocks/utils';
import { provisioningUrl } from '../../../../API/helpers';
import PubkeySelect from './PubkeySelect';
import { pubkeysList } from '../../../../mocks/fixtures/pubkeys.fixtures';

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

    test('view more with click', async () => {
      const { server, rest } = window.msw;
      server.use(
        rest.get(provisioningUrl('pubkeys'), (req, res, ctx) => {
          return res(
            ctx.status(200),
            ctx.json({
              data: [{ id: 2, name: 'pk2' }],
              metadata: { total: 2 },
            })
          );
        })
      );

      render(<Pubkeys setStepValidated={jest.fn()} />);
      const existingRadio = screen.getByTestId('existing-pubkey-radio');
      expect(existingRadio).toBeChecked();
      const select = await screen.findByText('Select public key...');
      await userEvent.click(select);
      const items = screen.getAllByLabelText(/^Public key/);
      expect(items).toHaveLength(1);
      const viewMore1 = screen.getByText('View more (1)');
      expect(viewMore1).toBeInTheDocument();

      await userEvent.click(viewMore1);
      await waitFor(() => {
        const newItems = screen.getAllByLabelText(/^Public key/);
        expect(newItems).toHaveLength(2);
      });

      const viewMore = screen.queryByText(/View more /);
      expect(viewMore).toBeNull();
    });

    test('select is disabled when error', async () => {
      const { server, rest } = window.msw;
      server.use(
        rest.get(provisioningUrl('pubkeys'), (req, res, ctx) => {
          return res(
            ctx.status(500),
            ctx.json({
              msg: 'error',
              trace_id: 'trcid',
              error: 'stack trace',
            })
          );
        })
      );
      render(<Pubkeys setStepValidated={jest.fn()} />);
      await screen.findByText('No SSH key found');
      const existingRadio = await screen.findByTestId('existing-pubkey-radio');
      expect(existingRadio).toBeDisabled();
    });

    test('select is disabled when there are no keys', async () => {
      const { server, rest } = window.msw;
      server.use(
        rest.get(provisioningUrl('pubkeys'), (req, res, ctx) => {
          return res(ctx.status(200), ctx.json({ data: [] }));
        })
      );
      render(<Pubkeys setStepValidated={jest.fn()} />);
      await screen.findByText('No SSH key found');
      const existingRadio = await screen.findByTestId('existing-pubkey-radio');
      expect(existingRadio).toBeDisabled();
    });

    test('unsupported key format', async () => {
      render(<PubkeySelect setStepValidated={jest.fn()} />, { contextValues: { provider: 'azure' } });
      const select = await screen.findByText('Select public key...');
      await userEvent.click(select);
      await userEvent.click(screen.getByText(pubkeysList.data[0].name));
      expect(screen.getByText('Key format is not support', { exact: false })).toBeInTheDocument();
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
