import PropTypes from 'prop-types';
import React from 'react';
import { Form, FormGroup, Radio, Text, Title } from '@patternfly/react-core';
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
  const { isError, data: pubkeys } = useQuery(PUBKEYS_QUERY_KEY, fetchPubkeysList);
  const [isSelectDisabled, disableSelect] = React.useState(false);

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
    if (isError || pubkeys?.length < 1) {
      disableSelect(true);
      switchTo(NEW_KEY_OPTION);
    }
  }, [isError, pubkeys]);

  return (
    <Form className="pubkeys">
      <Title ouiaId="pubkey_title" headingLevel="h1">
        SSH key authentication
      </Title>
      <Text ouiaId="pubkey_description">Establish secure, reliable communication and strong encryption to protect data.</Text>
      <FormGroup role="radiogroup" isStack isRequired label="Select a method to add SSH public key">
        <Radio
          id="existing-pubkey-radio"
          ouiaId="pubkey_radio"
          isChecked={!wizardContext.uploadedKey}
          isDisabled={isSelectDisabled}
          name="ssh-keys-radio"
          value={EXIST_KEY_OPTION}
          onChange={onOptionChange}
          label="Select existing SSH public key"
          data-testid="existing-pubkey-radio"
          body={(!wizardContext.uploadedKey || isSelectDisabled) && <PubkeySelect setStepValidated={setStepValidated} />}
        />
        <Radio
          id="upload-pubkey-radio"
          ouiaId="new_pubkey_radio"
          isChecked={wizardContext.uploadedKey}
          name="ssh-keys-radio"
          value={NEW_KEY_OPTION}
          onChange={onOptionChange}
          label="Add and save a new SSH public key"
          description="Newly added key will be automatically saved."
          data-testid="upload-pubkey-radio"
          body={wizardContext.uploadedKey && <NewSSHKeyForm setStepValidated={setStepValidated} />}
        />
      </FormGroup>
    </Form>
  );
};

PublicKeys.propTypes = {
  setStepValidated: PropTypes.func.isRequired,
};

export default PublicKeys;
