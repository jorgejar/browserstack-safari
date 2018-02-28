require("babel-core/register");

module.exports = {
  src_folders: [ "./specs" ],
  output_folder: "./reports",
  // page_objects_path: "./pages",
  // custom_commands_path: "./commands",
  // globals_path: "./globals",
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
        project: "test",
        resolution: "1920x1080",
        javascriptEnabled: true,
        acceptSslCerts: true,
        acceptInsecureCerts: true,
        browserName: "safari",
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
        browserName: "safari",
        //browser_version: "58.0",
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
        acceptSslCerts: true,

      },
    },
  },
  parallel_process_delay: 1000,
  live_output: true,
};
