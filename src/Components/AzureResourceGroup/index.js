import React from 'react';

import { Spinner, Select, SelectOption, TextInput } from '@patternfly/react-core';
import { useQuery } from '@tanstack/react-query';
import { AZURE_RG_KEY } from '../../API/queryKeys';
import { fetchResourceGroups } from '../../API';
import { useWizardContext } from '../Common/WizardContext';

const AzureResourceGroup = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [{ chosenSource, azureResourceGroup }, setWizardContext] = useWizardContext();
  const [selection, setSelection] = React.useState(azureResourceGroup);

  const {
    isInitialLoading: isLoading,
    error,
    data: resourceGroups,
  } = useQuery([AZURE_RG_KEY, chosenSource], () => fetchResourceGroups(chosenSource), {
    staleTime: 30 * 1000, // data is considered fresh for 30 seconds
    enabled: !!chosenSource,
  });

  if (!chosenSource || chosenSource === '') {
    return (
      <>
        <TextInput
          ouiaId="azure_resource_group_readonly"
          className="pf-c-form-control"
          readOnly
          type="text"
          value="Select account to load resource groups"
          aria-label="Select resource group - disabled"
        />
      </>
    );
  }

  if (isLoading) {
    return <Spinner isSVG size="sm" aria-label="loading resource groups" />;
  }

  if (error) {
    return (
      <>
        <Select
          validated="error"
          ouiaId="instance_type_empty"
          isDisabled
          placeholderText="Can not fetch resource groups"
          toggleAriaLabel="Select resource group"
        />
      </>
    );
  }

  const clearSelection = () => {
    setWizardContext((prevState) => ({
      ...prevState,
      azureResourceGroup: null,
    }));
    setSelection(null);
    setIsOpen(false);
  };

  const onSelect = (event, selection, isPlaceholder) => {
    if (isPlaceholder) {
      clearSelection();
    } else {
      setWizardContext((prevState) => ({
        ...prevState,
        azureResourceGroup: selection,
      }));
      setSelection(selection);
      setIsOpen(false);
    }
  };

  return (
    <Select
      variant="typeahead"
      ouiaId="select_resource_group"
      onToggle={(isExpanded) => setIsOpen(isExpanded)}
      onSelect={onSelect}
      isOpen={isOpen}
      onClear={clearSelection}
      selections={selection}
      placeholderText="redhat-deployed (default)"
      typeAheadAriaLabel="Select resource group"
      maxHeight="220px"
    >
      {resourceGroups.map((name, idx) => (
        <SelectOption aria-label={`Resource group ${name}`} key={idx} value={name} />
      ))}
    </Select>
  );
};

export default AzureResourceGroup;
