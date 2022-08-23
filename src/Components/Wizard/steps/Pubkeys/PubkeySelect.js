import React from 'react';
import PropTypes from 'prop-types';
import { Alert, Select, SelectOption, Spinner } from '@patternfly/react-core';
import { useQuery } from 'react-query';

import { PUBKEYS_QUERY_KEY } from '../../../../API/queryKeys';
import { fetchPubkeysList } from '../../../../API';
import { useWizardContext } from '../../../Common/WizardContext';

const PubkeySelect = ({ setStepValidated }) => {
  const [wizardContext, setWizardContext] = useWizardContext();
  const [isOpen, setIsOpen] = React.useState(false);
  const [selection, setSelection] = React.useState(
    wizardContext.chosenSshKeyId
      ? {
          id: wizardContext.chosenSshKeyId,
          toString: () => wizardContext.chosenSshKeyName,
          compareTo: (other) => other.id === wizardContext.chosenSshKeyId,
        }
      : null
  );

  React.useEffect(() => {
    setStepValidated((selection && true) || false);
  }, [selection]);

  const {
    isLoading,
    isError,
    error,
    data: pubkeys,
  } = useQuery(PUBKEYS_QUERY_KEY, fetchPubkeysList);

  const onSelect = (event, value) => {
    const pkId = value.id;
    setWizardContext((prevState) => ({
      ...prevState,
      chosenSshKeyId: pkId,
      chosenSshKeyName: pubkeys.find((pk) => pk.id == pkId)?.name,
    }));
    setSelection(value);
    setIsOpen(false);
  };

  const onClear = () => {
    setWizardContext((prevState) => ({
      ...prevState,
      chosenSshKeyId: undefined,
      chosenSshKeyName: null,
    }));
    setSelection(null);
  };

  if (isError) {
    // TODO: error handling, notifications
    console.warn(`Failed to fetch public SSH keys list: ${error}`);
    return <Alert variant="warning" title="Failed to fetch SSH keys" />;
  }

  if (isLoading) {
    return (
      <Spinner isSVG size="sm" aria-label="Contents of the small example" />
    );
  }

  return (
    <Select
      onToggle={(isExpanded) => setIsOpen(isExpanded)}
      onSelect={onSelect}
      onClear={onClear}
      isOpen={isOpen}
      selections={selection}
      placeholderText="Select public key"
      aria-label="Select public key"
    >
      {pubkeys.map(({ id, name }) => (
        <SelectOption
          aria-label={`Public key ${name}`}
          key={id}
          value={{
            id: id,
            toString: () => name,
            compareTo: (other) => other.id == id,
          }}
        />
      ))}
    </Select>
  );
};

PubkeySelect.propTypes = {
  setStepValidated: PropTypes.func.isRequired,
};

export default PubkeySelect;
