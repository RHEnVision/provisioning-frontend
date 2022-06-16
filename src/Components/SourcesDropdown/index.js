import React from 'react';
import { Dropdown, DropdownToggle, DropdownItem } from '@patternfly/react-core';
import { provisioningUrl } from '../../API/helpers';

const SourcesDropdown = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [sources, setSources] = React.useState([]);
  const onToggle = (isOpen) => {
    fetchSources();
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

  //TODO: move to react-query
  const fetchSources = async () => {
    const response = await fetch(provisioningUrl('sources'));
    const json = await response.json();
    setSources(json);
  };

  // TODO: add the chosen source to an global/external state
  const sourcesDetails = () => console.log(`${name} was chosen`);

  const dropdownItemsMapper = () =>
    sources.map(({ name, id }) => (
      <DropdownItem onClick={sourcesDetails} key={id}>
        {name}
      </DropdownItem>
    ));
  if (sources.length > 0) {
    const items = dropdownItemsMapper();
    return (
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
        dropdownItems={items}
      />
    );
  }
  return (
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
      dropdownItems={[]}
    />
  );
};

export default SourcesDropdown;
