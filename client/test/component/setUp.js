const $ = require('jquery');
const jsdom = require('jsdom')

const doc = jsdom.jsdom('<!doctype html><html><body></body></html>');
global.document = doc;
global.window = doc.defaultView;
global.$ = $(global.window);

// mock calls to localStorage
global.window.localStorage = {
  getItem: (token) => {
    return null;
  },
  setItem: (token) => {
    // do nothing
  }
};

Object.keys(doc.defaultView).forEach((property) => {
  if (typeof global[property] === 'undefined') {
    global[property] = doc.defaultView[property];
  }
});

global.navigator = {
  userAgent: 'node.js'
};
