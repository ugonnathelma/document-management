const config = require('../../../nightwatch.conf.js');

module.exports = { // adapted from: https://git.io/vodU0
  'Login Page': function (browser) {
    browser
      .url('http://localhost:3000')
      .waitForElementVisible('body')
      .assert.title('Akdeniz')
      .setValue('input[type=email]', 'moncateyes@yahoo.com')
      .setValue('input[type=password]', '123456')
      .click('button[type="submit"]')
      .waitForElementVisible('div.login-feedback')
      .assert.containsText('div.login-feedback', 'Login Successful')
      .saveScreenshot('screenshots/loginPage.png')
      .pause(1500)
      .assert.urlEquals('http://localhost:3000/dashboard')
      .click('#logout')
      .pause(1000)
      .assert.urlEquals('http://localhost:3000/')
      .end();
  }
};
