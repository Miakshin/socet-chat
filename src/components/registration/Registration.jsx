import React, { Component } from 'react';
import axios from 'axios';
import { printErr } from '../../common/utils';

import './Registration.css';

export default class Regesrtration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: '',
      name: '',
      pass: '',
      confirmPass: '',
      passwordIsEqual: false,
      formIsDone: false
    };
  }

  handleChange = (e) => {
    const event = e
    const injectErr = 'Pleas don`t hack this site';
    const name = e.target.name;
    const value = e.target.value;
    this.setState({...this.state, [name]: value},
      (event)=>{
        console.log(e)
        this.isPaswordsEqual()
          if (value.length > 3) {
            if (this.stringContainsInject(value)) {
              printErr(injectErr);
              e.target.className = 'registration__input invalid';
            } else if (value.length < 4) {
              e.target.className = 'registration__input invalid';
            } else {
              e.target.className = 'registration__input';
            }
          } else if (value.length > 0) {
            e.target.className = 'registration__input invalidLength';
          }
        })
        console.log(this.state)
  }

  linkToLogin = () => {
    this.props.history.push('/login');
  }

  createUser = () => {
    const errMessage = 'Error.Check your internet connection';
    axios.post('http://localhost:3040/user/create', {
      login: this.state.login,
      password: this.state.password,
      name: this.state.name,
    })
      .then(({ id, name }) => {
        window.localStorage.setItem('id', id);
        window.localStorage.setItem('name', name);
        this.props.history.push('/chat');
      })
      .catch(() => printErr(errMessage));
  }

  checkForm () {
    if (this.state.passwordIsEqual) {
      (this.state.login.length > 3) && (this.state.name.length > 3)?
        this.setState({ formIsDone: true }) :
        this.setState({ formIsDone: false });
    } else {
      this.setState({ formIsDone: false });
    }
  }

  stringContainsInject(string) {
    let regExp = new RegExp('<script>', 'i');
    return string.match(regExp);
  }

  isPaswordsEqual() {
    if (this.state.pass.length > 3 && this.state.confirmPass.length > 3) {
      console.log(this.state.pass,this.state.confirmPass)
      this.state.pass === this.state.confirmPass ?
        this.setState({ passwordIsEqual: true }) :
        this.setState({ passwordIsEqual: false });
    } else {
      this.setState({ passwordIsEqual: false });
    }
  }

  render() {
    return (
      <main>
        <form className="registration">
          <h1 className="registration__title">Create new account</h1>
          <input
            className="registration__input"
            type="text"
            name="login"
            value={this.state.login}
            placeholder="input your login"
            onChange={this.handleChange}
          />
          <input
            className="registration__input"
            type="text"
            name="name"
            value={this.state.name}
            placeholder="input your name"
            onChange={this.handleChange}
          />
          <input
            className="registration__input"
            onChange={this.handleChange}
            type="password"
            name="pass"
            value={this.state.pass}
            placeholder="input your password"
          />
          <input
            className="registration__input"
            onChange={this.handleChange}
            type="password"
            name="confirmPass"
            value={this.state.confirmPass}
            placeholder="confirm password"
          />
          <input
            className="registration__create-button"
            type="button"
            value="Create account"
            disabled={!this.state.formIsDone}
            onClick={this.createUser}
          />
          <input
            className="registration__to-login-button"
            type="button"
            value="Sing in"
            onClick={this.linkToLogin}
          />
        </form>
      </main>
    );
  }
}
