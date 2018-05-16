import Login from '../components/login/Login';
import React, { Component } from 'react';
import configureStore from 'redux-mock-store'
import { shallow } from 'enzyme';

const initialState = {output:100}
const mockStore = configureStore()
let store,component;

beforeEach(()=>{
    store = mockStore(initialState)
    component = shallow(<Login store={store} /> )
})

describe('Login component', ()=>{
  it('Login was created and inputs is empty', () => {
    const loginInput = component.find('login');
    console.log(loginInput)
    expect(loginInput.length).toEqual(0);
  })
})
