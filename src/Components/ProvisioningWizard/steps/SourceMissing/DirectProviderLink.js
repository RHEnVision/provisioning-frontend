import React from 'react';
import { Button } from '@patternfly/react-core';
import { ExternalLinkAltIcon } from '@patternfly/react-icons';

import { AWS_PROVIDER, AZURE_PROVIDER } from '../../../../constants';
import { imageProps } from '../../helpers.js';

const DirectProviderLink = ({ image }) => {
  // TODO
  const uploadStatus = image.uploadStatus || { options: {} };
  const uploadOptions = image.uploadOptions || {};
  let url, text;

  switch (image.provider) {
    case AWS_PROVIDER:
      text = 'Launch with AWS console';
      url =
        'https://console.aws.amazon.com/ec2/v2/home?region=' + uploadStatus.options.region + '#LaunchInstanceWizard:ami=' + uploadStatus.options.ami;
      break;
    case AZURE_PROVIDER:
      text = 'View uploaded image';
      url =
        'https://portal.azure.com/#@' +
        uploadOptions.tenant_id +
        '/resource/subscriptions/' +
        uploadOptions.subscription_id +
        '/resourceGroups/' +
        uploadOptions.resource_group +
        '/providers/Microsoft.Compute/images/' +
        uploadStatus.options.image_name;
      break;
    default:
      throw new Error(`Steps requested for unknown provider: ${image.provider}`);
  }

  return (
    <Button component="a" variant="link" icon={<ExternalLinkAltIcon />} iconPosition="right" target="_blank" href={url}>
      {text}
    </Button>
  );
};

DirectProviderLink.propTypes = {
  image: imageProps,
};

export default DirectProviderLink;
