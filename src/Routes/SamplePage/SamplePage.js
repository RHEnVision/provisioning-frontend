import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';

import { Button, StackItem, Stack, Title } from '@patternfly/react-core';
import { Main } from '@redhat-cloud-services/frontend-components/Main';
import {
  PageHeader,
  PageHeaderTitle,
} from '@redhat-cloud-services/frontend-components/PageHeader';

import './sample-page.scss';
import ProvisioningWizard from '../../Components/Wizard';

/**
 * A smart component that handles all the api calls and data needed by the dumb components.
 * Smart components are usually classes.
 *
 * https://reactjs.org/docs/components-and-props.html
 * https://medium.com/@thejasonfile/dumb-components-and-smart-components-e7b33a698d43
 */
const SamplePage = () => {
  const [isWizardOpen, setWizardModal] = React.useState(false);

  useEffect(() => {
    insights?.chrome?.appAction?.('sample-page');
  }, []);

  return (
    <React.Fragment>
      <PageHeader>
        <PageHeaderTitle title="Sample Insights App" />
        <p> Provisioning Demo </p>
      </PageHeader>
      <Main>
        <Stack hasGutter>
          <StackItem>
            <Title headingLevel="h2" size="3xl"></Title>
            <Button variant="primary" onClick={() => setWizardModal(true)}>
              Open Wizard
            </Button>
            <ProvisioningWizard
              isOpen={isWizardOpen}
              onClose={() => setWizardModal(false)}
            />
          </StackItem>
        </Stack>
      </Main>
    </React.Fragment>
  );
};

export default withRouter(SamplePage);
