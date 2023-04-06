import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';

import { Button, GridItem, Grid, Title, FormGroup, TextInput, Select, SelectOption, SelectVariant } from '@patternfly/react-core';
import { PageHeader, PageHeaderTitle } from '@redhat-cloud-services/frontend-components/PageHeader';
import axios from 'axios';

import './sample-page.scss';
import ProvisioningWizard from '../../Components/ProvisioningWizard';
import { AWS_PROVIDER, AZURE_PROVIDER } from '../../constants';

/**
This page demonstrates the provisioning UI wizard
 */

// This default AMI value is taken when no image builder api found
const IMAGE_BUILDER_URL = '/api/image-builder/v1/composes';

const SamplePage = () => {
  const [isWizardOpen, setWizardModal] = React.useState(false);
  const [images, setImages] = React.useState([]);
  const [chosenImage, setChosenImage] = React.useState({
    isTesting: true,
    id: undefined,
    name: undefined,
    provider: AWS_PROVIDER,
    architecture: undefined,
  });
  const [isImageSelectOpen, setImageSelect] = React.useState(false);
  const [isProviderSelectOpen, setProviderSelectOpen] = React.useState(false);

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
    const { id, request } = images.find((image) => image.image_name === selection);
    const { architecture, image_type } = request.image_requests[0];
    setChosenImage({ isTesting: true, id: id, name: selection, architecture: architecture, provider: image_type });
    setImageSelect(false);
  };

  const onInputChange = (value) => {
    setChosenImage({ ...chosenImage, id: value, name: 'manualy entered AMI', architecture: 'x86_64' });
  };
  const onProviderSelect = (evt, value) => {
    setChosenImage({ ...chosenImage, provider: value });
    setProviderSelectOpen(false);
  };

  const renderSelect = (images) => (
    <Select
      width="50%"
      variant={SelectVariant.single}
      placeholderText="Select an image"
      aria-label="Select Image"
      onToggle={onImageSelectionToggle}
      onSelect={onImageSelect}
      selections={chosenImage.name}
      isOpen={isImageSelectOpen}
    >
      {images?.map((option) => (
        <SelectOption key={option.id} value={option.image_name} description={`ID: ${option.id}`} />
      ))}
    </Select>
  );

  return (
    <React.Fragment>
      <PageHeader>
        <PageHeaderTitle title="Sample Provisioning App" />
        <p> Provisioning Demo </p>
      </PageHeader>
      <Grid hasGutter>
        {images && <GridItem>{renderSelect(images)}</GridItem>}
        <GridItem span={3}>
          <FormGroup label="Provider">
            <Select
              variant={SelectVariant.single}
              aria-label="Select Provider"
              ouiaId="select_provider"
              onToggle={(isOpen) => setProviderSelectOpen(isOpen)}
              onSelect={onProviderSelect}
              selections={chosenImage.provider}
              isOpen={isProviderSelectOpen}
            >
              <SelectOption key={AWS_PROVIDER} value={AWS_PROVIDER} />
              <SelectOption key={AZURE_PROVIDER} value={AZURE_PROVIDER} />
            </Select>
          </FormGroup>
        </GridItem>
        <GridItem span={6}>
          <FormGroup label="Image">
            <TextInput id="ami" ouiaId="image_id" value={chosenImage.id || ''} onChange={onInputChange} />
          </FormGroup>
        </GridItem>
        <GridItem>
          <Title headingLevel="h2" size="3xl"></Title>
          <Button variant="primary" onClick={() => setWizardModal(true)}>
            Open Wizard
          </Button>
          {isWizardOpen && <ProvisioningWizard isOpen={true} onClose={() => setWizardModal(false)} image={chosenImage} />}
        </GridItem>
      </Grid>
    </React.Fragment>
  );
};

export default withRouter(SamplePage);
