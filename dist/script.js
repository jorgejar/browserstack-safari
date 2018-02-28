var ws = new WebSocket(window.location.origin.replace('http', 'ws'))
var div = document.createElement('div')
var button = document.createElement('button')
button.innerText = 'send hello to socket';
button.disabled = true;
div.style.borderTop = "solid 1px black"
document.body.appendChild(button)
document.body.appendChild(div);
var log = function (msg, background) {
  console.log(msg)
  background = background || '';
  const line = document.createElement('pre');
  line.setAttribute('data-msg', msg);
  line.style.background = background;
  line.innerText += msg;
  div.appendChild(line)
}
log('script loaded')
ws.addEventListener('open', function () {
  button.disabled = false
  log('socket open')
  button.addEventListener('click', () => {
    log('sending hello to socket', '#54c57c')
    ws.send('hello')
  })
  button.id = 'sendMessage'; // set id after active so tests are not racing this
});
ws.addEventListener('message', function (msg) {
  log('message from socket server: ' + msg.data, '#54b5c5')
})

ws.addEventListener('error', function(err) {
  log('websocket error', '#ff7979')
  log(JSON.stringify(err, null, 2), '#ff7979')
})