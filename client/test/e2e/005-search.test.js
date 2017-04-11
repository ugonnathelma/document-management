const config = require('../../../nightwatch.conf.js');

module.exports = {
  'Search Document': function (browser) {
    browser
      .url('http://localhost:3000')
      .waitForElementVisible('body')
      .setValue('input[type=email]', 'moncateyes@yahoo.com')
      .setValue('input[type=password]', '123456')
      .click('button[type="submit"]')
      .waitForElementVisible('div.login-feedback')
      .assert.containsText('div.login-feedback', 'Login Successful')
      .saveScreenshot('screenshots/loginPage.png')
      .pause(1500)
      .assert.urlEquals('http://localhost:3000/dashboard')
      .waitForElementVisible('body')
      .assert.containsText('h4', 'All Documents')
      .waitForElementVisible('body')
      .assert.title('Akdeniz')
      .url('http://localhost:3000/create-document')
      .waitForElementVisible('body')
      .assert.containsText('h4', 'Create A Document')
      .waitForElementVisible('body')
      .setValue('input#title', 'Searched Document')
      .setValue('textarea#content', 'Issa Content')
      .click('button[type="submit"]')
      .pause(1000)
      .assert.urlEquals('http://localhost:3000/dashboard')
      .waitForElementVisible('table#document-list')
      .setValue('input#searchTerms', 'Searched')
      .click('button#searchBtn')
      .pause(1000)
      .assert.urlEquals('http://localhost:3000/dashboard')
      .waitForElementVisible('table#document-list')
      .assert.containsText('table#document-list tr:first-of-type>td.doc-title', 'Searched Document')
      .end();
  }
};
