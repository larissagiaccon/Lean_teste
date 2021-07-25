import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { SignUp } from '../pages/SignUp';
import { Dashboard } from '../pages/Dashboard';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={SignUp} />

    <Route path="/dashboard" component={Dashboard} />
  </Switch>
);

export default Routes;
