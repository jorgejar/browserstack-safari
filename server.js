const WebSocket = require('ws');
var path = require('path');
const fs = require('fs')
const https = require('https');
const http = require('http');
const chalk = require('chalk');
const httpProxy = require('http-proxy');

const HTTP_PORT = 9301;
const HTTPS_PORT = 9302;
var cfg = {
  ssl: true,
  ssl_key: path.resolve(__dirname, 'certs', 'server.key'),
  ssl_cert: path.resolve(__dirname, 'certs', 'server.cert'),
  port: HTTPS_PORT,
};
const WebSocketServer = WebSocket.Server;

////////////////////

const makeHeaderString = (headerO, spaces) => {
  const cp = { ...headerO };
  delete cp['user-agent'];
  const strHead = JSON.stringify(cp, null, 2);
  const strArr = strHead.split('\n').map((s) => (spaces + s)).join('\n');
  return strArr;
};
// dummy request processing
var processRequest = function (client_req, client_res) {
  console.log(chalk.cyan('------------'));
  const spaces = '  ';
  console.log(spaces + chalk.blue('url'));
  console.log(spaces + client_req.url);
  console.log(spaces + chalk.blue('method'));
  console.log(spaces + client_req.method);
  console.log(spaces + chalk.blue('headers'));
  console.log(makeHeaderString(client_req.headers, spaces));
  if (client_req.body) {
    console.log(spaces + chalk.blue('body'));
    console.log(spaces + client_req.body);
  }
  let filePath = path.join(__dirname, 'dist', client_req.url);
  const specials = ['/login', '/error', '/'];
  if (specials.indexOf(client_req.url) >= 0) {
    console.log(spaces + 'special, serving html');
    filePath = path.join(filePath, 'index.html');
  }
  console.log(spaces + chalk.blue('filePath'));
  console.log(spaces + filePath);
  fs.access(filePath, fs.constants.R_OK, (err) => {
    console.log(spaces + (err ? 'no access!' : 'can read'));
    if (err) {
      // no access, proxy
      // proxy.web(client_req, client_res, { target: 'http://localhost:9300' });
      // proxy.web(client_req, client_res, { target: 'https://54.202.42.236' });
    } else {
      console.log(`${spaces}streaming ${filePath}`)
      const stream = fs.createReadStream(filePath);
      stream.pipe(client_res).on('error',
        () => {
          console.log('stream error')
        });
    }
  });
}



const httpApp = https.createServer(
  {
    // providing server with  SSL key/cert
    key: fs.readFileSync(cfg.ssl_key),
    cert: fs.readFileSync(cfg.ssl_cert)

  }, processRequest).listen(HTTPS_PORT);
const httpsApp = http.createServer(processRequest).listen(HTTP_PORT);

// passing or reference to web server so WS would knew port and SSL capabilities
const onWsConnection = function (wsConnect) {
  console.log('====================')
  console.log(wsConnect)
  if (wsConnect.upgradeReq) {

    console.log(wsConnect.upgradeReq.url)
    console.log(wsConnect.upgradeReq.headers);
  }
  wsConnect.on('message', function (message) {
    console.log('received: %s', message);
    wsConnect.send('server1: ' + message);
  });
  wsConnect.on('error', function () {
    console.error(arguments);
  });
  wsConnect.on('close', function () {
    console.log('server1 socket closed');
  });
}
const onError = () => {
  console.log(chalk.red('server error'))
}
const wsServer = new WebSocketServer({ server: httpApp });
wsServer.on('connection', onWsConnection);
wsServer.on('error', onError)
httpApp.on('error', onError)
httpsApp.on('error', onError)
const wssServer = new WebSocketServer({ server: httpsApp });
wssServer.on('connection', onWsConnection);
console.log('listening for http on port: ' + HTTP_PORT)

console.log('listening for https on port: ' + HTTPS_PORT)