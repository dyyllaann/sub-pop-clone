var express = require('express');
var router = express.Router();
var login_controller = require("../controllers/loginController");

// GET login page.
router.get("/login", login_controller.login);

// // GET login post page.
// router.post("/login", login_controller.login_post);

// GET info page.
router.get("/info", login_controller.info);

module.exports = router;
