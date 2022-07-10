import React from 'react';
import { Spinner, FormSelect, FormSelectOption } from '@patternfly/react-core';
import { useQuery } from 'react-query';
import { instanceTypesQueryKeys } from '../../API/queryKeys';
import { fetchInstanceTypesList } from '../../API';
import { useGlobalState } from '../Common/GlobalState';

const InstanceTypesSelect = () => {
  const [globalState, setGlobalState] = useGlobalState();
  const {
    isLoading,
    error,
    data: instanceTypes,
  } = useQuery(
    instanceTypesQueryKeys(globalState.chosenSource),
    () => fetchInstanceTypesList(globalState.chosenSource),
    { enabled: !!globalState.chosenSource }
  );

  const onChange = (name) => {
    setGlobalState((prevState) => ({ ...prevState, chosenInstanceType: name }));
  };

  const selectItemsMapper = () => {
    if (instanceTypes?.length > 0) {
      return placeholder.concat(
        instanceTypes.map((instanceType) => (
          <FormSelectOption
            aria-label="Instance Type item"
            key={instanceType.id}
            label={instanceType.id}
            value={instanceType.id}
          />
        ))
      );
    } else {
      return placeholder;
    }
  };

  if (error) {
    // TODO: error handling, notifications
    console.log('Failed to fetch instance types list');
  }
  const placeholder = [
    <FormSelectOption
      aria-label="placeholder"
      label="Select instance type"
      key="placeholder"
      isPlaceholder
      value=""
    ></FormSelectOption>,
  ];
  if (isLoading) {
    return (
      <Spinner isSVG size="sm" aria-label="Contents of the small example" />
    );
  } else {
    return (
      <FormSelect
        onChange={onChange}
        aria-label="Select instance type"
        value={globalState.chosenInstanceType}
      >
        {selectItemsMapper()}
      </FormSelect>
    );
  }
};

export default InstanceTypesSelect;
