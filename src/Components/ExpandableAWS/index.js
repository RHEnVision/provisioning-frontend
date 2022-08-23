import PropTypes from 'prop-types';
import React from 'react';
import { ExpandableSection } from '@patternfly/react-core';
import DescriptionListAWS from '../DescriptionListAWS';
export const ExpandableAWS = ({ imageName }) => {
  const [isExpanded, setIsExpanded] = React.useState(true);
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
      <DescriptionListAWS imageName={imageName} />
    </ExpandableSection>
  );
};

ExpandableAWS.propTypes = {
  imageName: PropTypes.string.isRequired,
};
