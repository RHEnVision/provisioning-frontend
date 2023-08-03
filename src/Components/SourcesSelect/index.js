import PropTypes from 'prop-types';
import React from 'react';
import { Alert, Select, SelectOption, Spinner } from '@patternfly/react-core';

import { imageProps } from '../ProvisioningWizard/helpers';
import { useSourcesForImage } from '../Common/Hooks/sources';
import { useWizardContext } from '../Common/WizardContext';

const SourcesSelect = ({ setValidation, image }) => {
  const [{ chosenSource }, setWizardContext] = useWizardContext();
  const [isOpen, setIsOpen] = React.useState(false);
  const [selected, setSelected] = React.useState(null);
  const selectObject = (id, name) => ({
    id,
    toString: () => name,
    compareTo: (other) => other.id === id,
  });
  const { isLoading, error, sources } = useSourcesForImage(image, {
    onSuccess: (sources) => {
      if (chosenSource) {
        setSelected(selectObject(chosenSource, sources.find((source) => source.id === chosenSource).name));
        setValidation('success');
      } else if (sources.length === 1) {
        setSelected(selectObject(sources[0].id, sources[0].name));
        setWizardContext((prevState) => ({
          ...prevState,
          chosenSource: sources[0].id,
        }));
        setValidation('success');
      }
    },
  });

  const onSelect = (event, selection, isPlaceholder) => {
    if (isPlaceholder) {
      setSelected(null);
      setWizardContext((prevState) => ({ ...prevState, chosenSource: null }));
      setValidation('error');
    } else {
      setSelected(selection);
      setWizardContext((prevState) => ({
        ...prevState,
        chosenSource: selection.id,
      }));
      setValidation('success');
    }
    setIsOpen(false);
  };

  const selectItemsMapper = () =>
    sources.map(({ name, id }) => <SelectOption aria-label="Source account" key={id} value={selectObject(id, name)}></SelectOption>);

  if (error) {
    console.warn('Failed to fetch sources list');
    return (
      <>
        <Alert ouiaId="select_account_alert" variant="warning" isInline title="There are problems fetching accounts" />
        <Select ouiaId="select_account_empty" isDisabled placeholderText="No accounts found" aria-label="Select account" />
      </>
    );
  }

  if (isLoading) {
    return <Spinner isSVG size="sm" aria-label="Loading accounts" />;
  }

  return (
    <Select
      ouiaId="select_account"
      isOpen={isOpen}
      onToggle={(openState) => setIsOpen(openState)}
      selections={selected}
      maxHeight="180px"
      // TODO decide if to disable the select
      // isDisabled={sources?.length === 1}
      onSelect={onSelect}
      placeholderText="Select account"
      aria-label="Select account"
    >
      {sources && selectItemsMapper()}
    </Select>
  );
};

SourcesSelect.propTypes = {
  setValidation: PropTypes.func.isRequired,
  image: imageProps,
};

export default SourcesSelect;
