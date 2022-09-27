import PropTypes from 'prop-types';
import React from 'react';
import {
  Alert,
  Select,
  FormSelect,
  FormSelectOption,
} from '@patternfly/react-core';
import { useQuery } from 'react-query';

import { SOURCES_QUERY_KEY } from '../../API/queryKeys';
import { fetchSourcesList } from '../../API';
import { useWizardContext } from '../Common/WizardContext';

const SourcesSelect = ({ setValidation }) => {
  const [wizardContext, setWizardContext] = useWizardContext();
  const { error, data: sources } = useQuery(
    SOURCES_QUERY_KEY,
    fetchSourcesList
  );

  const onChange = (value) => {
    value === '' ? setValidation('error') : setValidation('success');
    setWizardContext((prevState) => ({ ...prevState, chosenSource: value }));
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
    console.warn('Failed to fetch sources list');
    return (
      <>
        <Alert
          variant="warning"
          isInline
          title="There are problems fetching accounts"
        />
        <Select
          isDisabled
          placeholderText="No accounts found"
          aria-label="Select account"
        />
      </>
    );
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
      value={wizardContext.chosenSource}
      onChange={onChange}
      aria-label="Select account"
    >
      {selectItemsMapper()}
    </FormSelect>
  );
};

SourcesSelect.propTypes = {
  setValidation: PropTypes.func.isRequired,
};

export default SourcesSelect;
