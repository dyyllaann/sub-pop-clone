var Item = require("../models/item");
var Artist = require("../models/artist");
var async = require("async");

exports.index = function (req, res) {
	async.parallel(
		{
			item_count: function (callback) {
				Item.countDocuments({}, callback); // Pass an empty object as match condition to find all documents of this collection
			},
			artist_count: function (callback) {
				Artist.countDocuments({}, callback);
			},
		},
		function (err, results) {
			res.render("index", {
				title: "Sub Pop MegaMart",
				error: err,
				data: results,
			});
		}
	);
};

// Display list of all results.
exports.item_list = function (req, res) {
	Item.find({ label: 'Sub Pop' }, "title image")
		.sort({ title: 1 })
		.populate("artist")
		.exec(function (err, list_items) {
			if (err) {
				return next(err);
			}
			res.render("item_list", { title: "Sub Pop Releases", item_list: list_items });
		});
};