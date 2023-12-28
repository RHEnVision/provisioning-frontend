import React from 'react';
import { Spinner, HelperText, HelperTextItem } from '@patternfly/react-core';
import { Select, SelectOption } from '@patternfly/react-core/deprecated';
import { useQuery } from '@tanstack/react-query';

import { useWizardContext } from '../Common/WizardContext';
import { fetchLaunchTemplates } from '../../API';
import { TEMPLATES_KEY } from '../../API/queryKeys';

const TemplatesSelect = () => {
  const [{ chosenSource, chosenRegion, chosenTemplate }, setWizardContext] = useWizardContext();
  const [isOpen, setIsOpen] = React.useState(false);

  const {
    error,
    isInitialLoading: isLoading,
    data: templates,
  } = useQuery([TEMPLATES_KEY, `${chosenRegion}-${chosenSource}`], () => fetchLaunchTemplates(chosenSource, chosenRegion), {
    enabled: !!chosenSource && !!chosenRegion,
  });

  const onClear = () => {
    setWizardContext((prevState) => ({ ...prevState, chosenTemplate: undefined }));
  };

  const onSelect = (_, selectedTemplate, isPlaceholder) => {
    if (!isPlaceholder) {
      setWizardContext((prevState) => ({ ...prevState, chosenTemplate: templates.find((template) => template.name === selectedTemplate)?.id }));
    }
    setIsOpen(false);
  };

  const selectItemsMapper = () => templates.map(({ name, id }) => <SelectOption aria-label="template option" key={id} value={name}></SelectOption>);
  const chosenTemplateName = chosenTemplate && templates.find((template) => template.id === chosenTemplate)?.name;

  if (isLoading) {
    return <Spinner size="sm" aria-label="Loading templates" />;
  }

  return (
    <>
      <Select
        ouiaId="select_templates"
        isOpen={isOpen}
        direction="up"
        onToggle={(_event, openState) => setIsOpen(openState)}
        selections={chosenTemplateName}
        onSelect={onSelect}
        maxHeight="180px"
        placeholderText={error || templates?.length === 0 ? 'No template found' : 'Select templates'}
        aria-label="Select templates"
        clearSelectionsAriaLabel="clear template selection"
        onClear={onClear}
        isDisabled={error || templates?.length === 0}
        validated={error && 'error'}
      >
        {templates && selectItemsMapper()}
      </Select>
      {error && (
        <HelperText id="template-error-inline">
          <HelperTextItem variant="error">{`There are problems fetching templates: ${error?.message}`} </HelperTextItem>
        </HelperText>
      )}
    </>
  );
};

export default TemplatesSelect;
