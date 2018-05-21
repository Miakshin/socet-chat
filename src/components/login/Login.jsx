import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import axios from "axios";
import * as actions from "../../store/redux/user/actions";

import "./Login.css";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: "",
      pass: "",
      loading: false,
      passErr: false
    };
    this.onLoginChange = e => {
      this.setState({ login: e.target.value });
    };
    this.onPassChange = e => {
      this.setState({ pass: e.target.value });
    };
    this.login = () => {
      console.log(this.state);
      this.setState({ loading: true });
      axios
        .post("http://localhost:3040/user/check-login", {
          login: this.state.login,
          pass: this.state.pass
        })
        .then(res => {
          this.setState({ loading: false });
          if (res.data) {
            window.localStorage.setItem("id", res.data.id);
            window.localStorage.setItem("name", res.data.name);
            this.props.updateUser(res.data);
            this.props.history.push("/chat");
          } else {
            this.setState({ passErr: true });
          }
        });
    };
  }

  render() {
    return (
      <main>
        <form className="login">
          <h1 className="login__title">Login</h1>
          <input
            className="login__input"
            type="text"
            name="login"
            placeholder="Login"
            onChange={this.onLoginChange}
          />
          <input
            className="login__input"
            type="password"
            name="pass"
            placeholder="password"
            onChange={this.onPassChange}
          />
          <input
            disabled={this.state.login.length < 3 || this.state.pass.length < 3}
            className="login__button"
            type="button"
            value="login"
            onClick={this.login}
          />
          <p className="login__hint">
            Don't have an account?<br />
            <Link className="login__reg-link" to="/registration">
              Registration
            </Link>
          </p>
        </form>
      </main>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      updateUser: user => actions.updateUser(user)
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Login);
