import React from 'react';

import { render, screen } from '../../mocks/utils';
import { imageBuilderURL, provisioningUrl } from '../../API/helpers';

import ProvisioningWizard from '.';

import { awsImage } from '../../mocks/fixtures/image.fixtures';
import { awsSourceFailedUploadInfo, awsSourceUploadInfo } from '../../mocks/fixtures/sources.fixtures';

describe('ProvisioningWizard', () => {
  beforeEach(() => {
    const { server, rest } = window.msw;
    // no clones
    server.use(
      rest.get(imageBuilderURL(`composes/${awsImage.id}/clones`), (req, res, ctx) => {
        return res(ctx.status(200), ctx.json({ data: [], meta: { count: 0 } }));
      })
    );
  });

  describe('Available source validation', () => {
    test('handles unreachable - invalid - source gracefuly', async () => {
      const { server, rest } = window.msw;

      server.use(
        rest.get(provisioningUrl('sources/:sourceID/upload_info'), (req, res, ctx) => {
          const { sourceID } = req.params;
          if (sourceID === '1') {
            return res(ctx.status(200), ctx.json(awsSourceUploadInfo()));
          } else if (sourceID === '2') {
            return res(ctx.status(500), ctx.json(awsSourceFailedUploadInfo));
          }
        })
      );

      render(<ProvisioningWizard hasAccess image={{ ...awsImage, sourceIDs: ['1'] }} />);
      // wait for the sources to load
      await screen.findByText('Select account', undefined, { timeout: 10000 });

      const sourceDropdown = await screen.findByText('Source 1');
      expect(sourceDropdown).toBeInTheDocument();

      expect(await screen.queryByText(/Loading available Sources/i)).not.toBeInTheDocument();
    }, 30000);

    test('shows loading sources', () => {
      render(<ProvisioningWizard hasAccess image={awsImage} />);
      expect(screen.getByText(/Loading available Sources/i)).toBeInTheDocument();
    });

    test('shows empty state when no sources matching', async () => {
      // the image has no source info, thus no match
      render(<ProvisioningWizard hasAccess image={awsImage} />);
      const createBtn = await screen.findByText('Create Source');

      expect(createBtn).toBeInTheDocument();
    });

    test('shows no permissions modal', async () => {
      render(<ProvisioningWizard onClose={jest.fn} hasAccess={false} image={{ ...awsImage, sourceIDs: ['1'] }} />);
      const missingPermissionTitle = 'Access permissions needed';
      const modal = await screen.findByText(missingPermissionTitle);
      expect(modal).toBeInTheDocument();
    });
  });
});
