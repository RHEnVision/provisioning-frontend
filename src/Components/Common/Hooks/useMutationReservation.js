import React from 'react';
import { useMutation } from 'react-query';
import { createAWSReservation } from '../../../API';
import { AWS_PROVIDER } from '../../ProvisioningWizard/steps/ReservationProgress/constants';

const useReservationMutation = (provider, onSuccessCallback) => {
  const reservationFnByProvider = () => {
    switch (provider) {
      case AWS_PROVIDER:
        return AWSReservation;
      default:
        AWSReservation;
    }
  };
  const [chosenReservationFn, setReservationFn] = React.useState();
  const { mutate: AWSReservation, error: reservationError } = useMutation(createAWSReservation, {
    onSuccess: (res) => {
      onSuccessCallback(res);
    },
  });

  React.useEffect(() => {
    setReservationFn(reservationFnByProvider);
  }, [provider]);

  return [chosenReservationFn, reservationError];
};

export default useReservationMutation;
