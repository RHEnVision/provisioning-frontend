import React from 'react';
import { Button, Bullseye, Stack, StackItem } from '@patternfly/react-core';
import { ExternalLinkAltIcon } from '@patternfly/react-icons';

import { AWS_PROVIDER, AZURE_PROVIDER } from '../../../../constants';
import RegionsSelect from '../../../RegionsSelect';
import { imageProps } from '../../helpers.js';

const DirectProviderLink = ({ image }) => {
  // TODO gcp
  const uploadStatus = image.uploadStatus || { options: {} };
  const uploadOptions = image.uploadOptions || {};
  const [currentImage, setImage] = React.useState({ imageID: image.id, ...uploadStatus.options });
  let url, text;

  switch (image.provider) {
    case AWS_PROVIDER:
      text = 'Launch with AWS console';
      url = 'https://console.aws.amazon.com/ec2/v2/home?region=' + currentImage.region + '#LaunchInstanceWizard:ami=' + currentImage.ami;
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

  // Currently only AWS, so the ami is hardcoded
  const onRegionChange = (image) => {
    console.log(image);
    setImage(image);
  };

  return (
    <Stack>
      <StackItem>
        <Button component="a" variant="link" icon={<ExternalLinkAltIcon />} iconPosition="right" target="_blank" href={url}>
          {text}
        </Button>
      </StackItem>
      {image.provider === AWS_PROVIDER && (
        <StackItem>
          <Bullseye>
            <RegionsSelect composeID={image.id} provider={image.provider} currentRegion={currentImage.region} onChange={onRegionChange} />
          </Bullseye>
        </StackItem>
      )}
    </Stack>
  );
};

DirectProviderLink.propTypes = {
  image: imageProps,
};

export default DirectProviderLink;
