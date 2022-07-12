import React from 'react';
import { Stack, StackItem, Title } from '@patternfly/react-core';
import { ExpandableAWS } from '../../../ExpandableAWS';

const ReviewDetails = () => {
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
        <ExpandableAWS />
      </StackItem>
    </Stack>
  );
};
export default ReviewDetails;
