import React from 'react';
import {
  DescriptionList,
  DescriptionListTerm,
  DescriptionListGroup,
  DescriptionListDescription,
} from '@patternfly/react-core';
import { useGlobalState } from '../Common/GlobalState';
import { useQuery } from 'react-query';
import { SOURCES_QUERY_KEY } from '../../API/queryKeys';
import { fetchSourcesList } from '../../API';

const DescriptionListAWS = () => {
  const [globalState] = useGlobalState();
  const { error, data: sources } = useQuery(
    SOURCES_QUERY_KEY,
    fetchSourcesList
  );

  if (error) {
    // TODO: error handling, notifications
    console.log('Failed to fetch sources list');
  }

  const getChosenSourceName = () =>
    sources.find((source) => source.id === globalState.chosenSource).name;

  return (
    <DescriptionList isHorizontal>
      <DescriptionListGroup>
        <DescriptionListTerm>Account</DescriptionListTerm>
        <DescriptionListDescription>
          {getChosenSourceName()}
        </DescriptionListDescription>
      </DescriptionListGroup>
      <DescriptionListGroup>
        <DescriptionListTerm>Region</DescriptionListTerm>
        <DescriptionListDescription>US - east</DescriptionListDescription>
      </DescriptionListGroup>
      <DescriptionListGroup>
        <DescriptionListTerm>Instance type</DescriptionListTerm>
        <DescriptionListDescription>
          {globalState.chosenInstanceType}
        </DescriptionListDescription>
      </DescriptionListGroup>
      <DescriptionListGroup>
        <DescriptionListTerm>Count</DescriptionListTerm>
        <DescriptionListDescription>
          {globalState.chosenNumOfInstances}
        </DescriptionListDescription>
      </DescriptionListGroup>
      <DescriptionListGroup>
        <DescriptionListTerm>SSH key</DescriptionListTerm>
        <DescriptionListDescription>WIP</DescriptionListDescription>
      </DescriptionListGroup>
    </DescriptionList>
  );
};
export default DescriptionListAWS;
