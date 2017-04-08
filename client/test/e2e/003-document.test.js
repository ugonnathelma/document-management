const config = require('../../../nightwatch.conf.js');

module.exports = {
  'Create Document': function (browser) {
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
      .url('http://localhost:3000/create-document')
      .waitForElementVisible('body')
      .assert.containsText('h4', 'Create A Document')
      .waitForElementVisible('body')
      .assert.title('Akdeniz')
      .setValue('input#title', 'Issa Title')
      .setValue('textarea#content', 'Issa Content')
      .click('button[type="submit"]')
      .pause(1000)
      .assert.urlEquals('http://localhost:3000/dashboard')
      .waitForElementVisible('table#document-list')
      .assert.containsText('table#document-list tr:first-of-type>td.doc-title', 'Issa Title')
      .end();
  },
  'Edit Document': function (browser) {
    browser
      .url('http://localhost:3000')
      .waitForElementVisible('body')
      .setValue('input[type=email]', 'moncateyes@yahoo.com')
      .setValue('input[type=password]', '123456')
      .click('button[type="submit"]')
      .waitForElementVisible('div.login-feedback')
      .assert.containsText('div.login-feedback', 'Login Successful')
      .pause(1500)
      .assert.urlEquals('http://localhost:3000/dashboard')
      .click('table#document-list tbody tr:first-of-type i.edit-btn')
      .waitForElementVisible('body')
      .clearValue('input#title')
      .setValue('input#title', 'Issa One More Title')
      .click('button[type="submit"]')
      .pause(1000)
      .assert.urlEquals('http://localhost:3000/dashboard')
      .waitForElementVisible('body')
      .waitForElementVisible('table#document-list')
      .assert.containsText('table#document-list tr:first-of-type>td.doc-title', 'Issa One More Title')
      .end();
  },
  'Delete Document': function (browser) {
    browser
      .url('http://localhost:3000')
      .waitForElementVisible('body')
      .setValue('input[type=email]', 'moncateyes@yahoo.com')
      .setValue('input[type=password]', '123456')
      .click('button[type="submit"]')
      .waitForElementVisible('div.login-feedback')
      .assert.containsText('div.login-feedback', 'Login Successful')
      .pause(1000)
      .click('table#document-list tbody tr:first-of-type i.edit-btn')
      .waitForElementVisible('body')
      .clearValue('input#title')
      .setValue('input#title', 'Chosen One')
      .click('button[type="submit"]')
      .pause(1000)
      .assert.urlEquals('http://localhost:3000/dashboard')
      .waitForElementVisible('body')
      .click('table#document-list tbody tr:first-of-type i.delete-btn')
      .pause(500)
      .waitForElementVisible('button.confirm')
      .click('button.confirm')
      .expect.element('table#document-list tr:first-of-type>td.doc-title').text.to.not.equal('Chosen One');
    browser.end();
  }
};
