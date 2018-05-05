var express = require('express');
var router = express.Router();

router.get('/hello', function(req, res, next) {
  // Query apis here.
  res.json('World!');
});

module.exports = router;
