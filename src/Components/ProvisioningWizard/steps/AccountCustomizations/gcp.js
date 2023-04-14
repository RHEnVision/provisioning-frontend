import PropTypes from 'prop-types';
import React from 'react';
import { Form, FormGroup, Popover, Title, Text, Button } from '@patternfly/react-core';
import HelpIcon from '@patternfly/react-icons/dist/esm/icons/help-icon';

import { GCP_PROVIDER } from '../../../../constants';
import { imageProps } from '../../helpers';
import SourcesSelect from '../../../SourcesSelect';
import InstanceCounter from '../../../InstanceCounter';
import InstanceTypesSelect from '../../../InstanceTypesSelect';
import RegionsSelect from '../../../RegionsSelect';
import { useWizardContext } from '../../../Common/WizardContext';

const AccountCustomizationsGCP = ({ setStepValidated, image }) => {
  const [wizardContext, setWizardContext] = useWizardContext();
  const [validations, setValidation] = React.useState({
    sources: wizardContext.chosenSource ? 'success' : 'default',
    types: wizardContext.chosenInstanceType ? 'success' : 'default',
  });

  React.useEffect(() => {
    // This effect checks if the entire step is validated
    const errorExists = Object.values(validations).some((valid) => valid !== 'success');
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
      <Text ouiaId="account_custom_description">
        Configure instances that will run on your Google cloud. All the instances will launch with the same configuration.
      </Text>
      <FormGroup
        label="Select account"
        validated={validations.sources}
        helperTextInvalid="Please pick a value"
        isRequired
        fieldId="gcp-select-source"
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
              <HelpIcon noVerticalAlign />
            </Button>
          </Popover>
        }
      >
        <RegionsSelect provider={GCP_PROVIDER} onChange={onRegionChange} composeID={image.id} currentRegion={wizardContext.chosenRegion} />
      </FormGroup>
      <FormGroup
        label="Select machine type"
        isRequired
        helperTextInvalid="Please pick a value"
        fieldId="gcp-select-machine-types"
        labelIcon={
          <Popover headerContent={<div>GCP machine types</div>}>
            <Button
              ouiaId="machine_type_help"
              type="button"
              aria-label="More info for machine types field"
              onClick={(e) => e.preventDefault()}
              aria-describedby="gcp-select-machine-types"
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
              <HelpIcon noVerticalAlign />
            </Button>
          </Popover>
        }
      >
        <InstanceCounter />
      </FormGroup>
    </Form>
  );
};

AccountCustomizationsGCP.propTypes = {
  setStepValidated: PropTypes.func.isRequired,
  image: imageProps,
};
export default AccountCustomizationsGCP;
