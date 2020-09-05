const WebSocket = require('ws')
const wss = new WebSocket.Server({ port: 8090 })
const bitcoinjs = require("bitcoinjs-lib")
var zmq = require('zmq')
  , sock = zmq.socket('sub')

sock.connect('tcp://127.0.0.1:29000')
sock.subscribe('rawtx')

console.log('run sock.on');
sock.on('message', function(topic, message) {
  wss.clients.forEach(function each(ws) {
        console.log('send message to client',message);
        if (ws.isAlive === false) return ws.terminate()
        var tx = bitcoinjs.Transaction.fromHex(message)
        ws.emit("message", tx)
  })
})

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(tx) {
    ws.send(JSON.stringify(tx))
  });

})
