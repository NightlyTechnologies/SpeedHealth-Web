import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import { SessionProvider } from '../hooks/session';

import Session from '../pages/Session';
import Dashboard from '../pages/Dashboard';

const Routes: React.FC = () => (
  <Switch>
    <SessionProvider>
      <Route path="/" exact component={Session} />
      <Route path="/dashboard" component={Dashboard} />
    </SessionProvider>
  </Switch>
);

export default Routes;
