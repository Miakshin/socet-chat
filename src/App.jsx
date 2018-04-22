import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Chat from './app/components/chat/Chat.jsx';
import Login from './app/components/login/Login.jsx';

const App = () => (
  <div>
    <Switch>
      <Route exact path="/" component={Login} />
      <Route path="/login" component={Login} />
      <Route path="/chat" component={Chat} />
    </Switch>
  </div>
);

export default App;
