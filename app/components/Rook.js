const _ = require('lodash');
const Piece = require('./shared/Piece');
const axisMethods = require('./shared/helpers.js').axis;

// These would be server from api.
const pieceLocations = [
  [0, 0, 0, 'BK', 0, 0, 0, 0],
  [0, 0, 0, 0,    0, 0, 0, 0],
  [0, 0, 0, 0,    0, 0, 0, 0],
  [0, 0, 0, 0,    0, 0, 0, 0],
  [0, 'BP', 0, 0, 'WR', 0, 0, 0],
  [0, 0, 'BP', 0, 'BP', 0, 0, 0],
  [0, 0, 0, 'WP', 0, 0, 0, 0],
  [0, 0, 0, 'WK', 0, 0, 0, 0],
];

class Rook extends Piece {
  constructor(pos, color) {
    super(pos, color);
  }

  /**
   * Rook:
   * -  Can move freely on X- and Y-axis, if the block is empty or
   *    has opponent piece. Rook cannot bypass opponent pieces.
   * @return {Array} [all locations that Rook can move to]
   */
  findAllowedMoves() {
    const currPos = super.getPosition();
    const color = super.getColor();
    const opponentColor = color === 'W' ? 'B' : 'W';

    const yAxis = currPos[0];
    const xAxis = currPos[1];

    const allMoves = axisMethods.loopSquares(yAxis, xAxis);
    const unallowedSquares = axisMethods.findUnallowedSquares(
      pieceLocations, allMoves, currPos, color, opponentColor);

    return _.without(allMoves, ...unallowedSquares);
  }
}

module.exports = Rook;
