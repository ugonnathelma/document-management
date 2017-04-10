import 'babel-polyfill';
import React from 'react';
import chai from 'chai';
import jsdom from 'jsdom';
import chaiEnzyme from 'chai-enzyme';
import { Provider } from 'react-redux';
import { mount, shallow, render } from 'enzyme';
import DocumentList from '../../src/components/DocumentList.jsx';
import { Header } from '../../src/components/Header.jsx';
import initialState from '../../src/store/initialState';

import configureStore from '../../src/store/configureStore.js';

const store = configureStore(initialState);

chai.use(chaiEnzyme());
const expect = chai.expect;

const wrapper = mount(<DocumentList documents={[]} />);


describe('DocumentList Page', () => {
  it('should mount the CreateDocument component', () => {
    expect(wrapper.containsMatchingElement(<DocumentList />));
  });
});

