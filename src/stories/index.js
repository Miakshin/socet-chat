import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';
import Ligin from '../components/login/Login';
import Chat from '../components/chat/Chat';
import Registration from '../components/registration/Registration';
import { Provider } from 'react-redux';
import store, { history } from '../store';
import { ConnectedRouter } from 'react-router-redux';

import { Button, Welcome } from '@storybook/react/demo';

storiesOf('Button', module)
  .add('with text', () => <Button onClick={action('clicked')}>Hello Button</Button>)
  .add('with some emoji', () => (
    <Button onClick={action('clicked')}>
      <span role="img" aria-label="so cool">
        😀 😎 👍 💯
      </span>
    </Button>
  ));

storiesOf('Ligin', module)
  .add('initial state', () => (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Ligin />
      </ConnectedRouter>
    </Provider>
  ));

storiesOf('Chat', module)
  .add('initial state', () => (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Chat />
      </ConnectedRouter>
    </Provider>
  ));

storiesOf('Registration', module)
  .add('initial state', () => (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Registration />
      </ConnectedRouter>
    </Provider>
  ));
