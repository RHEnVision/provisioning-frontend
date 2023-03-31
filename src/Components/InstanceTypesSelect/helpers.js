import { AWS_PROVIDER, AZURE_PROVIDER, GCP_PROVIDER } from '../../constants';
import { POPULAR_TYPES_AWS, POPULAR_TYPES_AZURE, POPULAR_TYPES_GCP } from './constants';

export const popularTypesByProvider = (provider) => {
  switch (provider) {
    case AWS_PROVIDER:
      return POPULAR_TYPES_AWS;
    case GCP_PROVIDER:
      return POPULAR_TYPES_GCP;
    case AZURE_PROVIDER:
      return POPULAR_TYPES_AZURE;
  }
};
