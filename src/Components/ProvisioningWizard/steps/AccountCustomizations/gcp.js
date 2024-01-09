import PropTypes from 'prop-types';
import React from 'react';
import { Form, FormGroup, Popover, Title, Button, Text, Icon } from '@patternfly/react-core';
import { HelpIcon } from '@patternfly/react-icons';

import { GCP_PROVIDER } from '../../../../constants';
import { imageProps } from '../../helpers';
import SourcesSelect from '../../../SourcesSelect';
import InstanceCounter from '../../../InstanceCounter';
import InstanceTypesSelect from '../../../InstanceTypesSelect';
import RegionsSelect from '../../../RegionsSelect';
import { useWizardContext } from '../../../Common/WizardContext';
import TemplatesSelect from '../../../TemplateSelect';

const AccountCustomizationsGCP = ({ setStepValidated, image }) => {
  const [wizardContext, setWizardContext] = useWizardContext();
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

  const onRegionChange = ({ region, imageID }) => {
    setWizardContext((prevState) => ({
      ...prevState,
      chosenRegion: region,
      chosenImageID: imageID,
    }));
  };

  return (
    <Form>
      <Title ouiaId="account_custom_title" headingLevel="h1" size="xl">
        Account and customizations | Google cloud
      </Title>
      <FormGroup label="Select account" isRequired fieldId="gcp-select-source">
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
        label="Select zone"
        isRequired
        fieldId="gcp-select-zone"
        labelIcon={
          <Popover headerContent={<div>GCP zones</div>}>
            <Button
              ouiaId="zone_help"
              type="button"
              aria-label="More info for zones field"
              onClick={(e) => e.preventDefault()}
              aria-describedby="gcp-select-zone"
              className="pf-c-form__group-label-help"
              variant="plain"
            >
              <Icon isInline>
                <HelpIcon />
              </Icon>
            </Button>
          </Popover>
        }
      >
        <RegionsSelect provider={GCP_PROVIDER} onChange={onRegionChange} composeID={image.id} currentRegion={wizardContext.chosenRegion} />
      </FormGroup>
      <FormGroup
        label="Select machine type"
        isRequired
        fieldId="gcp-select-machine-types"
        labelIcon={
          <Popover
            bodyContent={
              <div>
                Select GCP instance type based on your computing, memory, networking, or storage needs
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
              aria-label="More info for machine types field"
              onClick={(e) => e.preventDefault()}
              aria-describedby="gcp-select-machine-types"
              className="pf-c-form__group-label-help"
              variant="plain"
            >
              <Icon isInline>
                <HelpIcon />
              </Icon>
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
        label="Select template (optional)"
        fieldId="gcp-select-template"
        labelIcon={
          <Popover
            bodyContent={
              <span>
                Launch templates contains the configuration information to launch an instance. Note that machine type and public SSH key will be still
                required and will override template values. For further information and for creating launch templates{' '}
                <a rel="noreferrer" target="_blank" href="https://cloud.google.com/compute/docs/instance-templates">
                  click here
                </a>
              </span>
            }
          >
            <Button
              ouiaId="template_help"
              type="button"
              aria-label="template field info"
              onClick={(e) => e.preventDefault()}
              aria-describedby="gcp-select-template"
              className="pf-c-form__group-label-help"
              variant="plain"
            >
              <Icon isInline>
                <HelpIcon />
              </Icon>
            </Button>
          </Popover>
        }
      >
        <TemplatesSelect />
      </FormGroup>
      <FormGroup
        label="Count"
        isRequired
        fieldId="gcp-select-instance-counter"
        labelIcon={
          <Popover headerContent={<div>Number of GCP instances</div>}>
            <Button
              ouiaId="instance_count_help"
              type="button"
              aria-label="More info for instance counter field"
              onClick={(e) => e.preventDefault()}
              aria-describedby="gcp-select-instance-counter"
              className="pf-c-form__group-label-help"
              variant="plain"
            >
              <Icon isInline>
                <HelpIcon />
              </Icon>
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

AccountCustomizationsGCP.propTypes = {
  setStepValidated: PropTypes.func.isRequired,
  image: imageProps,
};
export default AccountCustomizationsGCP;
