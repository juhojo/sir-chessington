'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { defaultBoard } = './helpers/defaults.js';

const GameSchema = new Schema({
  players: {
    type: [{
      userId: String, // Schema.Types.ObjectId?
    }],
    validate: [(arr) => { arr.length <= 2; }, 'Maximum of 2 players allowed.']
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  board: {
    type: Array,
    default: defaultBoard,
  },
  status: {
    type: [{
      type: String,
      enum: ['lobby', 'ongoing', 'finished'],
    }],
    default: ['lobby'],
  }
});

module.exports = mongoose.model('Games', GameSchema);
