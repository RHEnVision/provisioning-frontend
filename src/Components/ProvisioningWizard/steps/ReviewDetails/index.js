import PropTypes from 'prop-types';
import React from 'react';
import { Title, Text } from '@patternfly/react-core';
import { ExpandableAWS } from '../../../ExpandableAWS';

const ReviewDetails = ({ imageName }) => {
  return (
    <div className="pf-c-form">
      <Title headingLevel="h1">Review Details</Title>
      <Text>
        Review the information below and click <b>Finish</b> to complete
        provisioning.
      </Text>

      <ExpandableAWS imageName={imageName} />
    </div>
  );
};

ReviewDetails.propTypes = {
  imageName: PropTypes.string.isRequired,
};
export default ReviewDetails;
