const request = require('request');

const GAME_URL = 'http://localhost:9101/';

const reqCb = (callback, err, response) => {
  if (err) {
    callback(err);
  } else {
    callback(null, response.body);
  }
};

module.exports = function(method, data, callback) {
  const requestCb = reqCb.bind(null, callback);
  switch (method) {
    case 'create lobby':
      request(`${GAME_URL}`, requestCb);
      break;
    default:
      break;
  }

  // callback(null, response);
};
