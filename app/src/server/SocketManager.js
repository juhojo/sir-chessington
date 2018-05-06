const io = require('./index').io;

module.exports = function(socket) {
    // here you can start emitting events to the client
    console.log(`socket id: ${socket.id}`);

    io.emit('user connected');

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
