import React from 'react';
import { NumberInput } from '@patternfly/react-core';
import { useWizardContext } from '../Common/WizardContext';
import { MAX_INSTANCES, MIN_INSTANCES } from './constants';

const InstanceCounter = () => {
  const [{ chosenNumOfInstances }, setWizardContext] = useWizardContext();

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
  );
};
export default InstanceCounter;
