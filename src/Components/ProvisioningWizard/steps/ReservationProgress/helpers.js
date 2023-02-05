import { AWS_PROVIDER, AWS_STEPS } from './constants';

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
    default:
      undefined;
  }
};
