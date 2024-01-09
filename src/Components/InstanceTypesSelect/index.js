import PropTypes from 'prop-types';
import React from 'react';
import { Spinner, TextInput, HelperText, HelperTextItem } from '@patternfly/react-core';
import { Select, SelectOption } from '@patternfly/react-core/deprecated';
import { useQuery } from '@tanstack/react-query';
import { fetchInstanceTypesList } from '../../API';
import { useWizardContext } from '../Common/WizardContext';
import { evaluateQuery } from '../../Utils/querySearch';
import _throttle from 'lodash/throttle';

const OPTIONS_PER_SCREEN = 3;
const sanitizeSearchValue = (str) => str.replace(/\\+$/, '');

/**
 * Transforms the input architecture to a more general one following the same
 * pattern matching that the one found in the backend.
 */
const mapArchitectures = (arch) => {
  switch (arch) {
    case 'x86_64_mac':
      return 'apple-x86_64';
    case 'arm64_mac':
      return 'apple-arm64';
    case 'i386':
      return 'i386';
    case 'x86-64':
    case 'x86_64':
    case 'x64':
      return 'x86_64';
    case 'aarch64':
    case 'arm64':
    case 'Arm64':
    case 'arm':
      return 'arm64';
  }
  return undefined;
};

const InstanceTypesSelect = ({ setValidation, architecture }) => {
  const [{ chosenInstanceType, chosenRegion, chosenSource, provider }, setWizardContext] = useWizardContext();
  const [isOpen, setIsOpen] = React.useState(false);
  const [numOptions, setNumOptions] = React.useState(OPTIONS_PER_SCREEN);
  const [filteredTypes, setFilteredTypes] = React.useState(null);
  const [isTypeSupported, setTypeSupported] = React.useState(true);
  const [searchValue, setSearchValue] = React.useState();

  const {
    isInitialLoading: isLoading,
    error,
    data: instanceTypes,
  } = useQuery(['instanceTypes', chosenRegion], () => fetchInstanceTypesList(chosenRegion, provider), {
    staleTime: 5 * (60 * 1000), // data is considered fresh for 5 minutes (same as cacheTime)
    // The backend is mapping the architectures to reduce their diversity to a
    // more limited set of options. To make sure to match with the user's
    // desired architecture apply the same transformation in the filter.
    select: (types) => types.filter((type) => type.architecture === mapArchitectures(architecture)),
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
        <HelperText>
          <HelperTextItem variant="error">There are problems fetching instance types. Please try again later.</HelperTextItem>
        </HelperText>
      </>
    );
  }
  if (isLoading) {
    return <Spinner size="sm" aria-label="loading instance type select" />;
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
        onToggle={(_event, isOpen) => onToggle(isOpen)}
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
      <HelperText>
        {!isTypeSupported && (
          <HelperTextItem variant="warning">The selected specification does not meet minimum requirements for this image</HelperTextItem>
        )}
      </HelperText>
    </>
  );
};

InstanceTypesSelect.propTypes = {
  setValidation: PropTypes.func.isRequired,
  architecture: PropTypes.string.isRequired,
};

export default InstanceTypesSelect;
