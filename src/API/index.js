import axios from 'axios';
import { provisioningUrl } from './helpers';

export const fetchSourcesList = async () => {
  const { data } = await axios.get(provisioningUrl('sources'));
  return data;
};

export const fetchPubkeysList = async () => {
  const { data } = await axios.get(provisioningUrl('pubkeys'));
  return data;
};

export const fetchInstanceTypesList = async (sourceId, region) => {
  const { data } = await axios.get(
    provisioningUrl(`sources/${sourceId}/instance_types?region=${region}`)
  );
  return data;
};
