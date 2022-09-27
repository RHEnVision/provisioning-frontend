import PropTypes from 'prop-types';
import React from 'react';
import { Stack, StackItem, Title } from '@patternfly/react-core';
import { ExpandableAWS } from '../../../ExpandableAWS';

const ReviewDetails = ({ imageName }) => {
  return (
    <Stack hasGutter>
      <StackItem>
        <Title headingLevel="h2">Review Details</Title>
      </StackItem>
      <StackItem>
        <Title headingLevel="h6">
          Review the information below and click Finish to complete
          provisioning.
        </Title>
      </StackItem>
      <StackItem>
        <ExpandableAWS imageName={imageName} />
      </StackItem>
    </Stack>
  );
};

ReviewDetails.propTypes = {
  imageName: PropTypes.string.isRequired,
};
export default ReviewDetails;
