import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { NumberInput } from '@patternfly/react-core';
import { useWizardContext } from '../Common/WizardContext';
import { useQuery } from 'react-query';
import { MAX_INSTANCES, MIN_INSTANCES, MAX_VCPU } from './constants';
import { fetchInstanceTypesList } from '../../API';

const InstanceCounter = ({ setValidation }) => {
  const [{ chosenInstanceType, chosenNumOfInstances, chosenRegion, chosenSource, provider }, setWizardContext] = useWizardContext();
  const { data: instanceTypes } = useQuery(['instanceTypes', chosenRegion], () => fetchInstanceTypesList(chosenRegion, provider), {
    enabled: !!chosenRegion && !!chosenSource && !!chosenInstanceType,
  });
  const VCPUAmount = instanceTypes?.find((instanceType) => instanceType.name === chosenInstanceType)?.vcpus;

  useEffect(() => {
    setWarningValidation(chosenNumOfInstances);
  }, [chosenInstanceType]);

  const setWarningValidation = (newValue) => {
    if (VCPUAmount * newValue > MAX_VCPU) {
      setValidation('warning');
    } else {
      setValidation('success');
    }
  };

  const onMinus = () => {
    const newValue = chosenNumOfInstances - 1;
    setWarningValidation(newValue);
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
    setWarningValidation(input);
    setWizardContext((prevState) => ({
      ...prevState,
      chosenNumOfInstances: input,
    }));
  };

  const onPlus = () => {
    const newValue = chosenNumOfInstances + 1;
    setWarningValidation(newValue);
    setWizardContext((prevState) => ({
      ...prevState,
      chosenNumOfInstances: newValue,
    }));
  };

  const isWarning = VCPUAmount * chosenNumOfInstances > MAX_VCPU;

  return (
    <>
      <NumberInput
        max={MAX_INSTANCES}
        min={MIN_INSTANCES}
        value={chosenNumOfInstances}
        validated={isWarning && 'warning'}
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

InstanceCounter.propTypes = {
  setValidation: PropTypes.func.isRequired,
};

export default InstanceCounter;
