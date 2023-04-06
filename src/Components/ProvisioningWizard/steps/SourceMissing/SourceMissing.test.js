import React from 'react';

import SourceMissing from '.';

import { render, screen } from '../../../../mocks/utils';

describe('Source missing', () => {
  describe('Loading state', () => {
    test('shows loading state', () => {
      render(<SourceMissing isLoading image={{ provider: 'aws' }} />);
      expect(screen.getByText(/Loading available Sources/i)).toBeInTheDocument();
    });
  });

  describe('AWS', () => {
    const awsImage = {
      provider: 'aws',
      uploadStatus: {
        options: { region: 'us-east-1', ami: 'ami-123123' },
      },
    };

    test('has create source button', () => {
      render(<SourceMissing image={awsImage} />);

      const sourcesLink = screen.getByRole('link', { name: 'Create Source' });
      expect(sourcesLink).toHaveAttribute('href', '/settings/sources/new');
    });

    test('renders direct link', () => {
      render(<SourceMissing image={awsImage} />);

      const directLink = screen.getByRole('link', { name: 'Launch with AWS console' });
      expect(directLink).toHaveAttribute(
        'href',
        `https://console.aws.amazon.com/ec2/v2/home?region=${awsImage.uploadStatus.options.region}#LaunchInstanceWizard:ami=${awsImage.uploadStatus.options.ami}`
      );
    });
  });

  describe('Azure', () => {
    const azureImage = {
      provider: 'azure',
      uploadStatus: { options: { image_name: 'cool-image' } },
      uploadOptions: { tenant_id: '123', subscription_id: '321', resource_group: 'testGroup' },
    };

    test('has create source button', () => {
      render(<SourceMissing image={azureImage} />);

      const sourcesLink = screen.getByRole('link', { name: 'Create Source' });
      expect(sourcesLink).toHaveAttribute('href', '/settings/sources/new');
    });

    test('renders direct link', () => {
      render(<SourceMissing image={azureImage} />);

      const url =
        'https://portal.azure.com/#@' +
        azureImage.uploadOptions.tenant_id +
        '/resource/subscriptions/' +
        azureImage.uploadOptions.subscription_id +
        '/resourceGroups/' +
        azureImage.uploadOptions.resource_group +
        '/providers/Microsoft.Compute/images/' +
        azureImage.uploadStatus.options.image_name;

      const directLink = screen.getByRole('link', { name: 'View uploaded image' });
      expect(directLink).toHaveAttribute('href', url);
    });
  });
});
