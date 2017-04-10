import 'babel-polyfill';
import React from 'react';
import chai from 'chai';
import jsdom from 'jsdom';
import sinon from 'sinon';
import chaiEnzyme from 'chai-enzyme';
import jwtDecode from 'jwt-decode';
import { browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import { mount, shallow, render } from 'enzyme';
import UserDashboard, { ViewAllDocuments } from '../../src/components/UserDashBoard.jsx';
import { Header } from '../../src/components/Header.jsx';
import Sidebar from '../../src/components/Sidebar.jsx';
import DocumentList from '../../src/components/DocumentList.jsx';
import initialState from '../../src/store/initialState';

import configureStore from '../../src/store/configureStore.js';

const store = configureStore(initialState);

const historyStub = sinon.stub(browserHistory, 'push');

chai.use(chaiEnzyme());
const expect = chai.expect;

const wrapper = shallow(
  <Provider store={store}>
    <ViewAllDocuments />
  </Provider>
);


describe('UserDashboard Page', () => {
  it('should mount the UserDashBoard component', () => {
    expect(wrapper).to.contain(<ViewAllDocuments />);
  });
});

