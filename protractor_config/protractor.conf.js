var set_delay = () => {
  browser.delay = () => {
    browser.sleep(process.env.TEST_DELAY || 2000);
  };
};

exports.config = {
  directConnect: true,

  // Capabilities to be passed to the webdriver instance.
  capabilities: {
    'browserName': 'chrome',
    'chromeOptions': {
      'args': ['incognito'],
    }
  },

  // optional: add seleniumServerJar with proper version number
  // seleniumServerJar: './node_modules/gulp-protractor/node_modules/protractor/selenium/selenium-server-standalone-2.53.1.jar',
  specs: ['../test/e2e/**/*.js'],

  plugins: [{
    path: '../node_modules/aurelia-protractor-plugin'
    //package: 'aurelia-protractor-plugin'
  }],


  // Options to be passed to Jasmine-node.
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000
  },

  onPrepare: set_delay,
};
