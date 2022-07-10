import React from 'react';
import { FormSelect, FormSelectOption } from '@patternfly/react-core';
import { useQuery } from 'react-query';

import { SOURCES_QUERY_KEY } from '../../API/queryKeys';
import { fetchSourcesList } from '../../API';
import { useGlobalState } from '../Common/GlobalState';

const SourcesSelect = () => {
  const [globalState, setGlobalState] = useGlobalState();
  const { error, data: sources } = useQuery(
    SOURCES_QUERY_KEY,
    fetchSourcesList
  );

  const onChange = (value) => {
    setGlobalState((prevState) => ({ ...prevState, chosenSource: value }));
  };

  const selectItemsMapper = () => {
    if (sources?.length > 0) {
      return placeholder.concat(
        sources.map(({ name, id }) => (
          <FormSelectOption
            aria-label="Source item"
            key={id}
            label={name}
            value={id}
          ></FormSelectOption>
        ))
      );
    }
    return placeholder;
  };

  if (error) {
    // TODO: error handling, notifications
    console.log('Failed to fetch sources list');
  }

  const placeholder = [
    <FormSelectOption
      aria-label="placeholder"
      label="Select account"
      key="placeholder"
      isPlaceholder
      value=""
    ></FormSelectOption>,
  ];

  return (
    <FormSelect
      value={globalState.chosenSource}
      onChange={onChange}
      aria-label="Select account"
    >
      {selectItemsMapper()}
    </FormSelect>
  );
};

export default SourcesSelect;
