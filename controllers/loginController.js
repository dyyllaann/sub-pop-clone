var User = require("../models/user");
var async = require("async");
// validator = require("express-validator");
// body = validator.body();
// validationResult = validator.validationResult();

exports.login = function (req, res) {
	res.render("login", {
		title: "Account"
	})
};

// exports.login_post = function (req, res) {
// 	var titleTest = "Testing";
// 	res.render("login", {
// 		title: titleTest
// 	})
// }

exports.info = function (req, res) {
	res.render("info", {
		title: "Login Info"
	});
};
