import PropTypes from 'prop-types';
import React from 'react';
import { FormGroup, TextInput, FileUpload } from '@patternfly/react-core';
import { useWizardContext } from '../../../Common/WizardContext';

// This is a simple regex format for public ssh key
const PUBLIC_KEY_FORMAT = '^(ssh|ecdsa)';

const NewSSHKeyForm = ({ setStepValidated }) => {
  const [wizardContext, setWizardContext] = useWizardContext();
  const [isLoading, setIsLoading] = React.useState();
  const [validations, setValidation] = React.useState({
    sshKeyBody: 'default',
    sshKeyName: 'default',
  });
  const [keyName, setName] = React.useState(wizardContext.sshPublicName);
  const [publicKey, setPublicKey] = React.useState(wizardContext.sshPublicKey);

  React.useEffect(() => {
    // This effect checks if the entire step is validated
    const errorExists = Object.values(validations).some(
      (valid) => valid !== 'success'
    );
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
      updateValidation(
        'sshKeyBody',
        validatePublicKey(publicKey) ? 'success' : 'error'
      );
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

  const validatePublicKey = (ssh) => {
    const regex = new RegExp(PUBLIC_KEY_FORMAT);
    return regex.test(ssh);
  };
  return (
    <>
      <FormGroup
        validated={validations.sshKeyName}
        helperTextInvalid="Name is required"
        label="Name"
        isRequired
        fieldId="ssh-name"
      >
        <TextInput
          validated={validations.sshKeyName}
          value={keyName}
          id="public-key-name"
          onChange={handleNameChange}
          onBlur={handleNameBlur}
          type="text"
        />
      </FormGroup>
      <FormGroup
        helperTextInvalid="Must be SSH public key format"
        label="SSH public key"
        isRequired
        fieldId="ssh-file"
        validated={validations.sshKeyBody}
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
    </>
  );
};

NewSSHKeyForm.propTypes = {
  setStepValidated: PropTypes.func.isRequired,
};
export default NewSSHKeyForm;
