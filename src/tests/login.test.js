import Login from '../components/login/Login';
import React, { Component } from 'react';
import configureStore from 'redux-mock-store';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import store from '../store';
import * as actions from '../store/redux/user/actions';

const user = {
  login: 'login',
  name: 'loginName',
  friends: [],
  id: '1',
  confirmPass: '12341234',
};

const mockStore = configureStore();
  let component;

beforeEach(() => {
  component = shallow(
    <Provider store={store}>
      <Login />
    </Provider>
  );
});

describe('Login component', () => {
  it('Login was created and inputs is empty', () => {
    const loginInput = component.find('login');
    expect(loginInput.length).toEqual(0);
  });

  it('user in state should be equal recive user', () => {
    store.dispatch(actions.updateUser(user)).then
      expect(store.getState().user).toBe(user);
  });
});
