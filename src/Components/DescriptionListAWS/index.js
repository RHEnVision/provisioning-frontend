import PropTypes from 'prop-types';
import React from 'react';
import { DescriptionList, DescriptionListTerm, DescriptionListGroup, DescriptionListDescription } from '@patternfly/react-core';

import { useQuery } from 'react-query';
import { SOURCES_QUERY_KEY } from '../../API/queryKeys';
import { fetchSourcesList } from '../../API';
import { useWizardContext } from '../Common/WizardContext';

const PROVIDER = 'aws';
const DescriptionListAWS = ({ imageName }) => {
  const [wizardContext] = useWizardContext();
  const { error, data: sources } = useQuery(SOURCES_QUERY_KEY, () => fetchSourcesList(PROVIDER));

  if (error) {
    // TODO: error handling, notifications
    console.log('Failed to fetch sources list');
  }

  const getChosenSourceName = () => sources?.find((source) => source.id === wizardContext.chosenSource).name;

  return (
    <DescriptionList isHorizontal>
      <DescriptionListGroup>
        <DescriptionListTerm>Image</DescriptionListTerm>
        <DescriptionListDescription>{imageName}</DescriptionListDescription>
      </DescriptionListGroup>
      <DescriptionListGroup>
        <DescriptionListTerm>Account</DescriptionListTerm>
        <DescriptionListDescription>{getChosenSourceName()}</DescriptionListDescription>
      </DescriptionListGroup>
      <DescriptionListGroup>
        <DescriptionListTerm>Region</DescriptionListTerm>
        <DescriptionListDescription>{wizardContext.chosenRegion}</DescriptionListDescription>
      </DescriptionListGroup>
      <DescriptionListGroup>
        <DescriptionListTerm>Instance type</DescriptionListTerm>
        <DescriptionListDescription>{wizardContext.chosenInstanceType}</DescriptionListDescription>
      </DescriptionListGroup>
      <DescriptionListGroup>
        <DescriptionListTerm>Count</DescriptionListTerm>
        <DescriptionListDescription>{wizardContext.chosenNumOfInstances}</DescriptionListDescription>
      </DescriptionListGroup>
      <DescriptionListGroup>
        <DescriptionListTerm>{wizardContext.uploadedKey ? 'New SSH key' : 'Existing SSH key'}</DescriptionListTerm>
        <DescriptionListDescription>
          {wizardContext.uploadedKey ? wizardContext.sshPublicName : wizardContext.chosenSshKeyName}
        </DescriptionListDescription>
      </DescriptionListGroup>
    </DescriptionList>
  );
};

DescriptionListAWS.propTypes = {
  imageName: PropTypes.string.isRequired,
};
export default DescriptionListAWS;
