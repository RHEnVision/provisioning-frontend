import PropTypes from 'prop-types';
import React from 'react';
import { Form, FormGroup, Popover, Title, Button, Text } from '@patternfly/react-core';
import { HelpIcon } from '@patternfly/react-icons';

import { imageProps, imageAzureResourceGroup } from '../../helpers';
import SourcesSelect from '../../../SourcesSelect';
import InstanceCounter from '../../../InstanceCounter';
import InstanceTypesSelect from '../../../InstanceTypesSelect';
import AzureResourceGroup from '../../../AzureResourceGroup';
import { useWizardContext } from '../../../Common/WizardContext';

const AccountCustomizationsAzure = ({ setStepValidated, image }) => {
  const [wizardContext] = useWizardContext();
  const [validations, setValidation] = React.useState({
    sources: wizardContext.chosenSource ? 'success' : 'default',
    types: wizardContext.chosenInstanceType ? 'success' : 'default',
    amount: 'success',
  });

  React.useEffect(() => {
    // This effect checks if the entire step is validated
    const errorExists = Object.values(validations).some((valid) => valid == 'error' || valid == 'default');
    setStepValidated(!errorExists);
  }, [validations]);

  return (
    <Form>
      <Title ouiaId="account_custom_title" headingLevel="h1" size="xl">
        Account and customizations | Azure
      </Title>
      <FormGroup
        label="Select account"
        validated={validations.sources}
        helperTextInvalid="Please pick a value"
        isRequired
        fieldId="azure-select-source"
      >
        <SourcesSelect
          image={image}
          setValidation={(validation) =>
            setValidation((prevValidations) => ({
              ...prevValidations,
              sources: validation,
            }))
          }
        />
      </FormGroup>
      <FormGroup
        label="Azure resource group"
        fieldId="azure-resource-group-select"
        labelIcon={
          <Popover
            headerContent={<div>Azure resource group</div>}
            bodyContent={
              <div>
                <p>Azure resource group to deploy the VM resources into. Defaults to the resource group image is located in.</p>
                <p>The location (Azure region) of the resource group is used for all resources deployed.</p>
              </div>
            }
          >
            <Button
              ouiaId="resource_group_help"
              type="button"
              aria-label="More info for resource group field"
              onClick={(e) => e.preventDefault()}
              aria-describedby="azure-resource-group-select"
              className="pf-c-form__group-label-help"
              variant="plain"
            >
              <HelpIcon noVerticalAlign />
            </Button>
          </Popover>
        }
      >
        <AzureResourceGroup imageResourceGroup={imageAzureResourceGroup(image)} />
      </FormGroup>
      <FormGroup
        label="Select instance size"
        isRequired
        validated={validations.types}
        helperTextInvalid="There are problems fetching instance types."
        helperText={validations.types === 'warning' && 'The selected specification does not meet minimum requirements for this image'}
        fieldId="azure-select-instance-size"
        labelIcon={
          <Popover
            bodyContent={
              <div>
                Select Azure instance type based on your computing, memory, networking, or storage needs
                <br />
                <br />
                <b>Tip:</b> You can filter by a query search, i.e:
                <br />
                <Text component="small">{'vcpus = 2 and storage > 30 and memory < 4000'}</Text>
              </div>
            }
          >
            <Button
              ouiaId="machine_type_help"
              type="button"
              aria-label="More info for instance size field"
              onClick={(e) => e.preventDefault()}
              aria-describedby="azure-select-instance-size"
              className="pf-c-form__group-label-help"
              variant="plain"
            >
              <HelpIcon noVerticalAlign />
            </Button>
          </Popover>
        }
      >
        <InstanceTypesSelect
          architecture={image.architecture}
          setValidation={(validation) =>
            setValidation((prevValidations) => ({
              ...prevValidations,
              types: validation,
            }))
          }
        />
      </FormGroup>
      <FormGroup
        label="Count"
        isRequired
        fieldId="azure-select-instance-counter"
        validated={validations.amount}
        helperText={validations.amount === 'warning' && 'Launching many vCPUs might exceed service quota limit.'}
        labelIcon={
          <Popover headerContent={<div>Number of Azure instances</div>}>
            <Button
              ouiaId="instance_count_help"
              type="button"
              aria-label="More info for instance counter field"
              onClick={(e) => e.preventDefault()}
              aria-describedby="azure-select-instance-counter"
              className="pf-c-form__group-label-help"
              variant="plain"
            >
              <HelpIcon noVerticalAlign />
            </Button>
          </Popover>
        }
      >
        <InstanceCounter
          setValidation={(validation) =>
            setValidation((prev) => ({
              ...prev,
              amount: validation,
            }))
          }
        />
      </FormGroup>
    </Form>
  );
};

AccountCustomizationsAzure.propTypes = {
  setStepValidated: PropTypes.func.isRequired,
  image: imageProps,
};
export default AccountCustomizationsAzure;
