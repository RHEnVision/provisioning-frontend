import React, { Fragment, useEffect } from 'react';
import { Routes } from './Routes';
import './App.scss';

import { getRegistry } from '@redhat-cloud-services/frontend-components-utilities/Registry';
import NotificationsPortal from '@redhat-cloud-services/frontend-components-notifications/NotificationPortal';
import { notificationsReducer } from '@redhat-cloud-services/frontend-components-notifications/redux';
import { useChrome } from '@redhat-cloud-services/frontend-components/useChrome';

const App = (props) => {
  const { updateDocumentTitle } = useChrome();
  useEffect(() => {
    const registry = getRegistry();
    registry.register({ notifications: notificationsReducer });
    updateDocumentTitle('Provisioning sample app');
  }, []);

  return (
    <Fragment>
      <NotificationsPortal />
      <Routes childProps={props} />
    </Fragment>
  );
};

export default App;
