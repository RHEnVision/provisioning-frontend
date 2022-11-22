import PropTypes from 'prop-types';
import React from 'react';
import { Alert, Select, SelectOption, Spinner } from '@patternfly/react-core';
import { useQuery } from 'react-query';

import { useWizardContext } from '../Common/WizardContext';
import { IMAGE_REGIONS_KEY } from '../../API/queryKeys';
import { fetchImageClones } from '../../API';

const RegionsSelect = ({ composeID }) => {
  const [wizardContext, setWizardContext] = useWizardContext();
  const [isOpen, setIsOpen] = React.useState(false);
  const {
    isError,
    isLoading,
    data: images,
  } = useQuery([IMAGE_REGIONS_KEY, composeID], () => fetchImageClones(composeID), {
    select: (images) => images.data.map((image) => ({ id: image.id, region: image.request.region })),
  });

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
        <Select ouiaId="regions_empty" isDisabled placeholderText="No regions have found" />
      </>
    );
  }

  if (isLoading) {
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
      selections={wizardContext.chosenRegion}
      onToggle={onToggle}
      onSelect={onSelect}
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
