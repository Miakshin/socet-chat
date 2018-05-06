import React, { Component } from 'react';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { printErr } from '../../common/utils';

import './Registration.css';

class Regesrtration extends Component {
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
    const form = document.querySelector('.registration').elements;
    const injectErr = 'Pleas don`t hack this site';
    const name = e.target.name;
    const value = e.target.value;
    this.setState({...this.state, [name]: value},
      ()=>{
        this.isPaswordsEqual()
          if (value.length > 3) {
            if (this.stringContainsInject(value)) {
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
        })
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
        <form onSubmit={this.createUser} className="registration">
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
          <p
            className="registration__pass-err-test"
            hidden={(this.state.pass.length < 1 || this.state.confirmPass.length < 1) || this.state.passwordIsEqual }>
            Passwords do not match
          </p>
          <input
            className="registration__create-button"
            type="submit"
            value="Create account"
            disabled={!this.state.formIsDone}
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
  }
}

const mapStateToProps = state => ({
  registration: state.registration
})

export default connect(
  mapStateToProps
  ,null
)(Regesrtration)
