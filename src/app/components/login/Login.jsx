import React from 'react';

import './Login.css'

const Login = () => {

  return(
    <main>
      <form className="login">
        <h1 className="login__title">Login</h1>
        <input className="login__input" type="text" name="login" placeholder="Login"/>
        <input className="login__input" type="password" name="pass" placeholder="password"/>
        <input className="login__button" type="button" value="login"onclick="location.href='http://localhost:3040/chat'"/>
        <p className="login__hint">Don't have a account? <a class="login__reg-link" href="#">Registration</a></p>
      </form>
    </main>
  )
}

export default Login;
