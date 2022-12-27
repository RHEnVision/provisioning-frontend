import PropTypes from 'prop-types';
import React from 'react';
import { ExpandableSection } from '@patternfly/react-core';
import DescriptionListGCP from '../DescriptionListGCP';
export const ExpandableGCP = ({ imageName }) => {
  const [isExpanded, setIsExpanded] = React.useState(true);
  const onToggle = (isExpanded) => {
    setIsExpanded(isExpanded);
  };
  return (
    <ExpandableSection toggleText={'GCP'} onToggle={onToggle} isExpanded={isExpanded} isIndented>
      <DescriptionListGCP imageName={imageName} />
    </ExpandableSection>
  );
};

ExpandableGCP.propTypes = {
  imageName: PropTypes.string.isRequired,
};
