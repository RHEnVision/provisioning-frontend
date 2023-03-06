import { AWS_PROVIDER } from '../Common/constants';

export const SSHUsername = (provider) => {
  switch (provider) {
    case AWS_PROVIDER:
      return 'ec2-user';
    default:
      '';
  }
};
