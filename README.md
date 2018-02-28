# reproduce safari wss problem in browserstack
this repo is to help browserstack understand how safari is failing to use websockets when
using a server with self signed certificates.

This sample app has an site that connects to a websocket server and can send messages back and forth
it contains an integration test where it first visits the site as http and things work fine
then the test visits the https version of the same site and we see the issue self signed certificates pose
the test fails and reports it

## prerequisites to run locally
 * `node` (8.9.4) you can get it using nvm
 * `yarn` (1.3.2)

### webdriver manager if you want to also run locally (as in selenium in your machine, to compare with browserstack)

webdriver-manager after installing node, you can install through `npm install -g webdriver-manager`

## installation
in the root of this project
`yarn`

## running the test locally (nightwatch)
run webdriver-manager in another shell

`webdriver-manager update`

`webdriver-manager start`

start the server in another shell

`yarn serve`

check server is running. Visit http://localhost:9301 and https://localhost:9302 (push the button to make sure websockets work)

run the test locally

`export SERVER_HOST=localhost`, you may change the host if you are trying a public IP or a domain

`yarn test`

## running the tests in browserstack

add browserstack credentials

`export BROWSERSTACK_USER=xxx`

`export BROWSERSTACK_ACCESS_KEY=xxx`

`export SERVER_HOST=localhost`

`yarn localtest`

## changing the browser

you may want to change the browser used, this can be done in the file `nightwatch.conf.js` look for the following config

`test_settings.desiredCapabilities.browserName`, set it to "chrome" or "safari"

## build a docker image of the ws server to run in a container

docker build -t ws-server:0.0.3 -f Dockerfile .

docker run  -p 9301:9301 -p 9302:9302 ws-server:0.0.3