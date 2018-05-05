const _ = require('lodash');
const Piece = require('./shared/Piece');

// const pieceLocations = [
//   [0, 0,    0,    'BK',  0,    0,     0, 0],
//   [0, 0,    0,    0,     0,    0,     0, 0],
//   [0, 0,    'WQ', 0,     0,    'WB',  0, 0],
//   [0, 0,    0,    0,     0,    0,     0, 0],
//   [0, 'BP', 0,    0,     'WR', 0,     1, 0],
//   [0, 0,    'BP', 1,     'BP', 0,     0, 1],
//   [0, 0,    0,    'WP',  0,    'WKn', 0, 0],
//   [0, 0,    0,    'WKi', 0,    0,     0, 1],
// ];

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

class Knight extends Piece {
  constructor(pos, color) {
    super(pos, color);
  }

  static findAllMoves(y, x) {
    const moves = [
      [y - 2, x - 1],
      [y - 2, x + 1],
      [y - 1, x - 2],
      [y - 1, x + 2],
      [y + 1, x - 2],
      [y + 1, x + 2],
      [y + 2, x - 1],
      [y + 2, x + 1],
    ];
    for (let i = moves.length - 1; i >= 0; i--) {
      const move = moves[i];
      if (move.some(coord => coord < 0 || coord > 7)) {
        moves.splice(i, 1);
      }
    }
    return moves;
  }

  static findUnallowedSquares(pieceLocations, all, color) {
    const unalloweds = [];
    all.forEach((move) => {
      const val = pieceLocations[move[0]][move[1]];
      if (_.isString(val) && val.includes(color)) {
        unalloweds.push(move);
      }
    });
    return unalloweds;
  }

  /**
   * Knight:
   * -  Has a maximum of 8 allowed moves
   * -  Can move to surrounding blocks that are two squares
   *    apart from the position the Knight is currently at.
   *    This disincludes X- and Y-axis.
   * @return {Array} [all locations that Knight can move to]
   */
  findAllowedMoves() {
    const {
      findAllMoves,
      findUnallowedSquares,
    } = this.constructor;
    const currPos = super.getPosition();
    const color = super.getColor();

    const y = currPos[0];
    const x = currPos[1];

    const allMoves = findAllMoves(y, x);
    const unallowedSquares = findUnallowedSquares(pieceLocations, allMoves, color);

    return _.without(allMoves, ...unallowedSquares);
  }
}

module.exports = Knight;
