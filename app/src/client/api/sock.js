import openSocket from 'socket.io-client';

const socket = openSocket('http://localhost:8101');

// subscribeToTimer((err, timestamp) => this.setState({
//   timestamp
// }));

const onLoad = (cb) => {
  socket.on('user connected', () => cb(null, 'Hello'));
  //
  // socket.on('user connected', () => {
  //   socket.emit('greeting', { msg: `Hello!` });
  // });
};

const onFailure = (cb) => {
  socket.on('lobby create failed', (msg) => cb(msg));
}

const onLobbyCreated = (cb) => {
  socket.on('lobby created', () => cb(null, true));
}

const turnListener = (cb) => {
  socket.on('turn change', (data) => cb(null, socket.id !== data.socketId));
}

const onCreateLobby = (cb) => {
  socket.emit('create lobby', { playerId: socket.id });
}

const onClick = (cb) => {
  socket.emit('button clicked', { socketId: socket.id });
};

// const subscribeToTimer = (cb) => {
//   socket.on('timer', timestamp => cb(null, timestamp));
//   socket.emit('subscribeToTimer', 1000);
// }

// export { subscribeToTimer };

export { onLoad, onFailure, turnListener, onClick, onCreateLobby, onLobbyCreated };
