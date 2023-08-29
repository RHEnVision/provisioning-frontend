import PropTypes from 'prop-types';
import React from 'react';
import { Alert, Select, SelectOption, Spinner, HelperText, HelperTextItem } from '@patternfly/react-core';
import { useChrome } from '@redhat-cloud-services/frontend-components/useChrome';

import { imageProps } from '../ProvisioningWizard/helpers';
import { useSourcesForImage } from '../Common/Hooks/sources';
import { useWizardContext } from '../Common/WizardContext';

const SourcesSelect = ({ setValidation, image }) => {
  const { isBeta } = useChrome();
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
  const isSelectedSourceUnavailable = selected != undefined && sources.find((source) => source.id === selected.id && source.status != 'available');

  let link = isBeta() ? '/preview/settings/sources/' : '/settings/sources/';
  if (chosenSource) {
    link = isBeta() ? `/preview/settings/sources/detail/${chosenSource}` : `/settings/sources/detail/${chosenSource}`;
  }

  return (
    <>
      <Select
        ouiaId="select_account"
        isOpen={isOpen}
        onToggle={(openState) => setIsOpen(openState)}
        selections={selected}
        maxHeight="180px"
        validated={isSelectedSourceUnavailable && 'warning'}
        // TODO decide if to disable the select
        // isDisabled={sources?.length === 1}
        onSelect={onSelect}
        placeholderText="Select account"
        aria-label="Select account"
      >
        {sources && selectItemsMapper()}
      </Select>
      {isSelectedSourceUnavailable && (
        <HelperText id="account-error-inline">
          <HelperTextItem variant="warning">
            source is unavailable, for more information click{' '}
            <a href={link} target="_blank" rel="noreferrer">
              {' '}
              here{' '}
            </a>
          </HelperTextItem>
        </HelperText>
      )}
    </>
  );
};

SourcesSelect.propTypes = {
  setValidation: PropTypes.func.isRequired,
  image: imageProps,
};

export default SourcesSelect;
