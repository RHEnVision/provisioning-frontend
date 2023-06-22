import { AWS_PROVIDER, AZURE_PROVIDER, GCP_PROVIDER } from '../../constants';

export const SSHUsername = (provider) => {
  switch (provider) {
    case AWS_PROVIDER:
      return 'ec2-user';
    case AZURE_PROVIDER:
      return 'azureuser';
    case GCP_PROVIDER:
      return 'gcp-user';
    default:
      '';
  }
};
