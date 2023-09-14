import PropTypes from 'prop-types';
import React from 'react';
import { ClipboardCopy, StackItem } from '@patternfly/react-core';
import { imageProps } from '../../helpers';
import './GCPConsoleLaunch.scss';

const launchInstanceCommand = (options) => {
  return `gcloud compute instances create ${options.image_name}-instance --image-project ${options.project_id} --image ${options.image_name}`;
};

const GCPConsoleLaunch = ({ text, image }) => {
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
          ouiaId="gcp-launch-instance"
          variant="expansion"
          isReadOnly
        >
          {launchInstanceCommand(image.uploadStatus.options)}
        </ClipboardCopy>
      </StackItem>
    </>
  );
};

GCPConsoleLaunch.propTypes = {
  image: imageProps,
  text: PropTypes.string,
};

export default GCPConsoleLaunch;
