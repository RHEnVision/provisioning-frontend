import React from 'react';
import { FormSelect, FormSelectOption } from '@patternfly/react-core';
import { useWizardContext } from '../Common/WizardContext';
export const RegionsSelect = () => {
  const [wizardContext] = useWizardContext();
  return (
    <FormSelect
      ouiaId="select_region"
      isDisabled
      aria-label="Select region"
      value=""
    >
      <FormSelectOption
        label={wizardContext.chosenRegion}
        key="placeholder"
        isPlaceholder
        value=""
      ></FormSelectOption>
    </FormSelect>
  );
};
export default RegionsSelect;
