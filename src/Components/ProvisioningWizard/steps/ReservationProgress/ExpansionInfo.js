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
  Spinner,
} from '@patternfly/react-core';
import { ExternalLinkAltIcon } from '@patternfly/react-icons';
import { useQuery } from 'react-query';
import { fetchReservationByProvider } from '../../../../API';
import { useWizardContext } from '../../../Common/WizardContext';
import instanceLink from '../../../Common/InstanceLink';

const ExpandedInfo = ({ reservationID, error, createdAt }) => {
  const [{ chosenRegion, provider }] = useWizardContext();
  const { data: instances, isLoading } = useQuery(['launchInfo', reservationID], () => fetchReservationByProvider(reservationID, provider), {
    enabled: !error,
    select: (reservation) => reservation?.instances,
  });
  return (
    <Bullseye>
      <ExpandableSection toggleTextCollapsed="Show additional info" toggleTextExpanded="">
        <DescriptionList columnModifier={{ lg: '2Col' }}>
          <Card component="div">
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
          {isLoading && (
            <Card component="div">
              <DescriptionListTerm>Host</DescriptionListTerm>
              <DescriptionListDescription>{<Spinner size="md" />}</DescriptionListDescription>
            </Card>
          )}
          {instances?.map((instance_id) => (
            <Card key={instance_id} component="div">
              <DescriptionListTerm>Host</DescriptionListTerm>
              <DescriptionListDescription>
                {
                  <span aria-label="instance link">
                    <a href={instanceLink(instance_id, provider, chosenRegion)} rel="noreferrer" target="_blank">
                      {instance_id} <ExternalLinkAltIcon />
                    </a>
                  </span>
                }
              </DescriptionListDescription>
            </Card>
          ))}
        </DescriptionList>
      </ExpandableSection>
    </Bullseye>
  );
};

ExpandedInfo.propTypes = {
  createdAt: PropTypes.string,
  error: PropTypes.string,
  finishedAt: PropTypes.string,
  reservationID: PropTypes.number,
};

ExpandedInfo.defaultProps = {
  createdAt: undefined,
  finishedAt: undefined,
  reservationID: undefined,
  error: undefined,
};

export default ExpandedInfo;
