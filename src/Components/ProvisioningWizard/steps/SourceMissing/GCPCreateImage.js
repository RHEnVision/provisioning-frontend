import PropTypes from 'prop-types';
import React from 'react';
import { ClipboardCopy, StackItem } from '@patternfly/react-core';
import { imageProps } from '../../helpers';
import './GCP.scss';

const createImageCommand = (options) => {
  return `gcloud compute images create ${options.image_name}-copy --source-image-project ${options.project_id} --source-image ${options.image_name}`;
};

const GCPCreateImage = ({ text, image }) => {
  return (
    <>
      <StackItem>
        <strong>{text}</strong>
      </StackItem>
      <StackItem isFilled>
        <ClipboardCopy
          className="custom-clipboard-copy"
          hoverTip="Copy"
          clickTip="Copied"
          ouiaId="gcp-copy-image"
          data-testid="gcp-copy-image"
          variant="expansion"
          isReadOnly
        >
          {createImageCommand(image.uploadStatus.options)}
        </ClipboardCopy>
      </StackItem>
    </>
  );
};

GCPCreateImage.propTypes = {
  image: imageProps,
  text: PropTypes.string,
};

export default GCPCreateImage;
