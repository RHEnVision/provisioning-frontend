import React from 'react';

import SourceMissing from '.';

import { render, screen } from '../../../../mocks/utils';
import { awsImage, azureImage } from '../../../../mocks/fixtures/image.fixtures';

describe('Source missing', () => {
  describe('Loading state', () => {
    test('shows loading state', () => {
      render(<SourceMissing isLoading image={{ provider: 'aws' }} />);
      expect(screen.getByText(/Loading available Sources/i)).toBeInTheDocument();
    });
  });

  describe('AWS', () => {
    const image = {
      ...awsImage,
      uploadStatus: {
        options: { region: 'us-east-1', ami: 'ami-123123' },
      },
    };

    test('has create source button', () => {
      render(<SourceMissing image={image} />);

      const sourcesLink = screen.getByRole('link', { name: 'Create Source' });
      expect(sourcesLink).toHaveAttribute('href', '/settings/sources/new');
    });

    test('renders direct link', () => {
      render(<SourceMissing image={image} />);

      const directLink = screen.getByRole('link', { name: 'Launch with AWS console' });
      expect(directLink).toHaveAttribute(
        'href',
        `https://console.aws.amazon.com/ec2/v2/home?region=${image.uploadStatus.options.region}#LaunchInstanceWizard:ami=${image.uploadStatus.options.ami}`
      );
    });
  });

  describe('Azure', () => {
    const image = {
      ...azureImage,
      uploadStatus: { options: { image_name: 'cool-image' } },
      uploadOptions: { tenant_id: '123', subscription_id: '321', resource_group: 'testGroup' },
    };

    test('has create source button', () => {
      render(<SourceMissing image={image} />);

      const sourcesLink = screen.getByRole('link', { name: 'Create Source' });
      expect(sourcesLink).toHaveAttribute('href', '/settings/sources/new');
    });

    test('renders direct link', () => {
      render(<SourceMissing image={image} />);

      const url =
        'https://portal.azure.com/#@' +
        image.uploadOptions.tenant_id +
        '/resource/subscriptions/' +
        image.uploadOptions.subscription_id +
        '/resourceGroups/' +
        image.uploadOptions.resource_group +
        '/providers/Microsoft.Compute/images/' +
        image.uploadStatus.options.image_name;

      const directLink = screen.getByRole('link', { name: 'View uploaded image' });
      expect(directLink).toHaveAttribute('href', url);
    });
  });
});
