import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';

import './index.css';

const target = document.querySelector('#root');

render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
  , target,
);
