import axios from 'axios';
import { provisioningUrl } from './helpers';

export const fetchSourcesList = async () => {
  const { data } = await axios.get(provisioningUrl('sources'));
  return data;
};

export const fetchInstanceTypesList = async (sourceId) => {
  const { data } = await axios.get(
    provisioningUrl(`instance_types/${sourceId}`)
  );
  return data;
};
