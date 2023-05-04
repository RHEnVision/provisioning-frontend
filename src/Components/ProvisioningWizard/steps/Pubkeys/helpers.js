import { AZURE_PROVIDER } from '../../../../constants';

export const UNSUPPORTED_KEYS = { [AZURE_PROVIDER]: ['ssh-ed25519'] };

export const isNotSupportKeyFormat = (provider, key) => {
  return UNSUPPORTED_KEYS[provider]?.includes(key);
};
