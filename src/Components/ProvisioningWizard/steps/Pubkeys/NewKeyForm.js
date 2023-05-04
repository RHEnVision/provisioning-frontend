import PropTypes from 'prop-types';
import React from 'react';
import { FormGroup, TextInput, FileUpload, Button, Popover } from '@patternfly/react-core';
import { HelpIcon } from '@patternfly/react-icons';

import { useWizardContext } from '../../../Common/WizardContext';
import { UNSUPPORTED_KEYS } from './helpers';

// This is a simple regex format for public ssh key
const PUBLIC_KEY_FORMAT = '^(ssh|ecdsa)';

const NewSSHKeyForm = ({ setStepValidated }) => {
  const validatePublicKey = (ssh) => {
    const regex = new RegExp(PUBLIC_KEY_FORMAT);
    // checks for unsupported keys format
    if (UNSUPPORTED_KEYS[provider]?.some((key) => ssh?.startsWith(key))) return false;
    return regex.test(ssh);
  };
  const [{ sshPublicName, sshPublicKey, provider }, setWizardContext] = useWizardContext();
  const [isLoading, setIsLoading] = React.useState();
  const [validations, setValidation] = React.useState({
    sshKeyBody: validatePublicKey(sshPublicKey) ? 'success' : 'default',
    sshKeyName: sshPublicName ? 'success' : 'default',
  });
  const [keyName, setName] = React.useState(sshPublicName);
  const [publicKey, setPublicKey] = React.useState(sshPublicKey);

  React.useEffect(() => {
    // This effect checks if the entire step is validated
    const errorExists = Object.values(validations).some((valid) => valid !== 'success');
    setStepValidated(!errorExists);
  }, [validations]);

  const updateValidation = (inputKey, value) =>
    setValidation((prevValidations) => ({
      ...prevValidations,
      [inputKey]: value,
    }));

  const handleNameChange = (value) => {
    setWizardContext((prevState) => ({ ...prevState, sshPublicName: value }));
    setName(value);
  };
  const handleNameBlur = () => {
    if (keyName.length === 0) {
      updateValidation('sshKeyName', 'error');
      return;
    }
    updateValidation('sshKeyName', 'success');
  };
  const handleSSHKeyChange = (value) => {
    if (validatePublicKey(value)) {
      setWizardContext((prevState) => ({
        ...prevState,
        sshPublicKey: value,
      }));
      setPublicKey(value);
      updateValidation('sshKeyBody', 'success');
    } else {
      updateValidation('sshKeyBody', 'error');
    }
  };
  const handleSSHKeyText = (text) => {
    setWizardContext((prevState) => ({
      ...prevState,
      sshPublicKey: text,
    }));
    setPublicKey(text);
  };
  const handleSSHKeyTextBlur = () => {
    if (publicKey === '') {
      updateValidation('sshKeyBody', 'default');
    } else {
      updateValidation('sshKeyBody', validatePublicKey(publicKey) ? 'success' : 'error');
    }
  };

  const handleClear = () => {
    setWizardContext((prevState) => ({
      ...prevState,
      sshPublicName: undefined,
      sshPublicKey: undefined,
    }));
    setPublicKey('');
    updateValidation('sshKeyBody', 'default');
  };

  const handleFileReadStarted = () => {
    setIsLoading(true);
  };

  const handleFileReadFinished = () => {
    setIsLoading(false);
  };
  const handleFileReadFailed = () => {
    setWizardContext((prevState) => ({
      ...prevState,
      sshPublicName: '<Failed to load the file>',
    }));
    updateValidation('sshKeyBody', 'error');
  };

  return (
    <FormGroup isStack>
      <FormGroup validated={validations.sshKeyName} helperTextInvalid="Name is required" label="Name" isRequired fieldId="ssh-name">
        <TextInput
          ouiaId="new_pubkey_name"
          validated={validations.sshKeyName}
          value={keyName}
          id="public-key-name"
          onChange={handleNameChange}
          onBlur={handleNameBlur}
          type="text"
        />
      </FormGroup>
      <FormGroup
        helperTextInvalid="Public key format is invalid or unsupported"
        label="SSH public key"
        isRequired
        fieldId="ssh-file"
        validated={validations.sshKeyBody}
        labelIcon={
          Object.keys(UNSUPPORTED_KEYS).includes(provider) && (
            <Popover
              bodyContent={
                <span>
                  Azure does not support ed25519 keys, please use RSA key instead. See
                  <a rel="noreferrer" target="_blank" href="https://learn.microsoft.com/en-us/troubleshoot/azure/virtual-machines/ed25519-ssh-keys">
                    further information
                  </a>
                </span>
              }
            >
              <Button
                ouiaId="pubkey_help"
                type="button"
                aria-label="More info for pubkeys format"
                onClick={(e) => e.preventDefault()}
                aria-describedby="public key content"
                className="pf-c-form__group-label-help"
                variant="plain"
              >
                <HelpIcon noVerticalAlign />
              </Button>
            </Popover>
          )
        }
      >
        <FileUpload
          id="public-key-value"
          onDataChange={handleSSHKeyChange}
          allowEditingUploadedText
          onTextChange={handleSSHKeyText}
          onTextAreaBlur={handleSSHKeyTextBlur}
          type="text"
          value={publicKey}
          validated={validations.sshKeyBody}
          onReadStarted={handleFileReadStarted}
          onReadFinished={handleFileReadFinished}
          onReadFailed={handleFileReadFailed}
          onClearClick={handleClear}
          isLoading={isLoading}
          filenamePlaceholder="Drag a file here"
        />
      </FormGroup>
    </FormGroup>
  );
};

NewSSHKeyForm.propTypes = {
  setStepValidated: PropTypes.func.isRequired,
};
export default NewSSHKeyForm;
