const config = require('../../../nightwatch.conf.js');

module.exports = {
  'SignUp Page': function (browser) {
    browser
      .url('http://localhost:3000/register')
      .waitForElementVisible('body')
      .assert.title('Akdeniz')
      .setValue('input#username', 'Ugonna')
      .setValue('input#first_name', 'Ugonna')
      .setValue('input#first_name', 'Ofoegbu')
      .setValue('input#last_name', 'Ugonna')
      .setValue('input#email', 'moncateyes@gmail.com')
      .setValue('input#password', '123456')
      .setValue('input#password_confirmation', '123456')
      .click('button[type="submit"]')
      .pause(1500)
      .waitForElementVisible('body')
      .assert.urlEquals('http://localhost:3000/')
      .waitForElementVisible('body')
      .end();
  }
};
