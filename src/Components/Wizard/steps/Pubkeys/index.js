import PropTypes from 'prop-types';
import React from 'react';
import { Stack, StackItem, Title, Radio, Text } from '@patternfly/react-core';
import NewSSHKeyForm from './NewKeyForm';

const EXIST_KEY_OPTION = 'existKey';
const NEW_KEY_OPTION = 'newKey';

const PublicKeys = ({ setStepValidated }) => {
  const [SSHKeyOption, setSSHKeyOption] = React.useState(NEW_KEY_OPTION);
  const onOptionChange = (_, event) => {
    setSSHKeyOption(event.currentTarget.value);
  };
  return (
    <Stack hasGutter>
      <Stack>
        <StackItem>
          <Title headingLevel="h2">SSH keys authentication</Title>
        </StackItem>
        <StackItem>
          <Text component="p">
            Establish secure, reliable communication and strong encryption to
            protect data
          </Text>
        </StackItem>
      </Stack>
      <Stack hasGutter>
        <StackItem>
          <Title headingLevel="h6">Select a method</Title>
        </StackItem>
        <StackItem>
          <Radio
            isChecked={SSHKeyOption === EXIST_KEY_OPTION}
            name="ssh-keys-radio"
            id="exist-key"
            value={EXIST_KEY_OPTION}
            onChange={onOptionChange}
            label="Add existing SSH public key"
            body={SSHKeyOption === EXIST_KEY_OPTION && 'WIP'}
          />
        </StackItem>
        <StackItem>
          <Radio
            isChecked={SSHKeyOption === NEW_KEY_OPTION}
            name="ssh-keys-radio"
            id="new-key"
            value={NEW_KEY_OPTION}
            onChange={onOptionChange}
            label="Add and save a new SSH public key"
            description="Newly added key will be automatically saved. Result of the provisioning will not be affected this process"
            body={
              SSHKeyOption === NEW_KEY_OPTION && (
                <NewSSHKeyForm setStepValidated={setStepValidated} />
              )
            }
          />
        </StackItem>
      </Stack>
    </Stack>
  );
};

PublicKeys.propTypes = {
  setStepValidated: PropTypes.func.isRequired,
};

export default PublicKeys;
