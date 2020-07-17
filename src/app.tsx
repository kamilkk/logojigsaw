import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';

import history from './components/history';
import GamePage from './Pages_/game-page';
import LoginPage from './Pages_/login-page';

const App: React.FC = () => {
  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/" component={GamePage} />
        <Route exact path="/authorize" component={LoginPage} />
      </Switch>
    </Router>
  );
};

export default App;
