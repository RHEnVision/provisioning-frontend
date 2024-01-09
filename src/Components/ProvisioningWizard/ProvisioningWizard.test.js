import React from 'react';
import { server } from '../../mocks/server';
import { http, HttpResponse } from 'msw';
import { render, screen } from '../../mocks/utils';
import { imageBuilderURL, provisioningUrl } from '../../API/helpers';

import ProvisioningWizard from '.';

import { awsImage } from '../../mocks/fixtures/image.fixtures';
import { awsSourceUploadInfo } from '../../mocks/fixtures/sources.fixtures';

describe('ProvisioningWizard', () => {
  beforeEach(() => {
    // no clones
    server.use(
      http.get(imageBuilderURL(`composes/${awsImage.id}/clones`), () => {
        return HttpResponse.json({ data: [], meta: { count: 0 } });
      })
    );
  });

  describe('Available source validation', () => {
    test('handles unreachable - invalid - source gracefuly', async () => {
      server.use(
        http.get(provisioningUrl('sources/:sourceID/upload_info'), ({ params }) => {
          const { sourceID } = params;
          if (sourceID === '1') {
            return HttpResponse.json(awsSourceUploadInfo());
          } else if (sourceID === '2') {
            return new HttpResponse(null, { status: 500 });
          }
        })
      );

      render(<ProvisioningWizard hasAccess image={{ ...awsImage, sourceIDs: ['1'] }} />);
      // wait for the sources to load
      const sourceDropdown = await screen.findByText('Source 1', undefined, { timeout: 40000 });
      expect(sourceDropdown).toBeInTheDocument();
    }, 40000);

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
