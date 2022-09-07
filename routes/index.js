var express = require('express');
var router = express.Router();

// GET home page.
router.get('/', function(req, res) {
  res.redirect('/catalog/items');
});

// GET home page.
router.get('/catalog', function(req, res) {
  res.redirect('/catalog/items');
});

module.exports = router;
