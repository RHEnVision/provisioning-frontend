import PropTypes from 'prop-types';
import React from 'react';
import { Form, FormGroup, TextInput, FileUpload } from '@patternfly/react-core';
import { useWizardContext } from '../../../Common/WizardContext';

// This is a simple regex format for public ssh key
const PUBLIC_KEY_FORMAT = '^(ssh|ecdsa)';

const NewSSHKeyForm = ({ setStepValidated }) => {
  const [wizardContext, setWizardContext] = useWizardContext();
  const [isLoading, setIsLoading] = React.useState();
  const [validations, setValidation] = React.useState({
    sshKey: 'default',
    sshName: 'default',
  });

  React.useEffect(() => {
    // This effect checks if the entire step is validated
    const errorExists = Object.values(validations).some(
      (valid) => valid !== 'success'
    );
    setStepValidated((prevStepsValidation) => ({
      ...prevStepsValidation,
      sshStep: !errorExists,
    }));
  }, [validations]);

  const updateValidation = (inputKey, value) =>
    setValidation((prevValidations) => ({
      ...prevValidations,
      [inputKey]: value,
    }));

  const handleNameChange = (value) => {
    setWizardContext((prevState) => ({ ...prevState, sshPublicName: value }));
    if (value.length === 0) {
      updateValidation('sshName', 'error');
      return;
    }
    updateValidation('sshName', 'success');
  };
  const handleSSHKeyChange = (value) => {
    if (validatePublicKey(value)) {
      setWizardContext((prevState) => ({
        ...prevState,
        sshPublicKey: value,
      }));
      updateValidation('sshKey', 'success');
    } else {
      updateValidation('sshKey', 'error');
    }
  };

  const handleClear = () => {
    setWizardContext((prevState) => ({
      ...prevState,
      sshPublicKey: undefined,
      sshPublicName: undefined,
    }));
  };

  const handleFileReadStarted = () => {
    setIsLoading(true);
  };

  const handleFileReadFinished = () => {
    setIsLoading(false);
  };

  const validatePublicKey = (ssh) => {
    const regex = new RegExp(PUBLIC_KEY_FORMAT);
    return regex.test(ssh);
  };
  return (
    <Form>
      <FormGroup
        validated={validations.sshName}
        helperTextInvalid="a name is required"
        label="Name"
        isRequired
        fieldId="ssh-name"
      >
        <TextInput
          validated={validations.sshName}
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
        validated={validations.sshKey}
      >
        <FileUpload
          id="public-key-value"
          onDataChange={handleSSHKeyChange}
          allowEditingUploadedText={false}
          type="text"
          value={wizardContext.sshPublicKey}
          validated={validations.sshKey}
          onReadStarted={handleFileReadStarted}
          onReadFinished={handleFileReadFinished}
          onClearClick={handleClear}
          isLoading={isLoading}
          filenamePlaceholder="Drag a file here"
        />
      </FormGroup>
    </Form>
  );
};

NewSSHKeyForm.propTypes = {
  setStepValidated: PropTypes.func.isRequired,
};
export default NewSSHKeyForm;
