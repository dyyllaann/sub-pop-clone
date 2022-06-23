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

exports.create_account = function (req, res) {
	res.render("layout", {
		title: "Create Account",
		message: "Account creation is not currently active. If you have admin credentials, please use those."
	})
}

exports.info = function (req, res) {
	res.render("info", {
		title: "Login Info"
	});
};
