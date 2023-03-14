import PropTypes from 'prop-types';
import React from 'react';
import { Alert, Select, SelectOption, Spinner } from '@patternfly/react-core';
import { useQuery, useQueries } from 'react-query';

import { useWizardContext } from '../Common/WizardContext';
import { IMAGE_REGIONS_KEY } from '../../API/queryKeys';
import { fetchImageClones, fetchImageCloneStatus } from '../../API';
import { defaultRegionByProvider } from '../Common/helpers';

const RegionsSelect = ({ composeID }) => {
  const [{ provider, chosenRegion }, setWizardContext] = useWizardContext();
  const [isOpen, setIsOpen] = React.useState(false);

  const {
    isError,
    isLoading,
    data: clonedImages,
  } = useQuery([IMAGE_REGIONS_KEY, composeID], () => fetchImageClones(composeID), {
    select: (images) => images.data?.map((image) => ({ id: image.id, region: image.request.region })),
  });

  const clonesStatusQueries = useQueries(
    clonedImages?.map((clonedImage) => ({ queryKey: [IMAGE_REGIONS_KEY, clonedImage.id], queryFn: () => fetchImageCloneStatus(clonedImage.id) })) ||
      []
  );
  const isCloneStatusLoading = clonesStatusQueries.some((clone) => clone.isLoading);
  const defaultRegion = { region: provider && defaultRegionByProvider(provider), id: composeID };
  const images = [defaultRegion];
  // filter successful clones images
  if (clonesStatusQueries.length && clonesStatusQueries.every((cloneQuery) => cloneQuery.isLoading === false)) {
    const clonesStatus = clonesStatusQueries?.map((query) => query?.data);
    const filteredCloned = clonedImages?.filter((_, index) => clonesStatus[index].status === 'success');
    images.push(...filteredCloned);
  }

  const onSelect = (_, selection) => {
    setWizardContext((prevState) => ({
      ...prevState,
      chosenRegion: selection,
      chosenImageID: images.find((image) => image.region === selection)?.id,
    }));
    setIsOpen(false);
  };

  const onToggle = (isOpen) => {
    setIsOpen(isOpen);
  };

  if (isError) {
    return (
      <>
        <Alert ouiaId="regions_alert" variant="warning" isInline title="There are problems fetching image's regions" />
        <Select ouiaId="regions_empty" isDisabled placeholderText="No regions have been found" />
      </>
    );
  }

  if (isLoading || isCloneStatusLoading) {
    return <Spinner isSVG size="sm" aria-label="loading available regions" />;
  }

  return (
    <Select
      ouiaId="select_regions"
      variant="typeahead"
      aria-label="Select region"
      label="Select region"
      maxHeight="450px"
      isOpen={isOpen}
      selections={chosenRegion}
      onToggle={onToggle}
      onSelect={onSelect}
      isDisabled={(clonedImages?.length || 0) <= 1}
    >
      {images.map(({ id, region }) => (
        <SelectOption aria-label="Region item" key={id} value={region} />
      ))}
    </Select>
  );
};

RegionsSelect.propTypes = {
  composeID: PropTypes.string.isRequired,
};

export default RegionsSelect;
