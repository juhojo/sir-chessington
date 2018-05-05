var app = require('express')(),
  http = require('http').Server(app),
  port = process.env.PORT || 9100,
  mongoose = require('mongoose'),
  Game = require('./src/models/gameModel'), // Model
  bodyParser = require('body-parser'),
  config = require('./.config/config'),
  io = require('socket.io')(http);

// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect(config.database, config.options);

// parse application/x-www-form-urlencoded & application/json
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var gameRoutes = require('./src/routes/gameRoutes'); // Collection Routes
 // Register the routes
gameRoutes(app);

// Handle non-existing routes
app.use(function(req, res) {
  res.status(404).send({ url: req.originalUrl + ' not found' });
});
// Parameters are invalid
app.use((err, req, res) => {
  res.status(err.status || 500);
  res.json({
    error: {
      message: err.message
    }
  });
});

io.on('connection', function(socket) {
  console.log('a user connected');
  socket.on('piece move', function(msg) {
    console.log('message: ' + msg);
  });

  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});

http.listen(port, () => {
  console.log('Listening port:', port);
});

console.log('Chess RESTful API server started on: ' + port);


// var app = require('express')();
// var http = require('http').Server(app);
// var io = require('socket.io')(http);
//
// app.get('/', function(req, res) {
//   res.send('This will be an endpoint for our game api');
// });
//
// // PUT & POST
//
// app.get('/game/create/p1/:userId/p2/:userId', function(req, res) {
//   // Create a new game with two users
// });
//
//
// // GET
//
// app.get('/game/:hash/board', function(req, res) {
//   // Position of pieces on board
//   // If status is not finished:
//   // Respond with location of pieces
//   // If status is finished:
//   // Respond with end location of pieces
// });
//
// app.get('/game/:hash/user/:id/moves', function(req, res) {
//   // Allowed moves for user
//   // If status is not finished:
//   // Respond with moves that can be done
//   // If status is finished:
//   // Respond with moves that were made during the game (by user)
// });
//
// app.get('/game/:hash/moves', function(req, res) {
//   // Moves made during the game
//   // If status is or is not finished:
//   // Respond with moves that were made
// });
//
// app.get('/game/user/:id/games', function(req, res) {
//   // Ids of games for user
//   // If any
//   // Respond with ids
//   // If none
//   // Respond with null
// });
//
// app.get('/game/:hash/result', function(req, res) {
//   // Result of game by id
//   // If status is not finished
//   // Respond with ongoing
//   // If status is finished
//   // Respond with winner user id
// });
//
// app.get('/game/:hash/status', function(req, res) {
//   // Status of game by id
//   // If status is not finished
//   // Respond with ongoing
//   // If status is finished
//   // Respond with finished
// });
//
//
//
//
// // Gateway
//
// io.on('connection', function(socket) {
//   console.log('a user connected');
//   socket.on('piece move', function(msg) {
//     console.log('message: ' + msg);
//   });
//
//   socket.on('disconnect', function(){
//     console.log('user disconnected');
//   });
// });
//
// http.listen(3000, function() {
//   console.log('listening on *:3000');
// });
