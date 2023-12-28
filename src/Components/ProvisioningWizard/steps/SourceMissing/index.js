import PropTypes from 'prop-types';
import React from 'react';
import {
  Button,
  EmptyState,
  EmptyStateBody,
  EmptyStateIcon,
  EmptyStateActions,
  EmptyStateFooter,
  EmptyStateHeader,
  Spinner,
  Stack,
  StackItem,
} from '@patternfly/react-core';
import { PlusCircleIcon, ExclamationCircleIcon } from '@patternfly/react-icons';
import { useChrome } from '@redhat-cloud-services/frontend-components/useChrome';

import DirectProviderLink from './DirectProviderLink';
import { imageProps } from '../../helpers.js';
import './SourceMissing.scss';

const failedToFetchTitle = 'Failed to fetch available sources.';
const missingSourceTitle = 'No sources available';
const missingSourceDescription = (
  <>
    <p>There are no sources available for use with this image.</p>
    <p>Sources are used to link your cloud provider account and enable launching directly from Red Hat console.</p>
    <p>Create a source, grant an existing source launch functionality,</p>
    <p>or launch directly from the cloud provider console.</p>
  </>
);
// TODO: enable once documentation is available.
// Learn more about launching images [external link icon].

const LoadingState = () => (
  <EmptyState>
    <EmptyStateHeader headingLevel="h4" titleText="Loading available Sources" icon={<EmptyStateIcon icon={Spinner} />} />
  </EmptyState>
);

const SourceMissing = ({ error, image }) => {
  const { isBeta } = useChrome();
  return (
    <EmptyState>
      <EmptyStateHeader
        headingLevel="h4"
        titleText={(error && failedToFetchTitle) || missingSourceTitle}
        icon={<EmptyStateIcon icon={error ? ExclamationCircleIcon : PlusCircleIcon} />}
      />
      <EmptyStateBody>{error?.message || missingSourceDescription}</EmptyStateBody>
      <EmptyStateFooter>
        <EmptyStateActions>
          <Button variant="primary" component="a" target="_blank" href={`${isBeta() ? '/preview' : ''}/settings/sources/new`}>
            Create Source
          </Button>
        </EmptyStateActions>
        <EmptyStateActions>
          <Stack>
            <StackItem className="sources-empty-state-divider">or</StackItem>
            <StackItem>
              <DirectProviderLink image={image} />
            </StackItem>
          </Stack>
        </EmptyStateActions>
      </EmptyStateFooter>
    </EmptyState>
  );
};

SourceMissing.propTypes = {
  error: PropTypes.string,
  image: imageProps,
};

const LoadingWrapper = ({ isLoading, ...props }) => (isLoading ? <LoadingState /> : <SourceMissing {...props} />);

LoadingWrapper.propTypes = {
  error: PropTypes.string,
  isLoading: PropTypes.bool,
  image: imageProps,
};

export default LoadingWrapper;
