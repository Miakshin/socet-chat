import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Chat from './components/chat/Chat';
import Login from './components/login/Login';
import Registration from './components/registration/Registration';

const App = () => (
  <div>
    <Switch>
      <Route exact path="/" component={Login} />
      <Route path="/login" component={Login} />
      <Route path="/chat" component={Chat} />
      <Route path="/registration" component={Registration} />
    </Switch>
  </div>
);

export default App;
