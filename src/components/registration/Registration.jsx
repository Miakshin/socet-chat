import React, { Component } from 'react';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { printErr } from '../../common/utils';
import { bindActionCreators } from 'redux';
import * as actions from '../../store/redux/registration/actions';

import './Registration.css';

const Regesrtration = (props) => {

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    switch (name) {
      case 'login':
        props.updateLogin(value);
        break;
      case 'name':
        props.updateName(value);
        break;
      case 'pass':
        props.updatePass(value);
        break;
      case 'confirmPass':
        props.updateConfirmPass(value);
        break;
    }
    validateInput(name, value);
  };

  const validateInput = (name, value) => {
    const form = document.querySelector('.registration').elements;
    const injectErr = 'Pleas don`t hack this site';
    if (value.length > 3) {
      if (stringContainsInject(value)) {
        printErr(injectErr);
        form[name].className = 'registration__input invalid';
      } else if (value.length < 4) {
        form[name].className = 'registration__input invalid';
      } else {
        form[name].className = 'registration__input valid';
      }
    } else if (value.length > 0) {
      form[name].className = 'registration__input invalidLength';
    }
  };

  const createUser = (e) => {
    e.preventDefault()
    const errMessage = 'Error.Check your internet connection';
    axios.post('http://localhost:3040/user/create', {
      login: props.registration.login,
      password: props.registration.pass,
      name: props.registration.name,
    })
      .then(({ id, name }) => {
        window.localStorage.setItem('id', id);
        window.localStorage.setItem('name', name);
        props.history.push('/chat');
        props.reset();
      })
      .catch(() => printErr(errMessage));
  };

  const formIsDone = () => {
    if (isPaswordsEqual()) {
      return (props.registration.login.length > 3) && (props.registration.name.length > 3) ?
        true : false
    } else {
      return false
    }
  };

  const stringContainsInject = (string) => {
    const regExp = new RegExp('<script>', 'i');
    return string.match(regExp);
  };

  const isPaswordsEqual = () => {
    if (props.registration.pass.length > 3 && props.registration.confirmPass.length > 3) {
    return props.registration.pass === props.registration.confirmPass ?
      true: false
    } else {
      return false
    }
  };

  const linkToLogin = () => {
    props.history.push('/login');
  };

  return (
    <main>
      <form onSubmit={createUser} className="registration">
        <h1 className="registration__title">Create new account</h1>
        <input
          className="registration__input"
          type="text"
          name="login"
          value={props.registration.regestralogin}
          placeholder="input your login"
          onChange={handleChange}
        />
        <input
          className="registration__input"
          type="text"
          name="name"
          value={props.registration.name}
          placeholder="input your name"
          onChange={handleChange}
        />
        <input
          className="registration__input"
          onChange={handleChange}
          type="password"
          name="pass"
          value={props.registration.pass}
          placeholder="input your password"
        />
        <input
          className="registration__input"
          onChange={handleChange}
          type="password"
          name="confirmPass"
          value={props.registration.confirmPass}
          placeholder="confirm password"
        />
        <p
          className="registration__pass-err-test"
          hidden={(props.registration.pass.length < 1 || props.registration.confirmPass.length < 1) || isPaswordsEqual()}
        >
            Passwords do not match
        </p>
        <input
          className="registration__create-button"
          type="submit"
          value="Create account"
          disabled={!formIsDone()}
        />
        <Link
          to="/login"
          className="registration__to-login-button"
        >
            Sing in
        </Link>
      </form>
    </main>
  );
};

const mapStateToProps = state => ({
  registration: state.registration,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  updateLogin: value => actions.updateLogin(value),
  updateName: value => actions.updateName(value),
  updatePass: value => actions.updatePass(value),
  updateConfirmPass: value => actions.updateConfirmPass(value),
  reset: () => actions.reset(),
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Regesrtration);
