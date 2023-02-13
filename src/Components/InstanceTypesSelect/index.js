import PropTypes from 'prop-types';
import React from 'react';
import { Alert, Spinner, Select, SelectOption, TextInput } from '@patternfly/react-core';
import { useQuery } from 'react-query';
import { fetchInstanceTypesList } from '../../API';
import { useWizardContext } from '../Common/WizardContext';

const OPTIONS_PER_SCREEN = 5;
const sanitizeSearchValue = (str) => str.replace(/\\+$/, '');

const InstanceTypesSelect = ({ setValidation, architecture }) => {
  const [{ chosenInstanceType, chosenRegion, chosenSource, provider }, setWizardContext] = useWizardContext();
  const [isOpen, setIsOpen] = React.useState(false);
  const [numOptions, setNumOptions] = React.useState(OPTIONS_PER_SCREEN);
  const [filteredTypes, setFilteredTypes] = React.useState(null);
  const [prevSearch, setPrevSearch] = React.useState('');
  const {
    isLoading,
    error,
    data: instanceTypes,
  } = useQuery(['instanceTypes', chosenRegion], () => fetchInstanceTypesList(chosenRegion, provider), {
    select: (types) => types.filter((type) => type.architecture === architecture),
    enabled: !!chosenRegion && !!chosenSource,
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
          aria-label="Readonly input example"
        />
      </>
    );
  }

  const onSelect = (event, selection, isPlaceholder) => {
    if (isPlaceholder) {
      clearSelection();
    } else {
      setWizardContext((prevState) => ({
        ...prevState,
        chosenInstanceType: selection,
      }));
      setValidation('success');
      setIsOpen(false);
    }
  };

  const clearSelection = () => {
    setValidation('error');
    setWizardContext((prevState) => ({
      ...prevState,
      chosenInstanceType: null,
    }));
    setIsOpen(false);
  };

  const onFilter = (_e, inputValue) => {
    const search = sanitizeSearchValue(inputValue);
    if (prevSearch !== search) {
      setNumOptions(OPTIONS_PER_SCREEN);
      setPrevSearch(search);
      setFilteredTypes(instanceTypes.filter((i) => i.name.includes(search)));
    }
  };

  const selectItemsMapper = (types, limit) => {
    if (limit < types?.length) types = types.slice(0, limit);
    return types?.map((instanceType, index) => (
      <SelectOption
        aria-label={'Instance Type item'}
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
    console.warn('Failed to fetch instance types list');
    return (
      <>
        <Alert ouiaId="instance_type_alert" variant="warning" isInline title="There are problems fetching instance types" />
        <Select ouiaId="instance_type_empty" isDisabled placeholderText="No instance types found" aria-label="Select instance type" />
      </>
    );
  }
  if (isLoading) {
    return <Spinner isSVG size="sm" aria-label="Contents of the small example" />;
  }

  const types = filteredTypes || instanceTypes;

  return (
    <Select
      ouiaId="select_instance_type"
      variant="typeahead"
      aria-label="Select instance type"
      placeholderText="Select instance type"
      maxHeight="450px"
      isOpen={isOpen}
      selections={chosenInstanceType}
      onToggle={onToggle}
      onSelect={onSelect}
      onFilter={onFilter}
      {...(numOptions < types?.length && {
        loadingVariant: {
          text: `View more (${types.length - numOptions})`,
          onClick: () => setNumOptions(numOptions + OPTIONS_PER_SCREEN),
        },
      })}
    >
      {selectItemsMapper(types, numOptions)}
    </Select>
  );
};

InstanceTypesSelect.propTypes = {
  setValidation: PropTypes.func.isRequired,
  architecture: PropTypes.string.isRequired,
};

export default InstanceTypesSelect;
