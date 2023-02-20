import { AWS_PROVIDER, GCP_PROVIDER } from './constants';

export const defaultRegionByProvider = (provider) => {
  switch (provider) {
    case AWS_PROVIDER:
      return 'us-east-1';
    case GCP_PROVIDER:
      return 'us-central1-a';
    default:
      throw new Error(`Unrecognized provider was entered: ${provider}`);
  }
};

export const humanizeProvider = (provider) => {
  switch (provider) {
    case AWS_PROVIDER:
      return 'Amazon cloud';
    case GCP_PROVIDER:
      return 'Google cloud';
    default:
      return '';
  }
};
