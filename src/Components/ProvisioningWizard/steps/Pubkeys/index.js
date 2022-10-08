import PropTypes from 'prop-types';
import React from 'react';
import {
  Form,
  Stack,
  StackItem,
  Title,
  Radio,
  Text,
} from '@patternfly/react-core';
import { useQuery } from 'react-query';
import { useWizardContext } from '../../../Common/WizardContext';
import PubkeySelect from './PubkeySelect';
import NewSSHKeyForm from './NewKeyForm';
import { PUBKEYS_QUERY_KEY } from '../../../../API/queryKeys';
import { fetchPubkeysList } from '../../../../API';

const EXIST_KEY_OPTION = 'existKey';
const NEW_KEY_OPTION = 'newKey';

const PublicKeys = ({ setStepValidated }) => {
  const [wizardContext, setWizardContext] = useWizardContext();
  const {
    isLoading,
    isError,
    data: pubkeys,
  } = useQuery(PUBKEYS_QUERY_KEY, fetchPubkeysList);

  const switchTo = (optionKey) => {
    setWizardContext((prevState) => ({
      ...prevState,
      uploadedKey: NEW_KEY_OPTION === optionKey,
    }));
  };

  const onOptionChange = (_, event) => {
    switchTo(event.currentTarget.value);
  };

  React.useEffect(() => {
    if (!isLoading && (isError || (pubkeys && pubkeys.length < 1))) {
      switchTo(NEW_KEY_OPTION);
    }
  }, [isLoading, isError]);

  return (
    <Form>
      <Title headingLevel="h1">SSH keys authentication</Title>
      <Text>
        Establish secure, reliable communication and strong encryption to
        protect data.
      </Text>
      <FormGroup isRequired label="Select a method to add SSH pubic key">
        <Radio
          id="existing-pubkey-radio"
          isChecked={!wizardContext.uploadedKey}
          isDisabled={pubkeys && pubkeys.length < 1}
          name="ssh-keys-radio"
          value={EXIST_KEY_OPTION}
          onChange={onOptionChange}
          label="Select existing SSH public key"
          data-testid="existing-pubkey-radio"
          body={
            <FormGroup label="Select public key">
              <PubkeySelect setStepValidated={setStepValidated} />
            </FormGroup>
          }
        />
        <Radio
          id="upload-pubkey-radio"
          isChecked={wizardContext.uploadedKey}
          name="ssh-keys-radio"
          value={NEW_KEY_OPTION}
          onChange={onOptionChange}
          label="Add and save a new SSH public key"
          description="Newly added key will be automatically saved. Result of the provisioning will not be affected this process."
          data-testid="upload-pubkey-radio"
          body={
            wizardContext.uploadedKey && (
              <NewSSHKeyForm setStepValidated={setStepValidated} />
            )
          }
        />
      </FormGroup>
    </Form>
  );
};

PublicKeys.propTypes = {
  setStepValidated: PropTypes.func.isRequired,
};

export default PublicKeys;
