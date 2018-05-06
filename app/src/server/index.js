const app = require('express')();
const PORT = process.env.PORT || 8101;
const http = require('http');
const server = http.createServer(app);

const io = module.exports.io = require('socket.io')(server);

const SocketManager = require('./SocketManager');

io.on('connection', SocketManager);

server.listen(PORT, () => {
  console.log(`Listening to port: ${PORT}`);
});
