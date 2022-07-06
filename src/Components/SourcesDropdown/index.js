import React from 'react';
import {
  Dropdown,
  DropdownToggle,
  DropdownItem,
  Spinner,
} from '@patternfly/react-core';
import { useQuery } from 'react-query';

import { SOURCES_QUERY_KEY } from '../../API/consts';
import { fetchSourcesList } from '../../API';
import { useGlobalState } from '../Common/GlobalState';

const SourcesDropdown = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [globalState, setGlobalState] = useGlobalState();

  const {
    isLoading,
    error,
    data: sources,
  } = useQuery(SOURCES_QUERY_KEY, fetchSourcesList);

  const onToggle = (isOpen) => {
    setIsOpen(isOpen);
  };
  const onFocus = () => {
    const element = document.getElementById('toggle-secondary');
    element.focus();
  };
  const onSelect = () => {
    setIsOpen(false);
    onFocus();
  };

  const sourcesDetails = (id) => {
    setGlobalState((prevState) => ({ ...prevState, chosenSource: id }));
    console.log(`${globalState.chosenSource} was chosen`);
  };
  const dropdownItemsMapper = () => {
    if (isLoading)
      return [
        <DropdownItem key="loading">
          <Spinner aria-label="Loading sources list" size="sm" isSVG />
        </DropdownItem>,
      ];
    if (sources?.length > 0) {
      return sources.map(({ name, id }) => (
        <DropdownItem
          aria-label="Source item"
          onClick={(id) => sourcesDetails(id)}
          key={id}
        >
          {name}
        </DropdownItem>
      ));
    }
    return [];
  };

  if (error) {
    // TODO: error handling, notifications
    console.log('Failed to fetch sources list');
  }

  return (
    // TODO: Move the globalProvider to the wizard component
    <Dropdown
      onSelect={onSelect}
      toggle={
        <DropdownToggle
          id="toggle-secondary"
          toggleVariant="secondary"
          onToggle={onToggle}
        >
          Sources
        </DropdownToggle>
      }
      isOpen={isOpen}
      dropdownItems={dropdownItemsMapper()}
    />
  );
};

export default SourcesDropdown;
