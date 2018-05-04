import React from 'react';
import { Link } from 'react-router-dom';

import './Login.css';

const Login = props => (
  <main>
    <form className="login">
      <h1 className="login__title">Login</h1>
      <input className="login__input" type="text" name="login" placeholder="Login" />
      <input className="login__input" type="password" name="pass" placeholder="password" />
      <input
        className="login__button"
        type="button"
        value="login"
        onClick={() => {
          props.history.push('/chat');
        }}
      />
      <p className="login__hint">
        Don't have a account?
        <Link className="login__reg-link" to="/registration">Registration</Link>
      </p>
    </form>
  </main>
);

export default Login;