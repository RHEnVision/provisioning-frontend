import React from 'react';
import { FormSelect, FormSelectOption } from '@patternfly/react-core';

export const RegionsSelect = () => {
  return (
    <FormSelect isDisabled aria-label="Select region" value="">
      <FormSelectOption
        label="US - east"
        key="placeholder"
        isPlaceholder
        value=""
      ></FormSelectOption>
    </FormSelect>
  );
};
export default RegionsSelect;
