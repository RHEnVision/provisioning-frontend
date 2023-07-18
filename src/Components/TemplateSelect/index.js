import React from 'react';
import { Alert, Select, SelectOption, Spinner } from '@patternfly/react-core';
import { useQuery } from 'react-query';

import { useWizardContext } from '../Common/WizardContext';
import { fetchLaunchTemplates } from '../../API';
import { TEMPLATES_KEY } from '../../API/queryKeys';

const TemplatesSelect = () => {
  const [{ chosenSource, chosenRegion, chosenTemplate }, setWizardContext] = useWizardContext();
  const [isOpen, setIsOpen] = React.useState(false);

  const {
    error,
    isLoading,
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
  if (error) {
    return (
      <>
        <Alert ouiaId="select_template_alert" variant="warning" isInline title="There are problems fetching templates" />
        <Select ouiaId="select_template_empty" isDisabled placeholderText="No templates found" aria-label="Select template" />
      </>
    );
  }

  if (isLoading) {
    return <Spinner isSVG size="sm" aria-label="Loading templates" />;
  }

  return (
    <Select
      ouiaId="select_templates"
      isOpen={isOpen}
      onToggle={(openState) => setIsOpen(openState)}
      selections={chosenTemplateName}
      onSelect={onSelect}
      placeholderText={templates?.length === 0 ? 'No template found' : 'Select templates'}
      aria-label="Select templates"
      clearSelectionsAriaLabel="clear template selection"
      onClear={onClear}
      isDisabled={templates?.length === 0}
    >
      {templates && selectItemsMapper()}
    </Select>
  );
};

export default TemplatesSelect;
