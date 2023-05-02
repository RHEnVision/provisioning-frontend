import React from 'react';
import { NumberInput } from '@patternfly/react-core';
import { useWizardContext } from '../Common/WizardContext';
import { useQuery } from 'react-query';
import { MAX_INSTANCES, MIN_INSTANCES, MAX_VCPU } from './constants';
import { Alert } from '@patternfly/react-core';
import { fetchInstanceTypesList } from '../../API';

const InstanceCounter = () => {
  const [{ chosenInstanceType, chosenNumOfInstances, chosenRegion, chosenSource, provider }, setWizardContext] = useWizardContext();
  const { data: instanceTypes } = useQuery(['instanceTypes', chosenRegion], () => fetchInstanceTypesList(chosenRegion, provider), {
    enabled: !!chosenRegion && !!chosenSource && !!chosenInstanceType,
  });
  const VCPUAmount = instanceTypes?.find((instanceType) => instanceType.name === chosenInstanceType)?.vcpus;

  const onMinus = () => {
    const newValue = chosenNumOfInstances - 1;
    setWizardContext((prevState) => ({
      ...prevState,
      chosenNumOfInstances: newValue,
    }));
  };

  const onChange = (event) => {
    let input = Math.floor(Number(event.target.value));
    if (input > MAX_INSTANCES) {
      input = MAX_INSTANCES;
    }
    if (input < MIN_INSTANCES) {
      input = MIN_INSTANCES;
    }
    setWizardContext((prevState) => ({
      ...prevState,
      chosenNumOfInstances: input,
    }));
  };

  const onPlus = () => {
    const newValue = chosenNumOfInstances + 1;
    setWizardContext((prevState) => ({
      ...prevState,
      chosenNumOfInstances: newValue,
    }));
  };

  return (
    <>
      {VCPUAmount * chosenNumOfInstances > MAX_VCPU && (
        <Alert
          data-testid="vcpu_limit_exceeded_alert"
          ouiaId="vcpu_limit_exceeded_not_supported_alert"
          variant="warning"
          isInline
          title="Warning: Launching many vCPUs which might exceed service quota limit."
        />
      )}
      <NumberInput
        max={MAX_INSTANCES}
        min={MIN_INSTANCES}
        value={chosenNumOfInstances}
        onMinus={onMinus}
        onChange={onChange}
        onPlus={onPlus}
        inputName="instances"
        inputAriaLabel="number of instances"
        minusBtnAriaLabel="instances-minus"
        plusBtnAriaLabel="instances-plus"
      />
    </>
  );
};

export default InstanceCounter;
