class Piece {
  constructor(pos, color) {
    this.alive    = true;   // Boolean
    this.position = pos;    // [Y, X]
    this.color    = color;  // 'W' or 'B'
  }

  _setAlive() {
    this.alive = true;
  }

  _setDead() {
    this.alive = false;
  }

  _setPosition(pos) {
    this.position = pos;
  }

  isAlive() {
    return this.alive;
  }

  getColor() {
    return this.color;
  }

  getPosition() {
    return this.position;
  }
}

module.exports = Piece;
