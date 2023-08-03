import PropTypes from 'prop-types';
import React from 'react';
import { Alert, Select, SelectOption, Spinner } from '@patternfly/react-core';
import { useQuery, useQueries } from 'react-query';

import { AWS_PROVIDER, AZURE_PROVIDER, GCP_PROVIDER, MULTIPLE_REGION_SUPPORT } from '../../constants';
import { IMAGE_REGIONS_KEY } from '../../API/queryKeys';
import { fetchImageClones, fetchImageCloneStatus } from '../../API';
import { defaultRegionByProvider } from '../Common/helpers';

const RegionsSelect = ({ provider, currentRegion, composeID, onChange }) => {
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
    // enrich the cloned image data
    clonesStatus?.forEach((status, index) => {
      clonedImages[index] = { ...clonedImages[index], ...status?.options };
    });
    const availableImages = clonedImages?.filter((_, index) => clonesStatus[index].status === 'success');
    images.push(...availableImages);
  }

  const onSelect = (_, selection) => {
    const { id: imageID, ...imageAttrs } = images.find((image) => image.region === selection);
    onChange({ region: selection, imageID, ...imageAttrs });
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
      maxHeight="180px"
      isOpen={isOpen}
      selections={currentRegion}
      onToggle={onToggle}
      onSelect={onSelect}
      isDisabled={!MULTIPLE_REGION_SUPPORT.includes(provider)}
    >
      {images.map(({ id, region }) => (
        <SelectOption aria-label="Region item" key={id} value={region} />
      ))}
    </Select>
  );
};

RegionsSelect.propTypes = {
  provider: PropTypes.oneOf([AWS_PROVIDER, AZURE_PROVIDER, GCP_PROVIDER]).isRequired,
  composeID: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  currentRegion: PropTypes.string,
};

export default RegionsSelect;
