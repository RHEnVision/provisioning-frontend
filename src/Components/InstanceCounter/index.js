import React from 'react';
import { Slider } from '@patternfly/react-core';
import { useGlobalState } from '../Common/GlobalState';
const MAX_INSTANCES = 45;
const MIN_INSTANCES = 1;

const InstanceCounter = () => {
  const [globalState, setGlobalState] = useGlobalState();
  const onChange = (value, inputValue, setLocalInputValue) => {
    let newValue;
    if (inputValue === undefined) {
      newValue = Number(value);
    } else {
      if (inputValue > MAX_INSTANCES) {
        newValue = MAX_INSTANCES;
        setLocalInputValue(MAX_INSTANCES);
      } else if (inputValue < MIN_INSTANCES) {
        newValue = MIN_INSTANCES;
        setLocalInputValue(MIN_INSTANCES);
      } else {
        newValue = Math.floor(inputValue);
      }
    }
    setGlobalState((prevState) => ({
      ...prevState,
      chosenNumOfInstances: newValue,
    }));
  };
  return (
    <Slider
      max={MAX_INSTANCES}
      min={MIN_INSTANCES}
      value={globalState.chosenNumOfInstances}
      isInputVisible
      inputValue={globalState.chosenNumOfInstances}
      hasTooltipOverThumb
      onChange={onChange}
    />
  );
};
export default InstanceCounter;
