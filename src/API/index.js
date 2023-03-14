import axios from 'axios';
import { AZURE_PROVIDER } from '../constants';
import { imageBuilderURL, provisioningUrl } from './helpers';

const typesUrlForProvider = (provider, region) => {
  switch (provider) {
    case AZURE_PROVIDER:
      return provisioningUrl(`instance_types/${provider}?region=${region}&zone=1`);
    default:
      return provisioningUrl(`instance_types/${provider}?region=${region}`);
  }
};

export const fetchSourcesList = async (provider) => {
  const { data } = await axios.get(provisioningUrl(`sources?provider=${provider}`));
  return data;
};

export const fetchPubkeysList = async () => {
  const { data } = await axios.get(provisioningUrl('pubkeys'));
  return data;
};

export const fetchInstanceTypesList = async (region, provider) => {
  const url = typesUrlForProvider(provider, region);
  const { data } = await axios.get(url);
  return data;
};

export const createReservation = (provider) => async (params) => {
  return axios.post(provisioningUrl(`reservations/${provider}`), params);
};

export const createNewPublicKey = async (params) => {
  return axios.post(provisioningUrl('pubkeys'), params);
};

export const fetchReservation = async (id) => {
  const { data } = await axios.get(provisioningUrl(`reservations/${id}`));
  return data;
};

export const fetchImageClones = async (composeID) => {
  const { data } = await axios.get(imageBuilderURL(`composes/${composeID}/clones`));
  return data;
};

export const fetchImageCloneStatus = async (cloneID) => {
  const { data } = await axios.get(imageBuilderURL(`clones/${cloneID}`));
  return data;
};

export const fetchReservationByProvider = async (reservationID, provider) => {
  const { data } = await axios.get(provisioningUrl(`reservations/${provider}/${reservationID}`));
  return data;
};
