import PropTypes from 'prop-types';
import React from 'react';
import { Button, EmptyState, EmptyStateHeader, EmptyStateBody, EmptyStateIcon, EmptyStateFooter, EmptyStateActions } from '@patternfly/react-core';
import { LockIcon } from '@patternfly/react-icons';
import DirectProviderLink from '../SourceMissing/DirectProviderLink';
import { imageProps } from '../../helpers';

const missingPermissionTitle = 'Access permissions needed';
const missingPermissionDescription = (
  <>
    <p>To launch this image, contact your org admin to adjust your launch permissions. </p>
    <p>Alternatively, launch directly from the cloud provider console.</p>
  </>
);

const PermissionMissing = ({ image, onClose }) => {
  return (
    <EmptyState>
      <EmptyStateHeader titleText={missingPermissionTitle} icon={<EmptyStateIcon icon={LockIcon} />} />
      <EmptyStateBody>{missingPermissionDescription}</EmptyStateBody>
      <DirectProviderLink image={image} />
      <EmptyStateFooter>
        <EmptyStateActions>
          <Button variant="link" onClick={onClose}>
            Close
          </Button>
        </EmptyStateActions>
      </EmptyStateFooter>
    </EmptyState>
  );
};

PermissionMissing.propTypes = {
  image: imageProps,
  onClose: PropTypes.func.isRequired,
};

export default PermissionMissing;
