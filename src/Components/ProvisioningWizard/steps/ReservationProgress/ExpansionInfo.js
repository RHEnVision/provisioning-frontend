import PropTypes from 'prop-types';
import React from 'react';
import {
  ExpandableSection,
  DescriptionList,
  DescriptionListTerm,
  DescriptionListDescription,
  Timestamp,
  Bullseye,
  Truncate,
  Card,
} from '@patternfly/react-core';

const ExpandedInfo = ({ reservationID, error, createdAt }) => (
  <Bullseye>
    <ExpandableSection toggleTextCollapsed="Show additional info" toggleTextExpanded="">
      <DescriptionList columnModifier={{ lg: '2Col' }}>
        <Card component="div" ouiaId="launch_id">
          <DescriptionListTerm>Launch ID</DescriptionListTerm>
          <DescriptionListDescription>{<span aria-label="launch id">{reservationID}</span>}</DescriptionListDescription>
        </Card>
        {error && (
          <Card component="div">
            <DescriptionListTerm>Error message</DescriptionListTerm>
            <DescriptionListDescription>
              <span aria-label="launch error">
                <Truncate content={error} />
              </span>
            </DescriptionListDescription>
          </Card>
        )}
        <Card component="div">
          <DescriptionListTerm>Started at</DescriptionListTerm>
          <DescriptionListDescription>{createdAt ? <Timestamp date={new Date(createdAt)} /> : 'N/A'}</DescriptionListDescription>
        </Card>
      </DescriptionList>
    </ExpandableSection>
  </Bullseye>
);

ExpandedInfo.propTypes = {
  createdAt: PropTypes.string,
  error: PropTypes.string,
  reservationID: PropTypes.number,
};

ExpandedInfo.defaultProps = {
  createdAt: undefined,
  finishedAt: undefined,
  reservationID: undefined,
  error: undefined,
};

export default ExpandedInfo;
