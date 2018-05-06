const io = require('./index').io;
const RequestManager = require('./RequestManager');

module.exports = function(socket) {
    console.log(`socket id: ${socket.id}`);

    io.emit('user connected');

    socket.on('create game', (data) => {

    });

    socket.on('create lobby', (data) => {
      RequestManager('create lobby', data, (err, response) => {
        if (!err) {
          io.emit('lobby created', response);
        } else {
          io.emit('lobby create failed', 'Failed to create lobby');
        }
      });
    });

    socket.on('button clicked', (data) => {
      console.log('socketId of clicker:', data.socketId);
      io.emit('turn change', (data));
    });

    // socket.on('subscribeToTimer', (interval) => {
    //   console.log('client is subscribing to timer with interval ', interval);
    // });

    socket.on('disconnect', () => {
      io.emit('user disconnected');
    });
}
