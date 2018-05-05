'use strict';
const mongoose = require('mongoose');

exports.test = function(req, res) {
  console.log('at test');
  res.send('Hello world!');
}

// GET

// Methods for one game
exports.read_one_board = function(req, res) {
  // Position of pieces on board
  // If status is not finished:
  // Respond with location of pieces
  // If status is finished:
  // Respond with end location of pieces
}

exports.read_moves_for_one_player = function(req, res) {
  // Allowed moves for player
  // If status is not finished:
  // Respond with moves that can be done
  // If status is finished:
  // Respond with moves that were made during the game (by user)
}

exports.read_all_moves_for_one_game = function(req, res) {
  // Moves made during the game
  // If status is or is not finished:
  // Respond with moves that were made
}

exports.read_one_game_status = function(req, res) {
  // Status of game by id
  // If status is not finished
  // Respond with ongoing
  // If status is finished
  // Respond with finished
}

exports.read_one_game_result = function(req, res) {
  // Result of game by id
  // If status is not finished
  // Respond with ongoing
  // If status is finished
  // Respond with winner user id
}

// Methods for one user
exports.read_games_for_one_player = function(req, res) {
  // Ids of games for user
  // If any
  // Respond with ids
  // If none
  // Respond with null
}


// POST

exports.create_one_game = function(req, res) {
  // Create a new game with two players
};
