import PropTypes from 'prop-types';
import React from 'react';
import { Title, Text } from '@patternfly/react-core';
import LaunchDescriptionList from '../../../LaunchDescriptionList';

const ReviewDetails = ({ imageName }) => {
  return (
    <div className="pf-c-form">
      <Title ouiaId="review_details_title" headingLevel="h1">
        Review details
      </Title>
      <Text ouiaId="review_details_description">
        Review the information below and then click <b>Launch</b> to finish the process.
      </Text>

      <LaunchDescriptionList imageName={imageName} />
    </div>
  );
};

ReviewDetails.propTypes = {
  imageName: PropTypes.string.isRequired,
};
export default ReviewDetails;
