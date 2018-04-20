import React from 'react';
import { Route} from 'react-router-dom';
import Login from './app/components/chat/Chat.jsx';
import Chat from './app/components/login/Login.jsx';

const App = () => (
    <div>
      <Login />
    </div>
);

export default App;


// <Route exact path="/" component={Login} />
// <Route path='/login' component={Login} />
// <Route path='/chat' component={Chat} />
