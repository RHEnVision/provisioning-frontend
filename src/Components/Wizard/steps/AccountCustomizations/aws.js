import React from 'react';
import { Form, FormGroup, Popover, Title } from '@patternfly/react-core';
import HelpIcon from '@patternfly/react-icons/dist/esm/icons/help-icon';
import SourcesSelect from '../../../SourcesSelect';
import InstanceCounter from '../../../InstanceCounter';
import InstanceTypesSelect from '../../../InstanceTypesSelect';
import RegionsSelect from '../../../RegionsSelect';

const AccountCustomizationsAWS = () => {
  return (
    <Form isWidthLimited maxWidth="80%">
      <FormGroup>
        <Title headingLevel="h2">AWS Account and Customizations</Title>
      </FormGroup>
      <FormGroup>
        <Title headingLevel="h4">Description</Title>
      </FormGroup>
      <FormGroup label="Select accont" isRequired fieldId="aws-select-source">
        <SourcesSelect />
      </FormGroup>
      <FormGroup
        label="Select region"
        isRequired
        fieldId="aws-select-region"
        labelIcon={
          <Popover headerContent={<div>AWS regions</div>}>
            <button
              type="button"
              aria-label="More info for regions field"
              onClick={(e) => e.preventDefault()}
              aria-describedby="aws-select-region"
              className="pf-c-form__group-label-help"
            >
              <HelpIcon noVerticalAlign />
            </button>
          </Popover>
        }
      >
        <RegionsSelect />
      </FormGroup>
      <FormGroup
        label="Select instance type"
        isRequired
        fieldId="aws-select-instance-types"
        labelIcon={
          <Popover headerContent={<div>AWS instance types</div>}>
            <button
              type="button"
              aria-label="More info for instance types field"
              onClick={(e) => e.preventDefault()}
              aria-describedby="aws-select-instance-types"
              className="pf-c-form__group-label-help"
            >
              <HelpIcon noVerticalAlign />
            </button>
          </Popover>
        }
      >
        <InstanceTypesSelect />
      </FormGroup>
      <FormGroup
        label="Count"
        isRequired
        fieldId="aws-select-instance-counter"
        labelIcon={
          <Popover headerContent={<div>Number of ec2 AWS instances</div>}>
            <button
              type="button"
              aria-label="More info for instance counter field"
              onClick={(e) => e.preventDefault()}
              aria-describedby="aws-select-instance-counter"
              className="pf-c-form__group-label-help"
            >
              <HelpIcon noVerticalAlign />
            </button>
          </Popover>
        }
      >
        <InstanceCounter />
      </FormGroup>
    </Form>
  );
};
export default AccountCustomizationsAWS;
