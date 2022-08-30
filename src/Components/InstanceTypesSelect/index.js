import React from 'react';
import { Spinner, Select, SelectOption } from '@patternfly/react-core';
import { useQuery } from 'react-query';
import { instanceTypesQueryKeys } from '../../API/queryKeys';
import { fetchInstanceTypesList } from '../../API';
import { useWizardContext } from '../Common/WizardContext';

const InstanceTypesSelect = () => {
  const [wizardContext, setWizardContext] = useWizardContext();
  const [isOpen, setIsOpen] = React.useState(false);
  const {
    isLoading,
    error,
    data: instanceTypes,
  } = useQuery(
    instanceTypesQueryKeys(wizardContext.chosenSource),
    () => fetchInstanceTypesList(wizardContext.chosenSource),
    { enabled: !!wizardContext.chosenSource }
  );

  const onSelect = (event, selection, isPlaceholder) => {
    if (isPlaceholder) {
      clearSelection();
    } else {
      setWizardContext((prevState) => ({
        ...prevState,
        chosenInstanceType: selection,
      }));
      setIsOpen(false);
    }
  };

  const clearSelection = () => {
    setWizardContext((prevState) => ({
      ...prevState,
      chosenInstanceType: null,
    }));
    setIsOpen(false);
  };

  const selectItemsMapper = (types) => {
    return types.map((instanceType) => (
      <SelectOption
        aria-label={'Instance Type item'}
        key={instanceType.id}
        description={`${instanceType.cores} cores | 
          ${instanceType.vcpus} vCPU | 
          ${(parseFloat(instanceType.memory_mib) / 1024).toFixed(
            1
          )} GiB memory | 
          ${
            instanceType.storage_gb > 0
              ? instanceType.storage_gb + ' GB storage | '
              : 'EBS - only | '
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
    // TODO: error handling, notifications
    console.log('Failed to fetch instance types list');
  }
  if (isLoading) {
    return (
      <Spinner isSVG size="sm" aria-label="Contents of the small example" />
    );
  }

  if (instanceTypes?.length > 0) {
    return (
      <Select
        onToggle={onToggle}
        onSelect={onSelect}
        variant="typeahead"
        isOpen={isOpen}
        placeholderText="Select instance type"
        selections={wizardContext.chosenInstanceType}
        aria-label="Select instance type"
      >
        {selectItemsMapper(instanceTypes)}
      </Select>
    );
  } else {
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
};

export default InstanceTypesSelect;
