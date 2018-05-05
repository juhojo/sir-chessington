const Piece = require('./shared/Piece');

// These would be server from api.
const pieceLocations = [
  [0, 0, 0, 'BK', 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 'BP', 0, 'BP', 0, 0, 0],
  [0, 0, 0, 'WP', 0, 0, 0, 0],
  [0, 0, 0, 0, 'WK', 0, 0, 0],
];

class Pawn extends Piece {
  constructor(pos, color) {
    super(pos, color);
  }

  moveDirection() {
    return super.getColor() === 'W' ? -1 : 1;
  }

  isAtEnd(posY) {
    const color = super.getColor();
    let atEnd = false;
    if (color === 'W') {
      atEnd = postY === 0;
    } else {
      atEnd = posT === 7;
    }
    return atEnd;
  }

  /**
   * [tryForward description]
   * @return {Boolean} [description]
   */
  static canForward(pos, dir) {
    return pieceLocations[pos[0] + dir][pos[1]] === 0;
  }

  static canEat(pos, dir, oc) {
    const left = pieceLocations[pos[0] + dir][pos[1] - 1];
    const right = pieceLocations[pos[0] + dir][pos[1] + 1];
    return {
      left: left && left.includes(oc),
      right: right && right.includes(oc),
    };
  }

  static canMoveTwo(pos, dir, color) {
    const notTaken = pieceLocations[pos[0] + (2 * dir)][pos[1]] === 0;
    let atStart = false;
    if (color === 'W') {
      atStart = pos[0] === 6;
    } else {
      atStart = pos[0] === 1;
    }
    return atStart && notTaken;
  }

  /**
   * Pawn:
   * -  Normal: Can move towards opponents end one
   *    block at a time, if not block is empty.
   * -  Edge cases:
      1. Can move 1 or 2 if at spawn location.
      2. Can move diagonally if opponents Piece at that location.
   * @return {Array} [all locations that Pawn can move to]
   */
  findAllowedMoves() {
    const {
      canForward,
      canEat,
      canMoveTwo,
    } = this.constructor;

    const currPos = super.getPosition();
    const dir = this.moveDirection();
    const opponentColor = super.getColor() === 'W' ? 'B' : 'W';

    let allowedMoves = [];

    // Can move forward
    if (canForward(currPos, dir)) {
      allowedMoves.push(
        [currPos[0] + dir, currPos[1]]
      );
    }

    const eatables = canEat(currPos, dir, opponentColor);

    // Can eat Piece in left
    if (eatables.left) {
      allowedMoves.push(
        [currPos[0] + dir, currPos[1] - 1]
      );
    }

    // Can eat Pieace in right
    if (eatables.right) {
      allowedMoves.push(
        [currPos[0] + dir, currPos[1] + 1]
      );
    }

    // Is at start location and can move two
    if (canMoveTwo(currPos, dir, super.getColor())) {
      allowedMoves.push(
        [currPos[0] + (2 * dir), currPos[1]]
      );
    }

    return allowedMoves;
  }
}

module.exports = Pawn;
