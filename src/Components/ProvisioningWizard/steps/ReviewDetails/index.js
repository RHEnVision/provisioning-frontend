import PropTypes from 'prop-types';
import React from 'react';
import { Title, Text } from '@patternfly/react-core';
import { ExpandableAWS } from '../../../ExpandableAWS';
import { ExpandableGCP } from '../../../ExpandableGCP';
import { useWizardContext } from '../../../Common/WizardContext'

const ReviewDetails = ({ imageName }) => {
  const [wizardContext] = useWizardContext();

  switch (wizardContext.chosenProvider) {
    case 'aws':
      return (
        <div className="pf-c-form">
          <Title ouiaId="review_details_title" headingLevel="h1">
            Review details
          </Title>
          <Text ouiaId="review_details_description">
            Review the information below and click <b>Launch</b> to complete provisioning.
          </Text>
          <ExpandableAWS imageName={imageName} />
        </div>
      );
    case  'gcp':
      return (
        <div className="pf-c-form">
          <Title ouiaId="review_details_title" headingLevel="h1">
            Review details
          </Title>
          <Text ouiaId="review_details_description">
            Review the information below and click <b>Launch</b> to complete provisioning.
          </Text>
          <ExpandableGCP imageName={imageName} />
        </div>
      );
    case 'azure':
  }
};

ReviewDetails.propTypes = {
  imageName: PropTypes.string.isRequired,
};
export default ReviewDetails;
