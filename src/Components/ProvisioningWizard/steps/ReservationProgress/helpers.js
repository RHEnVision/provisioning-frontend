import { AWS_PROVIDER, GCP_PROVIDER } from '../../../Common/constants';
import { AWS_STEPS, GCP_STEPS } from './constants';

export const mapCurrentVariant = (step, currentStep, currentError) => {
  if (step < currentStep) return 'success';
  if (step === currentStep && currentError) return 'danger';
  if (step === currentStep) return 'info';
  if (step > currentStep) return 'pending';
};

export const stepsByProvider = (provider) => {
  switch (provider) {
    case AWS_PROVIDER:
      return AWS_STEPS;
    case GCP_PROVIDER:
      return GCP_STEPS;
    default:
      undefined;
  }
};

export const instanceType = (provider) => {
  switch (provider) {
    case AWS_PROVIDER:
      return 'instance_type';
    case GCP_PROVIDER:
      return 'machine_type';
    default:
      'instance_type';
  }
};

export const region = (provider) => {
  switch (provider) {
    case AWS_PROVIDER:
      return 'region';
    case GCP_PROVIDER:
      return 'zone';
    default:
      'region';
  }
};
