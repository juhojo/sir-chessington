const _ = require('lodash');
const Piece = require('./shared/Piece');
const Methods = require('./shared/helpers.js');
const axisMethods = Methods.axis;
const diagonalMethods = Methods.diagonal;

// These would be server from api.
const pieceLocations = [
  [0, 0, 0, 'BK', 0, 0, 0, 0],
  [0, 0, 0, 0,    0, 0, 0, 0],
  [0, 0, 'WQ', 0,    0, 'WB', 0, 0],
  [0, 0, 0, 0,    0, 0, 0, 0],
  [0, 'BP', 0, 0, 'WR', 0, 0, 0],
  [0, 0, 'BP', 0, 'BP', 0, 0, 0],
  [0, 0, 0, 'WP', 0, 'WKn', 0, 0],
  [0, 0, 0, 'WKi', 0, 0, 0, 0],
];

class Queen extends Piece {
  constructor(pos, color) {
    super(pos, color);
  }

  /**
   * Queen:
   * -  Can move freely on X- and Y-axis and diagonally, if the block is empty or
   *    has opponent piece. Queen cannot bypass opponent pieces.
   * @return {Array} [all locations that Queen can move to]
   */
  findAllowedMoves() {
    const currPos = super.getPosition();
    const color = super.getColor();
    const opponentColor = color === 'W' ? 'B' : 'W';

    const yAxis = currPos[0];
    const xAxis = currPos[1];

    const allMovesAxis = axisMethods.loopSquares(yAxis, xAxis);
    const unallowedSquaresAxis = axisMethods.findUnallowedSquares(
      pieceLocations, allMovesAxis, currPos, color, opponentColor);
    const allMovesDiagonal = diagonalMethods.loopSquares(yAxis, xAxis);
    const unallowedSquaresDiagonal = diagonalMethods.findUnallowedSquares(
      pieceLocations, allMovesDiagonal, currPos, color, opponentColor);
    const allMoves = allMovesAxis.concat(allMovesDiagonal);
    const unallowedSquares = unallowedSquaresAxis.concat(unallowedSquaresDiagonal);

    return _.without(allMoves, ...unallowedSquares);
  }
}

module.exports = Queen;
