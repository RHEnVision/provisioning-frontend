import React from 'react';
import PropTypes from 'prop-types';
import { Alert, Select, SelectOption, Spinner, FormGroup } from '@patternfly/react-core';
import { useInfiniteQuery } from '@tanstack/react-query';

import { PUBKEYS_QUERY_KEY } from '../../../../API/queryKeys';
import { fetchPubkeysList } from '../../../../API';
import { useWizardContext } from '../../../Common/WizardContext';
import { isNotSupportKeyFormat } from './helpers';
import { humanizeProvider } from '../../../Common/helpers';
import { LIMIT } from '../../../../API/helpers';

const selectOptionObj = (id, name) => ({
  id: id,
  toString: () => name,
  compareTo: (other) => other.id == id,
});

const PubkeySelect = ({ setStepValidated }) => {
  const [wizardContext, setWizardContext] = useWizardContext();
  const [isOpen, setIsOpen] = React.useState(false);
  const [selection, setSelection] = React.useState(
    wizardContext.chosenSshKeyId ? selectOptionObj(wizardContext.chosenSshKeyId, wizardContext.chosenSshKeyName) : null
  );
  const [isKeySupported, setIsKeySupported] = React.useState(true);

  React.useEffect(() => {
    const keyType = pubkeys?.find((key) => key.id === selection?.id)?.type;
    if (isNotSupportKeyFormat(wizardContext.provider, keyType)) {
      setStepValidated(false);
      setIsKeySupported(false);
    } else {
      setStepValidated(!!selection);
      setIsKeySupported(true);
    }
  }, [selection]);

  const { data, fetchNextPage, isLoading, isError, hasNextPage } = useInfiniteQuery({
    queryKey: [PUBKEYS_QUERY_KEY],
    queryFn: ({ pageParam = 0 }) => fetchPubkeysList(pageParam),
    getNextPageParam: (lastPage) => {
      const nextOffset = lastPage.data?.length < lastPage.metadata?.total ? lastPage.offset + LIMIT : false;
      return nextOffset;
    },
  });

  const total = data?.pages[0]?.metadata?.total || 0;
  const pubkeys = data?.pages.map((page) => page.data).flat() || [];

  const onSelect = (event, value) => {
    setWizardContext((prevState) => ({
      ...prevState,
      chosenSshKeyId: value.id,
      chosenSshKeyName: value.toString(),
    }));
    setSelection(value);
    setIsOpen(false);
  };

  if (isLoading) {
    return <Spinner isSVG size="sm" aria-label="Loading saved SSH keys" />;
  }

  if (isError || (pubkeys && pubkeys.length < 1)) {
    return (
      <>
        {isError && <Alert ouiaId="pubkey_alert" variant="warning" isInline title="There are problems fetching saved SSH keys" />}
        <Select ouiaId="pubkey_empty" isDisabled placeholderText="No SSH key found" aria-label="Select public key" />
      </>
    );
  }

  return (
    <FormGroup
      helperTextInvalid={`Key format is not supported in ${humanizeProvider(wizardContext.provider)}`}
      label="Select public key"
      validated={!isKeySupported && 'error'}
    >
      <Select
        ouiaId="select_pubkey"
        onToggle={(isExpanded) => setIsOpen(isExpanded)}
        onSelect={onSelect}
        isOpen={isOpen}
        selections={selection}
        placeholderText="Select public key..."
        aria-label="Select public key"
        {...(pubkeys &&
          hasNextPage &&
          pubkeys.length < total && {
            loadingVariant: {
              text: `View more (${total - pubkeys.length})`,
              onClick: () => {
                fetchNextPage();
              },
            },
          })}
      >
        {pubkeys &&
          data.pages.map((group, i) => (
            <React.Fragment key={i}>
              {group.data.map((pubkey) => (
                <SelectOption aria-label={`Public key ${pubkey.name}`} key={pubkey.id} value={selectOptionObj(pubkey.id, pubkey.name)} />
              ))}
            </React.Fragment>
          ))}
      </Select>
    </FormGroup>
  );
};

PubkeySelect.propTypes = {
  setStepValidated: PropTypes.func.isRequired,
};

export default PubkeySelect;
