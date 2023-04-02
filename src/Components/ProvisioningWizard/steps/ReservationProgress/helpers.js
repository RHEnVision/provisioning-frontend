import { AWS_PROVIDER, AZURE_PROVIDER, GCP_PROVIDER } from '../../../Common/constants';
import { AWS_STEPS, AZURE_STEPS, GCP_STEPS } from './constants';

export const mapCurrentVariant = (step, currentStep, currentError, currentWarning) => {
  if (step < currentStep) return 'success';
  if (step === currentStep && currentError) return 'danger';
  if (step === currentStep && currentWarning) return 'warning';
  if (step === currentStep) return 'info';
  if (step > currentStep) return 'pending';
};

export const stepsByProvider = (provider) => {
  switch (provider) {
    case AWS_PROVIDER:
      return AWS_STEPS;
    case AZURE_PROVIDER:
      return AZURE_STEPS;
    case GCP_PROVIDER:
      return GCP_STEPS;
    default:
      throw new Error(`Steps requested for unknown provider: ${provider}`);
  }
};

export const instanceType = (provider) => {
  switch (provider) {
    case AWS_PROVIDER:
      return 'instance_type';
    case AZURE_PROVIDER:
      return 'instance_size';
    case GCP_PROVIDER:
      return 'machine_type';
    default:
      return 'instance_type';
  }
};

export const region = (provider) => {
  switch (provider) {
    case AWS_PROVIDER:
      return 'region';
    case GCP_PROVIDER:
      return 'zone';
    default:
      return 'region';
  }
};
