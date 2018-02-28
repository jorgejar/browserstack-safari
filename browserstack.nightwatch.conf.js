require("babel-core/register");

const nightwatch_config = {
  src_folders: [ "./specs" ],

  output_folder: "./reports",
  // page_objects_path: "./pages",
  // custom_commands_path: "./commands",
  // globals_path: "./globals",
  selenium: {
    "start_process" : false,
    "host" : "hub-cloud.browserstack.com",
    "port" : 80
  },
  test_settings: {
    default: {
      launch_url: 'localhost:9090',
      selenium_host: process.env.SELENIUM_HOST,
      selenium_port: process.env.SELENIUM_PORT,
      silent: true,
      end_session_on_fail: false, // keep session open to get screenshot on teardown
      screenshots : {
        enabled : true,
        path : "/nightwatch/screenshots",
        on_failure: true,
        on_error: true,
      },
      desiredCapabilities: {
        "browserName" : "safari",
        'browser_version': '11',
        // "javascriptEnabled" : true,
        // "acceptSslCerts" : true
        "browserstack.user": process.env.BROWSERSTACK_USER,
        "browserstack.key": process.env.BROWSERSTACK_ACCESS_KEY,
        "browserstack.local": true,
        "browserstack.localIdentifier": process.env.BROWSERSTACK_LOCAL_ID,
        "browserstack.selenium_version": process.env.SELENIUM_VERSION,
        project: "UCP",
        build: process.env.BUILD_TAG,
        name: process.env.SELENIUM_BROWSERS,
        resolution: "1920x1080",
        javascriptEnabled: true,
        acceptSslCerts: true,
        // browserName: "chrome",
      },
    },
    chrome: {
      desiredCapabilities: {
        browserName: "chrome",
        browser_version: "61.0",
        chromeOptions: {
          args: [ "disable-web-security", "start-maximized" ],
        },
      },
    },
    firefox: {
      desiredCapabilities: {
        browserName: "firefox",
        browser_version: "58.0",
        marionette: true,
        acceptInsecureCerts: true,
      },
    },
    ie11: {
      desiredCapabilities: {
        browserName: "ie",
        browser_version: "11.0",
        acceptInsecureCerts: true,
      },
    },
    edge: {
      desiredCapabilities: {
        browserName: "edge",
        browser_version: "16.0",
        acceptInsecureCerts: true,
      },
    },
    safari: {
      desiredCapabilities: {
        browserName: "safari",
        browser_version: "11.0",
        acceptInsecureCerts: true,
        'browserstack.local': true,
      },
    },
  },
  parallel_process_delay: 1000,
  live_output: true,
  // test_workers: {
  //   enabled: true,
  //   workers: parseInt(process.env.TEST_WORKERS, 10) || 1,
  // },
};

/* eslint-disable */
// Code to copy seleniumhost/port into test settings
for(let i in nightwatch_config.test_settings){
  if (nightwatch_config.test_settings.hasOwnProperty((i))) {
    const config = nightwatch_config.test_settings[i];
    config['selenium_host'] = nightwatch_config.selenium.host;
    config['selenium_port'] = nightwatch_config.selenium.port;
  }
}
module.exports = nightwatch_config;