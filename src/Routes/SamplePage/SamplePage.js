import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';

import {
  Button,
  StackItem,
  Stack,
  Title,
  FormGroup,
  TextInput,
  Select,
  SelectOption,
  SelectVariant,
} from '@patternfly/react-core';
import { Main } from '@redhat-cloud-services/frontend-components/Main';
import {
  PageHeader,
  PageHeaderTitle,
} from '@redhat-cloud-services/frontend-components/PageHeader';
import axios from 'axios';

import './sample-page.scss';
import ProvisioningWizard from '../../Components/Wizard';

/**
This page demonstrates the provisioning UI wizard
 */

// This default AMI value is taken when no image builder api found
const IMAGE_BUILDER_URL = '/api/image-builder/v1/composes';

const SamplePage = () => {
  const [isWizardOpen, setWizardModal] = React.useState(false);
  const [images, setImages] = React.useState([]);
  const [chosenImage, setChosenImage] = React.useState({
    id: undefined,
    name: undefined,
  });
  const [isImageSelectOpen, setImageSelect] = React.useState(false);

  useEffect(() => {
    const fetchImagesFromIB = async () => {
      try {
        const { data } = await axios.get(IMAGE_BUILDER_URL);
        setImages(data?.data);
      } catch (e) {
        console.debug('No image builder api has been found');
        setImages(false);
      }
    };

    insights?.chrome?.appAction?.('sample-page');
    fetchImagesFromIB();
  }, []);

  const onImageSelectionToggle = (isOpen) => {
    setImageSelect(isOpen);
  };

  const onImageSelect = (event, selection, isPlaceholder) => {
    if (isPlaceholder) return;
    const { id } = images.find((image) => image.image_name === selection);
    setChosenImage({ id, name: selection });
    setImageSelect(false);
  };

  const onInputChange = (value) => {
    setChosenImage({ id: value, name: 'manualy entered AMI' });
  };

  const renderSelect = (images) => (
    <Select
      width="33%"
      variant={SelectVariant.single}
      placeholderText="Select an image"
      aria-label="Select Image"
      onToggle={onImageSelectionToggle}
      onSelect={onImageSelect}
      selections={chosenImage.name}
      isOpen={isImageSelectOpen}
    >
      {images?.map((option) => (
        <SelectOption
          key={option.id}
          value={option.image_name}
          description={`ID: ${option.id}`}
        />
      ))}
    </Select>
  );

  let imageInput;
  if (images) {
    imageInput = renderSelect(images);
  } else {
    imageInput = (
      <FormGroup label="Image AMI">
        <TextInput
          id="ami"
          value={chosenImage.id || ''}
          onChange={onInputChange}
        />
      </FormGroup>
    );
  }

  return (
    <React.Fragment>
      <PageHeader>
        <PageHeaderTitle title="Sample Provisioning App" />
        <p> Provisioning Demo </p>
      </PageHeader>
      <Main>
        <Stack hasGutter>
          <StackItem>{imageInput}</StackItem>
          <StackItem>
            <Title headingLevel="h2" size="3xl"></Title>
            <Button variant="primary" onClick={() => setWizardModal(true)}>
              Open Wizard
            </Button>
            <ProvisioningWizard
              isOpen={isWizardOpen}
              onClose={() => setWizardModal(false)}
              image={chosenImage}
            />
          </StackItem>
        </Stack>
      </Main>
    </React.Fragment>
  );
};

export default withRouter(SamplePage);
