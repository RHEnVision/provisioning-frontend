import PropTypes from 'prop-types';

import { AWS_PROVIDER, AZURE_PROVIDER, GCP_PROVIDER } from '../../constants';

export const imageProps = PropTypes.shape({
  name: PropTypes.string,
  id: PropTypes.string,
  provider: PropTypes.oneOf([AWS_PROVIDER, AZURE_PROVIDER, GCP_PROVIDER]),
  architecture: PropTypes.string,
  sourceIDs: PropTypes.arrayOf(PropTypes.string),
  accountIDs: PropTypes.arrayOf(PropTypes.string),
}).isRequired;

export const imageAzureResourceGroup = (image) => image.uploadOptions?.resource_group;
