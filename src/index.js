import React from 'react';
import { render } from 'react-dom';
import { HashRouter } from 'react-router-dom';
import App from './App';

import './index.css';

const target = document.querySelector('#root');

render(
  <HashRouter>
    <App />
  </HashRouter>
  , target
);
