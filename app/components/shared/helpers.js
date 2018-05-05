const _ = require('lodash');

const Helpers = {
  // General
  objectsToMoves(objects) {
    const moves = [];
    objects.forEach((object) => {
      Object.keys(object).forEach((key) => {
        moves.push([key.charCodeAt(0) - 97, object[key]]);
      });
    });
    return moves;
  },
  movesToObjects(moves) {
    return moves.map((move) => ({
      [String.fromCharCode(97 + move[0])]: move[1],
    }));
  },
  fromClosest(pos, n, a, b) {
    if (Math.abs(a[n] - pos[n]) < Math.abs(b[n] - pos[n])) {
      return -1;
    }
    return 1;
  },
  // Axis methods
  axis: {
    loopSquares(yVal, xVal) {
      const arr = [];
      for (let y = 0; y < 8; y++) {
        for (let x = 0; x < 8; x++) {
          if (y === yVal && x !== xVal) {
            arr.push([y, x]);
          }
          if (x === xVal && y !== yVal) {
            arr.push([y, x])
          }
        }
      }

      return arr;
    },
    sortByClosest(arr, pos) {
      const {
        fromClosest,
      } = this.parent;
      const sort = fromClosest.bind(null, pos);

      const yes = arr.filter(e => e[0] === pos[0]);
      const xes = arr.filter(e => e[1] === pos[1]);
      const ydesc = yes.filter(e => e[1] < pos[1]);
      const yasc = yes.filter(e => e[1] > pos[1]);
      const xdesc = xes.filter(e => e[0] < pos[0]);
      const xasc = xes.filter(e => e[0] > pos[1]);

      ydesc.sort(sort.bind(null, 1));
      yasc.sort(sort.bind(null, 1));
      xdesc.sort(sort.bind(null, 0));
      xasc.sort(sort.bind(null, 0));

      return {
        ydesc,
        yasc,
        xdesc,
        xasc,
      };
    },
    findUnallowedSquares(pieceLocations, all, pos, c, oc) {
      const sortedArraysObj = this.sortByClosest(all, pos);
      const unalloweds = [];

      Object.keys(sortedArraysObj).forEach((key) => {
        sortedArraysObj[key].forEach((coords, i) => {
          const val = pieceLocations[coords[0]][coords[1]];
          if (_.isString(val)) {
            if (val.includes(c)) {
              unalloweds.push(sortedArraysObj[key].slice(i));
            }
            if (val.includes(oc)) {
              unalloweds.push(sortedArraysObj[key].slice(i + 1));
            }
          }
        });
      });

      return _.flatten(unalloweds);
    },
  },
  // Diagonal methods
  diagonal: {
    loopSquares(yVal, xVal) {
      const arr = [];

      let xL = xVal;
      let xR = xVal;
      for (let y = yVal - 1; y >= 0; y--) {
        xL -= 1;
        xR += 1;
        if (xL >= 0) {
          arr.push([y, xL])
        }
        if (xR <= 7) {
          arr.push([y, xR])
        }
      }

      xL = xVal;
      xR = xVal;
      for (let y = yVal + 1; y <= 7; y++) {
        xL -= 1;
        xR += 1;
        if (xL >= 0) {
          arr.push([y, xL]);
        }
        if (xR <= 7) {
          arr.push([y, xR]);
        }
      }

      return arr;
    },
    sortByClosest(arr, pos) {
      const {
        fromClosest,
      } = this.parent;
      const sort = fromClosest.bind(null, pos);

      const cToTopLeft = arr.filter(e => e[0] < pos[0] && e[1] < pos[1]);
      const cToBottomLeft = arr.filter(e => e[0] > pos[0] && e[1] < pos[1]);
      const cToTopRight = arr.filter(e => e[0] < pos[0] && e[1] > pos[1]);
      const cToBottomRight = arr.filter(e => e[0] > pos[0] && e[1] > pos[1]);

      cToTopLeft.sort(sort.bind(null, 1));
      cToBottomLeft.sort(sort.bind(null, 1));
      cToTopRight.sort(sort.bind(null, 0));
      cToBottomRight.sort(sort.bind(null, 0));

      return {
        cToTopLeft,
        cToBottomLeft,
        cToTopRight,
        cToBottomRight,
      };
    },
    findUnallowedSquares(pieceLocations, all, pos, c, oc) {
      const sortedArraysObj = this.sortByClosest(all, pos);
      const unalloweds = [];

      Object.keys(sortedArraysObj).forEach((key) => {
        sortedArraysObj[key].forEach((coords, i) => {
          const val = pieceLocations[coords[0]][coords[1]];
          if (_.isString(val)) {
            if (val.includes(c)) {
              unalloweds.push(sortedArraysObj[key].slice(i));
            }
            if (val.includes(oc)) {
              unalloweds.push(sortedArraysObj[key].slice(i + 1));
            }
          }
        });
      });

      return _.flatten(unalloweds);
    },
  },
  init() {
    this.axis.parent = this;
    this.diagonal.parent = this;
    delete this.init;
    return this;
  }
}.init();

module.exports = Helpers;
