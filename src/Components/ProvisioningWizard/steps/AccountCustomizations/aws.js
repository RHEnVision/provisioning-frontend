import PropTypes from 'prop-types';
import React from 'react';
import { Form, FormGroup, Popover, Title, Button, FormAlert, Alert } from '@patternfly/react-core';
import { HelpIcon } from '@patternfly/react-icons';
import { useQuery } from 'react-query';

import { AWS_PROVIDER } from '../../../../constants';
import { imageProps } from '../../helpers';
import SourcesSelect from '../../../SourcesSelect';
import InstanceCounter from '../../../InstanceCounter';
import InstanceTypesSelect from '../../../InstanceTypesSelect';
import RegionsSelect from '../../../RegionsSelect';
import { useWizardContext } from '../../../Common/WizardContext';
import TemplatesSelect from '../../../TemplateSelect';
import { checkPermissions } from '../../../../API';

const AccountCustomizationsAWS = ({ setStepValidated, image }) => {
  const [{ chosenSource, chosenRegion, chosenInstanceType }, setWizardContext] = useWizardContext();
  const { data: missingPermissions } = useQuery(
    [`permissions`, `${chosenRegion}-${chosenSource}`],
    () => checkPermissions(image.provider, chosenSource, chosenRegion),
    {
      select: (perm) => perm.missing_entities,
      enabled: !!chosenRegion && !!chosenSource,
    }
  );
  const [validations, setValidation] = React.useState({
    sources: chosenSource ? ((missingPermissions || []).length == 0 ? 'success' : 'warning') : 'default',
    types: chosenInstanceType ? 'success' : 'default',
    amount: 'success',
    region: 'default',
  });

  const onRegionChange = ({ region, imageID }) => {
    setWizardContext((prevState) => ({
      ...prevState,
      chosenRegion: region,
      chosenImageID: imageID,
    }));
  };

  React.useEffect(() => {
    // This effect checks if the entire step is validated
    const errorExists = Object.values(validations).some((valid) => valid == 'error' || valid == 'default');
    setStepValidated(!errorExists);
  }, [validations]);

  React.useEffect(() => {
    if ((missingPermissions || []).length != 0) {
      if (validations.sources !== 'error') {
        setValidation((prevValidations) => ({
          ...prevValidations,
          sources: 'warning',
        }));
      }
      if (validations.region !== 'error') {
        setValidation((prevValidations) => ({
          ...prevValidations,
          region: 'warning',
        }));
      }
    } else {
      setValidation((prevValidations) => ({
        ...prevValidations,
        sources: chosenSource ? 'success' : 'default',
        region: 'default',
      }));
    }
  }, [missingPermissions]);

  return (
    <Form>
      <Title ouiaId="account_custom_title" headingLevel="h1" size="xl">
        Account and customizations | Amazon
      </Title>
      {(missingPermissions || []).length != 0 && (
        <FormAlert>
          <Alert isExpandable isInline variant="warning" title={`Launch might fail due to missing permissions.`}>
            <>
              <p>
                Check if <a href="https://console.aws.amazon.com/iam/">policies</a> in your {image.provider} account for the selected region are set
                as{' '}
                <a href="https://github.com/RHEnVision/provisioning-backend/blob/main/docs/configure-amazon-role.md#service-account-policy">
                  our documentation
                </a>{' '}
                recommends. Following permissions might be missing:
              </p>
              <p>{(missingPermissions || []).join(', ')}</p>
            </>
          </Alert>
        </FormAlert>
      )}
      <FormGroup label="Select account" validated="warning" helperTextInvalid="Please pick a value" isRequired fieldId="aws-select-source">
        <SourcesSelect
          image={image}
          setValidation={(validation) =>
            setValidation((prevValidations) => ({
              ...prevValidations,
              sources: validation,
            }))
          }
          validated={validations.sources}
        />
      </FormGroup>
      <FormGroup
        label="Select region"
        isRequired
        fieldId="aws-select-region"
        labelIcon={
          <Popover bodyContent="Select available geographical region">
            <Button
              ouiaId="region_help"
              type="button"
              aria-label="More info for regions field"
              onClick={(e) => e.preventDefault()}
              aria-describedby="aws-select-region"
              className="pf-c-form__group-label-help"
              variant="plain"
            >
              <HelpIcon noVerticalAlign />
            </Button>
          </Popover>
        }
      >
        <RegionsSelect
          provider={AWS_PROVIDER}
          onChange={onRegionChange}
          composeID={image.id}
          currentRegion={chosenRegion}
          validated={validations.region}
        />
      </FormGroup>
      <FormGroup
        label="Select instance type"
        isRequired
        validated={validations.types}
        helperTextInvalid="There are problems fetching instance types."
        helperText={validations.types === 'warning' && 'The selected specification does not meet minimum requirements for this image'}
        fieldId="aws-select-instance-types"
        labelIcon={
          <Popover
            bodyContent="Select AWS instance type based on your computing,
           memory, networking, or storage needs"
          >
            <Button
              ouiaId="instance_type_help"
              type="button"
              aria-label="More info for instance types field"
              onClick={(e) => e.preventDefault()}
              aria-describedby="aws-select-instance-types"
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
        label="Select template"
        fieldId="aws-select-template"
        labelIcon={
          <Popover
            bodyContent={
              <span>
                Launch templates contains the configuration information to launch an instance. Note that instance type and public SSH key will be
                still required and will override template values. For further information and for creating launch templates{' '}
                <a rel="noreferrer" target="_blank" href="https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-launch-templates.html">
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
              aria-describedby="aws-select-template"
              className="pf-c-form__group-label-help"
              variant="plain"
            >
              <HelpIcon noVerticalAlign />
            </Button>
          </Popover>
        }
      >
        <TemplatesSelect />
      </FormGroup>
      <FormGroup
        label="Count"
        isRequired
        fieldId="aws-select-instance-counter"
        validated={validations.amount}
        helperText={validations.amount === 'warning' && 'Launching many vCPUs might exceed service quota limit.'}
        labelIcon={
          <Popover bodyContent="Specify the number of AWS instances to be launched">
            <Button
              ouiaId="instance_count_help"
              type="button"
              aria-label="More info for instance counter field"
              onClick={(e) => e.preventDefault()}
              aria-describedby="aws-select-instance-counter"
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

AccountCustomizationsAWS.propTypes = {
  setStepValidated: PropTypes.func.isRequired,
  image: imageProps,
};

export default AccountCustomizationsAWS;
