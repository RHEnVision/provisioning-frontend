import React, { Fragment, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Routes } from './Routes';
import './App.scss';

import { getRegistry } from '@redhat-cloud-services/frontend-components-utilities/Registry';
import NotificationsPortal from '@redhat-cloud-services/frontend-components-notifications/NotificationPortal';
import { notificationsReducer } from '@redhat-cloud-services/frontend-components-notifications/redux';
import { useChrome } from '@redhat-cloud-services/frontend-components/useChrome';

const App = (props) => {
  const navigate = useNavigate();
  const { on: onChromeEvent } = useChrome();

  useEffect(() => {
    const registry = getRegistry();
    const unregister = onChromeEvent('APP_NAVIGATION', (event) => navigate(`/${event.navId}`));
    registry.register({ notifications: notificationsReducer });

    return () => {
      unregister?.();
    };
  }, []);

  return (
    <Fragment>
      <NotificationsPortal />
      <Routes childProps={props} />
    </Fragment>
  );
};

export default App;
