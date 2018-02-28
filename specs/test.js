const SERVER_HOST = process.env.SERVER_HOST || 'localhost'

module.exports = {

  after: browser => browser.end(),

  'ws': (browser) => {
    browser
      .url(`http://${SERVER_HOST}:9301/`)
      .useXpath()
      .waitForElementVisible('//*[@id="sendMessage"]', 15000)
      .pause(1000)
      .click('//*[@id="sendMessage"]')
      .useXpath()
      .waitForElementVisible('//*[@data-msg="message from socket server: server1: hello"]', 2000)
  },
  'wss': (browser) => {
    browser
      .url(`https://${SERVER_HOST}:9302/`)
      .useXpath()
      .waitForElementVisible('//*[@id="sendMessage"]', 15000)
      .pause(1000)
      .click('//*[@id="sendMessage"]')
      .useXpath()
      .waitForElementVisible('//*[@data-msg="message from socket server: server1: hello"]', 2000)
  },
}