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

export const fetchInstanceTypesList = async (sourceId) => {
  const { data } = await axios.get(
    provisioningUrl(`sources/${sourceId}/instance_types`)
  );
  return data;
};

export const createAWSReservation = async (params) => {
  return axios.post(provisioningUrl('reservations/aws'), params);
};

export const createNewPublicKey = async (params) => {
  return axios.post(provisioningUrl('pubkeys'), params);
};

// TODO: filtering a specific reservation status in backend
export const fetchAWSReservation = async () => {
  const { data } = await axios.get(provisioningUrl('reservations'));
  return data;
};
