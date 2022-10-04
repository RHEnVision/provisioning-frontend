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
    if (value.length === 0) {
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
    if (text === '') {
      updateValidation('sshKeyBody', 'default');
    } else {
      updateValidation(
        'sshKeyBody',
        validatePublicKey(text) ? 'success' : 'error'
      );
    }
  };

  const handleClear = () => {
    setWizardContext((prevState) => ({
      ...prevState,
      sshPublicName: undefined,
      sshPublicKey: undefined,
    }));
    updateValidation('sshKeyName', 'default');
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
        helperTextInvalid="a name is required"
        label="Name"
        isRequired
        fieldId="ssh-name"
      >
        <TextInput
          validated={validations.sshKeyName}
          value={wizardContext.sshPublicName}
          id="public-key-name"
          onChange={handleNameChange}
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
          type="text"
          value={wizardContext.sshPublicKey}
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
