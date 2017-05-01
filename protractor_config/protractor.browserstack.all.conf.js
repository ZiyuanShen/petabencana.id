var set_delay = () => {
  jasmine.DEFAULT_TIMEOUT_INTERVAL = (process.env.TEST_DELAY || 2000)*10; 
  browser.delay = () => {
    browser.sleep(process.env.TEST_DELAY || 2000);
  };
};

exports.config = {
  //directConnect: true,

  'seleniumAddress': 'http://hub-cloud.browserstack.com/wd/hub',

  multiCapabilities: [{
    'browserstack.user': process.env.BROWSERSTACK_USERNAME,
    'browserstack.key': process.env.BROWSERSTACK_KEY,
    'browserName': 'android',
    'platform': 'ANDROID',
    'device': 'Samsung Galaxy S5',
    'browserstack.local': process.env.TEST_LOCAL || false,
  }, {
    'browserstack.user': process.env.BROWSERSTACK_USERNAME,
    'browserstack.key': process.env.BROWSERSTACK_KEY,
    'browserName': 'iPhone',
    'platform': 'MAC',
    'device': 'iPhone 6S',
    'browserstack.local': process.env.TEST_LOCAL || false,
  },
  
  ],


  // optional: add seleniumServerJar with proper version number
  // seleniumServerJar: './node_modules/gulp-protractor/node_modules/protractor/selenium/selenium-server-standalone-2.53.1.jar',
  specs: ['../test/e2e/**/*.js'],

  plugins: [{
    path: '../node_modules/aurelia-protractor-plugin'
  }],


  // Options to be passed to Jasmine-node.
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000
  },

  onPrepare: set_delay,
};
