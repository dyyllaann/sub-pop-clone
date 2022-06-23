var express = require('express');
var router = express.Router();
// var login_controller = require("../controllers/loginController");
var item_controller = require("../controllers/itemController");

// GET login page.
router.get('/', function(req, res) {
  res.send('/login');
});

// // GET method route
// app.get('/', (req, res) => {
//   res.send('GET request to the homepage')
// })

module.exports = router;
