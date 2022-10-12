import PropTypes from 'prop-types';
import React from 'react';
import { Alert, Spinner, Select, SelectOption } from '@patternfly/react-core';
import { useQuery } from 'react-query';
import { instanceTypesQueryKeys } from '../../API/queryKeys';
import { fetchInstanceTypesList } from '../../API';
import { useWizardContext } from '../Common/WizardContext';

const OPTIONS_PER_SCREEN = 5;

const InstanceTypesSelect = ({ setValidation }) => {
  const [wizardContext, setWizardContext] = useWizardContext();
  const [isOpen, setIsOpen] = React.useState(false);
  const [numOptions, setNumOptions] = React.useState(OPTIONS_PER_SCREEN);
  const [filteredTypes, setFilteredTypes] = React.useState(null);
  const [prevSearch, setPrevSearch] = React.useState('');
  const {
    isLoading,
    error,
    data: instanceTypes,
  } = useQuery(instanceTypesQueryKeys(wizardContext.chosenRegion), () =>
    fetchInstanceTypesList(wizardContext.chosenRegion)
  );

  if (!wizardContext.chosenSource || wizardContext.chosenSource === '') {
    return (
      <>
        <input
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
    if (prevSearch !== inputValue) {
      setNumOptions(OPTIONS_PER_SCREEN);
      setPrevSearch(inputValue);
      setFilteredTypes(
        instanceTypes.filter((i) => i.name.search(inputValue) === 0)
      );
    }
  };

  const selectItemsMapper = (types, limit) => {
    if (limit < types.length) types = types.slice(0, limit);
    return types.map((instanceType, index) => (
      <SelectOption
        aria-label={'Instance Type item'}
        key={index}
        description={`${instanceType.cores} cores |
          ${instanceType.vcpus} vCPU |
          ${(parseFloat(instanceType.memory_mib) / 1024).toFixed(
            1
          )} GiB memory |
          ${
            instanceType.storage_gb > 0
              ? instanceType.storage_gb + ' GB storage | '
              : 'EBS only | '
          }
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
        <Alert
          variant="warning"
          isInline
          title="There are problems fetching instance types"
        />
        <Select
          isDisabled
          placeholderText="No instance types found"
          aria-label="Select instance type"
        />
      </>
    );
  }
  if (isLoading) {
    return (
      <Spinner isSVG size="sm" aria-label="Contents of the small example" />
    );
  }

  const types = filteredTypes || instanceTypes;

  return (
    <Select
      variant="typeahead"
      aria-label="Select instance type"
      placeholderText="Select instance type"
      maxHeight="450px"
      isOpen={isOpen}
      selections={wizardContext.chosenInstanceType}
      onToggle={onToggle}
      onSelect={onSelect}
      onFilter={onFilter}
      {...(numOptions < types.length && {
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
};

export default InstanceTypesSelect;
