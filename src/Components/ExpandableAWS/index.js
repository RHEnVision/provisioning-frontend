import React from 'react';
import { ExpandableSection } from '@patternfly/react-core';
import DescriptionListAWS from '../DescriptionListAWS';
export const ExpandableAWS = () => {
  const [isExpanded, setIsExpanded] = React.useState(false);
  const onToggle = (isExpanded) => {
    setIsExpanded(isExpanded);
  };
  return (
    <ExpandableSection
      toggleText={'AWS'}
      onToggle={onToggle}
      isExpanded={isExpanded}
      isIndented
    >
      <DescriptionListAWS />
    </ExpandableSection>
  );
};
