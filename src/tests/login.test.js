import Login from '../components/login/Login';
import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
// import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
// import axios from 'axios';
// import * as actions from '../store/redux/user/actions';
import { mount } from 'enzyme';

test('Login was created and inputs is empty', () => {
  const component = mount(<Login/>);
  const loginInput = component.find('.login__input');
  expect(loginInput.value()).toEqual('');
});
