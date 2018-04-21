import React from 'react';
import { Route} from 'react-router-dom';
import Chat from './app/components/chat/Chat.jsx';
import Login from './app/components/login/Login.jsx';

const App = () => (
      <Login />
);

export default App;
//
// <Route exact path="/" component={Login} />
// <Route path='/login' component={Login} />
// <Route path='/chat' component={Chat} />
