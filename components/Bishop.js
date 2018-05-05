const _ = require('lodash');
const Piece = require('./shared/Piece');
const diagonalMethods = require('./shared/helpers.js').diagonal;

// These would be server from api.
const pieceLocations = [
  [0, 0, 0, 0,    0,    0,    0, 0],
  [0, 0, 0, 0,    'BK', 0,    0, 0],
  [0, 0, 0, 0,    0,    'WB', 0, 0],
  [0, 0, 0, 0,    0,    0,    0, 0],
  [0, 0, 0, 'WK', 0,    0,    0, 0],
  [0, 0, 0, 0,    0,    0,    0, 0],
  [0, 0, 0, 0,    0,    0,    0, 0],
  [0, 0, 0, 0,    0,    0,    0, 0],
];
// const pieceLocations = [
//   [0, 0, 0, 'BK', 0, 0, 0, 0],
//   [0, 0, 0, 0,    0, 0, 0, 0],
//   [0, 0, 'WB', 0,    0, 0, 0, 0],
//   [0, 0, 0, 0,    0, 0, 0, 0],
//   [0, 'BP', 0, 0, 'WR', 0, 0, 0],
//   [0, 0, 'BP', 0, 'BP', 0, 0, 0],
//   [0, 0, 0, 'WP', 0, 0, 0, 0],
//   [0, 0, 0, 'WK', 0, 0, 0, 0],
// ];

class Bishop extends Piece {
  constructor(pos, color) {
    super(pos, color);
  }

  /**
   * Bishop:
   * -  Can move freely diagonally to any direction, if the block is empty or
   *    has opponent piece. Bishop cannot bypass opponent pieces.
   * @return {Array} all locations that Bishop can move to
   */
  findAllowedMoves() {
    const currPos = super.getPosition();
    const color = super.getColor();
    const opponentColor = color === 'W' ? 'B' : 'W';

    const yAxis = currPos[0];
    const xAxis = currPos[1];

    const allMoves = diagonalMethods.loopSquares(yAxis, xAxis);
    const unallowedSquares = diagonalMethods.findUnallowedSquares(
      pieceLocations, allMoves, currPos, color, opponentColor);

    return _.without(allMoves, ...unallowedSquares);
  }
}

module.exports = Bishop;
