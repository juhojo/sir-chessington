const app = require('express')();
const port = process.env.PORT || 8101;
const http = require('http');

const server = http.createServer(app);

const io = require('socket.io')(server);

io.on('connection', (client) => {
  // here you can start emitting events to the client

  console.log('user connected');

  client.on('subscribeToTimer', (interval) => {
    console.log('client is subscribing to timer with interval ', interval);
  });

  client.on('disconnect', function(){
    console.log('user disconnected');
  });
});

server.listen(port, () => {
  console.log(`Listening to port: ${port}`);
});

console.log('Chess RESTful API server started on: ' + port);
