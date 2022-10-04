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
import { useWizardContext } from '../../../Common/WizardContext';
import PubkeySelect from './PubkeySelect';
import NewSSHKeyForm from './NewKeyForm';

const EXIST_KEY_OPTION = 'existKey';
const NEW_KEY_OPTION = 'newKey';

const PublicKeys = ({ setStepValidated }) => {
  const [wizardContext, setWizardContext] = useWizardContext();
  const onOptionChange = (_, event) => {
    setWizardContext((prevState) => ({
      ...prevState,
      uploadedKey: event.currentTarget.value == NEW_KEY_OPTION,
    }));
  };
  return (
    <Form>
      <Title headingLevel="h1">SSH keys authentication</Title>
      <Text>
        Establish secure, reliable communication and strong encryption to
        protect data.
      </Text>
      <Stack hasGutter>
        <StackItem>
          <Title headingLevel="h6">Select a method</Title>
        </StackItem>
        <StackItem>
          <Radio
            id="existing-pubkey-radio"
            isChecked={!wizardContext.uploadedKey}
            name="ssh-keys-radio"
            value={EXIST_KEY_OPTION}
            onChange={onOptionChange}
            label="Select named SSH public key"
            data-testid="existing-pubkey-radio"
            body={
              !wizardContext.uploadedKey && (
                <PubkeySelect setStepValidated={setStepValidated} />
              )
            }
          />
        </StackItem>
        <StackItem>
          <Radio
            id="upload-pubkey-radio"
            isChecked={wizardContext.uploadedKey}
            name="ssh-keys-radio"
            value={NEW_KEY_OPTION}
            onChange={onOptionChange}
            label="Add and save a new SSH public key"
            description="Newly added key will be automatically saved. Result of the provisioning will not be affected this process"
            data-testid="upload-pubkey-radio"
            body={
              wizardContext.uploadedKey && (
                <NewSSHKeyForm setStepValidated={setStepValidated} />
              )
            }
          />
        </StackItem>
      </Stack>
    </Form>
  );
};

PublicKeys.propTypes = {
  setStepValidated: PropTypes.func.isRequired,
};

export default PublicKeys;
