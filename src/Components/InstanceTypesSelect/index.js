import PropTypes from 'prop-types';
import React from 'react';
import { Spinner, Select, SelectOption, TextInput } from '@patternfly/react-core';
import { useQuery } from 'react-query';
import { fetchInstanceTypesList } from '../../API';
import { useWizardContext } from '../Common/WizardContext';
import { evaluateQuery } from '../../Utils/querySearch';
import _throttle from 'lodash/throttle';

const OPTIONS_PER_SCREEN = 3;
const sanitizeSearchValue = (str) => str.replace(/\\+$/, '');

const InstanceTypesSelect = ({ setValidation, architecture }) => {
  const [{ chosenInstanceType, chosenRegion, chosenSource, provider }, setWizardContext] = useWizardContext();
  const [isOpen, setIsOpen] = React.useState(false);
  const [numOptions, setNumOptions] = React.useState(OPTIONS_PER_SCREEN);
  const [filteredTypes, setFilteredTypes] = React.useState(null);
  const [isTypeSupported, setTypeSupported] = React.useState(true);
  const [searchValue, setSearchValue] = React.useState();

  const {
    isLoading,
    error,
    data: instanceTypes,
  } = useQuery(['instanceTypes', chosenRegion], () => fetchInstanceTypesList(chosenRegion, provider), {
    staleTime: 5 * (60 * 1000), // data is considered fresh for 5 minutes (same as cacheTime)
    select: (types) => types.filter((type) => type.architecture === architecture),
    enabled: !!chosenRegion && !!chosenSource,
    onError: () => {
      setValidation('error');
    },
  });

  if (!chosenSource || chosenSource === '') {
    return (
      <>
        <TextInput
          ouiaId="instance_type_readonly"
          className="pf-c-form-control"
          readOnly
          type="text"
          value="Select account to load instances"
          id="input-readonly"
          aria-label="Select instance type - disabled"
        />
      </>
    );
  }

  const onSelect = (event, selection, isPlaceholder) => {
    if (isPlaceholder) {
      clearSelection();
    } else {
      const chosenInstanceType = instanceTypes.find((instanceType) => selection === instanceType.name);
      if (chosenInstanceType) {
        setTypeSupported(chosenInstanceType.supported);
        setWizardContext((prevState) => ({
          ...prevState,
          chosenInstanceType: selection,
        }));
        chosenInstanceType.supported ? setValidation('success') : setValidation('warning');
      } else {
        setSearchValue(selection);
      }
      setIsOpen(false);
    }
  };

  const clearSelection = () => {
    setValidation('error');
    setTypeSupported(true);
    setWizardContext((prevState) => ({
      ...prevState,
      chosenInstanceType: null,
    }));
    setIsOpen(false);
  };

  const queryFilter = async (search) => {
    if (search.length > 0) {
      const { error: queryError, result } = await evaluateQuery(search, instanceTypes);
      if (queryError) {
        setFilteredTypes([]);
      } else if (Array.isArray(result)) {
        setFilteredTypes(result);
      } else if (result instanceof Object) {
        setFilteredTypes([result]);
      }
    }
  };

  const onTypeaheadInputChange = (inputValue) => {
    if (inputValue === '') {
      setFilteredTypes(null);
      return;
    }
    const search = sanitizeSearchValue(inputValue);
    setNumOptions(OPTIONS_PER_SCREEN);
    const throttledFilter = _throttle(queryFilter, 200);
    throttledFilter(search);
  };

  const selectItemsMapper = (types, limit) => {
    if (limit < types?.length) types = types.slice(0, limit);
    return types?.map((instanceType, index) => (
      <SelectOption
        aria-label={`Instance Type ${instanceType.name}`}
        key={index}
        description={`${instanceType.cores || 'only vCPU'} cores |
          ${instanceType.vcpus} vCPU |
          ${(parseFloat(instanceType.memory_mib) / 1024).toFixed(1)} GiB memory |
          ${instanceType.storage_gb > 0 ? instanceType.storage_gb + ' GB storage | ' : 'EBS only | '}
          ${instanceType.architecture}`}
        value={instanceType.name}
      />
    ));
  };

  const onToggle = (isOpen) => {
    setIsOpen(isOpen);
  };

  if (error) {
    return (
      <>
        <Select
          validated="error"
          ouiaId="instance_type_empty"
          isDisabled
          placeholderText="No instance types found"
          toggleAriaLabel="Select instance type"
        />
      </>
    );
  }
  if (isLoading) {
    return <Spinner isSVG size="sm" aria-label="loading instance type select" />;
  }

  const types = filteredTypes || instanceTypes;

  return (
    <>
      <Select
        ouiaId="select_instance_type"
        variant="typeahead"
        id="instance_type_select"
        validated={!isTypeSupported && 'warning'}
        typeAheadAriaLabel="Selected instance type"
        toggleAriaLabel="Select instance type"
        placeholderText="Select instance type"
        maxHeight="180px"
        isOpen={isOpen}
        selections={chosenInstanceType || searchValue}
        onToggle={onToggle}
        onSelect={onSelect}
        onFilter={() => {}}
        isInputValuePersisted
        onTypeaheadInputChanged={onTypeaheadInputChange}
        {...(numOptions < types?.length && {
          loadingVariant: {
            text: `View more (${types.length - numOptions})`,
            onClick: () => setNumOptions(numOptions + OPTIONS_PER_SCREEN),
          },
        })}
      >
        {selectItemsMapper(types, numOptions)}
      </Select>
    </>
  );
};

InstanceTypesSelect.propTypes = {
  setValidation: PropTypes.func.isRequired,
  architecture: PropTypes.string.isRequired,
};

export default InstanceTypesSelect;
