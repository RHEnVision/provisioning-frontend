import PropTypes from 'prop-types';
import React from 'react';
import { ExpandableSection, DescriptionList, DescriptionListTerm, DescriptionListGroup, DescriptionListDescription } from '@patternfly/react-core';

import { useSourcesData } from '../Common/Hooks/sources';
import { useWizardContext } from '../Common/WizardContext';
import { instanceType, region } from '../ProvisioningWizard/steps/ReservationProgress/helpers';
import { useQuery } from '@tanstack/react-query';
import { fetchLaunchTemplates } from '../../API';
import { humanizeProvider } from '../Common/helpers';
import { TEMPLATES_KEY } from '../../API/queryKeys';
import { AZURE_PROVIDER } from '../../constants';

const LaunchDescriptionList = ({ imageName }) => {
  const [
    {
      chosenRegion,
      chosenSshKeyName,
      uploadedKey,
      chosenInstanceType,
      chosenNumOfInstances,
      chosenSource,
      sshPublicName,
      provider,
      chosenTemplate,
      azureResourceGroup,
    },
  ] = useWizardContext();
  const { sources } = useSourcesData(provider);
  const { data: templates } = useQuery([TEMPLATES_KEY, `${chosenRegion}-${chosenSource}`], () => fetchLaunchTemplates(chosenSource, chosenRegion), {
    enabled: !!chosenSource && !!chosenRegion,
  });

  const [isExpanded, setIsExpanded] = React.useState(true);
  const onToggle = (isExpanded) => {
    setIsExpanded(isExpanded);
  };

  const getChosenSourceName = () => sources?.find((source) => source.id === chosenSource).name;
  const templateName = templates?.find((template) => template.id === chosenTemplate)?.name;
  const regionLabel = region(provider).charAt(0).toUpperCase() + region(provider).slice(1);
  const providerInstanceType = instanceType(provider).replace('_', ' ');
  const instanceTypeLabel = providerInstanceType.charAt(0).toUpperCase() + providerInstanceType.slice(1);

  return (
    <ExpandableSection toggleText={provider && humanizeProvider(provider)} onToggle={onToggle} isExpanded={isExpanded} isIndented>
      <DescriptionList isHorizontal>
        <DescriptionListGroup>
          <DescriptionListTerm>Image</DescriptionListTerm>
          <DescriptionListDescription>{imageName}</DescriptionListDescription>
        </DescriptionListGroup>
        <DescriptionListGroup>
          <DescriptionListTerm>Account</DescriptionListTerm>
          <DescriptionListDescription>{getChosenSourceName()}</DescriptionListDescription>
        </DescriptionListGroup>
        {provider === AZURE_PROVIDER && azureResourceGroup && (
          <DescriptionListGroup>
            <DescriptionListTerm>Resource group</DescriptionListTerm>
            <DescriptionListDescription>{azureResourceGroup}</DescriptionListDescription>
          </DescriptionListGroup>
        )}
        <DescriptionListGroup>
          <DescriptionListTerm>{regionLabel}</DescriptionListTerm>
          <DescriptionListDescription>{chosenRegion}</DescriptionListDescription>
        </DescriptionListGroup>
        <DescriptionListGroup>
          <DescriptionListTerm>{instanceTypeLabel}</DescriptionListTerm>
          <DescriptionListDescription>{chosenInstanceType}</DescriptionListDescription>
        </DescriptionListGroup>
        <DescriptionListGroup>
          <DescriptionListTerm>Count</DescriptionListTerm>
          <DescriptionListDescription>{chosenNumOfInstances}</DescriptionListDescription>
        </DescriptionListGroup>
        <DescriptionListGroup>
          <DescriptionListTerm>{uploadedKey ? 'New SSH key' : 'Existing SSH key'}</DescriptionListTerm>
          <DescriptionListDescription>{uploadedKey ? sshPublicName : chosenSshKeyName}</DescriptionListDescription>
        </DescriptionListGroup>
        {chosenTemplate && (
          <DescriptionListGroup>
            <DescriptionListTerm>Launch template</DescriptionListTerm>
            <DescriptionListDescription>{templateName}</DescriptionListDescription>
          </DescriptionListGroup>
        )}
      </DescriptionList>
    </ExpandableSection>
  );
};

LaunchDescriptionList.propTypes = {
  imageName: PropTypes.string.isRequired,
};
export default LaunchDescriptionList;
