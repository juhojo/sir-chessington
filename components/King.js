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
  [0, 0, 0, 'WK', 0, 0, 0, 'WR'],
];

class King extends Piece {
  constructor(pos, color) {
    super(pos, color);
  }

  static isInBounds(pos) {
    return pos > 0 && pos < 8;
  }

  /**
   * Rules:
   * -  Neither the King nor Rook have moved during the game
   * -  There are no Pieces between the King and Rook
   * -  The King is not in check
   * -  None of the squares the king passes through are under
   *    attack
   * -  The end square must not result in check
   * @param  {[type]} pos [description]
   * @return {[type]}     [description]
   */
  canDoCastling(pos) {
    // TODO
  }

  /**
   * [findSurroundingBlocks returns all locations on board that
   * the King may possibly move to. Does not check if location
   * is taken or not.]
   * @param  {[Number, Number]} pos [current position]
   * @return {Array}                [all locations in bounds on board]
   */
  findSurroundingBlocks(pos) {
    const { isInBounds } = this.constructor;
    let surroundings = [];
    if (isInBounds(pos[0] - 1)) {
      const Y = pos[0] - 1;
      surroundings.push([Y, pos[1]]);
      if (isInBounds(pos[1] - 1)) {
        surroundings.push([Y, pos[1] - 1]);
      }
      if (isInBounds(pos[1] + 1)) {
        surroundings.push([Y, pos[1] + 1]);
      }
    }
    if (isInBounds(pos[0] + 1)) {
      const Y = pos[0] + 1;
      surroundings.push([Y, pos[1]]);
      if (isInBounds(pos[1] - 1)) {
        surroundings.push([Y, pos[1] - 1]);
      }
      if (isInBounds(pos[1] + 1)) {
        surroundings.push([Y, pos[1] + 1]);
      }
    }
    if (isInBounds(pos[1] - 1)) {
      surroundings.push(
        [pos[0], pos[1] - 1],
      );
    }
    if (isInBounds(pos[1] + 1)) {
      surroundings.push(
        [pos[0], pos[1] + 1],
      );
    }
    return surroundings;
  }

  /**
   * King:
   * -  Can move to any direction one block at a time,
   *    if the block is is empty or has opponent piece.
   * @return {Array} [all locations that King can move to]
   */
  findAllowedMoves() {
    const currPos = super.getPosition();
    const moveLocations = this.findSurroundingBlocks(currPos);
    const opponentColor = super.getColor() === 'W' ? 'B' : 'W';
    let allowedMoves = [];
    moveLocations.forEach((pos) => {
      if (pieceLocations[pos[0]][pos[1]] === 0 ||
        pieceLocations[pos[0]][pos[1]].includes(opponentColor)
      ) {
        allowedMoves.push(pos);
      }
    });
    return allowedMoves;
  }
}

module.exports = King;
