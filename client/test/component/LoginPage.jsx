import 'babel-polyfill';
import React from 'react';
import chai from 'chai';
import jsdom from 'jsdom';
import chaiEnzyme from 'chai-enzyme';
import { Provider } from 'react-redux';
import { mount, shallow, render } from 'enzyme';
import { LoginPage } from '../../src/components/LoginPage.jsx';
import { Header } from '../../src/components/Header.jsx';
import initialState from '../../src/store/initialState';

import configureStore from '../../src/store/configureStore.js';

const store = configureStore(initialState);

chai.use(chaiEnzyme());
const expect = chai.expect;

const wrapper = mount(
  <Provider store={store}>
    <LoginPage />
  </Provider>
);


describe('Login Page', () => {
  it('should mount the Login component', () => {
    expect(wrapper).to.contain(<LoginPage />);
  });

  it('should mount the Header component', () => {
    expect(wrapper.find(Header)).to.have.length(1);
  });

  it('should mount the login form', () => {
    expect(wrapper.find('form')).to.have.length(1);
  });
});

