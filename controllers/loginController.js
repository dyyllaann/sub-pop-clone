var User = require("../models/user");
var async = require("async");

exports.index = function (req, res) {
	// async.parallel(
		// {
		// 	item_count: function (callback) {
		// 		Item.countDocuments({}, callback); // Pass an empty object as match condition to find all documents of this collection
		// 	},
		// 	artist_count: function (callback) {
		// 		Artist.countDocuments({}, callback);
		// 	},
		// },
		// function (err, results) {
			// res.render("login", {
				// title: "Login"
			// });
		// }
	// );
	render("login", {
		title: "Login"
	})
};
