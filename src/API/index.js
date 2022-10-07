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

export const fetchInstanceTypesList = async (region) => {
  const { data } = await axios.get(
    provisioningUrl(`instance_types/aws?region=${region}`)
  );
  return data;
};

export const createAWSReservation = async (params) => {
  return axios.post(provisioningUrl('reservations/aws'), params);
};

export const createNewPublicKey = async (params) => {
  return axios.post(provisioningUrl('pubkeys'), params);
};

export const fetchAWSReservation = async (id) => {
  const { data } = await axios.get(provisioningUrl(`reservations/${id}`));
  return data;
};
